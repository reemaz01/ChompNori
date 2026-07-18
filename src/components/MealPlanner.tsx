import React, { useState } from 'react';
import { MealPlanDay } from '../types';
import { Calendar, RefreshCw, Flame, Apple, Coffee, Sandwich, Cookie, Sparkles } from 'lucide-react';

interface MealPlannerProps {
  mealPlan: MealPlanDay[];
  onRegenerate: () => void;
  isDark: boolean;
}

export function MealPlanner({ mealPlan, onRegenerate, isDark }: MealPlannerProps) {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isRotating, setIsRotating] = useState(false);

  const handleRegenerate = () => {
    setIsRotating(true);
    onRegenerate();
    setTimeout(() => setIsRotating(false), 800);
  };

  const currentPlan = mealPlan.find(d => d.day === selectedDay) || mealPlan[0];

  if (!currentPlan) return null;

  return (
    <div className={`mt-6 p-6 rounded-3xl ${isDark ? 'bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-neon-blue' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-primary-purple'}`}>
              Dynamic 2-Day Meal Planner
            </h3>
            <p className="text-xs text-slate-400 font-medium">Auto-scaled portions matching your biological goals.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Day Selector Tabs */}
          <div className={`flex gap-1 p-1 rounded-xl ${isDark ? 'bg-slate-200/5' : 'bg-light-pink/10 border border-light-lavender/40'}`}>
            {[1, 2].map((dayNum) => (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(dayNum)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedDay === dayNum
                    ? isDark 
                      ? 'bg-blue-500 text-slate-950 shadow-sm' 
                      : 'bg-accent-pink text-brand-white shadow-sm'
                    : isDark 
                      ? 'text-slate-400 hover:text-white/10' 
                      : 'text-secondary-purple hover:bg-light-pink/20'
                }`}
              >
                Day {dayNum}
              </button>
            ))}
          </div>

          {/* Regenerate Button */}
          <button
            onClick={handleRegenerate}
            className={`p-2.5 rounded-xl border flex items-center justify-center hover:scale-105 active:scale-95 transition-all ${
              isDark 
                ? 'bg-slate-950/60 border-white/10 text-sky-400 hover:text-sky-300' 
                : 'bg-light-pink/10 border-light-lavender text-accent-pink hover:bg-light-pink/30 hover:text-accent-pink/80'
            }`}
            title="Regenerate alternative menu"
          >
            <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Daily totals bar */}
      <div className={`p-4 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 ${isDark ? 'bg-slate-950/50' : 'bg-light-pink/10'} border ${isDark ? 'border-white/5' : 'border-light-lavender/50'}`}>
        <div className="text-center sm:text-left">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">Daily Target</span>
          <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-primary-purple'}`}>{currentPlan.totals.calories} kcal</span>
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">Protein Target</span>
          <span className={`text-base font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>{currentPlan.totals.protein} g</span>
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">Carbs Target</span>
          <span className={`text-base font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{currentPlan.totals.carbs} g</span>
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">Fat Target</span>
          <span className={`text-base font-bold ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>{currentPlan.totals.fat} g</span>
        </div>
      </div>

      {/* Meals timeline layout */}
      <div className={`relative border-l pl-6 ml-3 space-y-6 ${isDark ? 'border-slate-200/10' : 'border-light-lavender'}`}>
        {[
          { label: 'Breakfast', icon: Coffee, data: currentPlan.meals.Breakfast, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
          { label: 'Lunch', icon: Sandwich, data: currentPlan.meals.Lunch, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
          { label: 'Snacks', icon: Cookie, data: currentPlan.meals.Snacks, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
          { label: 'Dinner', icon: Apple, data: currentPlan.meals.Dinner, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' }
        ].map((meal, index) => {
          const Icon = meal.icon;
          return (
            <div key={meal.label} className="relative group">
              {/* Timeline marker icon */}
              <div className={`absolute -left-[38px] top-1.5 p-1.5 rounded-full border-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-brand-white border-light-lavender'} transition-all group-hover:scale-110`}>
                <Icon className={`w-3.5 h-3.5 ${
                  meal.label === 'Breakfast' ? 'text-rose-500' :
                  meal.label === 'Lunch' ? isDark ? 'text-emerald-400' : 'text-emerald-600' :
                  meal.label === 'Snacks' ? isDark ? 'text-sky-400' : 'text-sky-600' :
                  isDark ? 'text-purple-400' : 'text-primary-purple'
                }`} />
              </div>

              {/* Meal content box */}
              <div className={`p-4 rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-slate-950/20 border-white/5 hover:bg-slate-950/40 hover:border-white/10' 
                  : 'bg-light-pink/10 border-light-lavender/40 hover:bg-light-pink/20 hover:border-light-lavender/80'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">{meal.label} Slot</span>
                    <h4 className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-primary-purple'}`}>
                      {meal.data.name} <span className="text-xs font-normal text-slate-400">({meal.data.quantity})</span>
                    </h4>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg self-start sm:self-center ${isDark ? 'bg-slate-900 text-slate-300' : 'bg-light-pink/25 border border-light-lavender text-primary-purple font-extrabold'}`}>
                    {meal.data.calories} kcal
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/5 text-center font-mono text-[11px] text-slate-400">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400/80">Protein</span>
                    <strong className={`${isDark ? 'text-rose-400' : 'text-rose-600'} mt-0.5 block`}>{meal.data.protein}g</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400/80">Carbs</span>
                    <strong className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} mt-0.5 block`}>{meal.data.carbs}g</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400/80">Fat</span>
                    <strong className={`${isDark ? 'text-sky-400' : 'text-sky-600'} mt-0.5 block`}>{meal.data.fat}g</strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`flex gap-2 items-center mt-6 p-3 rounded-2xl border ${isDark ? 'bg-slate-250/5 border-white/5' : 'bg-light-pink/20 border-light-lavender/40'}`}>
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
        <p className={`text-[10px] leading-normal ${isDark ? 'text-slate-400' : 'text-secondary-purple font-medium'}`}>
          This customized plan respects your declared **Dietary Preferences** and dynamically scales physical grams to hit targets precisely.
        </p>
      </div>
    </div>
  );
}
