import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Clock, MapPin, Lock, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* Top Bar */}
      <div className={`bg-gradient-to-r from-primary-dark to-primary text-white`}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-2 text-xs sm:text-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> +91 9409758100
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="h-3 w-3" /> info@osian.tech
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1">
              <Clock className="h-3 w-3" /> Mon-Sat: 8:00 AM - 8:00 PM
            </span>
            <span className="hidden lg:flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Vadodara, Gujarat
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={isDark ? "bg-bg-primary border-b border-border-color" : "bg-white"}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl overflow-hidden shadow-md">
              <img 
                src="/logo.jpg" 
                alt="Osian Enterprise Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className={`text-lg font-bold leading-tight ${
                isDark ? 'text-primary-light' : 'text-primary-dark'
              }`}>
                Osian Enterprise
              </h1>
              <p className={`text-[10px] font-medium tracking-wider uppercase ${
                isDark ? 'text-text-muted' : 'text-gray-500'
              }`}>
                IT & Computer Academy
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-primary text-white shadow-md"
                    : isDark 
                      ? "text-text-secondary hover:bg-primary/10 hover:text-primary-light"
                      : "text-gray-700 hover:bg-primary/10 hover:text-primary"
                } btn-hover`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-3 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-accent/90 hover:shadow-lg btn-hover"
            >
              Enroll Now
            </Link>
            <Link
              to="/admin"
              className={`ml-2 p-2 rounded-lg transition-all btn-hover ${
                isDark 
                  ? "text-text-secondary hover:bg-bg-tertiary hover:text-primary-light"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              }`}
              title="Admin Panel"
            >
              <Lock className="h-5 w-5" />
            </Link>
            <button
              onClick={() => toggleTheme()}
              className={`ml-2 p-2 rounded-lg transition-all btn-hover ${
                isDark 
                  ? "text-text-secondary hover:bg-bg-tertiary hover:text-primary-light"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-all ${
              isDark ? "hover:bg-bg-tertiary text-text-secondary" : "hover:bg-gray-100"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className={`lg:hidden border-t px-4 py-3 animate-fadeIn ${
            isDark ? 'bg-bg-primary border-border-color' : 'bg-white'
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  location.pathname === link.path
                    ? "bg-primary text-white"
                    : isDark 
                      ? "text-text-secondary hover:bg-bg-tertiary"
                      : "text-gray-700 hover:bg-primary/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                isDark 
                  ? "text-text-secondary hover:bg-bg-tertiary"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Lock className="h-4 w-4" />
              Admin Panel
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block rounded-lg bg-accent px-5 py-3 text-center text-sm font-bold text-white"
            >
              Enroll Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
