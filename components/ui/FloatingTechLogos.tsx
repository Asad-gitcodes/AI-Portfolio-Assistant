// components/ui/FloatingTechLogos.tsx - 3D floating technology logos

"use client";

export default function FloatingTechLogos() {
  const logos = [
    {
      emoji: "⚛️",
      name: "React",
      position: "top-20 right-[15%]",
      delay: "0s",
      size: "text-5xl md:text-6xl",
    },
    {
      emoji: "🟢",
      name: "Node.js",
      position: "top-40 left-[10%]",
      delay: "0.5s",
      size: "text-4xl md:text-5xl",
    },
    {
      emoji: "🐍",
      name: "Python",
      position: "top-[35%] right-[8%]",
      delay: "1s",
      size: "text-5xl md:text-6xl",
    },
    {
      emoji: "🍃",
      name: "MongoDB",
      position: "top-[55%] left-[12%]",
      delay: "1.5s",
      size: "text-4xl md:text-5xl",
    },
    {
      emoji: "☁️",
      name: "AWS",
      position: "bottom-[30%] right-[15%]",
      delay: "2s",
      size: "text-5xl md:text-6xl",
    },
    {
      emoji: "🤖",
      name: "AI/ML",
      position: "bottom-[45%] left-[8%]",
      delay: "2.5s",
      size: "text-5xl md:text-6xl",
    },
    {
      emoji: "📱",
      name: "JavaScript",
      position: "top-[25%] left-[20%]",
      delay: "3s",
      size: "text-4xl md:text-5xl",
    },
    {
      emoji: "🎨",
      name: "HTML/CSS",
      position: "bottom-[35%] right-[10%]",
      delay: "3.5s",
      size: "text-4xl md:text-5xl",
    },
    {
      emoji: "🔷",
      name: "TypeScript",
      position: "top-[45%] right-[20%]",
      delay: "4s",
      size: "text-4xl md:text-5xl",
    },
    {
      emoji: "🐳",
      name: "Docker",
      position: "bottom-[20%] left-[18%]",
      delay: "4.5s",
      size: "text-4xl md:text-5xl",
    },
  ];

  return (
    <>
      {logos.map((logo, index) => (
        <div
          key={index}
          className={`absolute ${logo.position} animate-float opacity-20 hover:opacity-60 transition-opacity duration-300 hidden lg:block`}
          style={{ animationDelay: logo.delay }}
        >
          <div className="glass-strong p-3 md:p-4 rounded-2xl border border-orange-500/30 hover:border-orange-500/60 hover:scale-110 transition-all duration-300 glow-hover cursor-pointer group">
            <div
              className={`${logo.size} group-hover:scale-110 transition-transform`}
            >
              {logo.emoji}
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-semibold text-orange-400 whitespace-nowrap bg-black/80 px-2 py-1 rounded">
                {logo.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
