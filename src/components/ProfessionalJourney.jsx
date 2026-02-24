import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, MapIcon, Edit3, Trash2, Plus, Save } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultJourney = [
    {
        id: "j1",
        role: "Summer Intern",
        period: "2025 - Present",
        company: "Cohesity Inc.",
        description: "Gained hands-on experience in a fast-paced tech environment, contributing to key projects and learning from industry professionals.",
        color: "cyan",
        icon: "briefcase"
    },
    {
        id: "j2",
        role: "MS Software Eng.",
        period: "2024 - 2026",
        company: "Arizona State Univ.",
        description: "Pursuing a Master's degree to deepen my expertise in advanced software engineering principles and practices.",
        color: "purple",
        icon: "graduation"
    },
    {
        id: "j3",
        role: "IT Apps Specialist",
        period: "2023 - 2024",
        company: "Veritas Technologies",
        description: "Transitioned from an intern role to a specialist, working on internal applications and gaining experience in enterprise software.",
        color: "rose",
        icon: "briefcase"
    },
    {
        id: "j4",
        role: "B.E Computer Eng.",
        period: "2019 - 2023",
        company: "Pune University",
        description: "Completed my Bachelor's degree, where I built a strong foundation in computer science and software development.",
        color: "yellow",
        icon: "graduation"
    }
];

export default function ProfessionalJourney({ isAdmin }) {
    const [journey, setJourney] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ role: '', period: '', company: '', description: '', color: 'cyan', icon: 'briefcase' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'portfolio', 'journey');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().data) {
                    setJourney(docSnap.data().data);
                } else {
                    setJourney(defaultJourney);
                    setDoc(docRef, { data: defaultJourney }).catch(() => { });
                }
            } catch (e) {
                console.error("Error fetching journey:", e);
                setJourney(defaultJourney);
            }
        };
        fetchData();
    }, []);

    const saveToStats = async (data) => {
        setJourney(data);
        try {
            await setDoc(doc(db, 'portfolio', 'journey'), { data });
        } catch (e) {
            console.error("Error saving journey:", e);
        }
    };

    const handleSave = () => {
        if (!formData.role || !formData.company) return;

        if (isAdding) {
            saveToStats([{ ...formData, id: Date.now().toString() }, ...journey]);
        } else {
            saveToStats(journey.map(j => j.id === editingId ? { ...formData, id: j.id } : j));
        }
        setEditingId(null);
        setIsAdding(false);
    };

    const renderIcon = (iconName) => {
        return iconName === 'graduation' ? <GraduationCap size={12} className="mr-1 inline text-gray-400" /> : <Briefcase size={12} className="mr-1 inline text-gray-400" />;
    };

    const renderForm = () => (
        <div className="theme-panel p-5 rounded-3xl border-2 border-dashed border-cyan-500 w-full col-span-1 md:col-span-2 lg:col-span-4 relative mb-4">
            <h4 className="text-sm font-bold mb-3 dark:text-white">{isAdding ? "Add Journey Item" : "Edit Item"}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input type="text" placeholder="Role (e.g. SDE)" className="p-2 rounded bg-black/5 dark:bg-white/10 dark:text-white" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                <input type="text" placeholder="Period (e.g. 2023 - 2024)" className="p-2 rounded bg-black/5 dark:bg-white/10 dark:text-white" value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })} />
                <input type="text" placeholder="Company/School" className="p-2 rounded bg-black/5 dark:bg-white/10 dark:text-white" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                <select className="p-2 rounded bg-black/5 dark:bg-white/10 dark:text-white" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })}>
                    <option value="cyan">Cyan</option><option value="purple">Purple</option><option value="rose">Rose</option><option value="yellow">Yellow</option><option value="emerald">Emerald</option>
                </select>
                <select className="p-2 rounded bg-black/5 dark:bg-white/10 dark:text-white" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })}>
                    <option value="briefcase">Briefcase</option><option value="graduation">Graduation</option>
                </select>
            </div>
            <textarea placeholder="Description" rows={2} className="w-full p-2 rounded bg-black/5 dark:bg-white/10 dark:text-white mb-3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            <div className="flex gap-2">
                <button onClick={handleSave} className="px-4 py-2 bg-cyan-500 text-white rounded font-bold"><Save size={16} className="inline mr-1" />Save</button>
                <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-4 py-2 bg-gray-300 dark:bg-white/10 text-black dark:text-white rounded">Cancel</button>
            </div>
        </div>
    );

    return (
        <div className="lg:col-span-9 lg:col-start-4 order-4 mt-8 lg:mt-0 px-4 md:px-0 w-full mb-8">
            <div className="theme-panel p-6 md:p-8 rounded-[2rem] bg-white/40 dark:bg-[#1e1e1e]/40 backdrop-blur-3xl w-full">
                <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4 mb-6">
                    <h3 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white flex items-center">
                        <MapIcon size={20} className="mr-3 text-cyan-600 dark:text-cyan-400" /> Professional Journey
                    </h3>
                    {isAdmin && !isAdding && (
                        <button onClick={() => { setFormData({ role: '', period: '', company: '', description: '', color: 'cyan', icon: 'briefcase' }); setIsAdding(true); }} className="text-cyan-500 hover:scale-110 transition bg-black/5 dark:bg-white/10 p-2 rounded-lg">
                            <Plus size={16} />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 relative z-10 pt-4">
                    <div className="hidden lg:block absolute top-[2rem] left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-[-1]"></div>

                    {(isAdding || editingId !== null) && renderForm()}

                    {journey.map((item) => (
                        editingId === item.id ? null : (
                            <div key={item.id} className="theme-panel p-5 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-transform z-10 bg-white/80 dark:bg-[#252525]/80 relative group">
                                <div className="flex lg:flex-col lg:items-start items-center justify-between space-x-2 lg:space-x-0 mb-3">
                                    <div className={`w-4 h-4 rounded-full border-[3px] border-white dark:border-[#1e1e1e] bg-${item.color}-500 mb-4 hidden lg:block shadow-sm z-10 relative`}></div>
                                    <div className="font-bold text-gray-900 dark:text-white text-sm leading-tight pr-6">{item.role}</div>
                                    <time className={`font-mono text-[10px] md:text-xs text-${item.color}-600 dark:text-${item.color}-400 bg-${item.color}-500/10 dark:bg-${item.color}-400/10 px-2 py-0.5 rounded-full lg:mt-1`}>{item.period}</time>
                                </div>

                                {isAdmin && (
                                    <div className="absolute top-4 right-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => { setFormData(item); setEditingId(item.id); setIsAdding(false); }} className="text-blue-500 bg-white/50 dark:bg-black/20 p-1.5 rounded-md hover:scale-110"><Edit3 size={14} /></button>
                                        <button onClick={() => { if (window.confirm('Delete this?')) saveToStats(journey.filter(j => j.id !== item.id)); }} className="text-red-500 bg-white/50 dark:bg-black/20 p-1.5 rounded-md hover:scale-110"><Trash2 size={14} /></button>
                                    </div>
                                )}

                                <div className="text-xs text-gray-600 dark:text-gray-300 font-semibold mb-2 flex items-center">
                                    {renderIcon(item.icon)} {item.company}
                                </div>
                                <p className="text-[11px] md:text-xs text-gray-700 dark:text-gray-400 leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
