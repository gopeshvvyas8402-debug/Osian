import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Courses } from "./pages/Courses";
import { Gallery } from "./pages/Gallery";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { ScrollToTop } from "./components/ScrollToTop";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CourseProvider } from "./context/CourseContext";
import { ThemeProvider } from "./context/ThemeContext";

export function App() {
  return (
    <CourseProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </Router>
      </ThemeProvider>
    </CourseProvider>
  );
}
