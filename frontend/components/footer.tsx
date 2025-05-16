"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Heart } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - window.innerHeight / 2;

      window.scrollTo({
        top: middle,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Job Fit AI</h3>
            <p className="mb-4 max-w-md">
              Helping job seekers prepare for interviews with AI-powered
              insights and personalized preparation guides.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <a
                  href="https://x.com/job_prep_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <a
                  href="https://discord.gg/FRHVNjassd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 127.14 96.36"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://buymeacoffee.com/ankitpoudel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:bg-amber-50 flex items-center gap-1"
                >
                  <Heart className="h-4 w-4" />
                  <span>Sponsor</span>
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span
                  onClick={() => scrollToSection("features")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Features
                </span>
              </li>
              <li>
                <span
                  onClick={() => scrollToSection("how-it-works")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </span>
              </li>
              <li>
                <span
                  onClick={() => scrollToSection("pricing")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pricing
                </span>
              </li>
              {/* <li>
                <Link
                  href="/resume-templates"
                  className="text-teal-300 hover:text-white font-medium transition-colors flex items-center cursor-pointer"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Free Resume Templates
                  <span className="ml-1 bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Cookie Policy
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Job Fit AI. All rights reserved.</p>
          <p className="mt-2 text-gray-400">
            Support our work by becoming a{" "}
            <a
              href="https://buymeacoffee.com/ankitpoudel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-amber-400">sponsor</span> today!
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
