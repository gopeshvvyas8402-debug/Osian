import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle,
  MessageSquare, ArrowRight, Globe, Users
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["123, Main Road, Near Bus Stand", "Rajkot, Gujarat - 360001"],
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+91 98765 43210", "+91 98765 43211"],
    color: "from-green-500 to-green-700",
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["info@osianenterprise.com", "admissions@osianenterprise.com"],
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 8:00 AM - 8:00 PM", "Sunday: Closed"],
    color: "from-orange-500 to-orange-700",
  },
];

const faqs = [
  { q: "What courses do you offer?", a: "We offer 25+ courses including CCC, DCA, PGDCA, Tally with GST, Web Development, Graphic Design, Python, Digital Marketing, MS Office, Advanced Excel, Data Entry, AutoCAD, and more." },
  { q: "What are the batch timings?", a: "We offer flexible batch timings - Morning (8 AM - 11 AM), Afternoon (12 PM - 3 PM), and Evening (4 PM - 7 PM). Weekend batches are also available for working professionals." },
  { q: "Do you provide placement assistance?", a: "Yes! We have a dedicated placement cell that helps students get placed in reputed companies. We have successfully placed 3000+ students so far." },
  { q: "Can I get a free demo class?", a: "Absolutely! We offer free demo classes for all our courses. You can attend a demo class before enrolling to understand our teaching methodology." },
  { q: "What is the fee structure?", a: "Our fees are very affordable and competitive. Fee varies by course. Please contact us or visit our institute for detailed fee information. EMI options are also available." },
  { q: "Do you provide certificates?", a: "Yes, we provide industry-recognized certificates upon successful completion of every course. These certificates are valid and accepted by employers across India." },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", course: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", course: "", message: "" });
    }, 3000);
  };

  return (
    <div>
      {/* Page Banner */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">Contact Us</h1>
          <div className="flex items-center justify-center gap-2 text-blue-200">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-light">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, i) => (
              <div key={i} className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${info.color} text-white shadow-md transition-transform group-hover:scale-110`}>
                  <info.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-dark">{info.title}</h3>
                {info.details.map((d, j) => (
                  <p key={j} className="text-sm text-gray-500">{d}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
                <MessageSquare className="inline h-4 w-4 mr-1" />
                Get In Touch
              </span>
              <h2 className="mb-2 text-3xl font-extrabold text-dark">
                Send Us a <span className="text-primary">Message</span>
              </h2>
              <p className="mb-8 text-gray-500">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-10 text-center animate-fadeIn">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">Thank You!</h3>
                  <p className="text-green-600">Your message has been sent successfully. We'll contact you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter your phone"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">Select Course</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select a course</option>
                        <option>CCC</option>
                        <option>DCA</option>
                        <option>PGDCA</option>
                        <option>Tally Prime with GST</option>
                        <option>Web Development</option>
                        <option>Python Programming</option>
                        <option>Graphic Design</option>
                        <option>Digital Marketing</option>
                        <option>MS Office</option>
                        <option>Advanced Excel</option>
                        <option>Data Entry & Typing</option>
                        <option>AutoCAD</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map / Info */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full min-h-[400px]">
                {/* Map embed placeholder */}
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-64 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(59,130,246,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                  <div className="relative text-center">
                    <MapPin className="mx-auto h-12 w-12 text-primary mb-2 animate-bounce-slow" />
                    <p className="text-primary font-bold text-lg">Osian Enterprise</p>
                    <p className="text-primary/70 text-sm">123, Main Road, Rajkot</p>
                  </div>
                </div>
                <div className="p-6 bg-white space-y-5">
                  <h3 className="text-lg font-bold text-dark">Visit Our Institute</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Our institute is conveniently located near the bus stand in the heart of Rajkot city.
                    We welcome you to visit us for a free tour of our campus and demo classes.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                      <Globe className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-gray-700">Website</p>
                        <p className="text-xs text-gray-500">www.osianenterprise.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                      <Users className="h-5 w-5 text-green-600 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-gray-700">Free Demo Class</p>
                        <p className="text-xs text-gray-500">Available for all courses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-light py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              FAQ
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-bold text-dark pr-4">{faq.q}</span>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                    openFaq === i ? "bg-primary text-white rotate-45" : "bg-gray-100 text-gray-500"
                  }`}>
                    <span className="text-lg leading-none">+</span>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 animate-fadeIn">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
            Start Your Learning Journey Today!
          </h2>
          <p className="mb-8 text-lg text-blue-100 max-w-xl mx-auto">
            Don't wait! Enroll now and take the first step towards building your dream career in IT.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-secondary-dark hover:shadow-xl"
            >
              <Phone className="h-5 w-5" /> Call Now
            </a>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-primary"
            >
              View Courses <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
