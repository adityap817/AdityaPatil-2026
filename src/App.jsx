import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, GraduationCap, Briefcase, Map as MapIcon, Server, Code2, Database, Network, Cpu, Code, Globe, Box, Target, Activity, Moon, Sun, Bot, Terminal, Lock, Unlock, X, LineChart, Users, Edit3, Save, Plane } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import CategoryView from './components/CategoryView';
import TechnicalArsenal from './components/TechnicalArsenal';
import ProfessionalJourney from './components/ProfessionalJourney';
import AddCategoryModal from './components/AddCategoryModal';
import adiicodesLogo from './assets/adiicodes.png';
import resumePdf from './assets/Resume-AdityaPatil.pdf';

const DEFAULT_TABS = ["Product Management", "AI", "Software Engineering", "Data Engineering", "adiicodes"];

const LeetCodeLogo = (props) => (
  <Code {...props} />
);

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="fixed top-6 right-6 z-[60] p-3 rounded-full theme-nav text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer"
  >
    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);

const BrandLogo = ({ activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab("About")}
    className={`fixed top-6 left-4 md:left-8 z-[60] theme-nav px-4 md:px-5 py-2.5 flex items-center space-x-3 cursor-pointer transition-all hover:scale-105 ${activeTab === 'About' ? 'ring-2 ring-black/10 dark:ring-white/20' : ''}`}
  >
    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 shadow-md"></div>
    <span className="font-bold text-gray-900 dark:text-white text-xs md:text-sm tracking-wide">About - Aditya Patil</span>
  </button>
);

const Navigation = ({ activeTab, setActiveTab, tabs, isAdmin, onAddClick }) => (
  <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-full px-4 flex justify-center pointer-events-none">
    <nav className="theme-nav px-2 py-2 flex flex-row items-center justify-center space-x-1 w-max max-w-full overflow-x-auto no-scrollbar pointer-events-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`theme-button ${activeTab === tab ? "active" : ""}`}
        >
          {tab}
        </button>
      ))}
      {isAdmin && (
        <button
          onClick={onAddClick}
          className="theme-button flex items-center justify-center text-cyan-500 hover:text-purple-500 font-black px-3"
          title="Add Domain Tab"
        >
          +
        </button>
      )}
    </nav>
  </header>
);

const ContactDock = () => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
    <div className="theme-nav px-8 py-3 flex space-x-8 items-center">
      <a href="https://www.linkedin.com/in/adityap817/" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-110 transition-all">
        <Linkedin size={22} />
      </a>
      <a href="https://github.com/adityap817" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:scale-110 transition-all">
        <Github size={22} />
      </a>
      <a href="https://www.instagram.com/adityapaatil_" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 hover:scale-110 transition-all">
        <Instagram size={22} />
      </a>
      <a href="https://leetcode.com/u/adityaa_24/" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:scale-110 transition-all">
        <LeetCodeLogo size={22} />
      </a>
    </div>
  </div>
);

const bannerTitles = ["SDE", "AI Engineer", "Product Manager", "Software Engineer"];

const FlyingBanner = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % bannerTitles.length);
    }, 4500); // 4.5 seconds per title, cycles exactly 4 times in 18s flight duration
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-20 md:top-24 left-0 w-full overflow-hidden pointer-events-none z-[45] h-20">
      <motion.div
        initial={{ x: "-20vw" }}
        animate={{ x: "120vw" }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex items-center absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-90 drop-shadow-xl"
      >
        <div className="bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 shadow-lg px-4 py-1.5 md:px-5 md:py-2 rounded-sm rotate-2 flex items-center relative">
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white dark:bg-gray-800 border-r border-black/10 dark:border-white/10 z-10"></div>
          <div className="flex items-center justify-center min-w-[100px] md:min-w-[150px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] md:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400 tracking-[0.2em] uppercase"
              >
                {bannerTitles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Connection rope */}
        <div className="w-8 md:w-12 h-[1.5px] bg-gray-400/80 dark:bg-gray-500/80 -rotate-3 transform origin-left"></div>

        {/* Airbus Plane */}
        <Plane className="text-gray-600 dark:text-gray-300 w-8 h-8 md:w-10 md:h-10 z-10 -ml-1" style={{ transform: 'rotate(45deg)' }} strokeWidth={1.5} fill="currentColor" />
      </motion.div>
    </div>
  );
};

const locations = ["Chandler, AZ", "Phoenix, AZ", "San Francisco Bay Area, CA", "Santa Clara, CA"];

