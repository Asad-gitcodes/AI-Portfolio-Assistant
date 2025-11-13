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
    techStack?: string[];
    keyMetrics?: { label: string; value: string; icon: string }[];
    projects?: string[];
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

          {/* Key Metrics - Visual Highlights */}
          {exp.keyMetrics && exp.keyMetrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
              {exp.keyMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="glass rounded-lg p-2 sm:p-3 border border-orange-500/20 hover:border-orange-500/40 transition-all"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <span className="text-base sm:text-lg">{metric.icon}</span>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                      {metric.label}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-orange-400">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Badges */}
          {exp.techStack && exp.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {exp.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="glass px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium text-gray-300 border border-gray-600/30 hover:border-orange-500/50 hover:text-orange-300 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Projects */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="mb-3 sm:mb-4">
              <p className="text-[10px] sm:text-xs text-gray-500 font-semibold mb-1.5 sm:mb-2">
                KEY PROJECTS
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {exp.projects.map((project, idx) => (
                  <span
                    key={idx}
                    className="glass px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-medium text-blue-400 border border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/10 transition-all cursor-pointer"
                  >
                    📁 {project}
                  </span>
                ))}
              </div>
            </div>
          )}

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
      title: "Full Stack Software Engineer",
      company: "Patientxpress",
      period: "Jun 2025 - Present",
      description:
        "Designed and implemented 3 full stack applications (React + Node.js + PostgreSQL) serving 5,000+ users across distributed healthcare facilities—architected microservices backend handling 50,000+ daily API requests with 99.8% uptime and sub-200ms latency.",
      keyMetrics: [
        { label: "Daily API Requests", value: "50K+", icon: "⚡" },
        { label: "Uptime", value: "99.8%", icon: "🎯" },
        { label: "Users Served", value: "5K+", icon: "👥" },
        { label: "Response Time", value: "<200ms", icon: "🚀" },
        { label: "Transactions", value: "$2M+", icon: "💰" },
        { label: "User Satisfaction", value: "92%", icon: "⭐" },
      ],
      techStack: [
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "PostgreSQL",
        "GPT-4",
        "Redis",
        "AWS",
        "Terraform",
        "GitHub Actions",
      ],
      projects: [
        "AI Financial Assistant",
        "AI Call Agent System",
        "Patient Portal",
        "Payment Gateway Integration",
      ],
      achievements: [
        "Built distributed AI financial assistant (Next.js + Node.js/Express + GPT-4) with Redis caching, reducing manual reporting time 60% (30min→12min) and processing 10,000+ monthly queries with 92% user satisfaction",
        "Architected scalable backend for AI call agent system coordinating 500+ daily appointment confirmations—designed RESTful API with webhook integrations, reducing manual follow-ups 35% and improving response rates 12 percentage points",
        "Led full stack development of patient portal (React + Node.js + PostgreSQL) with real-time OpenDental API synchronization—implemented event-driven architecture reducing data entry errors 27% (11%→8%)",
        "Integrated third-party payment gateway and CRM system, designing PCI-compliant microservices architecture processing $2M+ transactions with zero security incidents and 25% lower latency (4.2s→3.1s)",
        "Established CI/CD infrastructure (GitHub Actions + Terraform + AWS) with automated testing and feature flags—architected deployment pipeline across multiple environments, accelerating release velocity 3x while maintaining 99.8% uptime",
      ],
      type: "full-time",
    },
    {
      title: "Full Stack Software Engineer",
      company: "CEDDI Lab, California State University, Fullerton",
      period: "Jan 2024 - May 2025",
      description:
        "Led full stack development (React + Next.js + Python backend + PostgreSQL) for NSF-funded public health platform ($172,000 grant) serving 10,000+ users across distributed county systems—architected scalable infrastructure achieving 99.94% uptime and sub-230ms response times over 15 months.",
      keyMetrics: [
        { label: "NSF Grant", value: "$172K", icon: "💎" },
        { label: "Uptime", value: "99.94%", icon: "🎯" },
        { label: "Monthly Users", value: "100K+", icon: "👥" },
        { label: "Data Points/Day", value: "1M+", icon: "📊" },
        { label: "ML Accuracy", value: "+22%", icon: "🤖" },
        { label: "Data Refresh", value: "-67%", icon: "⚡" },
      ],
      techStack: [
        "React",
        "Next.js",
        "Python",
        "PostgreSQL",
        "TensorFlow",
        "AWS S3",
        "CloudFront",
        "EC2",
        "Lambda",
      ],
      projects: [
        "Disaster Management Dashboard",
        "Epidemic Forecasting System",
        "COVID-19 Tracking Dashboard",
        "Emergency Resource Optimizer",
      ],
      achievements: [
        "Designed and implemented machine learning algorithms for emergency resource optimization, analyzing population, environmental, and geospatial data to direct resources during disasters—work featured in CSUF research publication and contributed to emergency response optimization for California wildfires",
        "Architected RESTful APIs integrating TensorFlow ML models with real-time frontend visualizations—collaborated with distributed team of data scientists and public health officials across 3 counties to deliver epidemic forecasting system with 22% improved accuracy",
        "Built real-time disaster management dashboard from scratch in 4 months, processing 1M+ daily data points for emergency route optimization and resource allocation—collaborated with 6 cross-functional stakeholder groups in ambiguous research environment",
        "Developed ETL pipeline (Python + PostgreSQL) reducing data refresh time 67% (42min→14min), enabling hourly updates for COVID-19 tracking dashboard used by California Department of Public Health—optimized database queries handling multi-source data integration",
        "Designed distributed deployment architecture on AWS (S3 + CloudFront + EC2 + Lambda) with automated CI/CD—scaled infrastructure to handle 100,000+ monthly users while increasing release velocity from 3/month to 8/month",
        "Co-authored research on computational models for disaster response optimization, applying machine learning to real-world emergency scenarios—work recognized in university publication highlighting impact on California wildfire response planning",
      ],
      type: "research",
    },
    {
      title: "Software Engineer",
      company: "Global Spark Tek",
      period: "Nov 2022 - Jul 2023",
      description:
        "Delivered 8 full stack features (React frontend + Node.js backend) in fast-paced startup environment—improved system performance across the stack: 32% faster startup time (2.8s→1.9s), 43% lower API response time (420ms→240ms), and 99% crash-free rate.",
      keyMetrics: [
        { label: "Startup Time", value: "-32%", icon: "⚡" },
        { label: "API Response", value: "-43%", icon: "🚀" },
        { label: "Crash-Free", value: "99%", icon: "🛡️" },
        { label: "Build Time", value: "-45%", icon: "⏱️" },
        { label: "Deployments", value: "3x/week", icon: "🔄" },
        { label: "Delivery Cycle", value: "5 days", icon: "📦" },
      ],
      techStack: ["React", "Node.js", "GitHub Actions", "Jest", "TDD"],
      projects: ["CI/CD Pipeline", "Full Stack Features (8)"],
      achievements: [
        "Designed and implemented CI/CD pipeline with GitHub Actions and automated testing—reduced build time 45% and enabled 3x weekly deployments, shortening feature delivery cycle from 2 weeks to 5 days in high-ambiguity startup environment",
        "Collaborated with cross-functional product and engineering team to rapidly prototype solutions under shifting priorities—maintained code quality through test-driven development while wearing multiple hats across frontend, backend, and DevOps responsibilities",
      ],
      type: "full-time",
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
    </div>
  );
}
