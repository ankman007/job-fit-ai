"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { RootState } from "@/redux/store";
import { clearTokens } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector, useDispatch } from 'react-redux';

export function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isHomePage = pathname === "/";
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userDetails = useSelector((state: RootState) => state.user);

  const isLoggedIn = typeof accessToken === "string" && accessToken.trim() !== "";
  const userName = userDetails?.username || "User";
  const userEmail = userDetails?.email || "user@example.com";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserInitials = () => {
    if (!userDetails?.username) return "U";
    const names = userDetails.username.trim().split(" ");
    return (names[0][0] + (names[1]?.[0] || "")).toUpperCase();
  };

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
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    console.log("User logged out")
    dispatch(clearTokens());
    router.push('/');
  }

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
                {isLoggedIn ? (
                  <div className="flex items-center space-x-4">

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
                            <p className="font-medium">{userName}</p>
                            <p className="text-xs text-gray-500">
                              {userEmail}
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
                            href="/profile"
                            className="cursor-pointer"
                          >
                            My Cheatsheets
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile"
                            className="cursor-pointer"
                          >
                            Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 focus:text-red-600"
                            onClick={handleLogout}
                        >
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
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
                  </>
                ) : (
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
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-2 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-teal-100 text-teal-700 text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{userName}</p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
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
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
