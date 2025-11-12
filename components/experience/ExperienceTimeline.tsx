// components/experience/ExperienceTimeline.tsx - Professional experience timeline (Enhanced Responsive)

"use client";

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

function ExperienceCard({
  exp,
  index,
}: {
  exp: {
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    type: string;
  };
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1, true);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-6 sm:gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } scroll-fade-in ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: "100ms" }}
    >
      {/* Timeline Dot - Responsive */}
      <div className="absolute left-2 sm:left-4 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full border-2 sm:border-4 border-[#1a0f08] transform md:-translate-x-1/2 animate-pulse-glow z-10"></div>

      {/* Content Card - Responsive */}
      <div
        className={`flex-1 ml-8 sm:ml-12 md:ml-0 ${
          isEven ? "md:pr-8 lg:pr-12" : "md:pl-8 lg:pl-12"
        }`}
      >
        <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-orange-500/30 hover:border-orange-500/60 transition-all active:scale-95 sm:hover:scale-105 glow-hover group">
          {/* Header - Responsive */}
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
              <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                {exp.title}
              </h4>
              <span
                className={`glass px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap self-start ${
                  exp.type === "full-time"
                    ? "text-green-400 border-green-500/30"
                    : exp.type === "internship"
                    ? "text-blue-400 border-blue-500/30"
                    : "text-purple-400 border-purple-500/30"
                } border`}
              >
                {exp.type === "full-time"
                  ? "Full-Time"
                  : exp.type === "internship"
                  ? "Internship"
                  : "Research"}
              </span>
            </div>
            <p className="text-orange-400 font-semibold text-xs sm:text-sm md:text-base">
              {exp.company}
            </p>
            <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">
              {exp.period}
            </p>
          </div>

          {/* Description - Responsive */}
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
            {exp.description}
          </p>

          {/* Achievements - Responsive */}
          <div className="space-y-1.5 sm:space-y-2">
            {exp.achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-gray-400"
              >
                <span className="text-orange-400 mt-0.5 sm:mt-1 flex-shrink-0">
                  ▸
                </span>
                <span className="group-hover:text-gray-300 transition-colors">
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1"></div>
    </div>
  );
}

export default function ExperienceTimeline() {
  const experiences = [
    {
      title: "Full-Stack Software Engineer",
      company: "Tech Innovations Inc.",
      period: "2023 - Present",
      description:
        "Led development of AI-powered web applications serving 100K+ users. Implemented RAG systems with LangChain and OpenAI, achieving 27% error reduction and 99.94% uptime.",
      achievements: [
        "Built scalable microservices architecture",
        "Integrated GPT-4 for intelligent features",
        "Reduced API response time by 60%",
      ],
      type: "full-time",
    },
    {
      title: "Web Developer",
      company: "Brain Mentors",
      period: "2022",
      description:
        "Worked with team to build high-performance apps, integrated AI features, and improved engagement by 10%.",
      achievements: [
        "Developed React.js applications",
        "Implemented responsive designs",
        "Collaborated in Agile teams",
      ],
      type: "full-time",
    },
    {
      title: "Web Developer Intern",
      company: "Mobisoft Technologies",
      period: "2022 - 2023",
      description:
        "In this internship, I gained valuable hands-on experience and exposure to various aspects of web development.",
      achievements: [
        "Learned modern web technologies",
        "Built real-world projects",
        "Contributed to production code",
      ],
      type: "internship",
    },
    {
      title: "Research Assistant",
      company: "CSUF (NSF-Funded Project)",
      period: "2021 - 2022",
      description:
        "Featured in CSUF research news for developing machine learning models to manage public disasters and health emergencies.",
      achievements: [
        "Developed ML models for disaster management",
        "Published in research news",
        "Worked on NSF-funded project",
      ],
      type: "research",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
      {/* Section Header - Responsive */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
          Experience
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base px-4">
          My professional journey in software development
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line - Responsive */}
        <div className="absolute left-2 sm:left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent transform md:-translate-x-1/2"></div>

        {/* Experience Items - Each with individual scroll animation */}
        <div className="space-y-8 sm:space-y-12 md:space-y-16">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>

      {/* Summary Stats - Responsive */}
      <div className="mt-12 sm:mt-14 md:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { value: "3+", label: "Years Experience" },
          { value: "4", label: "Companies" },
          { value: "100K+", label: "Users Served" },
          { value: "10+", label: "Projects" },
        ].map((stat, index) => (
          <div
            key={index}
            className="glass-strong rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-orange-500/20 hover:border-orange-500/50 transition-all active:scale-95 sm:hover:scale-105"
          >
            <p className="text-2xl sm:text-3xl font-bold gradient-text mb-0.5 sm:mb-1">
              {stat.value}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
