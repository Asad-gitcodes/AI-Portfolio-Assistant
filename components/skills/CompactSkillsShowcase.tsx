// components/skills/CompactSkillsShowcase.tsx - Compact skills with logos from public folder

"use client";

export default function CompactSkillsShowcase() {
  const skillsData = [
    {
      category: "Frontend",
      color: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-500/30",
      skills: [
        { name: "React.js", logo: "/logos/react.png" },
        { name: "Next.js", logo: "/logos/next.js.png" },
        { name: "TypeScript", logo: "/logos/typescript.png" },
        { name: "JavaScript", logo: "/logos/javascript.png" },
        { name: "HTML5", logo: "/logos/html5.png" },
        { name: "CSS3", logo: "/logos/css3.png" },
        { name: "Tailwind", logo: "/logos/tailwind-css.png" },
      ],
    },
    {
      category: "AI/ML",
      color: "from-purple-500 to-pink-600",
      borderColor: "border-purple-500/30",
      skills: [
        { name: "LLMs", logo: "/logos/llm.png" },
        { name: "RAG", logo: "/logos/rag.png" },
        { name: "LangChain", logo: "/logos/chain.png" },
        { name: "GPT-4", logo: "/logos/chatgpt.png" },
        { name: "OpenAI", logo: "/logos/chatgpt1.png" },
        { name: "Prompts", logo: "/logos/command.png" },
        { name: "Vectors", logo: "/logos/vector.png" },
      ],
    },
    {
      category: "Backend",
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500/30",
      skills: [
        { name: "Node.js", logo: "/logos/nodejs.png" },
        { name: "Express", logo: "/logos/express.png" },
        { name: "REST API", logo: "/logos/api.png" },
        { name: "Webhooks", logo: "/logos/webhook.png" },
        { name: "Microservices", logo: "/logos/microservices.png" },
      ],
    },
    {
      category: "Tools",
      color: "from-orange-500 to-red-600",
      borderColor: "border-orange-500/30",
      skills: [
        { name: "Git", logo: "/logos/git.png" },
        { name: "GitHub", logo: "/logos/github.png" },
        { name: "CI/CD", logo: "/logos/cicd.png" },
        { name: "AWS", logo: "/logos/aws.png" },
        { name: "Docker", logo: "/logos/docker.png" },
        { name: "Terraform", logo: "/logos/terraform.png" },
      ],
    },
    {
      category: "Databases",
      color: "from-blue-500 to-indigo-600",
      borderColor: "border-blue-500/30",
      skills: [
        { name: "PostgreSQL", logo: "/logos/postgresql.png" },
        { name: "MySQL", logo: "/logos/mysql.png" },
        { name: "MongoDB", logo: "/logos/mongodb.png" },
        { name: "Redis", logo: "/logos/redis.png" },
      ],
    },
    {
      category: "Practices",
      color: "from-teal-500 to-cyan-600",
      borderColor: "border-teal-500/30",
      skills: [
        { name: "Agile", logo: "/logos/agile.png" },
        { name: "Scrum", logo: "/logos/scrum.png" },
        { name: "Stakeholder", logo: "/logos/stakeholder.png" },
        { name: "A/B Test", logo: "/logos/abtest.png" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Technical <span className="gradient-text">Skills</span>
        </h3>
        <p className="text-gray-400 text-sm md:text-base">
          Comprehensive expertise across modern tech stack
        </p>
      </div>

      {/* Skills Grid by Category */}
      <div className="space-y-8">
        {skillsData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            {/* Category Title */}
            <div className="flex items-center gap-3">
              <div
                className={`h-1 w-12 bg-gradient-to-r ${category.color} rounded-full`}
              ></div>
              <h4 className="text-xl font-bold text-white">
                {category.category}
              </h4>
              <div
                className={`h-1 flex-1 bg-gradient-to-r ${category.color} rounded-full opacity-20`}
              ></div>
            </div>

            {/* Skills Cards - Horizontal Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className={`glass-strong rounded-xl p-3 border ${category.borderColor} hover:border-orange-500/60 transition-all hover:scale-105 cursor-pointer group text-center`}
                >
                  {/* Skill Name */}
                  <p className="text-xs font-semibold text-white mb-2 truncate group-hover:text-orange-400 transition-colors">
                    {skill.name}
                  </p>

                  {/* Logo */}
                  <div className="w-12 h-12 mx-auto flex items-center justify-center">
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        // Fallback to placeholder if logo doesn't exist
                        e.currentTarget.src =
                          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><rect fill="%23ff6b35" width="50" height="50" rx="8"/><text x="25" y="32" text-anchor="middle" fill="white" font-size="20" font-weight="bold">' +
                          skill.name.charAt(0) +
                          "</text></svg>";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