const ModernAbout = ({ isAdmin }) => {
  const [locIndex, setLocIndex] = useState(0);
  const [customResume, setCustomResume] = useState('');
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [tempResumeContent, setTempResumeContent] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, 'portfolio', 'resume_link');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().link) {
          setCustomResume(docSnap.data().link);
        }
      } catch (e) { console.error("Error fetching resume:", e); }
    };
    fetchResume();
  }, []);

  const handleSaveResume = async () => {
    setCustomResume(tempResumeContent);
    try {
      await setDoc(doc(db, 'portfolio', 'resume_link'), { link: tempResumeContent });
    } catch (e) {
      console.error("Error saving resume link", e);
    }
    setIsEditingResume(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLocIndex((prev) => (prev + 1) % locations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40, position: "absolute", width: "100%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 w-full max-w-7xl mx-auto mt-8 lg:mt-12 pt-8 lg:pt-12"
    >
      {/* LEFT COLUMN: Technical Arsenal */}
      <TechnicalArsenal isAdmin={isAdmin} />

      {/* MIDDLE COLUMN: Hero & Bio */}
      <div className="lg:col-span-5 flex flex-col space-y-6 md:space-y-8 order-1 lg:order-2">
        <div className="flex flex-col space-y-3 md:space-y-4">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest font-semibold flex items-center relative pl-4 md:pl-5 h-6">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-500 animate-pulse absolute left-0"></span>
            SDE based in United States
            <span className="mx-2 opacity-50">|</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={locIndex}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-cyan-600 dark:text-cyan-400 font-bold"
              >
                {locations[locIndex]}
              </motion.span>
            </AnimatePresence>
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.1] mb-2 md:mb-4">
            Hello.<br />I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">Aditya Patil.</span>
          </h1>
          <h2 className="text-lg md:text-xl lg:text-xl xl:text-2xl font-light text-gray-700 dark:text-gray-300 tracking-tight leading-relaxed">
            I am a <strong className="font-semibold text-gray-900 dark:text-white">Software Engineer</strong> focused on building robust full-stack solutions and elegant architectures. I blend creativity with deep technical precision.
          </h2>
        </div>
      </div>

      {/* RIGHT COLUMN: Reach Out & Resume */}
      <div className="lg:col-span-4 flex flex-col space-y-6 order-3 lg:order-3 mt-8 lg:mt-0 px-4 md:px-0 w-full pt-4 lg:pt-0">

        <div className="theme-panel p-8 rounded-[2rem] shadow-xl backdrop-blur-2xl border-white/20 w-full group transition-all duration-500">
          <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">How to reach</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-light mb-6">Let's connect, collaborate, or simply say hello!</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a href="https://www.linkedin.com/in/adityap817/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full theme-panel flex flex-col items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all hover:bg-white dark:hover:bg-black group-hover:shadow-lg">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/adityap817" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full theme-panel flex flex-col items-center justify-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:scale-110 transition-all hover:bg-white dark:hover:bg-black group-hover:shadow-lg">
              <Github size={20} />
            </a>
            <a href="https://www.instagram.com/adityapaatil_" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full theme-panel flex flex-col items-center justify-center text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:scale-110 transition-all hover:bg-white dark:hover:bg-black group-hover:shadow-lg">
              <Instagram size={20} />
            </a>
            <a href="https://leetcode.com/u/adityaa_24/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full theme-panel flex flex-col items-center justify-center text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:scale-110 transition-all hover:bg-white dark:hover:bg-black group-hover:shadow-lg">
              <LeetCodeLogo size={20} />
            </a>
          </div>

          <div className="border-t border-black/5 dark:border-white/10 pt-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Curriculum Vitae</h4>
              {isAdmin && !isEditingResume && (
                <button onClick={() => { setTempResumeContent(customResume); setIsEditingResume(true); }} className="text-blue-500 hover:scale-110 transition bg-black/5 dark:bg-white/10 p-1.5 rounded-lg">
                  <Edit3 size={14} />
                </button>
              )}
            </div>

            {isEditingResume ? (
              <div className="flex flex-col space-y-2 mb-4">
                <input
                  type="text"
                  placeholder="Paste Google Drive / Dropbox link here"
                  className="w-full p-2 text-xs rounded bg-black/5 dark:bg-white/10 dark:text-white border border-black/10 dark:border-white/10"
                  value={tempResumeContent}
                  onChange={(e) => setTempResumeContent(e.target.value)}
                />
                <div className="flex gap-2">
                  <button onClick={handleSaveResume} className="flex-1 py-1.5 bg-blue-500 text-white rounded text-xs font-bold flex items-center justify-center"><Save size={12} className="mr-1" />Save</button>
                  <button onClick={() => setIsEditingResume(false)} className="flex-1 py-1.5 bg-gray-300 dark:bg-white/10 text-black dark:text-white rounded text-xs">Cancel</button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300 font-light mb-4">My complete professional timeline and detailed resume can be found here.</p>
            )}

            <a
              href={customResume || resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold tracking-wide hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <Target size={18} />
              <span>View Resume</span>
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM SPAN ROW: Journey Timeline */}
      <ProfessionalJourney isAdmin={isAdmin} />
    </motion.div>
  );
};

