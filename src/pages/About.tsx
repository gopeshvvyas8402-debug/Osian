import { Link } from "react-router-dom";
import {
  CheckCircle, Target, Eye,
  Shield, Zap, Heart, ThumbsUp,
  ArrowRight, TrendingUp
} from "lucide-react";

const milestones = [
  { year: "2014", title: "Founded", desc: "Osian Enterprise was established with a vision to provide quality computer education." },
  { year: "2016", title: "500+ Students", desc: "Crossed the milestone of 500 successfully trained students." },
  { year: "2018", title: "New Courses Added", desc: "Expanded curriculum with Web Development, Digital Marketing, and Graphic Design." },
  { year: "2020", title: "Online Classes", desc: "Launched online training programs during the pandemic to ensure uninterrupted learning." },
  { year: "2022", title: "3000+ Placed", desc: "Achieved the milestone of placing over 3000 students in top companies." },
  { year: "2024", title: "10 Years Strong", desc: "Celebrating a decade of excellence in IT education with 25+ courses." },
];

const team = [
  { name: "Mr. Rajesh Osian", role: "Founder & Director", specialization: "Business Management & IT Strategy", initial: "RO" },
  { name: "Mrs. Neha Sharma", role: "Academic Head", specialization: "Computer Science & Pedagogy", initial: "NS" },
  { name: "Mr. Amit Patel", role: "Senior Trainer", specialization: "Tally Prime & Accounting", initial: "AP" },
  { name: "Ms. Pooja Desai", role: "Web Development Trainer", specialization: "Full Stack Web Development", initial: "PD" },
  { name: "Mr. Karan Mehta", role: "Design Trainer", specialization: "Graphic Design & UI/UX", initial: "KM" },
  { name: "Mr. Suresh Joshi", role: "Placement Officer", specialization: "Career Counseling & Placement", initial: "SJ" },
];

const values = [
  { icon: Target, title: "Excellence", desc: "We strive for excellence in every course we offer and every student we teach." },
  { icon: Heart, title: "Student-First", desc: "Students are at the center of everything we do. Their success is our success." },
  { icon: Shield, title: "Integrity", desc: "We maintain the highest standards of honesty and transparency in our practices." },
  { icon: Zap, title: "Innovation", desc: "We continuously update our curriculum to match industry trends and technologies." },
  { icon: ThumbsUp, title: "Quality", desc: "We deliver quality training through experienced faculty and modern infrastructure." },
  { icon: TrendingUp, title: "Growth", desc: "We focus on holistic growth of students - technical skills, soft skills, and personality." },
];

export function About() {
  return (
    <div>
      {/* Page Banner */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">About Us</h1>
          <div className="flex items-center justify-center gap-2 text-blue-200">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">About Us</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-1">
                <div className="rounded-3xl bg-white p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 rounded-2xl bg-blue-50 p-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                        <Target className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-dark">Our Mission</h3>
                        <p className="text-sm text-gray-500">Empowering students with practical IT skills for successful careers.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl bg-orange-50 p-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-white">
                        <Eye className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-dark">Our Vision</h3>
                        <p className="text-sm text-gray-500">To be the most trusted IT training institute in Gujarat.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-green-50 p-5 text-center">
                        <p className="text-3xl font-extrabold text-green-600">10+</p>
                        <p className="text-xs text-gray-500 mt-1">Years Experience</p>
                      </div>
                      <div className="rounded-2xl bg-purple-50 p-5 text-center">
                        <p className="text-3xl font-extrabold text-purple-600">5000+</p>
                        <p className="text-xs text-gray-500 mt-1">Students Trained</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
                Who We Are
              </span>
              <h2 className="mb-5 text-3xl font-extrabold text-dark md:text-4xl">
                Empowering Futures Through <span className="text-primary">IT Education</span>
              </h2>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Founded in 2024, Osian Enterprise has been a pioneer in providing quality computer education in Vadodara, Gujarat. We started with a simple goal — to make IT education accessible, practical, and job-oriented for students from all backgrounds.
              </p>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Over the past decade, we have trained more than 5000 students across 25+ courses, ranging from basic computer literacy to advanced programming and web development. Our alumni are now working in leading IT companies across India.
              </p>
              <p className="mb-6 text-gray-600 leading-relaxed">
                What sets us apart is our commitment to practical training. We believe that theoretical knowledge alone is not enough — students need hands-on experience with real-world projects to truly excel in the IT industry.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {["Practical Training", "Expert Faculty", "Modern Labs", "Placement Support", "Flexible Timing", "Affordable Fees"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-light py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              Our Values
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              The principles that guide our mission to provide the best IT education.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <div key={i} className="group rounded-2xl bg-white p-7 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-md transition-transform group-hover:scale-110">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-dark">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              Our Journey
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
              Our <span className="text-primary">Journey</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent md:left-1/2 md:-translate-x-px"></div>
            {milestones.map((m, i) => (
              <div key={i} className={`relative mb-10 flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-xs font-bold shadow-lg z-10">
                  {m.year}
                </div>
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                  <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-primary mb-2">{m.title}</h3>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-accent py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "25px 25px" }}></div>
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white mb-4">
              Our Team
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
              Meet Our <span className="text-secondary">Expert Team</span>
            </h2>
            <p className="mx-auto max-w-2xl text-blue-100">
              Our experienced and passionate team of professionals is dedicated to your success.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <div key={i} className="group rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/10 text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-1">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-orange-600 text-white text-2xl font-bold shadow-lg">
                  {member.initial}
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-sm text-secondary font-semibold mb-2">{member.role}</p>
                <p className="text-xs text-blue-200">{member.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
            Want to Join <span className="text-primary">Osian Enterprise?</span>
          </h2>
          <p className="mb-8 text-gray-500 max-w-xl mx-auto">
            Start your IT career journey today. Contact us for free counseling and course details.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-8 py-4 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
            >
              View Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
