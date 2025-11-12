// components/testimonials/TestimonialsSection.tsx - Professional testimonials with LinkedIn recommendations (Enhanced Responsive)

"use client";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sampson Akwafuo, PhD",
      role: "Asst. Prof. of Computer Science",
      company: "California State University, Fullerton",
      avatar: "/avatars/sampson.jpeg",
      relationship: "Managed Asad directly",
      date: "July 21, 2025",
      rating: 5,
      text: "I am writing to enthusiastically recommend Asad, who has served as a Research Assistant under my supervision at the Computational Epidemiology, Data and Disaster Intelligence (CEDDI) Lab. During this period, he demonstrated an exceptional level of professionalism, intellectual curiosity, and dedication to our research initiatives. His creative abilities, technical expertise, and persistent quest for success were outstanding. He would always find a means to tackle seemingly difficult tasks.",
      highlights: [
        "Exceptional professionalism",
        "Technical expertise",
        "Research excellence",
      ],
    },
    {
      name: "Doina Bein",
      role: "Professor & Department Chair",
      company: "California State University, Fullerton",
      avatar: "/avatars/doina.jpeg",
      relationship: "Managed Asad directly",
      date: "April 17, 2025",
      rating: 5,
      text: "It is my pleasure to recommend Asad Abdul for their exceptional work as an IT Assistant in the Computer Science Department. During their tenure, Asad Abdul consistently demonstrated impressive technical expertise, problem-solving skills, and an unwavering commitment to excellence. Their ability to balance technical tasks with research responsibilities speaks to their strong work ethic and dedication.",
      highlights: [
        "Technical expertise",
        "Problem-solving",
        "Research contributions",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
      {/* Section Header - Responsive */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          <span className="text-lg sm:text-xl md:text-2xl">⭐</span>
          <p className="text-orange-400 text-xs sm:text-sm font-semibold">
            Customer feedback highlights
          </p>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
          What People Say <span className="gradient-text">About Me?</span>
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base px-4">
          Trusted by professionals and academics alike
        </p>
      </div>

      {/* Testimonials Grid - Enhanced Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-orange-500/30 hover:border-orange-500/60 transition-all active:scale-95 sm:hover:scale-105 glow-hover group flex flex-col"
          >
            {/* Rating Stars - Responsive */}
            <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-base sm:text-lg">
                  ⭐
                </span>
              ))}
            </div>

            {/* Testimonial Text - Responsive */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-6">
              "{testimonial.text}"
            </p>

            {/* Highlights Tags - Responsive */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {testimonial.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="glass px-2 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs text-orange-400 border border-orange-500/20"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-3 sm:mb-4"></div>

            {/* Author Info - Responsive */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center border-2 border-orange-500/30 overflow-hidden flex-shrink-0">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if avatar doesn't exist
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-orange-400 font-bold text-sm sm:text-base md:text-lg">${testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}</span>`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-xs sm:text-sm truncate">
                  {testimonial.name}
                </h4>
                <p className="text-gray-400 text-[10px] sm:text-xs truncate">
                  {testimonial.role}
                </p>
                {testimonial.relationship && (
                  <p className="text-orange-400/70 text-[10px] sm:text-xs mt-0.5 sm:mt-1 truncate">
                    {testimonial.relationship}
                  </p>
                )}
              </div>
            </div>

            {/* Company Badge - Responsive */}
            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-orange-500/10">
              <p className="text-gray-500 text-[10px] sm:text-xs text-center truncate">
                {testimonial.company}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* LinkedIn Verification - Responsive */}
      <div className="mt-8 sm:mt-10 md:mt-12 text-center px-2">
        <a
          href="https://www.linkedin.com/in/asad-abdul/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 glass-strong px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-orange-500/30 hover:border-orange-500/60 transition-all active:scale-95 sm:hover:scale-105 glow-hover text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span className="text-white font-semibold">
            View All LinkedIn Recommendations
          </span>
          <span className="text-orange-400 hidden sm:inline">→</span>
        </a>
      </div>

      {/* Summary Stats - Responsive */}
      <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { value: "2", label: "Recommendations" },
          { value: "2", label: "PhD Professors" },
          { value: "5⭐", label: "Average Rating" },
          { value: "100%", label: "Satisfaction" },
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
