import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import { upperFirst } from "lodash";

interface WaitlistWelcomeEmailProps {
  name?: string;
}

export default function WaitlistWelcomeEmail({
  name = "Indie Hacker",
}: Readonly<WaitlistWelcomeEmailProps>) {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to LaunchCheck - Security made simple for indie hackers
      </Preview>
      <Tailwind>
        <Body className="bg-gradient-to-b from-slate-50 to-white font-sans">
          <Container className="mx-auto py-20">
            <Section className="overflow-hidden rounded-2xl border border-slate-100 bg-white px-12 py-10 shadow-xl">
              {/* Header */}
              <Heading className="mx-0 mb-2 text-center text-4xl font-bold text-slate-900">
                Welcome to LaunchCheck
              </Heading>

              <br />

              {/* Main Content */}
              <Text className="m-0 mb-4 text-base text-slate-700">
                Hi {upperFirst(name)},
              </Text>

              <br />

              <Text className="m-0 mb-4 text-base leading-relaxed text-slate-700">
                Thank you for joining LaunchCheck!
                <br />
                You're now part of a community that believes security shouldn't
                be complicated or overwhelming. We're building a tool that makes
                security accessible for indie hackers and small teams like
                yours.
              </Text>

              {/* Features Box */}
              <Section className="my-8 overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm ring-1 ring-slate-100">
                <Heading className="m-0 mb-6 text-xl font-semibold text-slate-900">
                  Your Early Access Benefits
                </Heading>
                <div className="space-y-4">
                  <Text className="m-0 flex items-start text-base text-slate-700">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      ✓
                    </span>
                    <span>
                      <strong>Shape the Future</strong>
                      <br />
                      <span className="text-sm text-slate-600">
                        Direct influence on features and early access to shape
                        the product
                      </span>
                    </span>
                  </Text>
                  <Text className="m-0 flex items-start text-base text-slate-700">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      ✓
                    </span>
                    <span>
                      <strong>Founder-Friendly Pricing</strong>
                      <br />
                      <span className="text-sm text-slate-600">
                        Special early supporter rates that grow with your
                        business
                      </span>
                    </span>
                  </Text>
                  <Text className="m-0 flex items-start text-base text-slate-700">
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      ✓
                    </span>
                    <span>
                      <strong>Early Access</strong>
                      <br />
                      <span className="text-sm text-slate-600">
                        Be the first to try new features and security tools
                      </span>
                    </span>
                  </Text>
                </div>
              </Section>

              <Text className="m-0 mb-8 text-base leading-relaxed text-slate-700">
                I understand the challenges indie hackers face with security -
                the confusing technical jargon, overwhelming tools, and unclear
                priorities. That's why I'm building LaunchCheck to make security
                approachable and actionable.
              </Text>

              <Button className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3 text-base font-semibold text-white transition-all hover:from-slate-800 hover:to-slate-700">
                Follow Our Journey
              </Button>

              <Hr className="my-8 border-slate-200" />

              <Text className="m-0 text-start text-sm text-slate-600">
                Questions about security?
                <br />
                Just reply to this email - I'm here to help make security
                simple.
              </Text>
              <br />
              <Text className="m-0 mt-6 text-start text-sm text-slate-600">
                Best regards,
                <br />
                Vitalijus
                <br />
                Founder, LaunchCheck
              </Text>

              {/* Footer */}
              <Hr className="my-8 border-slate-200" />
              <Text className="m-0 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} LaunchCheck. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
