import { Rocket } from "lucide-react"

export function PageHeader() {
  return (
    <div className="flex flex-col items-center mb-8 text-center">
      <Rocket className="h-12 w-12 mb-3 text-primary" />
      <h1 className="text-3xl font-bold md:text-4xl">Find website vulnerabilities before hackers do.</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        No downloads, no accounts — just enter a URL and start scanning
      </p>
    </div>
  )
}

