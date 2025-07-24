import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODO: Replace with actual authentication state management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "/api/placeholder/40/40",
  });

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = () => {
    setIsAuthenticated(false);
    // TODO: Implement actual sign out logic
    console.log("User signed out");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/donate", label: "Donate" },
    { href: "/track", label: "Track" },
    { href: "/volunteer", label: "Volunteer" },
    { href: "/admin", label: "Admin" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Annadaan</span>
              <span className="text-xs text-gray-500 -mt-1">
                Because Someone Is Hungry
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                  isActive(link.href)
                    ? "text-orange-600 border-b-2 border-orange-600 pb-1"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <Link to="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              className="h-8 w-8 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-orange-600 hover:bg-orange-50 rounded-md ${
                    isActive(link.href)
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2 bg-orange-50 rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-3 h-5 w-5" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <Link to="/sign-in">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
