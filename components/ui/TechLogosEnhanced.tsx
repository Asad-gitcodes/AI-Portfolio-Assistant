// components/ui/TechLogosEnhanced.tsx - Complete tech stack with all logos

"use client";

export default function TechLogosEnhanced() {
  const logos = [
    // Frontend Technologies
    {
      emoji: "⚛️",
      name: "React.js",
      color: "text-cyan-400",
      position: "top-[8%] right-[18%]",
      delay: "0s",
      category: "Frontend",
    },
    {
      emoji: "▲",
      name: "Next.js",
      color: "text-white",
      position: "top-[12%] left-[15%]",
      delay: "0.2s",
      category: "Frontend",
    },
    {
      emoji: "🔷",
      name: "TypeScript",
      color: "text-blue-500",
      position: "top-[20%] right-[10%]",
      delay: "0.4s",
      category: "Frontend",
    },
    {
      emoji: "📜",
      name: "JavaScript",
      color: "text-yellow-400",
      position: "top-[28%] left-[8%]",
      delay: "0.6s",
      category: "Frontend",
    },
    {
      emoji: "🌐",
      name: "HTML5",
      color: "text-orange-500",
      position: "top-[18%] left-[22%]",
      delay: "0.8s",
      category: "Frontend",
    },
    {
      emoji: "🎨",
      name: "CSS3",
      color: "text-blue-400",
      position: "top-[25%] right-[25%]",
      delay: "1s",
      category: "Frontend",
    },
    {
      emoji: "💨",
      name: "Tailwind CSS",
      color: "text-cyan-500",
      position: "top-[15%] right-[5%]",
      delay: "1.2s",
      category: "Frontend",
    },

    // AI/ML Technologies
    {
      emoji: "🤖",
      name: "AI/ML",
      color: "text-purple-500",
      position: "top-[38%] left-[12%]",
      delay: "1.4s",
      category: "AI/ML",
    },
    {
      emoji: "🧠",
      name: "LLMs",
      color: "text-indigo-400",
      position: "top-[35%] right-[15%]",
      delay: "1.6s",
      category: "AI/ML",
    },
    {
      emoji: "🔗",
      name: "LangChain",
      color: "text-green-400",
      position: "top-[42%] right-[8%]",
      delay: "1.8s",
      category: "AI/ML",
    },
    {
      emoji: "✨",
      name: "GPT-4",
      color: "text-emerald-400",
      position: "top-[45%] left-[5%]",
      delay: "2s",
      category: "AI/ML",
    },
    {
      emoji: "🎯",
      name: "RAG",
      color: "text-teal-400",
      position: "top-[50%] right-[22%]",
      delay: "2.2s",
      category: "AI/ML",
    },

    // Backend Technologies
    {
      emoji: "🟢",
      name: "Node.js",
      color: "text-green-500",
      position: "top-[55%] left-[10%]",
      delay: "2.4s",
      category: "Backend",
    },
    {
      emoji: "🚂",
      name: "Express.js",
      color: "text-gray-400",
      position: "top-[58%] right-[12%]",
      delay: "2.6s",
      category: "Backend",
    },
    {
      emoji: "🔌",
      name: "REST APIs",
      color: "text-blue-400",
      position: "top-[62%] left-[18%]",
      delay: "2.8s",
      category: "Backend",
    },

    // Cloud & Tools
    {
      emoji: "☁️",
      name: "AWS",
      color: "text-orange-400",
      position: "bottom-[32%] right-[10%]",
      delay: "3s",
      category: "Cloud",
    },
    {
      emoji: "🐳",
      name: "Docker",
      color: "text-blue-500",
      position: "bottom-[28%] left-[8%]",
      delay: "3.2s",
      category: "Tools",
    },
    {
      emoji: "🔧",
      name: "CI/CD",
      color: "text-purple-400",
      position: "bottom-[35%] left-[20%]",
      delay: "3.4s",
      category: "Tools",
    },
    {
      emoji: "🌿",
      name: "Git",
      color: "text-red-500",
      position: "bottom-[25%] right-[18%]",
      delay: "3.6s",
      category: "Tools",
    },

    // Databases
    {
      emoji: "🐘",
      name: "PostgreSQL",
      color: "text-blue-600",
      position: "bottom-[20%] left-[12%]",
      delay: "3.8s",
      category: "Database",
    },
    {
      emoji: "🍃",
      name: "MongoDB",
      color: "text-green-600",
      position: "bottom-[18%] right-[8%]",
      delay: "4s",
      category: "Database",
    },
    {
      emoji: "🔴",
      name: "Redis",
      color: "text-red-600",
      position: "bottom-[15%] left-[25%]",
      delay: "4.2s",
      category: "Database",
    },
    {
      emoji: "🐬",
      name: "MySQL",
      color: "text-blue-500",
      position: "bottom-[22%] right-[25%]",
      delay: "4.4s",
      category: "Database",
    },

    // Practices
    {
      emoji: "🔄",
      name: "Agile/Scrum",
      color: "text-purple-500",
      position: "bottom-[12%] left-[15%]",
      delay: "4.6s",
      category: "Practice",
    },
    {
      emoji: "📊",
      name: "A/B Testing",
      color: "text-pink-400",
      position: "bottom-[10%] right-[15%]",
      delay: "4.8s",
      category: "Practice",
    },
  ];

  return (
    <>
      {logos.map((logo, index) => (
        <div
          key={index}
          className={`absolute ${logo.position} animate-float opacity-25 hover:opacity-90 transition-all duration-500 hidden xl:block z-10`}
          style={{ animationDelay: logo.delay }}
        >
          <div className="glass-strong p-3 rounded-xl border-2 border-orange-500/20 hover:border-orange-500/70 hover:scale-125 transition-all duration-300 glow-hover cursor-pointer group backdrop-blur-xl shadow-xl">
            <div
              className={`text-4xl ${logo.color} group-hover:scale-110 transition-transform drop-shadow-lg`}
            >
              {logo.emoji}
            </div>

            {/* Tooltip with name and category */}
            <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-50">
              <div className="bg-black/95 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-orange-500/60 shadow-2xl">
                <p className="text-sm font-bold text-orange-400">{logo.name}</p>
                <p className="text-xs text-gray-400">{logo.category}</p>
              </div>
              {/* Arrow pointing up */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-orange-500/60"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
