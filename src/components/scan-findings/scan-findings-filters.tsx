import {
  Search,
  SlidersHorizontal,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Severity = "critical" | "high" | "medium" | "low";

interface ScanFindingsFiltersProps {
  selectedSeverities: Set<Severity>;
  onSeverityChange: (severity: Severity) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ScanFindingsFilters({
  selectedSeverities,
  onSeverityChange,
  searchQuery,
  onSearchChange,
}: ScanFindingsFiltersProps) {
  const exportData = (format: "pdf" | "csv" | "json") => {
    // TODO: Implement actual export functionality
    console.log(`Exporting as ${format}...`);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search findings..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuCheckboxItem
            checked={selectedSeverities.has("critical")}
            onCheckedChange={() => onSeverityChange("critical")}
          >
            Critical
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedSeverities.has("high")}
            onCheckedChange={() => onSeverityChange("high")}
          >
            High
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedSeverities.has("medium")}
            onCheckedChange={() => onSeverityChange("medium")}
          >
            Medium
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedSeverities.has("low")}
            onCheckedChange={() => onSeverityChange("low")}
          >
            Low
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => exportData("pdf")}>
            <FileText className="mr-2 h-4 w-4" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportData("csv")}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportData("json")}>
            <FileJson className="mr-2 h-4 w-4" />
            Export as JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
