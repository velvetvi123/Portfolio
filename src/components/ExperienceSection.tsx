
import { useRef } from "react";
import { useInView } from "../hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string[];
  type: "work" | "education";
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    organization: "Blackswan Technology",
    period: "2024 - 2025",
    location: "Casablanca, Morocco",
    description: [
      "Developed full-stack web applications using React, Node.js, and MongoDB",
      "Integrated Odoo ERP systems with custom web applications",
      "Implemented HubSpot CRM integrations for marketing automation",
      "Led agile development sprints and participated in code reviews"
    ],
    type: "work"
  },
  {
    id: 2,
    title: "Industrial Automation Engineer",
    organization: "Ceriab",
    period: "2022 - 2023",
    location: "Casablanca, Morocco",
    description: [
      "Designed and implemented industrial automation solutions using PLC programming",
      "Developed HMI interfaces for machine control and monitoring",
      "Integrated IoT sensors for real-time data collection and analytics",
      "Collaborated with mechanical engineers to optimize production processes"
    ],
    type: "work"
  },
  {
    id: 3,
    title: "Software Engineering Student",
    organization: "Holberton School",
    period: "2023 - 2025",
    location: "Casablanca, Morocco",
    description: [
      "Completed intensive full-stack software engineering curriculum",
      "Developed projects in C, Python, JavaScript, and web technologies",
      "Practiced pair programming and collaborative development workflows",
      "Participated in hackathons and coding competitions"
    ],
    type: "education"
  },
  {
    id: 4,
    title: "Automated Systems Superior Technician",
    organization: "IFMIA Casablanca",
    period: "2021 - 2023",
    location: "Casablanca, Morocco",
    description: [
      "Studied industrial automation, PLC programming, and electrical systems",
      "Completed hands-on projects involving sensor integration and control systems",
      "Gained certification in industrial maintenance and troubleshooting",
      "Participated in industry-sponsored projects with local manufacturing companies"
    ],
    type: "education"
  }
];

const TimelineCard = ({ item, index }: { item: TimelineItem, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isOdd = index % 2 === 1;
  
  const Icon = item.type === "work" ? Briefcase : GraduationCap;
  
  return (
    <div 
      ref={cardRef}
      className={`flex items-start relative transition-all duration-700 transform ${
        isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-border -ml-px" />
      
      <div className={`flex w-full md:w-1/2 ${isOdd ? "md:ml-auto" : "md:mr-auto md:pr-12"} ${isOdd ? "md:pl-12" : ""}`}>
        <div className="relative z-10">
          <div className="hidden md:flex absolute top-1 left-0 -ml-14 w-7 h-7 bg-primary/10 rounded-full items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          
          <Card className="card-hover-effect w-full">
            <CardHeader className="pb-2">
              <div className="flex md:hidden items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <Badge variant="outline">{item.type === "work" ? "Experience" : "Education"}</Badge>
              </div>
              
              <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
              <CardDescription className="font-medium text-primary">
                {item.organization}
              </CardDescription>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{item.period}</span>
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{item.location}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-2">
              <ul className="space-y-1 text-sm">
                {item.description.map((desc, idx) => (
                  <li key={idx} className="flex">
                    <span className="mr-2">•</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 sm:px-6 relative">
      <div className="container max-w-5xl mx-auto">
        <div className={`mb-12 transition-all duration-700 transform ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Badge variant="outline" className="mb-2">Journey</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
          <p className="text-muted-foreground max-w-2xl">
            My professional journey and educational background that have shaped
            my skills and expertise in software development and industrial automation.
          </p>
        </div>
        
        <div className="space-y-12 md:space-y-16 relative">
          {timelineItems.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