const CATEGORY_CONFIGS = {
  SoftwareEngineering: {
    title: "Software Engineering",
    description: "Architecting highly dynamic user interfaces and scalable background services.",
    icon: Code2,
    colorTheme: "cyan",
    storageKey: "se_projects",
    concepts: [
      { title: "React", desc: "Dynamic UIs, Framer Motion, and Complex State Management.", icon: <Box size={40} /> },
      { title: "Node.js", desc: "High-performance scalable Backends, Express, and APIs.", icon: <Globe size={40} /> },
      { title: "Full-Stack", desc: "End-to-End Architecture connecting rich clients to robust data systems.", icon: <Server size={40} /> },
    ],
    initialProjects: [
      {
        id: "se1",
        title: "Travel Path",
        tag: "Itinerary Planner",
        desc: "An intelligent travel planner leveraging dynamic routing algorithms and integrated mapping APIs to calculate and visually optimize travel paths in real-time.",
        tags: ["React", "Node.js", "Maps API"],
        link: "https://github.com/adityapatil-2026/travel-path"
      },
      {
        id: "se2",
        title: "React Dashboard",
        tag: "Enterprise App",
        desc: "A high-performance scalable dashboard interfacing with robust microservices. Features real-time state management, secure auth flows, and dense data visualizations.",
        tags: ["React", "Express", "PostgreSQL"],
        link: "https://github.com/adityapatil-2026/react-dashboard"
      }
    ]
  },
  DataEngineering: {
    title: "Data Engineering",
    description: "Building highly complex graphs, intelligent data pipelines, and integrating ML.",
    icon: Database,
    colorTheme: "red",
    storageKey: "de_projects",
    concepts: [
      { title: "Neo4j", desc: "Graph DB & Path Algorithms", icon: <Activity size={40} /> },
      { title: "Graphs", desc: "Complex Relationship Mapping", icon: <Target size={40} /> },
      { title: "Pipelines", desc: "ETL & Streaming Arch", icon: <Database size={40} /> },
    ],
    initialProjects: [
      {
        id: "de1",
        title: "Hazard-KG",
        tag: "Capstone Project",
        desc: "Engineered a comprehensive graph architecture to process and mathematically structure vast amounts of disparate threat intelligence. This pipeline creates rapid correlating nodes and AI-driven insights for automated, multi-dimensional risk analysis.",
        tags: ["Neo4j", "Python", "AI-as-a-Service", "Data Engineering"],
        link: "https://github.com/adityapatil-2026/hazard-kg"
      }
    ]
  },
  AI: {
    title: "Artificial Intelligence",
    description: "Designing autonomous agents, LLM integrations, and intelligent systems.",
    icon: Bot,
    colorTheme: "purple",
    storageKey: "ai_projects",
    concepts: [
      { title: "LLMs", desc: "Fine-tuning & Prompt Engineering", icon: <Bot size={40} /> },
      { title: "Agents", desc: "Autonomous Task Execution", icon: <Cpu size={40} /> },
      { title: "RAG", desc: "Retrieval-Augmented Generation", icon: <Database size={40} /> },
    ],
    initialProjects: []
  },
  ProductManagement: {
    title: "Product Management",
    description: "Driving product strategy, agile execution, and cross-functional leadership.",
    icon: LineChart,
    colorTheme: "blue",
    storageKey: "pm_projects",
    concepts: [
      { title: "Product Strategy", icon: <Target /> },
      { title: "Agile Execution", icon: <Activity /> },
      { title: "User Research", icon: <Users /> },
      { title: "Data Driven", icon: <LineChart /> },
    ],
    initialProjects: []
  },
  AdiiCodes: {
    title: "adiicodes",
    description: "Personal experiments, algorithmic patterns, and open-source contributions.",
    icon: adiicodesLogo,
    colorTheme: "emerald",
    storageKey: "adii_projects",
    concepts: [
      { title: "Algorithms", icon: <Terminal size={40} /> },
      { title: "Open Source", icon: <Github size={40} /> },
      { title: "Experiment", icon: <Code size={40} /> },
    ],
    initialProjects: []
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState("About");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [customCategories, setCustomCategories] = useState([]);
  const [showAddTabModal, setShowAddTabModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const docRef = doc(db, 'portfolio', 'custom_categories');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().data) {
          setCustomCategories(docSnap.data().data);
        }
      } catch (e) { console.error("Error fetching custom categories:", e); }
    };
    fetchCategories();
  }, []);

  const handleSaveCategory = async (newCat) => {
    const updated = [...customCategories, newCat];
    setCustomCategories(updated);
    try {
      await setDoc(doc(db, 'portfolio', 'custom_categories'), { data: updated });
    } catch (e) { console.error("Error saving custom categories:", e); }
    setShowAddTabModal(false);
    setActiveTab(newCat.title);
  };

  const dynamicTabs = [...DEFAULT_TABS, ...customCategories.map(c => c.title)];

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      return;
    }
    setShowAuthModal(true);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Logged in as:", decoded);

      // Fetch allowed admin emails from environment variables (fallback empty if not set)
      const allowedEmailsRaw = import.meta.env.VITE_ADMIN_EMAILS || "";
      const allowedEmails = allowedEmailsRaw.split(',').map(e => e.trim().toLowerCase());

      // Security Check: Make sure the logged-in user is actually authorized!
      if (!allowedEmails.includes(decoded.email.toLowerCase())) {
        alert("Unauthorized Google Account. You do not have admin permissions to edit this portfolio.");
        return;
      }

      setIsAdmin(true);
      setShowAuthModal(false);
      alert(`Admin Mode Unlocked! Welcome ${decoded.name || 'Admin'}`);
    } catch (e) {
      alert("Error decoding Google credential.");
    }
  };

  const handleGoogleError = () => {
    alert("Google Login Failed!");
  };

  // Theme logic
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Update local dark class when theme changes
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-500 font-sans overflow-x-hidden ${theme === 'light' ? 'bg-paper-light text-gray-900 selection:bg-cyan-500/20 selection:text-cyan-900' : 'bg-paper-dark text-gray-100 selection:bg-cyan-500/30 selection:text-white'}`}>

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <BrandLogo activeTab={activeTab} setActiveTab={setActiveTab} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={dynamicTabs} isAdmin={isAdmin} onAddClick={() => setShowAddTabModal(true)} />
      {activeTab !== "About" && <ContactDock />}

      <FlyingBanner />

      <main className="w-full max-w-7xl mx-auto pt-28 md:pt-36 pb-48 px-4 md:px-8 relative z-20">

        <div className="w-full relative">
          <AnimatePresence mode="wait">
            {activeTab === "About" && <ModernAbout key="about" isAdmin={isAdmin} />}
            {activeTab === "Product Management" && <CategoryView key="pm" isAdmin={isAdmin} {...CATEGORY_CONFIGS.ProductManagement} />}
            {activeTab === "AI" && <CategoryView key="ai" isAdmin={isAdmin} {...CATEGORY_CONFIGS.AI} />}
            {activeTab === "Software Engineering" && <CategoryView key="se" isAdmin={isAdmin} {...CATEGORY_CONFIGS.SoftwareEngineering} />}
            {activeTab === "Data Engineering" && <CategoryView key="de" isAdmin={isAdmin} {...CATEGORY_CONFIGS.DataEngineering} />}
            {activeTab === "adiicodes" && <CategoryView key="adiicodes" isAdmin={isAdmin} {...CATEGORY_CONFIGS.AdiiCodes} />}

            {customCategories.map((cat) => (
              activeTab === cat.title && <CategoryView key={cat.title} isAdmin={isAdmin} {...cat} />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Admin Toggle Button */}
      <button
        onClick={handleAdminToggle}
        className="fixed bottom-6 left-6 z-[60] p-3 rounded-full theme-nav text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer"
        title="Admin Login"
      >
        {isAdmin ? <Unlock size={18} /> : <Lock size={18} />}
      </button>

      {/* Google Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-2xl relative max-w-sm w-full mx-4 flex flex-col items-center border border-gray-200 dark:border-white/10"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>

              <Lock className="w-12 h-12 text-cyan-500 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Admin Access</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8 text-sm leading-relaxed">
                Connect your Google account to unlock inline portfolio editing capabilities.
              </p>

              <div className="w-full flex justify-center pb-2">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme={theme === 'dark' ? 'filled_black' : 'outline'}
                  shape="pill"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Domain Tab Modal */}
      <AnimatePresence>
        {showAddTabModal && isAdmin && (
          <AddCategoryModal onClose={() => setShowAddTabModal(false)} onSave={handleSaveCategory} />
        )}
      </AnimatePresence>
    </div>
  );
}
