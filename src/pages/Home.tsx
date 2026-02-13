import { Link } from "react-router-dom";
import {
  Monitor, BookOpen, Award, Users, GraduationCap, Briefcase,
  Star, ChevronRight, ArrowRight, CheckCircle, Target, Lightbulb,
  TrendingUp, Clock, Shield, Zap, Code, PenTool, BarChart3,
  Smartphone, Database, Globe, Terminal, FileSpreadsheet, Layers, Heart, ThumbsUp
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { useSiteContext } from "../context/SiteContext";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
}

const iconMap = {
  Monitor, BarChart3, GraduationCap, Code, Terminal,
  PenTool, Globe, FileSpreadsheet, Smartphone, Database, Layers,
  Users, BookOpen, Award, Briefcase, Target, Shield,
  Clock, Zap, Lightbulb, TrendingUp, Heart, ThumbsUp
};

export function Home() {
  const { isDark } = useTheme();
  const { content } = useSiteContext();

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-accent min-h-[600px] flex items-center`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fadeInUp">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{content.hero.badge}</span>
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
                {content.hero.title}
              </h1>
              <p className="mb-8 text-lg text-blue-100 md:text-xl max-w-lg">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:-translate-y-0.5"
                >
                  {content.hero.cta1} <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary"
                >
                  {content.hero.cta2} <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block animate-slideInRight">
              <div className="relative">
                <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-md border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Code, label: "Web Dev", color: "bg-blue-500" },
                      { icon: BarChart3, label: "Tally", color: "bg-green-500" },
                      { icon: PenTool, label: "Design", color: "bg-pink-500" },
                      { icon: Database, label: "DCA", color: "bg-purple-500" },
                      { icon: Globe, label: "Digital Mkt", color: "bg-cyan-500" },
                      { icon: Smartphone, label: "MS Office", color: "bg-orange-500" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/20">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color} text-white`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-semibold text-white">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">5000+</p>
                        <p className="text-sm text-blue-200">Students Trained</p>
                      </div>
                      <div className="h-12 w-px bg-white/20"></div>
                      <div>
                        <p className="text-2xl font-bold text-white">25+</p>
                        <p className="text-sm text-blue-200">Courses</p>
                      </div>
                      <div className="h-12 w-px bg-white/20"></div>
                      <div>
                        <p className="text-2xl font-bold text-white">10+</p>
                        <p className="text-sm text-blue-200">Years</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-secondary py-3 overflow-hidden">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
          {["🎓 Admissions Open 2024-25", "📞 Call: +91 98765 43210", "🏆 100% Placement Assistance", "💻 Free Demo Classes", "🎯 Certified Courses", "⭐ Experienced Faculty", "🎓 Admissions Open 2024-25", "📞 Call: +91 98765 43210", "🏆 100% Placement Assistance", "💻 Free Demo Classes"].map((text, i) => (
            <span key={i} className="mx-8 text-sm font-semibold text-white">{text}</span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {content.stats.map((stat, i) => {
              const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Users;
              const { count, ref } = useCountUp(stat.value);
              return (
                <div key={i} ref={ref} className="group rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-md transition-transform group-hover:scale-110">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <p className="text-3xl font-extrabold text-primary-dark md:text-4xl">{count}{stat.suffix}</p>
                  <p className="mt-1 text-sm font-medium text-gray-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-gray-light py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="relative">
                <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-1">
                  <div className="rounded-3xl bg-white p-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-blue-50 p-6 text-center">
                        <GraduationCap className="mx-auto h-10 w-10 text-primary mb-2" />
                        <p className="text-2xl font-bold text-primary-dark">25+</p>
                        <p className="text-xs text-gray-500">Courses</p>
                      </div>
                      <div className="rounded-2xl bg-orange-50 p-6 text-center">
                        <Users className="mx-auto h-10 w-10 text-secondary mb-2" />
                        <p className="text-2xl font-bold text-primary-dark">5000+</p>
                        <p className="text-xs text-gray-500">Students</p>
                      </div>
                      <div className="rounded-2xl bg-green-50 p-6 text-center">
                        <Award className="mx-auto h-10 w-10 text-green-600 mb-2" />
                        <p className="text-2xl font-bold text-primary-dark">10+</p>
                        <p className="text-xs text-gray-500">Years</p>
                      </div>
                      <div className="rounded-2xl bg-purple-50 p-6 text-center">
                        <Briefcase className="mx-auto h-10 w-10 text-purple-600 mb-2" />
                        <p className="text-2xl font-bold text-primary-dark">3000+</p>
                        <p className="text-xs text-gray-500">Placed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
                {content.about.badge}
              </span>
              <h2 className="mb-5 text-3xl font-extrabold text-dark md:text-4xl">
                {content.about.title}
              </h2>
              {content.about.description.map((paragraph, i) => (
                <p key={i} className="mb-4 text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="mb-8 space-y-3">
                {content.about.features.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
              >
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              Our Courses
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
              Popular <span className="text-primary">Courses</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Choose from our wide range of industry-relevant courses designed to help you build a successful career in IT.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.courses.map((course, i) => {
              const IconComponent = iconMap[course.icon as keyof typeof iconMap] || Monitor;
              return (
                <div key={i} className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/20 card-hover">
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-md transition-transform group-hover:scale-110`}>
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-dark group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="mb-5 text-sm text-gray-500 leading-relaxed">{course.desc}</p>
                  <Link to="/courses" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl btn-hover"
            >
              View All Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-accent py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "25px 25px" }}></div>
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white mb-4">
              Why Choose Us
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
              Why Students <span className="text-secondary">Choose Us</span>
            </h2>
            <p className="mx-auto max-w-2xl text-blue-100">
              We provide the best learning environment with experienced trainers and modern facilities.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.map((feature, i) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Target;
              return (
                <div key={i} className="group rounded-2xl bg-white/10 p-7 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white shadow-md">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-blue-100 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-light py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              Testimonials
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
              What Our <span className="text-primary">Students Say</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Hear from our successful students about their learning experience at Osian Enterprise.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <p className="mb-5 text-sm text-gray-600 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-primary-dark to-primary p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-white blur-3xl"></div>
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-secondary blur-3xl"></div>
            </div>
            <div className="relative">
              <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
                {content.cta.title}
              </h2>
              <p className="mb-8 text-lg text-blue-100 max-w-xl mx-auto">
                {content.cta.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl hover:-translate-y-0.5"
                >
                  {content.cta.cta1} <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href={`tel:${content.contactInfo.phone}`}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-primary"
                >
                  {content.cta.cta2}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}