// components/certifications/CertificationsSection.tsx - Professional certifications display (Enhanced Responsive)

"use client";

export default function CertificationsSection() {
  const certifications = [
    {
      title: "Building RAG Agents with LLMs",
      issuer: "NVIDIA",
      year: "2024",
      logo: "/logos/nvidia.png",
      credential: "Certificate ID: NVIDIA-RAG-2024",
      skills: ["RAG", "LLMs", "AI Agents", "NVIDIA"],
    },
    // Add more certifications here
  ];

  return (
    <div className="h-full">
      {/* Section Header */}
      <div className="mb-8">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
          <span className="gradient-text">Certifications</span>
        </h3>
        <p className="text-gray-400 text-sm md:text-base">
          Professional credentials and achievements
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="glass-strong rounded-2xl p-6 border-2 border-orange-500/30 hover:border-orange-500/60 transition-all hover:scale-[1.02] glow-hover group"
          >
            <div className="flex items-start gap-4">
              {/* Logo Section */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-xl p-3 flex items-center justify-center group-hover:scale-110 transition-transform border border-orange-500/20">
                  <img
                    src={cert.logo}
                    alt={`${cert.issuer} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to text if logo doesn't exist
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML = `<span class="text-2xl md:text-3xl font-bold gradient-text">${cert.issuer.charAt(
                        0
                      )}</span>`;
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h4 className="text-base md:text-lg font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                  {cert.title}
                </h4>

                {/* Issuer & Year */}
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-orange-400 font-semibold text-sm">
                    {cert.issuer}
                  </p>
                  <span className="text-gray-600">•</span>
                  <p className="text-gray-500 text-xs">{cert.year}</p>
                </div>

                {/* Credential ID */}
                <p className="text-gray-400 text-xs font-mono bg-black/30 px-3 py-1.5 rounded-lg border border-orange-500/10 mb-3 inline-block">
                  {cert.credential}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="glass px-3 py-1 rounded-md text-xs text-gray-300 border border-orange-500/20 hover:border-orange-500/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Verify Button */}
                <button className="glass px-4 py-2 rounded-lg text-xs sm:text-sm text-orange-400 hover:text-white hover:glass-strong transition-all border border-orange-500/30 hover:border-orange-500/60 inline-flex items-center gap-2">
                  <span>🔗</span>
                  <span>Verify Certificate</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
