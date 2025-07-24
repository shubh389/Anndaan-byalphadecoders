import React, { ReactNode } from "react";
import Navigation from "./Navigation";
import { Heart } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Navigation />
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" fill="currentColor" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">Annadaan</span>
                  <span className="text-sm text-gray-400">
                  Together, We Can End Hunger
                  </span>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                Connecting food donors with those in need through technology and
                compassion. Together, we can reduce food waste and fight hunger
                in our communities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/donate"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Donate Food
                  </a>
                </li>
                <li>
                  <a
                    href="/volunteer"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Become Volunteer
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-orange-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: alphadecoders@annadaan.org</li>
                <li>Phone: +91 9128364783</li>
                <li>Address: Kolkata, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Annadaan. All rights reserved. Made with ❤️ for a
              hunger-free world.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
