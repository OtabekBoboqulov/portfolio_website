import React, { useEffect, useRef } from "react";
import skillsData from "../data/skills.json";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaFigma,
  FaCode,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiAdobexd } from "react-icons/si";
import "../styles/Skills.css";

const iconMap = {
  html5: FaHtml5,
  css3: FaCss3Alt,
  js: FaJs,
  react: FaReact,
  node: FaNodeJs,
  tailwind: SiTailwindcss,
  mongodb: SiMongodb,
  github: FaGithub,
  vscode: FaCode,
  figma: FaFigma,
  adobexd: SiAdobexd,
};

const Skills = ({ techSkills }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mainSkillsRef = useRef(null);
  const techGridRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === headerRef.current) {
            entry.target.classList.add("animate-in");
          } else if (entry.target === mainSkillsRef.current) {
            entry.target.classList.add("animate-in");
            const cards = entry.target.querySelectorAll(".skill-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-in");
              }, index * 200);
            });
          } else if (entry.target === techGridRef.current) {
            const cards = entry.target.querySelectorAll(".skill-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-in");
              }, index * 100);
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
      rootMargin: "0px",
    });

    if (headerRef.current) observer.observe(headerRef.current);
    if (mainSkillsRef.current) observer.observe(mainSkillsRef.current);
    if (techGridRef.current) observer.observe(techGridRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-header" ref={headerRef}>
        <span className="tag">&lt;Skills&gt;</span>
        <h2>Skills and Proficiencies</h2>
        <p>Commanding Expertise in Digital Technologies and Tools</p>
      </div>

      <div className="main-skills" ref={mainSkillsRef}>
        {skillsData.mainSkills.map((skill, index) => {
          const Icon = iconMap[skill.icon];
          return (
            <div className="skill-card main" key={index}>
              <Icon style={{ color: skill.color }} />
              <span className="skill-name">{skill.name}</span>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${skill.progress}%`,
                    backgroundColor: skill.color,
                  }}
                >
                  <span className="progress-text">{skill.progress}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="tech-grid" ref={techGridRef}>
        {techSkills &&
          techSkills.length > 0 &&
          techSkills.map((tech, index) => (
            <div className="skill-card" key={tech.id || index}>
              <div className="skill-icon">
                {tech.icon && tech.icon.includes("<svg") ? (
                  <span
                    className="svg-wrapper"
                    dangerouslySetInnerHTML={{
                      __html: tech.icon.replace(
                        "<svg",
                        '<svg class="api-svg-icon"'
                      ),
                    }}
                  />
                ) : (
                  <span>{tech.name[0]}</span>
                )}
              </div>
              <h3>{tech.name}</h3>
              {tech.description && <p>{tech.description}</p>}
            </div>
          ))}
      </div>
    </section>
  );
};

export default Skills;
