#!/usr/bin/env bash

#===================================================================================
# ZAP Automated Security Scanning Script
#===================================================================================
# 
# Purpose:
# --------
# This script automates security scanning of multiple URLs using OWASP ZAP (Zed Attack Proxy).
# It performs both spider crawling and active security scanning in parallel, generating
# detailed HTML reports for each target URL.
#
# Key Features:
# ------------
# - Parallel scanning of multiple URLs for efficient processing
# - Automatic context management for isolated scanning
# - Comprehensive error logging and debugging capabilities
# - Progress monitoring for both spider and active scans
# - HTML report generation for each target
# - Automatic cleanup of contexts after scanning
#
# Architecture:
# ------------
# 1. Input Processing:
#    - Reads URLs from a provided file
#    - Configures parallel execution limits
#    - Sets up reporting and logging directories
#
# 2. Scanning Process (per URL):
#    a. Creates an isolated context for the target URL
#    b. Performs spider scan to discover site structure
#    c. Executes active security scan on discovered endpoints
#    d. Generates detailed HTML report
#    e. Cleans up context after completion
#
# 3. Error Handling:
#    - Detailed logging of API errors
#    - Separate log files for each error type
#    - Timestamp and context preservation for debugging
#
# Usage:
# ------
# ./run-zap-scan.sh <urls_file> [max_parallel_scans] [api_key] [zap_api_url]
#
# Parameters:
# - urls_file: File containing target URLs (one per line)
# - max_parallel_scans: Maximum number of concurrent scans (default: 3)
# - api_key: ZAP API key if authentication is enabled
# - zap_api_url: URL of ZAP API (default: http://localhost:8080)
#
# Output:
# -------
# - HTML reports in zap-reports/<timestamp>/ directory
# - Error logs in zap-reports/<timestamp>/logs/ directory
# - Summary of completed scans and any errors encountered
#
# Dependencies:
# ------------
# - OWASP ZAP instance running and accessible
# - curl for API interactions
# - Standard Unix tools (bash, grep, sed, awk)
#
# Error Handling:
# -------------
# The script implements comprehensive error handling:
# - Validates ZAP availability before starting
# - Monitors scan progress and detects failures
# - Logs detailed error information for debugging
# - Provides error summaries after completion
#
# Security Considerations:
# ----------------------
# - Uses isolated contexts for each scan
# - Supports API key authentication
# - Cleans up contexts after use
# - Logs sensitive information safely
#
#===================================================================================

# Ensure we're running in bash
if [ -z "$BASH_VERSION" ]; then
    echo "This script requires bash to run"
    exit 1
fi

# Check if URLs file is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <urls_file> [max_parallel_scans] [api_key] [zap_api_url]"
    echo "Example: $0 urls.txt 3 change-me-9203 http://zap-instance:8080"
    echo "Default values:"
    echo "  max_parallel_scans: 3"
    echo "  api_key: disabled"
    echo "  zap_api_url: http://localhost:8080"
    echo "urls.txt format: one URL per line"
    exit 1
fi

URLS_FILE=$1
MAX_PARALLEL=${2:-3}     # Default to 3 parallel scans if not specified
API_KEY=${3:-""}         # Optional API key
ZAP_API=${4:-"http://localhost:8080"}  # Optional ZAP API URL
REPORTS_DIR="zap-reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_DIR="${REPORTS_DIR}/${TIMESTAMP}/logs"

# Export variables needed by parallel processes
export API_KEY ZAP_API REPORTS_DIR TIMESTAMP LOG_DIR

# Create reports and logs directories
mkdir -p "${REPORTS_DIR}/${TIMESTAMP}"
mkdir -p "$LOG_DIR"

