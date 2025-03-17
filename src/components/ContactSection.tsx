
import { useRef, useState } from "react";
import { useInView } from "../hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter, 
  CheckCircle2
} from "lucide-react";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset submission state after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "yahya.oubedda@example.com",
      href: "mailto:yahya.oubedda@example.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+212 6XX XXX XXX",
      href: "tel:+2126XXXXXXX"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Casablanca, Morocco",
      href: "https://maps.google.com/?q=Casablanca,Morocco"
    }
  ];
  
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com"
    }
  ];
  
  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 sm:px-6 bg-secondary/30 dark:bg-secondary/10 relative">
      <div className="container max-w-5xl mx-auto">
        <div className={`mb-12 transition-all duration-700 transform ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Badge variant="outline" className="mb-2">Get in Touch</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
          <p className="text-muted-foreground max-w-2xl">
            Interested in working together or have a question? Feel free to reach out through
            the form below or via my social media channels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`transition-all duration-700 delay-200 transform ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a 
                    key={index}
                    href={item.href}
                    className="flex items-start p-4 rounded-lg transition-colors hover:bg-background group border border-transparent hover:border-border/50"
                    target={item.icon === MapPin ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    <div className="p-2 rounded-md bg-primary/10 text-primary mr-4">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Connect with Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="p-3 rounded-full bg-background hover:bg-primary/10 transition-colors border border-border/50"
                      aria-label={link.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-400 transform ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="bg-background rounded-lg p-6 border border-border/50 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
