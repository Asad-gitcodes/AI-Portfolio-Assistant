// components/achievements/AchievementsSection.tsx - Professional achievements display (Enhanced Responsive)

"use client";

export default function AchievementsSection() {
  const achievements = [
    {
      title: "NSF-Funded Research: Machine Learning for Emergency Response",
      organization: "Cal State Fullerton & National Science Foundation",
      year: "2025",
      amount: "$172,000 Grant",
      logo: "/logos/nsf.jpg", // You can add NSF or CSUF logo
      description:
        "Developing advanced ML algorithms for disaster management and public health emergencies",
      impact:
        "Real-time emergency response optimization for wildfires, pandemics, and disasters",
      tags: [
        "Machine Learning",
        "Emergency Response",
        "Public Health",
        "Optimization",
        "NSF Grant",
      ],
      link: "https://news.fullerton.edu/...", // Add actual link if available
    },
    // Add more achievements here
  ];

  return (
    <div className="h-full">
      {/* Section Header */}
      <div className="mb-8">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
          <span className="gradient-text">Achievements</span>
        </h3>
        <p className="text-gray-400 text-sm md:text-base">
          Research contributions and recognitions
        </p>
      </div>

      {/* Achievements Grid */}
      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="glass-strong rounded-2xl p-6 border-2 border-orange-500/30 hover:border-orange-500/60 transition-all hover:scale-[1.02] glow-hover group"
          >
            <div className="flex items-start gap-4">
              {/* Logo/Icon Section */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl p-3 flex items-center justify-center group-hover:scale-110 transition-transform border border-orange-500/20">
                  <img
                    src={achievement.logo}
                    alt={`${achievement.organization} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to trophy icon if logo doesn't exist
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML = `<span class="text-3xl md:text-4xl">🏆</span>`;
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h4 className="text-base md:text-lg font-bold text-white group-hover:text-orange-400 transition-colors mb-2 leading-tight">
                  {achievement.title}
                </h4>

                {/* Organization, Year & Amount */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <p className="text-orange-400 font-semibold text-sm leading-snug">
                    {achievement.organization}
                  </p>
                  <span className="text-gray-600">•</span>
                  <p className="text-gray-500 text-xs">{achievement.year}</p>
                  <span className="text-gray-600">•</span>
                  <p className="text-green-400 font-bold text-sm">
                    {achievement.amount}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {achievement.description}
                </p>

                {/* Impact Badge */}
                <div className="glass px-3 py-2 rounded-lg border border-green-500/30 bg-green-500/5 mb-3 inline-block">
                  <p className="text-green-400 text-xs font-medium leading-snug">
                    💡 {achievement.impact}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {achievement.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="glass px-3 py-1 rounded-md text-xs text-gray-300 border border-orange-500/20 hover:border-orange-500/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Learn More Button */}
                {achievement.link && (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-4 py-2 rounded-lg text-xs sm:text-sm text-orange-400 hover:text-white hover:glass-strong transition-all border border-orange-500/30 hover:border-orange-500/60 inline-flex items-center gap-2"
                  >
                    <span>📰</span>
                    <span>Read More</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
