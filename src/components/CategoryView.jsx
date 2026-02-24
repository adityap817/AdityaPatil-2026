import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Edit3, Trash2, Plus, Save, X } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ThemeMap = {
    cyan: {
        iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20 shadow-[0_0_20px_rgba(0,247,255,0.1)]",
        iconText: "text-cyan-600 dark:text-cyan-400",
        borderLeft: "border-cyan-500",
        hoverBorder: "hover:border-cyan-500/30",
        glowBg: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
        tagBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-700 dark:text-cyan-400",
        titleHover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
    },
    red: {
        iconBg: "bg-red-500/10 dark:bg-red-500/20 shadow-[0_0_20px_rgba(255,0,0,0.1)]",
        iconText: "text-red-600 dark:text-red-500",
        borderLeft: "border-red-500",
        hoverBorder: "hover:border-red-500/30",
        glowBg: "bg-red-600/10 group-hover:bg-red-600/20",
        tagBg: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
        titleHover: "group-hover:text-red-600 dark:group-hover:text-red-400",
    },
    purple: {
        iconBg: "bg-purple-500/10 dark:bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]",
        iconText: "text-purple-600 dark:text-purple-400",
        borderLeft: "border-purple-500",
        hoverBorder: "hover:border-purple-500/30",
        glowBg: "bg-purple-500/10 group-hover:bg-purple-500/20",
        tagBg: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400",
        titleHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    },
    emerald: {
        iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
        iconText: "text-emerald-600 dark:text-emerald-500",
        borderLeft: "border-emerald-500",
        hoverBorder: "hover:border-emerald-500/30",
        glowBg: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
        tagBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
        titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
    blue: {
        iconBg: "bg-blue-500/10 dark:bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]",
        iconText: "text-blue-600 dark:text-blue-500",
        borderLeft: "border-blue-500",
        hoverBorder: "hover:border-blue-500/30",
        glowBg: "bg-blue-500/10 group-hover:bg-blue-500/20",
        tagBg: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
        titleHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    },
    orange: {
        iconBg: "bg-orange-500/10 dark:bg-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]",
        iconText: "text-orange-600 dark:text-orange-500",
        borderLeft: "border-orange-500",
        hoverBorder: "hover:border-orange-500/30",
        glowBg: "bg-orange-500/10 group-hover:bg-orange-500/20",
        tagBg: "bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-400",
        titleHover: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
    }
};

export default function CategoryView({ title, description, icon: Icon, colorTheme, concepts, storageKey, isAdmin, initialProjects = [] }) {
    const theme = ThemeMap[colorTheme] || ThemeMap.cyan;

    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ title: '', tag: '', desc: '', tags: '', link: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'portfolio', `category_${storageKey}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().data) {
                    setProjects(docSnap.data().data);
                } else {
                    setProjects(initialProjects);
                    setDoc(docRef, { data: initialProjects }).catch(() => { });
                }
            } catch (e) {
                console.error("Error fetching category data:", e);
                setProjects(initialProjects);
            }
        };
        fetchData();
    }, [storageKey, initialProjects]);

    const saveToStats = async (newProjects) => {
        setProjects(newProjects);
        try {
            await setDoc(doc(db, 'portfolio', `category_${storageKey}`), { data: newProjects });
        } catch (e) {
            console.error("Error saving category data: ", e);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this project?")) {
            saveToStats(projects.filter(p => p.id !== id));
        }
    };

    const handleEdit = (project) => {
        setEditingId(project.id);
        setFormData({ ...project, tags: project.tags.join(', ') });
        setIsAdding(false);
    };

    const handleSave = () => {
        if (!formData.title || !formData.desc) return;

        const formattedTags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
        const newProj = {
            ...formData,
            tags: formattedTags,
        };

        if (isAdding) {
            newProj.id = Date.now().toString();
            saveToStats([newProj, ...projects]);
        } else {
            saveToStats(projects.map(p => p.id === editingId ? newProj : p));
        }

        setEditingId(null);
        setIsAdding(false);
        setFormData({ title: '', tag: '', desc: '', tags: '', link: '' });
    };

    const renderForm = () => (
        <div className={`theme-panel p-6 lg:p-8 rounded-[2rem] border-2 border-dashed ${theme.borderLeft} relative`}>
            <h4 className="text-xl font-bold mb-4 dark:text-white">
                {isAdding ? "Add New Project" : "Edit Project"}
            </h4>
            <div className="flex flex-col space-y-4">
                <input type="text" placeholder="Project Title" className="p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white border-none outline-none focus:ring-2 focus:ring-cyan-500" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                <input type="text" placeholder="Project Tag (e.g. Capstone, Enterprise App)" className="p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white border-none outline-none focus:ring-2 focus:ring-cyan-500" value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} />
                <textarea placeholder="Description" rows={3} className="p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white border-none outline-none focus:ring-2 focus:ring-cyan-500 resize-none" value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} />
                <input type="text" placeholder="Tech Tags (comma separated)" className="p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white border-none outline-none focus:ring-2 focus:ring-cyan-500" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
                <input type="url" placeholder="Project Link (URL)" className="p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white border-none outline-none focus:ring-2 focus:ring-cyan-500" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} />

                <div className="flex space-x-3 pt-2">
                    <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold tracking-wide flex items-center justify-center gap-2">
                        <Save size={18} /> Save
                    </button>
                    <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="py-3 px-6 rounded-xl bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200 font-bold hover:bg-gray-300 dark:hover:bg-white/20 transition">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, position: "absolute", width: "100%" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-12 w-full max-w-5xl mx-auto xl:pl-32"
        >
            <div className="flex flex-col items-start space-y-4 mb-4 border-b border-black/10 dark:border-white/10 pb-8 mt-4 pt-10">
                <div className="flex items-center space-x-5">
                    <div className={`p-4 theme-panel rounded-2xl ${theme.iconBg} flex items-center justify-center`}>
                        {typeof Icon === 'string' ? (
                            <img src={Icon} alt={title} className="w-10 h-10 object-contain drop-shadow-md" />
                        ) : (
                            <Icon className={`${theme.iconText} w-10 h-10`} />
                        )}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">{title}</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-400 text-lg max-w-2xl font-light pl-2">{description}</p>
            </div>

            {/* Concepts / Technologies Tags */}
            {concepts && concepts.length > 0 && (
                <div className="flex flex-wrap gap-2 lg:gap-3">
                    {concepts.map((concept, i) => (
                        <div key={i} className={`flex items-center space-x-2 px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-[11px] md:text-sm font-semibold text-gray-800 dark:text-gray-200 group ${theme.hoverBorder} transition-colors cursor-default`}>
                            <span className={`${theme.iconText}`}>
                                {concept.icon && React.isValidElement(concept.icon)
                                    ? React.cloneElement(concept.icon, { size: 16 })
                                    : concept.icon}
                            </span>
                            <span>{concept.title}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Featured Projects */}
            <div className="pt-6">
                <div className="flex justify-between items-end mb-8 border-l-4 pl-4" style={{ borderColor: 'currentColor', color: `var(--${colorTheme}-500, #06b6d4)` }}>
                    <h3 className={`text-2xl font-bold text-gray-900 dark:text-white`}>Featured Projects</h3>
                    {isAdmin && !isAdding && (
                        <button onClick={() => { setIsAdding(true); setFormData({ title: '', tag: '', desc: '', tags: '', link: '' }); }} className={`flex items-center space-x-2 text-sm font-bold ${theme.iconText} bg-black/5 dark:bg-white/10 px-4 py-2 rounded-xl hover:scale-105 transition-transform`}>
                            <Plus size={16} /> <span>Add Project</span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {isAdding && renderForm()}

                    {projects.length === 0 && !isAdding && (
                        <div className="theme-panel p-12 rounded-[2rem] flex items-center justify-center border-dashed border-2 border-black/10 dark:border-white/10 md:col-span-2">
                            <p className="text-gray-500 font-mono tracking-widest uppercase">No projects yet...</p>
                        </div>
                    )}

                    {projects.map((project) => {
                        if (editingId === project.id) return renderForm();

                        return (
                            <div key={project.id} className={`theme-panel p-8 lg:p-10 rounded-[2rem] group ${theme.hoverBorder} relative overflow-hidden flex flex-col h-full bg-white/30 dark:bg-transparent`}>
                                <div className={`absolute -right-24 -top-24 w-64 h-64 ${theme.glowBg} rounded-full blur-[60px] pointer-events-none transition-all duration-700`}></div>

                                <div className="mb-6 flex justify-between items-start z-10">
                                    <div>
                                        <h4 className={`text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white ${theme.titleHover} transition-colors duration-300 pr-2`}>
                                            {project.title}
                                        </h4>
                                        {project.tag && (
                                            <span className={`inline-block mt-3 text-[10px] md:text-xs font-mono px-3 py-1 rounded-full border ${theme.tagBg} uppercase tracking-widest`}>
                                                {project.tag}
                                            </span>
                                        )}
                                    </div>

                                    {isAdmin && (
                                        <div className="flex space-x-1 ml-2 shrink-0">
                                            <button onClick={() => handleEdit(project)} className="p-2 text-gray-500 hover:text-blue-500 bg-white/50 dark:bg-black/20 rounded-lg hover:scale-110 transition"><Edit3 size={16} /></button>
                                            <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-500 hover:text-red-500 bg-white/50 dark:bg-black/20 rounded-lg hover:scale-110 transition"><Trash2 size={16} /></button>
                                        </div>
                                    )}
                                </div>

                                <p className="text-gray-800 dark:text-gray-300 text-sm md:text-base font-light leading-relaxed mb-8 z-10 flex-1">
                                    {project.desc}
                                </p>

                                <div className="flex flex-col space-y-6 z-10 w-full mt-auto">
                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 bg-black/5 dark:bg-white/10 rounded text-xs text-gray-700 dark:text-gray-300 font-mono">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:scale-[1.02] transition-transform shadow-lg">
                                            <span>View Project</span>
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
