
import { useRef, useState } from "react";
import { useInView } from "../hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  ServerCog, 
  Database, 
  Layers, 
  PenTool, 
  Settings, 
  Cpu, 
  Globe,
  Tag
} from "lucide-react";

const skills = {
  frontend: [
    "React", "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", 
    "Redux", "Next.js", "Responsive Design", "SASS/SCSS", "Material UI",
    "Frontend Testing", "Webpack", "Bootstrap"
  ],
  backend: [
    "Node.js", "Express", "Python", "Django", "RESTful APIs", "GraphQL", 
    "MongoDB", "PostgreSQL", "MySQL", "Authentication", "Authorization",
    "Microservices", "Docker", "Linux"
  ],
  iot: [
    "Arduino", "Raspberry Pi", "IoT Protocols", "MQTT", "Embedded Systems",
    "Sensors", "Actuators", "Tia Portal", "HMI", "PLC Programming",
    "Industrial Automation", "Circuit Design"
  ],
  tools: [
    "Git", "GitHub", "CI/CD", "AWS", "Azure", "Jira", "Figma", 
    "VS Code", "Terminal", "Postman", "Odoo", "HubSpot", "Agile Methodologies"
  ]
};

const skillIcons = {
  frontend: Code,
  backend: ServerCog,
  iot: Cpu,
  tools: Settings
};

const SkillTags = ({ skillList, delay }: { skillList: string[], delay: number }) => {
  const tagsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(tagsRef, { once: true, margin: "-50px" });
  
  return (
    <div 
      ref={tagsRef}
      className={`flex flex-wrap gap-2 transition-all duration-1000 transform ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {skillList.map((skill) => (
        <Badge
          key={skill}
          variant="secondary"
          className="skill-tag py-1.5 px-3 text-sm"
        >
          {skill}
        </Badge>
      ))}
    </div>
  );
};

const SkillsSection = () => {
  const [currentTab, setCurrentTab] = useState("frontend");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const getSkillIcon = (category: string) => {
    const Icon = skillIcons[category as keyof typeof skillIcons] || Tag;
    return <Icon className="h-4 w-4" />;
  };
  
  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 sm:px-6 bg-secondary/30 dark:bg-secondary/10 relative">
      <div className="container max-w-5xl mx-auto">
        <div className={`mb-12 transition-all duration-700 transform ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Badge variant="outline" className="mb-2">Expertise</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl">
            Proficiency in multiple technologies across the full development stack,
            from creating beautiful front-end interfaces to implementing robust back-end solutions
            and IoT integrations.
          </p>
        </div>
        
        <div className={`transition-all duration-700 delay-300 transform ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Tabs defaultValue="frontend" className="w-full" onValueChange={setCurrentTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1">
                {Object.keys(skills).map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="flex items-center gap-2 capitalize"
                  >
                    {getSkillIcon(category)}
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {Object.entries(skills).map(([category, skillList], index) => (
              <TabsContent key={category} value={category} className="mt-4 focus-visible:outline-none focus-visible:ring-0">
                <div className="p-6 rounded-lg bg-background border border-border/50 shadow-sm">
                  <div className="flex items-center mb-4">
                    {getSkillIcon(category)}
                    <h3 className="text-xl font-medium ml-2 capitalize">{category} Technologies</h3>
                  </div>
                  
                  <SkillTags skillList={skillList} delay={index * 100} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
