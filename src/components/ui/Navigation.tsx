import React from 'react';
import { Home, Send, Download, ArrowRight } from 'lucide-react';

interface NavigationProps {
    activeTab: 'dashboard' | 'send' | 'receive' | 'swap';
    setActiveTab: (tab: 'dashboard' | 'send' | 'receive' | 'swap') => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'send', label: 'Send', icon: Send },
        { id: 'receive', label: 'Receive', icon: Download },
        { id: 'swap', label: 'Swap', icon: ArrowRight },
    ] as const;

    return (
        <nav className="flex items-center justify-center gap-2 p-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-cyan-100/50">
            {navItems.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`
                        relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
                        transition-all duration-200 ease-in-out
                        ${activeTab === id 
                            ? 'text-white bg-cyan-500 shadow-md shadow-cyan-500/20' 
                            : 'text-cyan-600 hover:bg-cyan-50'
                        }
                    `}
                >
                    <Icon className={`w-4 h-4 ${activeTab === id ? 'text-white' : 'text-cyan-500'}`} />
                    <span>{label}</span>
                    {activeTab === id && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-cyan-500 rounded-full" />
                    )}
                </button>
            ))}
        </nav>
    );
} 