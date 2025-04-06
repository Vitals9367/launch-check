import Image from "next/image";
import { Twitter, Github, Shield } from "lucide-react";
import Link from "next/link";

export function FounderSection() {
  return (
    <section className="border-y border-gray-100 bg-white px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
              <Shield className="mr-1 h-3.5 w-3.5" />
              <span>Why I Built This</span>
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Hey, I'm Vitalijus 👋
            </h2>
            <p className="text-xl text-gray-600">
              After launching multiple SaaS products, I realized security was
              always an afterthought - it was either too complex or too
              expensive to implement properly.
            </p>
            <div className="space-y-4 text-gray-600">
              <p>
                I've spent years working with enterprise security tools and saw
                how inaccessible they were for indie hackers and small teams.
                That's why I built LaunchCheck - to make security scanning
                accessible, understandable, and actionable.
              </p>
              <p>
                No enterprise complexity. No security expertise needed. Just
                clear, actionable insights to keep your SaaS secure.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="https://x.com/alsauskas_v"
                className="text-red-600 hover:text-red-700"
              >
                Follow my journey →
              </Link>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="relative flex justify-center">
            <Link
              href="https://x.com/alsauskas_v"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[80%]"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-2 transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="relative h-full w-full rounded-xl">
                  <Image
                    src="/profile.png"
                    alt="Vitalijus Alsauskas"
                    fill
                    className="rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-red-100/50 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-orange-100/50 blur-2xl"></div>

                {/* Social proof badge */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Vitalijus Alsauskas</p>
                      <p className="text-sm text-gray-600">
                        Indie Hacker & Software Developer
                      </p>
                    </div>
                    <div className="rounded-full bg-red-100 p-2 text-red-600 group-hover:bg-red-200">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