# Function to log error responses to files for debugging and troubleshooting
# Parameters:
#   $1 - url: The target URL being scanned
#   $2 - endpoint: The ZAP API endpoint that was called
#   $3 - response: The full response from the API call
#   $4 - error_msg: A descriptive error message
# Creates a log file in LOG_DIR with timestamp and endpoint name containing:
# - Error details (timestamp, URL, endpoint, error message)
# - Full response body for debugging
log_error() {
    local url=$1
    local endpoint=$2
    local response=$3
    local error_msg=$4
    
    local log_file="${LOG_DIR}/error_$(date +%Y%m%d_%H%M%S)_$(echo $endpoint | sed 's/[^a-zA-Z0-9]/_/g').log"
    {
        echo "=== Error Details ==="
        echo "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"
        echo "URL: $url"
        echo "Endpoint: $endpoint"
        echo "Error: $error_msg"
        echo "=== Response Body ==="
        echo "$response"
        echo "===================="
    } >> "$log_file"
    
    echo "Error details logged to: $log_file" >&2
}
export -f log_error

# Function to check if ZAP is running and ready to accept requests
# Makes an API call to ZAP's version endpoint to verify connectivity
# Retries up to max_retries times with sleep_interval seconds between attempts
# Returns:
#   0 if ZAP is running and responding
#   1 if ZAP fails to respond after all retries
check_zap() {
    local max_retries=30  # Maximum number of retries (5 minutes with 10s sleep)
    local retry_count=0
    local sleep_interval=10  # Sleep interval in seconds

    while [ $retry_count -lt $max_retries ]; do
        local api_url="$ZAP_API/JSON/core/view/version"
        if [ -n "$API_KEY" ]; then
            api_url="${api_url}?apikey=$API_KEY"
        fi
        
        if [ $retry_count -eq 0 ]; then
            echo "Checking if ZAP is running at $ZAP_API..."
        else
            echo "Waiting for ZAP to start... (Attempt $retry_count/$max_retries)"
        fi

        local response=$(curl -s "$api_url")
        if [ -n "$response" ]; then
            local version=$(echo "$response" | grep -o '"version":"[^"]*"' | cut -d'"' -f4)
            if [ -n "$version" ]; then
                echo "ZAP is running! (Version: $version)"
                return 0
            fi
        fi

        retry_count=$((retry_count + 1))
        if [ $retry_count -lt $max_retries ]; then
            sleep $sleep_interval
        fi
    done

    log_error "N/A" "/JSON/core/view/version" "$response" "Failed to get ZAP version after $max_retries attempts"
    echo "Error: ZAP is not running at $ZAP_API after $max_retries attempts. Please check if ZAP container is starting correctly." >&2
    return 1
}

# Helper function to make API calls to ZAP
# Parameters:
#   $1 - endpoint: The ZAP API endpoint to call
#   $2 - params: Optional query parameters to append to the URL
# Returns: The response from the API call
zap_api_call() {
    local endpoint=$1
    local params=$2
    local url="$ZAP_API$endpoint"
    
    if [ -n "$params" ]; then
        url="${url}?${params}"
        if [ -n "$API_KEY" ]; then
            url="${url}&apikey=$API_KEY"
        fi
    elif [ -n "$API_KEY" ]; then
        url="${url}?apikey=$API_KEY"
    fi
    
    curl -s "$url"
}
export -f zap_api_call

# Function to create a new ZAP context for scanning
# Parameters:
#   $1 - url: The target URL to scan
#   $2 - name: The name for the new context
# Returns: The context ID if successful, or exits with error if failed
create_context() {
    local url=$1
    local name=$2
    
    # Create new context
    local response=$(zap_api_call "/JSON/context/action/newContext" "contextName=$name")
    local context_id=$(echo "$response" | grep -o '"contextId":"[^"]*"' | cut -d'"' -f4)
    
    if [ -z "$context_id" ]; then
        log_error "$url" "/JSON/context/action/newContext" "$response" "Failed to create context"
        return 1
    fi
    
    # Include URL in context
    local include_response=$(zap_api_call "/JSON/context/action/includeInContext" "contextName=$name&regex=$url.*")
    if echo "$include_response" | grep -q "error"; then
        log_error "$url" "/JSON/context/action/includeInContext" "$include_response" "Failed to include URL in context"
        return 1
    fi
    
    echo "$context_id"
}
export -f create_context

