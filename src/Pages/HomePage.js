import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa6";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { DiJavascript, DiPython } from "react-icons/di";
import "../styles/HomePage.css";
import profileImg from "../assets/profile.JPG";

const tokenize = (line, language) => {
  const tokens = [];

  const addToken = (text, type) => {
    if (text) tokens.push({ text, type });
  };

  if (language === "js") {
    const keywords = ["const", "let", "var", "function", "return", "console"];
    const functions = ["log"];

    let remaining = line;
    let match;

    // Match comments first
    if (remaining.includes("//")) {
      const [code, comment] = remaining.split("//");
      remaining = code;
      if (comment) addToken("// " + comment, "comment");
    }

    // Match strings
    const stringRegex = /(['"`])(.*?)\1/g;
    while ((match = stringRegex.exec(remaining)) !== null) {
      const before = remaining.slice(0, match.index);
      if (before) {
        tokenizePart(before);
      }
      addToken(match[0], "string");
      remaining = remaining.slice(match.index + match[0].length);
    }
    if (remaining) {
      tokenizePart(remaining);
    }

    function tokenizePart(text) {
      const parts = text.split(/([{}[\],.:()=+\s])/);
      parts.forEach((part) => {
        if (!part.trim()) {
          addToken(part, "text");
        } else if (keywords.includes(part)) {
          addToken(part, "keyword");
        } else if (functions.includes(part)) {
          addToken(part, "function");
        } else if (part.match(/^[0-9]+$/)) {
          addToken(part, "number");
        } else if (part.match(/^[a-zA-Z]\w*(?=:)/)) {
          addToken(part, "property");
        } else if (part.match(/[{}[\],.:()=+]/)) {
          addToken(part, "punctuation");
        } else if (part.match(/^[a-zA-Z_]\w*$/)) {
          addToken(part, "variable");
        } else {
          addToken(part, "text");
        }
      });
    }
  } else {
    // Python tokenization
    const keywords = ["def", "class", "return", "print"];
    const remaining = line;

    // Match comments first
    if (remaining.includes("#")) {
      const [code, comment] = remaining.split("#");
      tokenizePart(code);
      if (comment) addToken("# " + comment, "comment");
    } else {
      tokenizePart(remaining);
    }

    function tokenizePart(text) {
      const parts = text.split(/([{}[\],.:()=+\s])/);
      parts.forEach((part) => {
        if (!part.trim()) {
          addToken(part, "text");
        } else if (keywords.includes(part)) {
          addToken(part, "keyword");
        } else if (part.match(/^[0-9]+$/)) {
          addToken(part, "number");
        } else if (part.match(/^'[^']*'$/)) {
          addToken(part, "string");
        } else if (part.match(/^[a-zA-Z]\w*(?=:)/)) {
          addToken(part, "property");
        } else if (part.match(/[{}[\],.:()=+]/)) {
          addToken(part, "punctuation");
        } else if (part.match(/^[a-zA-Z_]\w*$/)) {
          addToken(part, "variable");
        } else {
          addToken(part, "text");
        }
      });
    }
  }

  return tokens
    .map(({ text, type }) =>
      type === "text" ? text : `<span class="${type}">${text}</span>`
    )
    .join("");
};

const jsCode = `// Code Editor Preview
const learningPath = {
    frontEnd: [
        'HTML',       'CSS',        'Tailwind',
        'JavaScript', 'React'
    ],
    backEnd: [
        'Node.js',    'Express.js',
        'MongoDB',    'Firebase'
    ],
    languages: ['Python', 'C++'],
    securityTool: 'Python'  // Recommended for security tasks
};

console.log("Learning Path:", learningPath);`;

const pyCode = `# Code Editor Preview
learning_path = {
    front_end: [
        'HTML',       'CSS',        'Tailwind',
        'JavaScript', 'React'
    ],
    back_end: [
        'Node.js',    'Express.js',
        'MongoDB',    'Firebase'
    ],
    languages: ['Python', 'C++'],
    security_tool: 'Python'  # Recommended for security tasks
}

print("Learning Path:", learning_path)`;

const HomePage = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState("js");
  const [isVisible, setIsVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  useEffect(() => {
    setIsVisible(true);

    // Create intersection observer for About section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    // Start observing the About section
    const aboutSection = document.querySelector(".about-section");
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  const renderCodeContent = (code) => {
    const lines = code.split("\n");
    return (
      <>
        <div className="line-numbers">
          {lines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <div className="code-lines">
          {lines.map((line, i) => (
            <div
              key={i}
              className="code-line"
              dangerouslySetInnerHTML={{
                __html: line ? tokenize(line, activeTab) : "&nbsp;",
              }}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={`HomePage ${isVisible ? "visible" : ""}`}>
      <div className="content-wrapper">
        <nav>
          <div className="logo">
            <span>Shokhrukh</span> Sharipov
          </div>
          <div className="nav-right">
            <div className="nav-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#roadmap">Roadmap</a>
              <a href="#contact">Contact</a>
            </div>
            <button
              className="theme-toggle"
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <SunIcon className="theme-icon" />
              ) : (
                <MoonIcon className="theme-icon" />
              )}
            </button>
          </div>
        </nav>

        <div className="main-content">
          <div className="hero-content">
            <div className="hello">&lt;Hello&gt;</div>
            <h1 className="name">
              I'm <span className="accent">Shokhrukh</span>
            </h1>
            <div className="role">
              I'm a <span className="accent">{"{Code Newbie}"}</span>
            </div>
            <p className="description">
              Enthusiastic learner diving into{" "}
              <span className="accent">web</span> and{" "}
              <span className="accent">software</span> development, aiming for a
              career in technology
            </p>

            <div className="social-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://t.me/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram />
              </a>
            </div>

            <div className="buttons">
              <a href="#contact" className="btn btn-primary">
                Contact
              </a>
              <a href="#cv" className="btn btn-secondary">
                Download CV
              </a>
            </div>
          </div>

          <div className="code-section">
            <div className="code-preview">
              <div className="code-header">
                <div
                  className={`code-tab ${activeTab === "js" ? "active" : ""}`}
                  onClick={() => setActiveTab("js")}
                >
                  <DiJavascript className="language-icon js-icon" />
                  start.js
                </div>
                <div
                  className={`code-tab ${activeTab === "py" ? "active" : ""}`}
                  onClick={() => setActiveTab("py")}
                >
                  <DiPython className="language-icon py-icon" />
                  master.py
                </div>
              </div>
              <div className="code-content">
                {renderCodeContent(activeTab === "js" ? jsCode : pyCode)}
              </div>
            </div>
          </div>
        </div>

        <div className="about-section" id="about" data-visible={isAboutVisible}>
          <h2 className="section-title">
            <span className="angle-bracket">&lt;</span>
            About
            <span className="angle-bracket">&gt;</span>
          </h2>
          <div className="about-container">
            <div className="about-content">
              <p className="about-text">
                I am a highly motivated and versatile individual, always ready
                to embrace new challenges. Driven by a passion for learning, I
                am committed to delivering exceptional results. With a positive
                attitude and a growth mindset, I am eager to make meaningful
                contributions and achieve remarkable success.
              </p>
              <div className="skills-categories">
                <span className="skill-item">Front End Development</span>
                <span className="separator">|</span>
                <span className="skill-item">Back End Development</span>
                <span className="separator">|</span>
                <span className="skill-item">Security Tool</span>
                <span className="separator">|</span>
                <span className="skill-item">Problem Solving</span>
              </div>
            </div>
            <div className="about-image-card">
              <div className="image-container">
                <img src={profileImg} alt="Profile" className="profile-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
