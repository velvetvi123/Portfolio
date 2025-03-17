
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 sm:px-6 border-t">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} Oubedda Yahya. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#home" className="text-sm text-muted-foreground hover:text-primary animated-underline">
              Home
            </a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-primary animated-underline">
              Projects
            </a>
            <a href="#skills" className="text-sm text-muted-foreground hover:text-primary animated-underline">
              Skills
            </a>
            <a href="#experience" className="text-sm text-muted-foreground hover:text-primary animated-underline">
              Experience
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary animated-underline">
              Contact
            </a>
          </div>
        </div>
      </div>
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 animate-fade-in z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
