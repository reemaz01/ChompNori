import React, { useState, useEffect } from 'react';
import { UserProfile as ProfileType, LogEntry, MealPlanDay, DailyTargets, AchievementBadge, MealCategory, LogUnit } from './types';
import { FOOD_DATABASE } from './foods';
import { calculateDailyTargets, calculateAnalysisTotals, generateRecommendations, scanRisks, generateMealPlanner, calculateHealthyScore } from './calculations';

// Components
import { DashboardOverview } from './components/DashboardOverview';
import { FoodLogger } from './components/FoodLogger';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { UserProfile } from './components/UserProfile';
import { Recommendations } from './components/Recommendations';
import { MealPlanner } from './components/MealPlanner';
import { EducationalSection } from './components/EducationalSection';

// Icons
import { 
  Flame, Droplet, Dumbbell, Trophy, Sparkles, BookOpen, User, 
  Menu, X, Sun, Moon, Download, Upload, Printer, AlertTriangle, 
  Search, Check, Zap, HelpCircle, Activity, Plus, Calendar
} from 'lucide-react';

export default function App() {
  // --- Persistent Local Storage Core State ---
  const [profile, setProfile] = useState<ProfileType>(() => {
    const saved = localStorage.getItem('nutriscope_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Chomp Nori',
      age: 26,
      gender: 'Male',
      height: 178,
      weight: 74,
      goal: 'Maintain',
      activityLevel: 'Moderate',
      dietaryPreference: 'Vegetarian',
      waterGoal: 2500
    };
  });

  const [entries, setEntries] = useState<LogEntry[]>(() => {
    const saved = localStorage.getItem('nutriscope_entries');
    return saved ? JSON.parse(saved) : [
      // Seed some realistic data for instant visual presentation
      {
        id: 'seed-1',
        foodId: 'oats',
        name: 'Rolled Oats (Dry)',
        timestamp: new Date().toISOString(),
        meal: 'Breakfast',
        quantity: 50,
        unit: 'gram',
        grams: 50,
        nutrients: {
          calories: 195, protein: 8.5, carbohydrates: 33.2, fat: 3.5, fiber: 5.3, sugar: 0.5,
          sodium: 1, potassium: 215, iron: 2.4, calcium: 27, magnesium: 88, zinc: 2.0,
          vitaminA: 0, vitaminB1: 0.38, vitaminB2: 0.07, vitaminB3: 0.6, vitaminB6: 0.06, vitaminB12: 0,
          vitaminC: 0, vitaminD: 0, vitaminE: 0.21, vitaminK: 1.6, folate: 28
        }
      },
      {
        id: 'seed-2',
        foodId: 'curd-plain',
        name: 'Curd / Plain Yogurt',
        timestamp: new Date().toISOString(),
        meal: 'Breakfast',
        quantity: 1,
        unit: 'serving',
        grams: 120,
        nutrients: {
          calories: 73, protein: 4.2, carbohydrates: 5.6, fat: 4.0, fiber: 0, sugar: 5.6,
          sodium: 55, potassium: 169, iron: 0.1, calcium: 145, magnesium: 14, zinc: 0.7,
          vitaminA: 32, vitaminB1: 0.05, vitaminB2: 0.17, vitaminB3: 0.1, vitaminB6: 0.06, vitaminB12: 0.48,
          vitaminC: 0.6, vitaminD: 0.1, vitaminE: 0.02, vitaminK: 0.2, folate: 8
        }
      },
      {
        id: 'seed-3',
        foodId: 'roti-wholewheat',
        name: 'Roti (Whole Wheat)',
        timestamp: new Date().toISOString(),
        meal: 'Lunch',
        quantity: 2,
        unit: 'piece',
        grams: 80,
        nutrients: {
          calories: 211, protein: 7.4, carbohydrates: 42.7, fat: 2.5, fiber: 8.1, sugar: 1.0,
          sodium: 256, potassium: 192, iron: 2.9, calcium: 28, magnesium: 65, zinc: 1.7,
          vitaminA: 0, vitaminB1: 0.28, vitaminB2: 0.1, vitaminB3: 3.3, vitaminB6: 0.22, vitaminB12: 0,
          vitaminC: 0, vitaminD: 0, vitaminE: 0.64, vitaminK: 1.7, folate: 33
        }
      },
      {
        id: 'seed-4',
        foodId: 'dal-yellow',
        name: 'Yellow Dal (Cooked)',
        timestamp: new Date().toISOString(),
        meal: 'Lunch',
        quantity: 1,
        unit: 'bowl',
        grams: 375,
        nutrients: {
          calories: 435, protein: 26.2, carbohydrates: 75.0, fat: 1.5, fiber: 29.2, sugar: 3.0,
          sodium: 8, potassium: 1350, iron: 7.9, calcium: 71, magnesium: 135, zinc: 3.8,
          vitaminA: 15, vitaminB1: 0.56, vitaminB2: 0.22, vitaminB3: 3.0, vitaminB6: 0.45, vitaminB12: 0,
          vitaminC: 5.6, vitaminD: 0, vitaminE: 0.41, vitaminK: 6.4, folate: 450
        }
      }
    ];
  });

  const [waterCurrent, setWaterCurrent] = useState<number>(() => {
    const saved = localStorage.getItem('nutriscope_water');
    return saved ? parseInt(saved) : 1250;
  });

  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>(() => {
    const saved = localStorage.getItem('nutriscope_mealplan');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Theme State & Settings ---
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('nutriscope_theme');
    return saved ? saved === 'dark' : true;
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'logger' | 'recommendations' | 'planner' | 'profile' | 'educational'>('dashboard');
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [paletteSearch, setPaletteSearch] = useState('');

  // Confetti particles state
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);

  // --- Dynamic calculations based on core states ---
  const targets = calculateDailyTargets(profile);
  const { totals, items: nutritionAnalysisItems } = calculateAnalysisTotals(entries, targets);
  const recommendations = generateRecommendations(totals, profile, targets);
  const risks = scanRisks(totals, targets);
  const healthyScore = calculateHealthyScore(totals, targets, waterCurrent);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('nutriscope_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nutriscope_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('nutriscope_water', waterCurrent.toString());
  }, [waterCurrent]);

  useEffect(() => {
    localStorage.setItem('nutriscope_mealplan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem('nutriscope_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Generate initial meal plan if none exists
  useEffect(() => {
    if (mealPlan.length === 0) {
      const freshPlan = generateMealPlanner(profile, targets);
      setMealPlan(freshPlan);
    }
  }, [profile, targets, mealPlan.length]);

  // Check Confetti eligibility when calories logged crosses 90%
  useEffect(() => {
    const ratio = totals.calories / targets.calories;
    if (ratio >= 0.9 && ratio <= 1.15 && entries.length > 0) {
      triggerConfetti();
    }
  }, [totals.calories, targets.calories]);

  // Toast notification helper
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Water tracking helpers
  const handleAddWater = (amount: number) => {
    setWaterCurrent(prev => {
      const next = prev + amount;
      if (next >= targets.water && prev < targets.water) {
        addToast('💧 Brilliant! Daily Hydration Target Fulfilled!', 'success');
        triggerConfetti();
      }
      return next;
    });
    addToast(`Added +${amount}ml water`, 'info');
  };

  const handleResetWater = () => {
    setWaterCurrent(0);
    addToast('Water intake counter reset', 'info');
  };

  // Food logger entry helpers
  const handleAddEntry = (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const newEntry: LogEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setEntries(prev => [...prev, newEntry]);
    addToast(`Successfully logged ${entry.name} to ${entry.meal}`, 'success');
  };

  const handleUpdateEntry = (id: string, updated: Partial<LogEntry>) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
    addToast('Entry updated successfully', 'success');
  };

  const handleDeleteEntry = (id: string) => {
    const item = entries.find(e => e.id === id);
    setEntries(prev => prev.filter(e => e.id !== id));
    addToast(`Deleted ${item?.name || 'entry'}`, 'info');
  };

  const handleDuplicateEntry = (id: string) => {
    const original = entries.find(e => e.id === id);
    if (!original) return;
    const duplicated: LogEntry = {
      ...original,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString()
    };
    setEntries(prev => [...prev, duplicated]);
    addToast(`Duplicated ${original.name}`, 'success');
  };

  const handleRegenerateMealPlan = () => {
    const freshPlan = generateMealPlanner(profile, targets);
    setMealPlan(freshPlan);
    addToast('Regenerated dynamic 2-day diet agenda', 'success');
  };

  // --- CSV Export / Import handlers ---
  const handleExportCSV = () => {
    if (entries.length === 0) {
      addToast('No entries logged to export.', 'error');
      return;
    }
    const header = 'id,name,meal,quantity,unit,grams,calories,protein,carbohydrates,fat,fiber,timestamp\n';
    const rows = entries.map(e => {
      return `"${e.id}","${e.name.replace(/"/g, '""')}","${e.meal}",${e.quantity},"${e.unit}",${e.grams},${e.nutrients.calories},${e.nutrients.protein},${e.nutrients.carbohydrates},${e.nutrients.fat},${e.nutrients.fiber},"${e.timestamp}"`;
    }).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ChompNori_BiteBuddy_Logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Food log CSV generated successfully!', 'success');
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;

      try {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length <= 1) {
          addToast('CSV empty or invalid format.', 'error');
          return;
        }

        const parsedEntries: LogEntry[] = [];
        // skip header line
        for (let i = 1; i < lines.length; i++) {
          // Simple CSV line parser split by comma but respecting quotes
          const cols = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
          if (cols.length < 11) continue;

          const id = cols[0].replace(/"/g, '');
          const name = cols[1].replace(/"/g, '');
          const meal = cols[2].replace(/"/g, '') as MealCategory;
          const quantity = parseFloat(cols[3]);
          const unit = cols[4].replace(/"/g, '') as LogUnit;
          const grams = parseFloat(cols[5]);
          const calories = parseFloat(cols[6]);
          const protein = parseFloat(cols[7]);
          const carbohydrates = parseFloat(cols[8]);
          const fat = parseFloat(cols[9]);
          const fiber = parseFloat(cols[10]);
          const timestamp = cols[11]?.replace(/"/g, '') || new Date().toISOString();

          parsedEntries.push({
            id,
            foodId: 'imported',
            name,
            timestamp,
            meal,
            quantity,
            unit,
            grams,
            nutrients: {
              calories, protein, carbohydrates, fat, fiber,
              sugar: 0, sodium: 0, potassium: 0, iron: 0, calcium: 0, magnesium: 0, zinc: 0,
              vitaminA: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB6: 0, vitaminB12: 0,
              vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, folate: 0
            }
          });
        }

        if (parsedEntries.length > 0) {
          setEntries(parsedEntries);
          addToast(`Imported ${parsedEntries.length} items from CSV!`, 'success');
        } else {
          addToast('No valid food records found in CSV.', 'error');
        }
      } catch (err) {
        addToast('Failed parsing CSV. Validate formatting.', 'error');
      }
    };
    reader.readAsText(file);
    // clear input
    event.target.value = '';
  };

  // Confetti triggering animation helper
  const triggerConfetti = () => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#38BDF8'];
    const particles = Array.from({ length: 35 }).map((_, idx) => ({
      id: Date.now() + idx,
      left: Math.random() * 100, // percentage left of viewport
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5
    }));
    setConfetti(particles);
    setTimeout(() => {
      setConfetti([]);
    }, 4000);
  };

  // Dynamic weekly history builder (stubbing last 6 days + today as the 7th)
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
  const baseWeeklyCalories = [1850, 1920, 1750, 2100, 1680, 1800];
  const weeklyHistory = daysOfWeek.map((day, idx) => {
    if (day === 'Today') {
      return { date: 'Today', calories: Math.round(totals.calories) };
    }
    return { date: day, calories: baseWeeklyCalories[idx] };
  });

  // Calculate standard unlock status of badges
  const badges: AchievementBadge[] = [
    {
      id: 'b-start',
      title: 'Nutri Scout',
      description: 'Logged your very first food item.',
      icon: 'Apple',
      unlocked: entries.length > 0
    },
    {
      id: 'b-water',
      title: 'Hydration Legend',
      description: 'Fully matched or surpassed water goal.',
      icon: 'Droplet',
      unlocked: waterCurrent >= targets.water
    },
    {
      id: 'b-protein',
      title: 'Macro Titan',
      description: 'Hit 95%+ of your protein budget.',
      icon: 'Dumbbell',
      unlocked: totals.protein >= targets.protein * 0.95
    },
    {
      id: 'b-perfect',
      title: 'Flawless Balance',
      description: 'Score over 85 on nutritional density.',
      icon: 'Trophy',
      unlocked: healthyScore >= 85 && entries.length > 0
    }
  ];

  // Action: Print nutrition report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'dark bg-theme-bg text-theme-text' : 'bg-background-light text-primary-purple'} transition-all duration-300 relative overflow-x-hidden`}>
      
      {/* Confetti canvas animation overlay */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-3 h-3 rounded-full pointer-events-none z-50 animate-confetti-float"
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            top: '100%',
          }}
        />
      ))}

      {/* Styled print invoice wrapper styles */}
      <style>{`
        @keyframes float-confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti-float {
          animation: float-confetti 3.5s linear forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-area {
            display: block !important;
            width: 100% !important;
          }
        }
      `}</style>

      {/* Main Grid Workspace */}
      <div className="flex">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0 transition-transform duration-300 ease-out no-print ${
          isDark 
            ? 'bg-theme-surface border-r border-theme-border text-theme-text shadow-xl' 
            : 'bg-brand-white border-r border-light-lavender text-primary-purple shadow-sm'
        }`}>
          <div className="flex flex-col h-full justify-between p-6">
            <div className="space-y-6">
              {/* Brand Logo Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${isDark ? 'bg-theme-primary/10 text-theme-secondary' : 'bg-accent-pink/15 text-accent-pink'}`}>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold tracking-tight">ChompNori</h2>
                    <span className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>BiteBuddy</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-slate-250/10 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
 
              {/* Navigation Menu */}
              <nav className="space-y-1.5">
                {[
                  { id: 'dashboard', label: 'Overview', icon: Flame },
                  { id: 'logger', label: 'Logging Core', icon: Plus },
                  { id: 'recommendations', label: 'Dietary Advice', icon: Sparkles },
                  { id: 'planner', label: 'Meal Planner', icon: Calendar },
                  { id: 'profile', label: 'Biometrics', icon: User },
                  { id: 'educational', label: 'Guides', icon: BookOpen },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all hover:scale-[1.01] active:scale-[0.99] ${
                        isActive
                          ? isDark
                            ? 'bg-gradient-to-r from-theme-primary/15 to-theme-secondary/10 text-theme-secondary border border-theme-primary/20'
                            : 'bg-gradient-to-r from-accent-pink/15 to-light-pink/10 text-accent-pink border border-accent-pink/30'
                          : isDark
                            ? 'border border-transparent text-theme-text-secondary hover:text-theme-text hover:bg-white/5'
                            : 'border border-transparent text-secondary-purple hover:text-primary-purple hover:bg-light-pink/15'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
 
            {/* Print, CSV & Theme actions sidebar footer */}
            <div className={`space-y-4 pt-4 border-t ${isDark ? 'border-theme-border' : 'border-light-lavender'}`}>
              {/* CSV Upload button */}
              <label className={`w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all hover:scale-[1.02] ${
                isDark 
                  ? 'bg-theme-bg border-theme-border text-theme-text-secondary hover:bg-theme-card hover:border-theme-border/80' 
                  : 'bg-light-pink/10 border-light-lavender text-primary-purple hover:bg-light-pink/25 hover:border-secondary-purple'
              }`}>
                <Upload className="w-3.5 h-3.5" />
                Import Log CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  className="hidden"
                />
              </label>
 
              {/* Theme Selector Toggle */}
              <div className={`flex items-center justify-between p-2 rounded-xl border ${isDark ? 'bg-theme-bg border-theme-border' : 'bg-light-pink/10 border-light-lavender'}`}>
                <span className={`text-[10px] font-mono uppercase tracking-widest pl-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Theme Mode</span>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`p-1.5 rounded-lg ${isDark ? 'bg-theme-primary/10 text-theme-secondary' : 'bg-accent-pink/20 text-accent-pink'} transition-all`}
                  title={isDark ? 'Switch to Light Purple Mode' : 'Switch to Cyber HUD Dark Mode'}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
 
              <div className="text-center">
                <span className="text-[9px] font-mono text-slate-400 opacity-60">
                  © 2026 ChompNori Lab
                </span>
              </div>
            </div>
          </div>
        </aside>
 
        {/* MAIN BODY WRAPPER */}
        <main className="flex-1 min-h-screen overflow-y-auto px-4 sm:px-6 py-6 lg:py-8 max-w-7xl mx-auto w-full">
          
          {/* TOP BAR / NAVIGATION */}
          <header className={`flex justify-between items-center pb-6 border-b ${isDark ? 'border-theme-border' : 'border-light-lavender'} no-print`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-xl border ${isDark ? 'bg-theme-surface border-theme-border text-theme-text-secondary hover:text-theme-text' : 'bg-light-pink/15 border-light-lavender text-primary-purple hover:bg-light-pink/25'}`}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className={`text-xl font-black tracking-tight ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
                  {activeTab === 'dashboard' ? 'Metabolic Overview' :
                   activeTab === 'logger' ? 'Macro Log Workspace' :
                   activeTab === 'recommendations' ? 'Intelligent Analysis' :
                   activeTab === 'planner' ? 'Personalized Diet Agenda' :
                   activeTab === 'profile' ? 'Biometrics Onboarding' :
                   'Educational References'}
                </h2>
                <p className={`text-xs ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'} hidden sm:block`}>ChompNori BiteBuddy Intelligent Assistant</p>
              </div>
            </div>
 
            {/* Quick Actions Panel */}
            <div className="flex items-center gap-2">
              {/* Command Palette search button */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className={`p-2.5 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
                  isDark 
                    ? 'bg-theme-surface border-theme-border text-theme-text-secondary hover:text-theme-secondary' 
                    : 'bg-brand-white border-light-lavender text-primary-purple hover:border-secondary-purple hover:text-accent-pink'
                }`}
                title="Search foods shortcut (⌘K)"
              >
                <Search className="w-4 h-4" />
              </button>
 
              {/* Printable PDF Report */}
              <button
                onClick={handlePrint}
                className={`p-2.5 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
                  isDark 
                    ? 'bg-theme-surface border-theme-border text-theme-text-secondary hover:text-theme-secondary' 
                    : 'bg-brand-white border-light-lavender text-primary-purple hover:border-secondary-purple hover:text-accent-pink'
                }`}
                title="Print detailed diagnostic summary sheet"
              >
                <Printer className="w-4 h-4" />
              </button>
 
              {/* Export Logs */}
              <button
                onClick={handleExportCSV}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  isDark 
                    ? 'bg-gradient-to-r from-theme-primary to-theme-secondary text-theme-bg' 
                    : 'bg-gradient-to-r from-accent-pink to-accent-pink/80 text-brand-white shadow-sm'
                }`}
                title="Export logged spreadsheet as CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </header>
 
          {/* TOP TOAST MESSAGES */}
          <div className="fixed bottom-5 right-5 space-y-2 z-50 pointer-events-none no-print">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`px-4.5 py-3 rounded-2xl shadow-xl text-xs font-bold pointer-events-auto border animate-fade-in flex items-center gap-2.5 ${
                  toast.type === 'success'
                    ? isDark ? 'bg-theme-success text-theme-bg border-theme-success/40' : 'bg-emerald-500 text-white border-emerald-600'
                    : toast.type === 'error'
                      ? isDark ? 'bg-theme-danger text-theme-bg border-theme-danger/40' : 'bg-rose-500 text-white border-rose-600'
                      : isDark ? 'bg-theme-surface text-theme-text border-theme-border' : 'bg-slate-900 text-slate-100 border-white/10'
                }`}
              >
                {toast.type === 'success' && <Check className="w-4 h-4 shrink-0" />}
                <span>{toast.message}</span>
              </div>
            ))}
          </div>

          {/* ACTIVE TAB DISPLAY ROUTING */}
          <div className="print-area">
            {activeTab === 'dashboard' && (
              <>
                <DashboardOverview
                  totals={totals}
                  targets={targets}
                  waterCurrent={waterCurrent}
                  onAddWater={handleAddWater}
                  onResetWater={handleResetWater}
                  streak={profile.name ? 5 : 1}
                  healthyScore={healthyScore}
                  badges={badges}
                  profile={profile}
                  isDark={isDark}
                />
                <AnalyticsCharts
                  totals={totals}
                  targets={targets}
                  weeklyHistory={weeklyHistory}
                  isDark={isDark}
                />
              </>
            )}

            {activeTab === 'logger' && (
              <FoodLogger
                entries={entries}
                onAddEntry={handleAddEntry}
                onUpdateEntry={handleUpdateEntry}
                onDeleteEntry={handleDeleteEntry}
                onDuplicateEntry={handleDuplicateEntry}
                isDark={isDark}
              />
            )}

            {activeTab === 'recommendations' && (
              <Recommendations
                recommendations={recommendations}
                risks={risks}
                isDark={isDark}
              />
            )}

            {activeTab === 'planner' && (
              <MealPlanner
                mealPlan={mealPlan}
                onRegenerate={handleRegenerateMealPlan}
                isDark={isDark}
              />
            )}

            {activeTab === 'profile' && (
              <UserProfile
                profile={profile}
                onSave={setProfile}
                isDark={isDark}
              />
            )}

            {activeTab === 'educational' && (
              <EducationalSection
                isDark={isDark}
              />
            )}
          </div>
        </main>
      </div>

      {/* COMMAND PALETTE POPUP */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 bg-[#02060E]/80 backdrop-blur-sm flex items-start justify-center p-4 pt-[10vh] z-50 no-print">
          <div className={`w-full max-w-lg rounded-3xl p-5 border shadow-2xl ${
            isDark ? 'bg-theme-surface border-theme-border text-theme-text' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold font-mono text-theme-text-secondary uppercase tracking-widest">Instant Food Lookup</h3>
              <button 
                onClick={() => { setCommandPaletteOpen(false); setPaletteSearch(''); }}
                className={`p-1 rounded-lg ${isDark ? 'text-theme-text-secondary hover:bg-white/5' : 'text-slate-400 hover:bg-slate-200/5'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={paletteSearch}
                onChange={(e) => setPaletteSearch(e.target.value)}
                placeholder="Type food name..."
                className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm focus:outline-none ${
                  isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'
                }`}
                autoFocus
              />
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
              {FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(paletteSearch.toLowerCase())).map((food) => (
                <button
                  key={food.id}
                  onClick={() => {
                    // Quick add to Breakfast as a default logging
                    handleAddEntry({
                      foodId: food.id,
                      name: food.name,
                      meal: 'Breakfast',
                      quantity: 100,
                      unit: 'gram',
                      grams: 100,
                      nutrients: food
                    });
                    setCommandPaletteOpen(false);
                    setPaletteSearch('');
                  }}
                  className={`w-full text-left p-3 rounded-xl border flex justify-between items-center transition-all ${
                    isDark 
                      ? 'bg-theme-bg/40 border-theme-border/60 hover:bg-theme-card-hover hover:border-theme-primary/30 text-theme-text' 
                      : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div>
                    <span className="text-sm font-bold block">{food.name}</span>
                    <span className="text-[10px] font-mono text-theme-text-secondary">P: {food.protein}g | C: {food.carbohydrates}g | F: {food.fat}g per 100g</span>
                  </div>
                  <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-lg ${isDark ? 'bg-theme-surface text-theme-secondary' : 'bg-slate-200/50 text-emerald-600'}`}>
                    + Log 100g
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
