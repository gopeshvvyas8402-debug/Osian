import { Link } from "react-router-dom";
import { useState } from "react";
import { X, ZoomIn, Monitor, Users, Award, GraduationCap, Camera, PartyPopper } from "lucide-react";
import { useSiteContext } from "../context/SiteContext";

const categories = ["All", "Classroom", "Lab", "Events", "Achievements", "Students"];

const iconMap = {
  Monitor,
  Users,
  Award,
  GraduationCap,
  Camera,
  PartyPopper
};

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const { content } = useSiteContext();

  const filtered = activeCategory === "All" ? content.gallery : content.gallery.filter(img => img.category === activeCategory);

  return (
    <div>
      {/* Page Banner */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">Our Gallery</h1>
          <div className="flex items-center justify-center gap-2 text-blue-200">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">Gallery</span>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              <Camera className="inline h-4 w-4 mr-1" />
              Photo Gallery
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
              Glimpse of <span className="text-primary">Our Institute</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500 mb-8">
              Take a virtual tour of our infrastructure, classrooms, labs, events, and student activities.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((img) => {
              const IconComponent = iconMap[img.icon as keyof typeof iconMap] || Monitor;
              return (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Image placeholder with gradient or actual image */}
                  <div className="relative h-56 overflow-hidden">
                    {img.imageUrl ? (
                      <>
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white">
                              <ZoomIn className="h-6 w-6" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <span className="inline-block bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                            {img.category}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className={`relative h-full bg-gradient-to-br ${img.gradient} flex items-center justify-center overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "15px 15px" }}></div>
                        <div className="relative text-center">
                          <IconComponent className="mx-auto h-16 w-16 text-white/80 mb-2 transition-transform group-hover:scale-110" />
                          <p className="text-white/70 text-sm font-medium">{img.category}</p>
                        </div>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white">
                              <ZoomIn className="h-6 w-6" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-base font-bold text-dark group-hover:text-primary transition-colors">{img.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{img.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="h-72 md:h-96 relative">
              {selectedImage.imageUrl ? (
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`h-full bg-gradient-to-br ${selectedImage.gradient} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "15px 15px" }}></div>
                  <div className="relative text-center">
                    {(() => {
                      const IconComponent = iconMap[selectedImage.icon as keyof typeof iconMap] || Monitor;
                      return <IconComponent className="mx-auto h-24 w-24 text-white/80 mb-3" />;
                    })()}
                    <p className="text-white/70 text-lg font-medium">{selectedImage.category}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white p-6">
              <h3 className="text-xl font-bold text-dark mb-2">{selectedImage.title}</h3>
              <p className="text-gray-500">{selectedImage.desc}</p>
              <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Video / Virtual Tour CTA */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
            Want to Visit Our Institute?
          </h2>
          <p className="mb-8 text-lg text-blue-100 max-w-xl mx-auto">
            Schedule a free visit to our institute and experience our world-class infrastructure and learning environment in person.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-secondary-dark hover:shadow-xl"
          >
            Schedule a Visit
          </Link>
        </div>
      </section>
    </div>
  );
}