# Function to execute and monitor spider scan
# Parameters:
#   $1 - url: The target URL to spider
#   $2 - context_id: The context ID to use for spidering
# Returns: 0 if successful, 1 if failed
wait_for_spider() {
    local url=$1
    local context_id=$2
    
    echo "[$url] Starting spider scan..."
    local response=$(zap_api_call "/JSON/spider/action/scan" "url=$url&contextId=$context_id")
    
    # Check if response contains an error message
    if echo "$response" | grep -q '"error"'; then
        log_error "$url" "/JSON/spider/action/scan" "$response" "Failed to start spider scan"
        return 1
    fi
    
    # Extract scan ID - the response format is {"scan":"1"}
    local scan_id=$(echo "$response" | grep -o '"scan":"[^"]*"' | cut -d'"' -f4)
    if [ -z "$scan_id" ]; then
        log_error "$url" "/JSON/spider/action/scan" "$response" "Failed to extract spider scan ID from response"
        return 1
    fi
    
    while true; do
        local status_response=$(zap_api_call "/JSON/spider/view/status" "scanId=$scan_id")
        
        # Check if status response contains an error
        if echo "$status_response" | grep -q '"error"'; then
            log_error "$url" "/JSON/spider/view/status" "$status_response" "Failed to get spider status"
            return 1
        fi
        
        # Extract progress - handle both quoted and unquoted numbers: "status":"0" or "status":0
        local progress=$(echo "$status_response" | grep -o '"status":"*[0-9]*"*' | grep -o '[0-9]*')
        if [ -z "$progress" ]; then
            log_error "$url" "/JSON/spider/view/status" "$status_response" "Failed to extract progress from status response"
            return 1
        fi
        
        echo "[$url] Spider progress: $progress%"
        if [ "$progress" -eq 100 ]; then
            break
        fi
        sleep 5
    done
    echo "[$url] Spider scan completed!"
}
export -f wait_for_spider

# Function to execute and monitor active scan
# Parameters:
#   $1 - url: The target URL to scan
#   $2 - context_id: The context ID to use for scanning
# Returns: 0 if successful, 1 if failed
wait_for_scan() {
    local url=$1
    local context_id=$2
    
    echo "[$url] Starting active scan..."
    local response=$(zap_api_call "/JSON/ascan/action/scan" "url=$url&contextId=$context_id")
    
    # Check if response contains an error message
    if echo "$response" | grep -q '"error"'; then
        log_error "$url" "/JSON/ascan/action/scan" "$response" "Failed to start active scan"
        return 1
    fi
    
    # Extract scan ID - the response format is {"scan":"1"}
    local scan_id=$(echo "$response" | grep -o '"scan":"[^"]*"' | cut -d'"' -f4)
    if [ -z "$scan_id" ]; then
        log_error "$url" "/JSON/ascan/action/scan" "$response" "Failed to extract active scan ID from response"
        return 1
    fi
    
    while true; do
        local status_response=$(zap_api_call "/JSON/ascan/view/status" "scanId=$scan_id")
        
        # Check if status response contains an error
        if echo "$status_response" | grep -q '"error"'; then
            log_error "$url" "/JSON/ascan/view/status" "$status_response" "Failed to get active scan status"
            return 1
        fi
        
        # Extract progress - handle both quoted and unquoted numbers: "status":"0" or "status":0
        local progress=$(echo "$status_response" | grep -o '"status":"*[0-9]*"*' | grep -o '[0-9]*')
        if [ -z "$progress" ]; then
            log_error "$url" "/JSON/ascan/view/status" "$status_response" "Failed to extract progress from status response"
            return 1
        fi
        
        echo "[$url] Active scan progress: $progress%"
        if [ "$progress" -eq 100 ]; then
            break
        fi
        sleep 5
    done
    echo "[$url] Active scan completed!"
}
export -f wait_for_scan

