// components/summary/SimpleSummary.tsx - Professional summary section

"use client";

export default function SimpleSummary() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center lg:text-left space-y-6">
        {/* Section Header */}
        <div>
          <p className="text-orange-400 text-sm md:text-base font-medium mb-2">
            Here’s a quick
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="gradient-text">overview</span>{" "}
            <span className="text-white">of my</span>{" "}
            <span className="text-orange-400">expertise</span>
          </h2>
        </div>

        {/* Professional Summary Card */}
        <div className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-orange-500/30 glow">
          <div className="space-y-4">
            {/* Summary Text */}
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              <span className="text-white font-semibold">
                Full Stack Software Engineer
              </span>{" "}
              <span className="text-orange-400 font-medium">
                (M.S. Computer Science)
              </span>{" "}
              with <span className="text-white font-semibold">3+ years</span>{" "}
              building{" "}
              <span className="text-orange-400 font-medium">
                scalable distributed systems
              </span>{" "}
              across{" "}
              <span className="text-orange-400 font-medium">
                React, Next.js, TypeScript
              </span>{" "}
              and{" "}
              <span className="text-orange-400 font-medium">
                Node.js, Python, RESTful APIs, microservices
              </span>
              . Delivered{" "}
              <span className="text-orange-400 font-semibold">
                5+ production applications
              </span>{" "}
              serving{" "}
              <span className="text-orange-400 font-semibold">
                15,000+ users
              </span>{" "}
              with{" "}
              <span className="text-orange-400 font-semibold">
                99.94% uptime
              </span>
              .
            </p>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              <span className="text-white font-medium">
                Published researcher
              </span>{" "}
              in machine learning for emergency response systems, featured in{" "}
              <span className="text-white font-medium">university news</span>{" "}
              for contributions to{" "}
              <span className="text-white font-medium">
                NSF-funded disaster preparedness platform
              </span>
              .{" "}
              <span className="text-orange-400 font-medium">
                NVIDIA-certified
              </span>{" "}
              in{" "}
              <span className="text-orange-400 font-medium">
                RAG/LLM integration
              </span>{" "}
              with expertise in large-scale system architecture.
            </p>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Expert in{" "}
              <span className="text-orange-400 font-medium">
                cross-functional collaboration
              </span>{" "}
              with{" "}
              <span className="text-white font-medium">
                globally distributed teams
              </span>{" "}
              and{" "}
              <span className="text-orange-400 font-medium">
                rapidly prototyping solutions in ambiguous environments
              </span>
              . Seeking to apply technical expertise to advance innovative
              solutions.
            </p>

            {/* Call to Action */}
            <div className="pt-4 border-t border-orange-500/20">
              <p className="text-sm md:text-base text-gray-400 text-center lg:text-left">
                💬 Want to know more?{" "}
                <button
                  onClick={() => {
                    document
                      .querySelector<HTMLButtonElement>(
                        '[class*="fixed"][class*="bottom"]'
                      )
                      ?.click();
                  }}
                  className="text-orange-400 font-semibold hover:text-orange-300 transition-colors underline decoration-orange-400/50 hover:decoration-orange-300"
                >
                  Ask the AI assistant anything!
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats - Optional highlight */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4">
          {[
            { value: "3+", label: "Years Experience" },
            { value: "5+", label: "Prod Apps" },
            { value: "NSF", label: "Funded Research" },
            { value: "NVIDIA", label: "Certified" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass rounded-xl p-3 md:p-4 text-center border border-orange-500/20 hover:border-orange-500/40 transition-all hover:scale-105"
            >
              <p className="text-xl md:text-2xl font-bold gradient-text mb-1">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
