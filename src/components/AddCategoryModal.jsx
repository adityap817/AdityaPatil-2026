import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

export default function AddCategoryModal({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '',
        colorTheme: 'cyan',
        concepts: '' // comma separated for simplicity "Concept1, Concept2"
    });

    const handleSubmit = () => {
        if (!formData.title) return;

        const formattedConcepts = formData.concepts
            .split(',')
            .map(c => c.trim())
            .filter(Boolean)
            .map(c => ({ title: c, icon: "✨", desc: "" })); // default concept object

        const newCategory = {
            ...formData,
            storageKey: formData.title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_projects',
            concepts: formattedConcepts,
            initialProjects: []
        };

        onSave(newCategory);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-2xl relative max-w-sm w-full mx-4 flex flex-col items-center border border-gray-200 dark:border-white/10">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition">
                    <X size={20} />
                </button>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Add Domain Tab</h3>

                <div className="w-full space-y-4">
                    <input type="text" placeholder="Tab Title (e.g. Design)" className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white outline-none" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    <textarea placeholder="Description" className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white outline-none" rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    <input type="text" placeholder="Icon URL (e.g. https://img...)" className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white outline-none" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />

                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1 ml-1">Color Theme</label>
                        <select className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white outline-none" value={formData.colorTheme} onChange={e => setFormData({ ...formData, colorTheme: e.target.value })}>
                            <option value="cyan">Cyan</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="red">Red</option>
                            <option value="emerald">Emerald</option>
                            <option value="orange">Orange</option>
                        </select>
                    </div>

                    <input type="text" placeholder="Concepts (Comma separated)" className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/10 dark:text-white outline-none" value={formData.concepts} onChange={e => setFormData({ ...formData, concepts: e.target.value })} />

                    <button onClick={handleSubmit} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 mt-4 shadow-lg hover:opacity-90 transition">
                        <Save size={18} /> Add Domain
                    </button>
                </div>
            </div>
        </div>
    );
}
