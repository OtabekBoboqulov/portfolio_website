import React, { useEffect, useRef } from "react";
import "../styles/Roadmap.css";

const stats = [
  {
    value: "23+",
    label: "Projects Development",
    sublabel: "from scratch",
  },
  {
    value: "4+",
    label: "Years of",
    sublabel: "Experience",
  },
  {
    value: "95%",
    label: "Positive Feedback",
    sublabel: "from work",
  },
  {
    value: "8",
    label: "People Team",
    sublabel: "Lead",
  },
];

const Roadmap = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            const stats = entry.target.querySelectorAll(".stat-item");
            stats.forEach((stat, index) => {
              setTimeout(() => {
                stat.classList.add("animate-in");
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="roadmap-section" id="roadmap" ref={sectionRef}>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <span className="stat-value">{stat.value}</span>
            <div className="stat-label">
              {stat.label}
              <span className="stat-sublabel">{stat.sublabel}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;
