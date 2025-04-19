import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-12">
      <div className="container mx-auto max-w-6xl">
        {/* <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center">
              <Shield className="mr-2 h-6 w-6 text-red-600" />
              <span className="text-xl font-bold">LaunchCheck</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Security scanning made simple for indie hackers and micro-SaaS
              founders.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="#features" className="hover:text-red-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-red-600">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#waitlist" className="hover:text-red-600">
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="https://x.com/alsauskas_v"
                  className="hover:text-red-600"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vitaly"
                  className="hover:text-red-600"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@launchcheck.dev"
                  className="hover:text-red-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="/privacy" className="hover:text-red-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-red-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div> */}

        <div className="text-center text-sm text-gray-500">
          <p>
            Built with ❤️ by an indie hacker for indie hackers. &copy;{" "}
            {new Date().getFullYear()} LaunchCheck
          </p>
        </div>
      </div>
    </footer>
  );
}
