
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const handleDownloadResume = () => {
  // The correct way to reference public files in production
  const pdfUrl = "/Cv_yahya.pdf";
  
  try {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "yahya-cv.pdf"; // The name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Resume download started",
      description: "Your download should begin shortly.",
    });
  } catch (error) {
    toast({
      title: "Download failed",
      description: "There was an error downloading the resume.",
      variant: "destructive",
    });
    console.error("Download error:", error);
  }
};

const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 pb-24 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent dark:from-accent/10 pointer-events-none" aria-hidden="true" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />
      
      <div className="container max-w-5xl mx-auto z-10">
        <div className="text-center">
          <div className={`transition-all duration-1000 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary text-sm font-medium">
              Software Engineer
            </div>
          </div>
          
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="block mb-2">Oubedda</span>
            <span className="text-gradient">Yahya</span>
          </h1>
          
          <p className={`max-w-2xl mx-auto text-xl text-muted-foreground mb-8 transition-all duration-1000 delay-500 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Passionate about building innovative solutions and mastering new technologies to evolve in a stimulating environment while delivering value.
          </p>
          
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 transition-all duration-1000 delay-700 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button className="w-full sm:w-auto text-base" size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            
            <Button
              className="w-full sm:w-auto group text-base"
              variant="outline"
              size="lg"
              onClick={handleDownloadResume}
            >
              <div className="flex items-center">
                <span className="font-mono mr-2">Click here to get my resume</span>
                <Download className="h-4 w-4 transition-transform group-hover:scale-110" />
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#projects" className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
