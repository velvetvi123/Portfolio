
import { useState, useRef, useEffect } from "react";
import { 
  Github, 
  ExternalLink, 
  ArrowRight, 
  AlertCircle,
  FileCode, 
  Terminal, 
  Code2, 
  Database,
  Stethoscope,
  FileText,
  BookOpen,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInView } from "../hooks/use-in-view";

interface Project {
  id: number;
  title: string;
  year: string;
  description: string;
  tech: string[];
  features: string[];
  challenges: string[];
  github: string;
  demo?: string;
  icon: React.ElementType;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Simple Shell",
    year: "2023",
    description: "A Linux shell emulator that supports command execution, built from scratch.",
    tech: ["C", "Linux", "Bash", "Git"],
    features: ["Command execution", "Environment variable handling", "Signal handling", "Builtin commands"],
    challenges: ["Process management", "Memory leaks prevention", "Signal handling implementation"],
    github: "https://github.com/oussama7chaouki/simple_shell",
    icon: Terminal
  },
  {
    id: 2,
    title: "Techblog",
    year: "2024",
    description: "Full-stack blog application with user authentication and content management system.",
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    features: ["User authentication", "CRUD operations", "Markdown support", "Commenting system"],
    challenges: ["User authentication flow", "Responsive design", "Real-time updates"],
    github: "https://github.com/Outtacosmos-ai/TechBlog_MVP-Project",
    demo: "https://demo.example.com",
    icon: FileText
  },
  {
    id: 3,
    title: "Dentiapro",
    year: "2024-2025",
    description: "SaaS platform for dental clinics with administrative and medical workflow management.",
    tech: ["React", "Django", "PostgreSQL", "Docker", "AWS"],
    features: ["Patient records", "Appointment scheduling", "Billing management", "Medical imaging integration"],
    challenges: ["HIPAA compliance", "Complex database relationships", "Real-time notifications"],
    github: "https://github.com",
    demo: "https://dentia-pro-landing.vercel.app/",
    icon: Stethoscope
  },
  {
    id: 4,
    title: "4.0 IoT Project",
    year: "2023",
    description: "Industrial robotic automation system with Arduino and human-machine interface.",
    tech: ["Arduino", "C++", "HMI", "IoT", "Tia Portal"],
    features: ["Real-time monitoring", "Remote control", "Data visualization", "Automated workflows"],
    challenges: ["Hardware-software integration", "Real-time data processing", "Industrial protocols"],
    github: "https://github.com",
    icon: Cpu
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  return (
    <div 
      ref={cardRef}
      className={`transition-all duration-700 ease-out transform ${
        isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="h-full card-hover-effect bg-card dark:bg-card/50 border border-border/50 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <project.icon className="h-10 w-10 p-2 bg-primary/10 rounded-lg text-primary mb-2" />
            <Badge variant="outline" className="font-mono text-xs">
              {project.year}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold mt-2">{project.title}</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary" className="skill-tag">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Key Features</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              {project.features.slice(0, 2).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Challenges</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              {project.challenges.slice(0, 2).map((challenge, idx) => (
                <li key={idx}>{challenge}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-1" />
              Code
            </a>
          </Button>
          
          {project.demo ? (
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Demo
              </a>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="gap-1" disabled>
              <AlertCircle className="h-4 w-4 mr-1" />
              Private
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 sm:px-6 relative">
      <div className="container max-w-6xl mx-auto">
        <div className={`mb-12 transition-all duration-700 transform ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Badge variant="outline" className="mb-2">Portfolio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl">
            A collection of projects that showcase my technical abilities and problem-solving skills
            across various domains and technologies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
        
        <div className={`mt-12 text-center transition-all duration-700 delay-500 transform ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/velvetvi123" target="_blank" rel="noopener noreferrer" className="group">
              <span>More projects on GitHub</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
