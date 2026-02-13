import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useSiteContext } from "../context/SiteContext";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Courses", path: "/courses" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

const courses = [
  "Tally Prime with GST",
  "Web Development",
  "Computer Basics (CCC)",
  "DCA / PGDCA",
  "Graphic Design",
  "MS Office",
  "Python Programming",
  "Digital Marketing",
];

export function Footer() {
  const { isDark } = useTheme();
  const { content } = useSiteContext();
  
  return (
    <footer className={`bg-gradient-to-br from-dark to-primary-dark text-gray-300 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-dark to-primary-dark"}`}>
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl overflow-hidden shadow-md">
                <img 
                  src={content.siteInfo.logo} 
                  alt={`${content.siteInfo.siteName} Logo`} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{content.siteInfo.siteName}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{content.siteInfo.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              {content.siteInfo.siteName} is a leading IT & Computer training institute providing quality education
              in various computer courses. We empower students with practical skills for a successful career in IT.
            </p>
            <div className="flex gap-3">
              <a
                href={content.socialLinks.facebook}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-400 transition-all hover:bg-primary hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={content.socialLinks.twitter}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-400 transition-all hover:bg-primary hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={content.socialLinks.instagram}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-400 transition-all hover:bg-primary hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={content.socialLinks.linkedin}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-400 transition-all hover:bg-primary hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={content.socialLinks.youtube}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-400 transition-all hover:bg-primary hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-secondary link-underline"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Popular Courses</h3>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course}>
                  <Link
                    to="/courses"
                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-secondary link-underline"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary-light">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">
                    {content.contactInfo.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary-light">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{content.contactInfo.phone}</p>
                  <p className="text-sm text-gray-400">{content.contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary-light">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{content.contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary-light">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{content.contactInfo.timings}</p>
                  <p className="text-sm text-gray-400">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {content.siteInfo.siteName}. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by {content.siteInfo.siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
