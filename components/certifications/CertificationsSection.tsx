// components/certifications/CertificationsSection.tsx - Professional certifications display (Enhanced Responsive)

"use client";

export default function CertificationsSection() {
  const certifications = [
    {
      title: "Building RAG Agents with LLMs",
      issuer: "NVIDIA",
      year: "2024",
      logo: "/logos/nvidia.svg",
      credential: "Certificate ID: NVIDIA-RAG-2024",
      skills: ["RAG", "LLMs", "AI Agents", "NVIDIA"],
    },
    // Add more certifications here
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
      {/* Section Header - Responsive */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
          <span className="gradient-text">Certifications</span>
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base px-4">
          Professional credentials and achievements
        </p>
      </div>

      {/* Certifications Grid - Enhanced Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-orange-500/30 hover:border-orange-500/60 transition-all active:scale-95 sm:hover:scale-105 glow-hover group"
          >
            {/* Logo Section - Responsive */}
            <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white/5 rounded-xl p-3 sm:p-4 flex items-center justify-center group-hover:scale-110 transition-transform border border-orange-500/20">
                <img
                  src={cert.logo}
                  alt={`${cert.issuer} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to text if logo doesn't exist
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">${cert.issuer.charAt(
                      0
                    )}</span>`;
                  }}
                />
              </div>
            </div>

            {/* Content - Responsive */}
            <div className="text-center space-y-2 sm:space-y-3">
              {/* Title */}
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-orange-400 transition-colors leading-tight px-2">
                {cert.title}
              </h4>

              {/* Issuer & Year */}
              <div className="space-y-0.5 sm:space-y-1">
                <p className="text-orange-400 font-semibold text-xs sm:text-sm">
                  {cert.issuer}
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs">
                  {cert.year}
                </p>
              </div>

              {/* Credential ID - Responsive */}
              <p className="text-gray-400 text-[10px] sm:text-xs font-mono bg-black/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-orange-500/10 break-all">
                {cert.credential}
              </p>

              {/* Skills Tags - Responsive */}
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                {cert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="glass px-2 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs text-gray-300 border border-orange-500/20 hover:border-orange-500/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Verify Button - Responsive */}
              <button className="mt-3 sm:mt-4 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm text-orange-400 hover:text-white hover:glass-strong transition-all border border-orange-500/30 hover:border-orange-500/60 w-full active:scale-95 sm:group-hover:scale-105">
                🔗 Verify Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats - Responsive */}
      <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
        <div className="glass-strong rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-orange-500/20 hover:border-orange-500/50 transition-all">
          <p className="text-center">
            <span className="text-2xl sm:text-3xl font-bold gradient-text">
              {certifications.length}
            </span>
            <span className="text-gray-400 text-xs sm:text-sm ml-2">
              Professional Certification{certifications.length > 1 ? "s" : ""}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