# Function to execute a complete scan for a single URL
# Creates a context, runs spider and active scans, generates report
# Parameters:
#   $1 - url: The target URL to scan
# Returns: 0 if successful, 1 if failed
run_scan() {
    local url=$1
    local context_name="context_$(echo "$url" | md5sum | cut -d' ' -f1)"
    
    echo "[$url] Starting scan..."
    
    # Create a new context and get its ID
    local context_id=$(create_context "$url" "$context_name")
    if [ -z "$context_id" ]; then
        echo "[$url] Error: Failed to create context"
        return 1
    fi
    
    # Run spider scan
    if ! wait_for_spider "$url" "$context_id"; then
        echo "[$url] Error: Spider scan failed"
        return 1
    fi
    
    # Run active scan
    if ! wait_for_scan "$url" "$context_id"; then
        echo "[$url] Error: Active scan failed"
        return 1
    fi
    
    # Generate report
    echo "[$url] Generating report..."
    local report_file="${REPORTS_DIR}/${TIMESTAMP}/$(echo $url | sed 's/[^a-zA-Z0-9]/_/g').html"
    local report_response=$(zap_api_call "/OTHER/core/other/htmlreport" "contextId=$context_id")
    
    # Check if response is valid HTML (should start with <!DOCTYPE html> or <html>)
    if ! echo "$report_response" | grep -q '^\(<!DOCTYPE html>\|<html>\)'; then
        # Not HTML, check if it's an error response
        if echo "$report_response" | grep -q '"error"'; then
            log_error "$url" "/OTHER/core/other/htmlreport" "$report_response" "Failed to generate report"
            return 1
        fi
        # Not HTML and no error message - something else went wrong
        log_error "$url" "/OTHER/core/other/htmlreport" "$report_response" "Invalid report format received"
        return 1
    fi
    
    echo "$report_response" > "$report_file"
    echo "[$url] Report generated: $report_file"
    
    # Clean up context
    local cleanup_response=$(zap_api_call "/JSON/context/action/removeContext" "contextName=$context_name")
    if echo "$cleanup_response" | grep -q '"error"'; then
        log_error "$url" "/JSON/context/action/removeContext" "$cleanup_response" "Failed to remove context"
    fi
}
export -f run_scan

# Function to clean up all contexts at the end of scanning
# Lists and removes all contexts from ZAP
cleanup_all_contexts() {
    echo "Cleaning up all contexts..."
    local contexts_response=$(zap_api_call "/JSON/context/view/contextList")
    
    # Extract context names from the JSON response
    # The response format is: {"contextList":["context1","context2",...]}
    local context_names=$(echo "$contexts_response" | grep -o '"contextList":\[[^]]*\]' | sed 's/"contextList":\[//g' | sed 's/\]//g' | tr ',' '\n' | sed 's/"//g')
    
    if [ -n "$context_names" ]; then
        echo "$context_names" | while read -r context_name; do
            if [ -n "$context_name" ]; then
                echo "Removing context: $context_name"
                local remove_response=$(zap_api_call "/JSON/context/action/removeContext" "contextName=$context_name")
                if echo "$remove_response" | grep -q "error"; then
                    log_error "cleanup" "/JSON/context/action/removeContext" "$remove_response" "Failed to remove context: $context_name"
                fi
            fi
        done
        echo "✓ Context cleanup completed"
    else
        echo "No contexts found to clean up"
    fi
}

# Main execution
check_zap || exit 1

# Display configuration
echo "Configuration:"
echo "- ZAP API URL: $ZAP_API"
echo "- Max parallel scans: $MAX_PARALLEL"
echo "- API key: ${API_KEY:-"Not set (API key authentication disabled)"}"
echo "- Reports directory: ${REPORTS_DIR}/${TIMESTAMP}"
echo "- Logs directory: $LOG_DIR"
echo ""

# Process URLs in parallel
echo "Starting scans with max $MAX_PARALLEL parallel jobs..."
cat "$URLS_FILE" | xargs -I {} -P "$MAX_PARALLEL" bash -c 'run_scan "$@"' _ {}

echo -e "\nAll scans completed! Reports are available in ${REPORTS_DIR}/${TIMESTAMP}/"
echo "Summary of scans:"
ls -l "${REPORTS_DIR}/${TIMESTAMP}/" | grep -v "logs" | awk '{print "- " $9}'

# Clean up all contexts after scans are complete
cleanup_all_contexts

# Check if there were any errors
if [ -n "$(ls -A "$LOG_DIR" 2>/dev/null)" ]; then
    echo -e "\nWarning: Some errors occurred during scanning. Check the logs in: $LOG_DIR"
    echo "Error logs:"
    ls -l "$LOG_DIR" | awk '{print "- " $9}' 
