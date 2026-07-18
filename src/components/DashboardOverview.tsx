import React from 'react';
import { Nutrients, DailyTargets, AchievementBadge, UserProfile } from '../types';
import { Flame, Droplet, Dumbbell, Award, Percent, Apple, Calendar, Trophy, ChevronRight, Zap } from 'lucide-react';

interface DashboardOverviewProps {
  totals: Nutrients;
  targets: DailyTargets;
  waterCurrent: number;
  onAddWater: (amount: number) => void;
  onResetWater: () => void;
  streak: number;
  healthyScore: number;
  badges: AchievementBadge[];
  profile: UserProfile;
  isDark: boolean;
}

export function DashboardOverview({
  totals,
  targets,
  waterCurrent,
  onAddWater,
  onResetWater,
  streak,
  healthyScore,
  badges,
  profile,
  isDark
}: DashboardOverviewProps) {
  // Calorie calculations
  const caloriesRemaining = Math.max(0, targets.calories - totals.calories);
  const caloriesPct = Math.min(100, Math.round((totals.calories / targets.calories) * 100)) || 0;

  // Macro progress calculations
  const proteinPct = Math.min(100, Math.round((totals.protein / (targets.protein || 1)) * 100)) || 0;
  const carbsPct = Math.min(100, Math.round((totals.carbohydrates / (targets.carbs || 1)) * 100)) || 0;
  const fatPct = Math.min(100, Math.round((totals.fat / (targets.fat || 1)) * 100)) || 0;
  const fiberPct = Math.min(100, Math.round((totals.fiber / (targets.fiber || 1)) * 100)) || 0;

  // Circular progress parameter
  const radius = 34;
  const strokeWidth = 6;
  const circ = 2 * Math.PI * radius;

  return (
    <div className="space-y-6 mt-6">
      {/* Top Banner Greeting */}
      <div className={`p-6 rounded-3xl ${
        isDark 
          ? 'bg-gradient-to-r from-theme-surface via-theme-surface/85 to-theme-bg border border-theme-border' 
          : 'bg-gradient-to-r from-light-pink/40 via-light-lavender/30 to-brand-white border border-light-lavender shadow-md'
      } flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all`}>
        <div>
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-theme-primary' : 'text-accent-pink font-bold'}`}>Nutrition OS v1.0</span>
          <h1 className={`text-2xl font-extrabold tracking-tight mt-1 ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
            Welcome back, {profile.name || 'Explorer'}!
          </h1>
          <p className={`text-xs mt-1 max-w-md ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>
            Your body is in <span className={`font-semibold ${isDark ? 'text-theme-secondary' : 'text-accent-pink'}`}>{profile.goal}</span> mode. Let's hit your macro targets today!
          </p>
        </div>

        <div className="flex gap-4 items-center">
          {/* Active Streak */}
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${isDark ? 'bg-theme-bg' : 'bg-light-pink/15'} border ${isDark ? 'border-theme-border' : 'border-light-lavender'}`}>
            <div className={`p-2 rounded-xl ${isDark ? 'bg-theme-warning/10 text-theme-warning' : 'bg-amber-500/10 text-amber-400'}`}>
              <Zap className={`w-4 h-4 ${isDark ? 'fill-theme-warning' : 'fill-amber-400'}`} />
            </div>
            <div>
              <span className={`text-[10px] block font-mono ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>STREAK</span>
              <strong className={`text-sm font-bold ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>{streak} Days</strong>
            </div>
          </div>

          {/* Healthy Score */}
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${isDark ? 'bg-theme-bg' : 'bg-light-pink/15'} border ${isDark ? 'border-theme-border' : 'border-light-lavender'}`}>
            <div className={`p-2 rounded-xl ${isDark ? 'bg-theme-success/10 text-theme-success' : 'bg-accent-pink/10 text-accent-pink'}`}>
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <span className={`text-[10px] block font-mono ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>HEALTH SCORE</span>
              <strong className={`text-sm font-bold ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>{healthyScore}/100</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Core Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Calorie Ring Status Card (Left block - 7 columns) */}
        <div className={`lg:col-span-7 p-6 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border' : 'bg-brand-white border border-light-lavender shadow-md'} relative overflow-hidden transition-all`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
              Daily Caloric Balance
            </h3>
            <span className={`text-xs font-mono px-2.5 py-1 rounded-lg ${isDark ? 'bg-theme-bg text-theme-text-secondary' : 'bg-light-pink/25 text-accent-pink'}`}>
              {caloriesPct}% Met
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* Calorie Progress SVG Ring */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-slate-200/10 fill-none"
                  strokeWidth={strokeWidth}
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className={`transition-all duration-700 ease-out fill-none ${
                    isDark ? 'stroke-theme-primary' : 'stroke-accent-pink'
                  }`}
                  strokeWidth={strokeWidth + 1}
                  strokeDasharray={circ}
                  strokeDashoffset={circ - (caloriesPct / 100) * circ}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center flex flex-col items-center">
                <Flame className={`w-6 h-6 mb-1 ${isDark ? 'text-theme-primary' : 'text-accent-pink'}`} />
                <span className={`text-2xl font-black tracking-tight leading-none ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
                  {caloriesRemaining}
                </span>
                <span className={`text-[9px] font-mono uppercase tracking-widest mt-1 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>remaining</span>
              </div>
            </div>

            {/* Detailed numeric listings */}
            <div className="space-y-4 min-w-[150px]">
              <div>
                <span className={`text-[10px] uppercase tracking-widest font-mono ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Logged Calories</span>
                <p className={`text-lg font-bold mt-0.5 ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
                  {Math.round(totals.calories)} <span className={`text-xs font-normal ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>kcal</span>
                </p>
              </div>
              <div className={`border-t pt-2.5 ${isDark ? 'border-theme-border' : 'border-light-lavender'}`}>
                <span className={`text-[10px] uppercase tracking-widest font-mono ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Assigned Budget</span>
                <p className={`text-lg font-bold mt-0.5 ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
                  {targets.calories} <span className={`text-xs font-normal ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>kcal</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Water Intake Dashboard (Right block - 5 columns) */}
        <div className={`lg:col-span-5 p-6 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
              Hydration Log
            </h3>
            <button
              onClick={onResetWater}
              className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${isDark ? 'text-theme-text-secondary hover:text-theme-danger' : 'text-secondary-purple hover:text-accent-pink'}`}
            >
              Reset
            </button>
          </div>

          <div className="text-center py-2 relative flex flex-col items-center">
            <Droplet className={`w-10 h-10 animate-bounce mb-2 ${isDark ? 'text-theme-secondary' : 'text-accent-pink'}`} />
            <span className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
              {waterCurrent} <span className={`text-sm font-normal ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>/ {targets.water} ml</span>
            </span>
            <p className={`text-[11px] mt-1 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>
              Goal Completion: {Math.min(100, Math.round((waterCurrent / targets.water) * 100))}%
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-5">
            <button
              onClick={() => onAddWater(250)}
              className={`py-2 text-xs font-bold rounded-xl border hover:scale-[1.02] active:scale-[0.98] transition-all ${
                isDark 
                  ? 'bg-theme-bg border-theme-border text-theme-secondary hover:border-theme-primary/30' 
                  : 'bg-light-pink/15 border-light-lavender text-primary-purple hover:border-secondary-purple hover:bg-light-pink/30'
              }`}
            >
              + 250ml (Cup)
            </button>
            <button
              onClick={() => onAddWater(500)}
              className={`py-2 text-xs font-bold rounded-xl border hover:scale-[1.02] active:scale-[0.98] transition-all ${
                isDark 
                  ? 'bg-theme-bg border-theme-border text-theme-secondary hover:border-theme-primary/30' 
                  : 'bg-light-pink/15 border-light-lavender text-primary-purple hover:border-secondary-purple hover:bg-light-pink/30'
              }`}
            >
              + 500ml (Bottle)
            </button>
          </div>
        </div>
      </div>

      {/* Target Macro progress grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Protein', actual: totals.protein, target: targets.protein, pct: proteinPct, stroke: isDark ? 'stroke-theme-danger' : 'stroke-rose-500', text: isDark ? 'text-theme-danger' : 'text-rose-500' },
          { label: 'Carbs', actual: totals.carbohydrates, target: targets.carbs, pct: carbsPct, stroke: isDark ? 'stroke-theme-success' : 'stroke-emerald-500', text: isDark ? 'text-theme-success' : 'text-emerald-600' },
          { label: 'Fat', actual: totals.fat, target: targets.fat, pct: fatPct, stroke: isDark ? 'stroke-theme-secondary' : 'stroke-sky-500', text: isDark ? 'text-theme-secondary' : 'text-sky-600' },
          { label: 'Fiber', actual: totals.fiber, target: targets.fiber, pct: fiberPct, stroke: isDark ? 'stroke-theme-primary' : 'stroke-teal-500', text: isDark ? 'text-theme-primary' : 'text-teal-600' }
        ].map((macro) => (
          <div 
            key={macro.label}
            className={`p-4 rounded-3xl border flex items-center justify-between gap-3 ${
              isDark ? 'bg-theme-surface border-theme-border' : 'bg-brand-white border border-light-lavender shadow-md'
            } transition-all hover:scale-[1.01]`}
          >
            <div>
              <span className={`text-[10px] uppercase font-mono tracking-wider ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>{macro.label}</span>
              <p className={`text-base font-extrabold mt-0.5 ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
                {macro.actual.toFixed(1)} <span className={`text-xs font-normal ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>/ {macro.target}g</span>
              </p>
            </div>
            {/* Small dynamic radial progress bar */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" className="stroke-slate-200/10 fill-none" strokeWidth="3" />
                <circle 
                  cx="20" 
                  cy="20" 
                  r="16" 
                  className={`fill-none ${macro.stroke}`} 
                  strokeWidth="3.5" 
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={2 * Math.PI * 16 - (macro.pct / 100) * (2 * Math.PI * 16)}
                  strokeLinecap="round"
                />
              </svg>
              <span className={`absolute text-[9px] font-bold font-mono ${macro.text}`}>{macro.pct}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement & Badge Progress Widget */}
      <div className={`p-6 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
              Achievement Milestones
            </h3>
          </div>
          <span className={`text-xs font-mono ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>
            {badges.filter(b => b.unlocked).length} / {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const unlockedStyle = badge.unlocked 
              ? isDark 
                ? 'bg-theme-warning/10 border-theme-warning/30 text-theme-warning' 
                : 'bg-light-pink/40 border-light-lavender text-primary-purple'
              : isDark
                ? 'bg-theme-bg/45 border-theme-border text-theme-text-secondary/50'
                : 'bg-light-pink/10 border-light-lavender/50 text-secondary-purple';

            return (
              <div 
                key={badge.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between h-28 transition-all ${unlockedStyle}`}
              >
                <div className="flex justify-between items-start">
                  <div className={`p-1.5 rounded-lg ${badge.unlocked ? isDark ? 'bg-theme-warning/10 text-theme-warning' : 'bg-amber-500/10 text-amber-400' : 'bg-slate-200/10'} text-amber-400`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-mono uppercase tracking-wider">
                    {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
                <div className="mt-3">
                  <h4 className={`text-xs font-bold leading-tight ${badge.unlocked ? isDark ? 'text-theme-warning' : 'text-primary-purple' : 'text-secondary-purple'}`}>{badge.title}</h4>
                  <p className="text-[10px] opacity-80 leading-snug mt-0.5 truncate">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
