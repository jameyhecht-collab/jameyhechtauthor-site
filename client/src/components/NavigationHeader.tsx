import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";

interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Published Works", href: "/published-works" },
  { label: "Into Theism", href: "/into-theism" },
  { label: "About", href: "/about" },
  { label: "Media", href: "/media" },
  { label: "Curriculum Vitae", href: "/curriculum-vitae.pdf", isExternal: true },
  { label: "Bookshop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export default function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [location] = useLocation();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    console.log(`Theme toggled to ${!isDarkMode ? "dark" : "light"} mode`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(`Mobile menu ${!isMenuOpen ? "opened" : "closed"}`);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <Link href="/" className="font-serif text-xl font-semibold text-foreground hover-elevate">
            Dr. Jamey Hecht
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              item.isExternal ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="hover-elevate"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden hover-elevate"
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navigationItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-base font-medium transition-colors hover-elevate rounded-md text-muted-foreground"
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors hover-elevate rounded-md ${
                      location === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}