import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import { formatDate } from "@/lib/utils";

interface ScanCompleteEmailProps {
  projectName: string;
  scanUrl: string;
  vulnerabilityStats: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    total: number;
  };
  targetUrl: string;
  completedAt: Date;
}

export const ScanCompleteEmail = ({
  projectName,
  scanUrl,
  vulnerabilityStats,
  targetUrl,
  completedAt,
}: ScanCompleteEmailProps) => {
  const previewText = `Scan completed for ${projectName} with ${vulnerabilityStats.total} findings`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-8 max-w-2xl">
            <Section className="rounded-lg bg-white p-8 shadow-sm">
              <Heading className="mb-6 text-center text-2xl font-bold text-gray-900">
                Security Scan Complete
              </Heading>

              <Text className="mb-6 text-base text-gray-700">
                The security scan for{" "}
                <span className="font-semibold">{projectName}</span> has
                completed. The scan was performed on{" "}
                <span className="font-semibold">{targetUrl}</span> and finished
                at {formatDate(completedAt)}
              </Text>

              <Section className="mb-6 rounded-lg bg-gray-50 p-6">
                <Heading className="mb-4 text-xl font-semibold text-gray-900">
                  Vulnerability Summary
                </Heading>

                <Text className="mb-2">
                  Critical:{" "}
                  <span className="font-semibold text-red-600">
                    {vulnerabilityStats.critical}
                  </span>
                </Text>
                <Text className="mb-2">
                  High:{" "}
                  <span className="font-semibold text-orange-600">
                    {vulnerabilityStats.high}
                  </span>
                </Text>
                <Text className="mb-2">
                  Medium:{" "}
                  <span className="font-semibold text-yellow-600">
                    {vulnerabilityStats.medium}
                  </span>
                </Text>
                <Text className="mb-2">
                  Low:{" "}
                  <span className="font-semibold text-blue-600">
                    {vulnerabilityStats.low}
                  </span>
                </Text>
                <Text className="mb-4">
                  Info:{" "}
                  <span className="font-semibold text-gray-600">
                    {vulnerabilityStats.info}
                  </span>
                </Text>
                <Text className="text-lg font-semibold text-gray-900">
                  Total Findings: {vulnerabilityStats.total}
                </Text>
              </Section>

              <Section className="text-center">
                <Link
                  href={scanUrl}
                  className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700"
                >
                  View Detailed Report
                </Link>
              </Section>

              <Text className="mt-8 text-center text-sm text-gray-500">
                This is an automated message from Launch Check. Please do not
                reply to this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
