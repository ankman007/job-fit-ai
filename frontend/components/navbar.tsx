"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock authentication state - in a real app, this would come from an auth provider
const mockUser = {
  isLoggedIn: false, // Change to false to see the logged-out state
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!mockUser.name) return "U";
    return mockUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const isLoggedIn = mockUser.isLoggedIn;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate position to scroll to (element's position minus half the viewport height)
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - window.innerHeight / 2;

      // Scroll to the calculated position
      window.scrollTo({
        top: middle,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-teal-600">
                JobPrepAI
              </span>
            </Link>
          </div>

          {!isMobile && (
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
              {isHomePage && (
                <>
                  <Link
                    href="/"
                    className="text-sm font-medium transition-colors hover:text-teal-600"
                  >
                    Home
                  </Link>

                  {isHomePage ? (
                    // Home page specific navigation
                    <>
                      <button
                        onClick={() => scrollToSection("features")}
                        className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
                      >
                        Features
                      </button>
                      <button
                        onClick={() => scrollToSection("how-it-works")}
                        className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
                      >
                        How It Works
                      </button>
                      <button
                        onClick={() => scrollToSection("pricing")}
                        className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
                      >
                        Pricing
                      </button>
                      {/* <button
                        onClick={() => scrollToSection("generate")}
                        className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                      >
                        Generate Cheatsheet
                      </button> */}
                    </>
                  ) : (
                    <>
                      <Link
                        href="/resume-templates"
                        className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
                      >
                        Resume Templates
                      </Link>
                      <Link
                        href="/generate"
                        className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
                      >
                        Generate Cheatsheet
                      </Link>
                    </>
                  )}
                </>
              )}
            </nav>
          )}

          <div className="flex items-center space-x-2">
            {!isMobile ? (
              <>
                {mockUser.isLoggedIn ? (
                  // Logged in state - show profile dropdown
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
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

                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-amber-50"
                      >
                      <a
                        href="https://buymeacoffee.com/ankitpoudel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-amber-500 text-amber-500 hover:bg-amber-50 flex items-center gap-1"
                      >
                        <Heart className="h-4 w-4" />
                        <span>Sponsor</span>
                      </a>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2 px-2"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-teal-100 text-teal-700 text-sm">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium">{mockUser.name}</p>
                            <p className="text-xs text-gray-500">
                              {mockUser.email}
                            </p>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="cursor-pointer">
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile/cheatsheets"
                            className="cursor-pointer"
                          >
                            My Cheatsheets
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile/saved-jobs"
                            className="cursor-pointer"
                          >
                            Saved Jobs
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile/settings"
                            className="cursor-pointer"
                          >
                            Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  // Logged out state - show login/signup buttons
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 hover:text-teal-600"
                      asChild
                    >
                      <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-teal-600 text-teal-600 hover:bg-teal-50"
                      asChild
                    >
                      <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700"
                      asChild
                    >
                      <Link href="/auth/login">Get Started</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
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
                    <Button
                      variant="outline"
                      size="sm"
                      >
                      <a
                        href="https://buymeacoffee.com/ankitpoudel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-amber-500 text-amber-500 hover:bg-amber-50 flex items-center gap-1"
                      >
                        <Heart className="h-4 w-4" />
                        <span>Sponsor</span>
                      </a>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="container mx-auto px-4 pb-4">
          <nav className="flex flex-col space-y-4">
            {!isHomePage && (
              <>
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors hover:text-teal-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>

                {isHomePage ? (
                  // Home page specific mobile navigation
                  <>
                    <button
                      onClick={() => scrollToSection("features")}
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600 text-left"
                    >
                      Features
                    </button>
                    <button
                      onClick={() => scrollToSection("how-it-works")}
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600 text-left"
                    >
                      How It Works
                    </button>
                    <button
                      onClick={() => scrollToSection("pricing")}
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600 text-left"
                    >
                      Pricing
                    </button>
                    {/* <button
                      onClick={() => scrollToSection("generate")}
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600 text-left"
                    >
                      Generate Cheatsheet
                    </button> */}
                  </>
                ) : (
                  // Mobile navigation for other pages
                  <>
                    <Link
                      href="/resume-templates"
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Resume Templates
                    </Link>
                    <Link
                      href="/generate"
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Generate Cheatsheet
                    </Link>
                  </>
                )}
              </>
            )}

            <div className="flex flex-col space-y-2 pt-2 border-t">
              {mockUser.isLoggedIn ? (
                // Mobile logged in state
                <>
                  <div className="flex items-center space-x-2 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-teal-100 text-teal-700 text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{mockUser.name}</p>
                      <p className="text-xs text-gray-500">{mockUser.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link href="/profile/cheatsheets">My Cheatsheets</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link href="/profile/saved-jobs">Saved Jobs</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link href="/profile/settings">Settings</Link>
                  </Button>
                  <div className="border-t pt-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start text-red-600"
                    >
                      Log out
                    </Button>
                  </div>
                </>
              ) : (
                // Mobile logged out state
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-700 hover:text-teal-600"
                    asChild
                  >
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start border-teal-600 text-teal-600 hover:bg-teal-50"
                    asChild
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="justify-start bg-teal-600 hover:bg-teal-700"
                    asChild
                  >
                    <Link href="/auth/login">Get Started</Link>
                  </Button>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
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
                      {/* <span className="sr-only">Discord</span> */}
                    </Button>
                    <Button
                      variant="outline"
                        size="sm"
                        className="hover:bg-amber-50"
                        asChild
                      >
                      <a
                        href="https://buymeacoffee.com/ankitpoudel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-amber-500 text-amber-500 hover:bg-amber-50 flex items-center gap-1"
                      >
                        <Heart className="h-4 w-4" />
                        <span>Sponsor</span>
                      </a>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
