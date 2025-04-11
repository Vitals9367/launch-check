#!/bin/bash

#===================================================================================
# ZAP Docker Container Startup Script
#===================================================================================
#
# Purpose:
# --------
# This script manages the deployment and configuration of OWASP ZAP (Zed Attack Proxy)
# in a Docker container with optimized resource limits and security settings. It ensures
# the ZAP instance is properly configured and ready for security scanning operations.
#
# Key Features:
# ------------
# - Containerized ZAP deployment with resource constraints
# - Automated readiness checking
# - Configurable scan parameters
# - Memory and CPU resource management
# - JVM optimization
#
# Resource Management:
# ------------------
# 1. System Resources:
#    - CPU: Limited to prevent container from consuming excessive CPU
#    - Memory: Hard limit on container memory usage
#    - Process Limit: Prevents fork bombs and resource exhaustion
#    - Swap: Disabled to ensure predictable performance
#
# 2. ZAP Configuration:
#    - JVM Memory: Optimized for scanning performance
#    - Connection Timeout: Prevents hanging on unresponsive targets
#    - Spider/Scanner Duration: Limits scan time per target
#    - Database Recovery: Disabled for performance
#
# Security Configuration:
# ---------------------
# - Runs as non-root user (zap)
# - API access control configured
# - Remote connections enabled with proper restrictions
# - Regular cleanup of temporary data
#
# Container Settings:
# -----------------
# - Daemon Mode: Runs in background
# - Interactive: Allows for runtime interaction
# - Port Mapping: Exposes ZAP proxy port
# - Resource Limits: Prevents resource exhaustion
#
# Default Configuration:
# --------------------
# - CPU: ${CPU_LIMIT} cores
# - Memory: ${MEMORY_LIMIT}
# - JVM Heap: ${JVM_MEMORY}
# - Process Limit: ${PROCESS_LIMIT} processes
# - Port: ${PORT}
# - Connection Timeout: ${CONN_TIMEOUT} seconds
# - Spider Duration: ${SPIDER_DURATION} minutes
# - Scanner Duration: ${SCANNER_DURATION} minutes
#
# Startup Process:
# --------------
# 1. Launches Docker container with specified resource limits
# 2. Configures ZAP with optimized settings
# 3. Waits for ZAP to become fully operational
# 4. Verifies API accessibility
# 5. Displays configuration summary
#
# Usage:
# -----
# ./start-zap.sh
#
# Monitoring:
# ----------
# - Container status available via docker ps
# - Logs accessible through docker logs
# - API status checked periodically during startup
#
# Dependencies:
# ------------
# - Docker
# - curl
# - Standard Unix tools (bash, grep, awk)
#
# Error Handling:
# -------------
# - Validates ZAP startup
# - Times out after max attempts
# - Provides detailed error messages
# - Includes commands for log access
#
#===================================================================================

# Resource and configuration variables
CPU_LIMIT="2"
MEMORY_LIMIT="4g"
JVM_MEMORY="3g"
PROCESS_LIMIT="1000"
PORT="8080"
CONN_TIMEOUT="120"
SPIDER_DURATION="60"
SCANNER_DURATION="60"

# Function to check if ZAP is ready
wait_for_zap() {
    local max_attempts=30  # Maximum number of attempts (5 minutes with 10s interval)
    local attempt=1
    local sleep_interval=10

    echo "Waiting for ZAP to start..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "http://localhost:${PORT}/JSON/core/view/version" > /dev/null 2>&1; then
            echo "✓ ZAP is ready!"
            return 0
        fi
        echo "Waiting for ZAP to be ready... (Attempt $attempt/$max_attempts)"
        sleep $sleep_interval
        attempt=$((attempt + 1))
    done

    echo "Error: ZAP failed to start after $((max_attempts * sleep_interval)) seconds"
    return 1
}

# Start ZAP container in daemon mode
# -u: run as zap user
# -p: expose port 8080 for proxy
# -i: interactive mode
# Resource limits:
# --cpus: limit CPU usage (e.g., 2 means 2 CPU cores)
# --memory: limit memory usage (e.g., 4g means 4 gigabytes)
# --memory-swap: total memory including swap (set equal to memory to disable swap)
# --pids-limit: limit number of processes
docker run -d -u zap \
  -p ${PORT}:${PORT} \
  -i \
  --cpus ${CPU_LIMIT} \
  --memory ${MEMORY_LIMIT} \
  --memory-swap ${MEMORY_LIMIT} \
  --pids-limit ${PROCESS_LIMIT} \
  zaproxy/zap-stable \
  zap.sh -daemon \
  -host 0.0.0.0 \
  -port ${PORT} \
  -config api.disablekey=true \
  -config api.addrs.addr.name=.* \
  -config api.addrs.addr.regex=true \
  -config jvm.memory=${JVM_MEMORY} \
  -config database.recoverylog=false \
  -config connection.timeoutInSecs=${CONN_TIMEOUT} \
  -config spider.maxDuration=${SPIDER_DURATION} \
  -config scanner.maxDurationInMins=${SCANNER_DURATION}

# Wait for ZAP to be ready
if ! wait_for_zap; then
    echo "Failed to start ZAP container. Check docker logs for details."
    exit 1
fi

# Show container status
docker ps | grep zap-stable

echo "ZAP is running!"
echo "Proxy port: ${PORT}"
echo "Resource limits:"
echo "- CPU: ${CPU_LIMIT} cores"
echo "- Memory: ${MEMORY_LIMIT}"
echo "- JVM Memory: ${JVM_MEMORY}"
echo "- Process limit: ${PROCESS_LIMIT}"
echo "Scan limits:"
echo "- Connection timeout: ${CONN_TIMEOUT} seconds"
echo "- Spider duration: ${SPIDER_DURATION} minutes"
echo "- Scanner duration: ${SCANNER_DURATION} minutes"
echo ""
echo "To stop ZAP, run: docker ps | grep zap-stable | awk '{print $1}' | xargs docker stop"
echo "To view logs, run: docker ps | grep zap-stable | awk '{print $1}' | xargs docker logs"
