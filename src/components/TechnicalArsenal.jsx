import React, { useState, useEffect } from 'react';
import { Target, Edit3, Trash2, Plus, Save } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultArsenal = [
    {
        id: "a1",
        title: "AI/ML & Concepts",
        icon: "https://img.icons8.com/color/48/artificial-intelligence.png",
        skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'LLMs', 'LangChain', 'RAG', 'Agentic AI', 'Hugging Face', 'Vector DBs', 'MLOps', 'OOP', 'System Design']
    },
    {
        id: "a2",
        title: "Programming",
        icon: "https://img.icons8.com/color/48/source-code.png",
        skills: ['Go', 'Python', 'Java', 'JavaScript', 'SQL', 'C/C++', 'TypeScript']
    },
    {
        id: "a3",
        title: "Frameworks & DevOps",
        icon: "https://img.icons8.com/color/48/settings--v1.png",
        skills: ['Kubernetes', 'Docker', 'Terraform', 'Helm', 'FastAPI', 'React', 'Node.js', 'Next.js', 'Express', 'Celery', 'Redis']
    },
    {
        id: "a4",
        title: "Databases & Systems",
        icon: "https://img.icons8.com/color/48/database.png",
        skills: ['PostgreSQL', 'Oracle DB', 'MS SQL Server', 'MongoDB', 'Elasticsearch', 'Kafka', 'Spark', 'MinIO']
    },
    {
        id: "a5",
        title: "Cloud & Infra",
        icon: "https://img.icons8.com/color/48/cloud.png",
        skills: ['AWS', 'Azure', 'GCP', 'Linux']
    },
    {
        id: "a6",
        title: "Monitoring & SRE",
        icon: "https://img.icons8.com/color/48/line-chart.png",
        skills: ['Prometheus', 'Grafana', 'CloudWatch', 'JMeter', 'Testing', 'CI/CD']
    }
];

export default function TechnicalArsenal({ isAdmin }) {
    const [arsenal, setArsenal] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', icon: '', skills: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'portfolio', 'arsenal');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().data) {
                    setArsenal(docSnap.data().data);
                } else {
                    setArsenal(defaultArsenal);
                    setDoc(docRef, { data: defaultArsenal }).catch(() => { });
                }
            } catch (e) {
                console.error("Error fetching arsenal:", e);
                setArsenal(defaultArsenal);
            }
        };
        fetchData();
    }, []);

    const saveToStats = async (data) => {
        setArsenal(data);
        try {
            await setDoc(doc(db, 'portfolio', 'arsenal'), { data });
        } catch (e) {
            console.error("Error saving arsenal:", e);
        }
    };

    const handleSave = () => {
        if (!formData.title) return;

        // Convert comma separated string back to array
        const skillArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
        const newEntry = { ...formData, skills: skillArray };

        if (isAdding) {
            saveToStats([...arsenal, { ...newEntry, id: Date.now().toString() }]);
        } else {
            saveToStats(arsenal.map(a => a.id === editingId ? { ...newEntry, id: a.id } : a));
        }
        setEditingId(null);
        setIsAdding(false);
    };

    const renderForm = () => (
        <div className="theme-panel p-4 rounded-2xl shadow-sm border-2 border-dashed border-purple-500 relative">
            <h4 className="text-xs font-bold mb-2 dark:text-white">{isAdding ? "Add Category" : "Edit Category"}</h4>
            <input type="text" placeholder="Category Title" className="w-full p-2 mb-2 rounded bg-black/5 dark:bg-white/10 dark:text-white text-xs" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
            <input type="text" placeholder="Icon URL (e.g. img.icons8.com/...)" className="w-full p-2 mb-2 rounded bg-black/5 dark:bg-white/10 dark:text-white text-xs" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
            <textarea placeholder="Skills (comma separated)" rows={3} className="w-full p-2 mb-2 rounded bg-black/5 dark:bg-white/10 dark:text-white text-xs" value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} />
            <div className="flex gap-2">
                <button onClick={handleSave} className="flex-1 py-1.5 bg-purple-500 text-white rounded text-xs font-bold"><Save size={12} className="inline mr-1" />Save</button>
                <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="flex-1 py-1.5 bg-gray-300 dark:bg-white/10 text-black dark:text-white rounded text-xs">Cancel</button>
            </div>
        </div>
    );

    return (
        <div className="lg:col-span-3 lg:row-span-2 order-2 lg:order-1 flex flex-col space-y-6 w-full -mt-2 md:-mt-4 lg:mt-0 xl:pr-4">
            <div className="theme-panel p-6 rounded-[2rem] bg-white/40 dark:bg-[#1e1e1e]/40 backdrop-blur-3xl shadow-lg border-white/20 w-full h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight flex items-center">
                        <Target size={18} className="mr-2 text-purple-600 dark:text-purple-400" /> Technical Arsenal
                    </h3>
                    {isAdmin && !isAdding && (
                        <button onClick={() => { setFormData({ title: '', icon: '', skills: '' }); setIsAdding(true); }} className="text-purple-500 hover:scale-110 transition bg-black/5 dark:bg-white/10 p-1.5 rounded-lg">
                            <Plus size={14} />
                        </button>
                    )}
                </div>

                <div className="space-y-4 overflow-y-auto no-scrollbar pr-2 flex-1">
                    {(isAdding || editingId !== null) && renderForm()}

                    {arsenal.map((category) => (
                        editingId === category.id ? null : (
                            <div key={category.id} className="relative group mb-3 last:mb-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-[11px] font-bold text-gray-800 dark:text-gray-200 uppercase flex items-center tracking-wide">
                                        {category.icon && <img src={category.icon} alt={category.title} className="w-5 h-5 mr-2" />}
                                        {category.title}
                                    </h4>
                                    {isAdmin && (
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setFormData({ ...category, skills: category.skills.join(', ') }); setEditingId(category.id); setIsAdding(false); }} className="text-blue-500 hover:scale-110"><Edit3 size={12} /></button>
                                            <button onClick={() => { if (window.confirm('Delete this?')) saveToStats(arsenal.filter(a => a.id !== category.id)); }} className="text-red-500 hover:scale-110"><Trash2 size={12} /></button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {category.skills.map(s => <span key={s} className="px-2 py-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-md text-[9px] md:text-[10px] font-semibold text-gray-700 dark:text-gray-300">{s}</span>)}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
