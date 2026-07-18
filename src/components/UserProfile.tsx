import React, { useState, useEffect } from 'react';
import { UserProfile as ProfileType, Goal, ActivityLevel, DietaryPreference } from '../types';
import { calculateBMI, calculateBMR, calculateTDEE, calculateDailyTargets } from '../calculations';

interface UserProfileProps {
  profile: ProfileType;
  onSave: (updated: ProfileType) => void;
  isDark: boolean;
}

export function UserProfile({ profile, onSave, isDark }: UserProfileProps) {
  const [form, setForm] = useState<ProfileType>({ ...profile });
  const [isSaved, setIsSaved] = useState(false);

  // Auto save/calculate changes
  const handleChange = (field: keyof ProfileType, value: any) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onSave(updated);
  };

  const bmiInfo = calculateBMI(form.weight, form.height);
  const bmr = calculateBMR(form.weight, form.height, form.age, form.gender);
  const tdee = calculateTDEE(bmr, form.activityLevel);
  const targets = calculateDailyTargets(form);

  return (
    <div className="space-y-6 mt-6">
      {/* Visual Summary Card */}
      <div className={`p-6 rounded-3xl ${isDark ? 'bg-gradient-to-br from-theme-primary/10 via-theme-surface to-theme-surface border border-theme-border backdrop-blur-md shadow-lg' : 'bg-gradient-to-br from-light-pink/20 via-brand-white to-brand-white border border-light-lavender shadow-md'} transition-all duration-300`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-theme-secondary font-bold' : 'text-accent-pink font-extrabold'}`}>Onboarding Profile</span>
            <h2 className={`text-2xl font-bold tracking-tight mt-1 ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
              Hello, {form.name || 'Champion'}! 👋
            </h2>
            <p className={`text-xs mt-1 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple/75'} max-w-lg`}>
              Based on your details, our smart algorithms have configured custom metabolic baselines and nutritional splits.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            {/* BMI Card */}
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-theme-bg/60' : 'bg-light-pink/15'} border ${isDark ? 'border-theme-border/50' : 'border-light-lavender/50'} text-center min-w-[100px]`}>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">BMI Ratio</p>
              <p className={`text-2xl font-extrabold mt-1 ${bmiInfo.color}`}>{bmiInfo.value || '0.0'}</p>
              <span className="text-[10px] font-medium text-slate-400">{bmiInfo.label}</span>
            </div>
            {/* BMR Card */}
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-theme-bg/60' : 'bg-light-pink/15'} border ${isDark ? 'border-theme-border/50' : 'border-light-lavender/50'} text-center min-w-[100px]`}>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">BMR Base</p>
              <p className={`text-2xl font-extrabold mt-1 ${isDark ? 'text-theme-secondary' : 'text-secondary-purple'}`}>{bmr || 0}</p>
              <span className="text-[10px] font-medium text-slate-400">kcal/day</span>
            </div>
            {/* TDEE Card */}
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-theme-bg/60' : 'bg-light-pink/15'} border ${isDark ? 'border-theme-border/50' : 'border-light-lavender/50'} text-center min-w-[100px]`}>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active TDEE</p>
              <p className={`text-2xl font-extrabold mt-1 ${isDark ? 'text-theme-primary' : 'text-primary-purple'}`}>{tdee || 0}</p>
              <span className="text-[10px] font-medium text-slate-400">burn level</span>
            </div>
          </div>
        </div>

        {/* Live Nutrient Budget Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 border-t border-slate-200/10 pt-6">
          <div className={`p-3 rounded-xl text-center border ${isDark ? 'bg-theme-bg/70 border-theme-border/60' : 'bg-light-pink/15 border border-light-lavender/30'}`}>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Calorie Target</span>
            <p className={`text-lg font-bold mt-1 ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>{targets.calories} kcal</p>
          </div>
          <div className={`p-3 rounded-xl text-center border ${isDark ? 'bg-theme-bg/70 border-theme-border/60' : 'bg-light-pink/15 border border-light-lavender/30'}`}>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Protein Budget</span>
            <p className={`text-lg font-bold mt-1 ${isDark ? 'text-theme-danger' : 'text-rose-600'}`}>{targets.protein} g</p>
          </div>
          <div className={`p-3 rounded-xl text-center border ${isDark ? 'bg-theme-bg/70 border-theme-border/60' : 'bg-light-pink/15 border border-light-lavender/30'}`}>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Carb Budget</span>
            <p className={`text-lg font-bold mt-1 ${isDark ? 'text-theme-success' : 'text-emerald-600'}`}>{targets.carbs} g</p>
          </div>
          <div className={`p-3 rounded-xl text-center border ${isDark ? 'bg-theme-bg/70 border-theme-border/60' : 'bg-light-pink/15 border border-light-lavender/30'}`}>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Fat Budget</span>
            <p className={`text-lg font-bold mt-1 ${isDark ? 'text-theme-secondary' : 'text-sky-600'}`}>{targets.fat} g</p>
          </div>
        </div>
      </div>

      {/* Main Profile Settings Form */}
      <div className={`p-6 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all duration-300`}>
        <h3 className={`text-lg font-semibold tracking-tight mb-6 ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
          Biometric Profile & Goals Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Name */}
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl border ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/5 border-light-lavender text-primary-purple focus:border-accent-pink'} focus:outline-none transition-all`}
              placeholder="e.g. John Doe"
            />
          </div>

          {/* Age */}
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Age (Years)</label>
            <input
              type="number"
              value={form.age || ''}
              onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
              className={`w-full px-4 py-3 rounded-2xl border ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/5 border-light-lavender text-primary-purple focus:border-accent-pink'} focus:outline-none transition-all`}
            />
          </div>

          {/* Gender */}
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Gender</label>
            <select
              value={form.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl border ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/5 border-light-lavender text-primary-purple focus:border-accent-pink'} focus:outline-none transition-all`}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Height */}
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Height (cm)</label>
            <input
              type="number"
              value={form.height || ''}
              onChange={(e) => handleChange('height', parseInt(e.target.value) || 0)}
              className={`w-full px-4 py-3 rounded-2xl border ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/5 border-light-lavender text-primary-purple focus:border-accent-pink'} focus:outline-none transition-all`}
            />
          </div>

          {/* Weight */}
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={form.weight || ''}
              onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)}
              className={`w-full px-4 py-3 rounded-2xl border ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/5 border-light-lavender text-primary-purple focus:border-accent-pink'} focus:outline-none transition-all`}
            />
          </div>

          {/* Goal */}
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Fitness Goal</label>
            <select
              value={form.goal}
              onChange={(e) => handleChange('goal', e.target.value as Goal)}
              className={`w-full px-4 py-3 rounded-2xl border ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/5 border-light-lavender text-primary-purple focus:border-accent-pink'} focus:outline-none transition-all`}
            >
              <option value="Lose Fat">Lose Fat (Deficit)</option>
              <option value="Maintain">Maintain Balance</option>
              <option value="Gain Muscle">Gain Muscle (Surplus)</option>
            </select>
          </div>

          {/* Activity Level */}
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Activity Level</label>
            <select
              value={form.activityLevel}
              onChange={(e) => handleChange('activityLevel', e.target.value as ActivityLevel)}
              className={`w-full px-4 py-3 rounded-2xl border ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/5 border-light-lavender text-primary-purple focus:border-accent-pink'} focus:outline-none transition-all`}
            >
              <option value="Sedentary">Sedentary (Desk Job)</option>
              <option value="Light">Lightly Active (1-3 days/week)</option>
              <option value="Moderate">Moderately Active (3-5 days/week)</option>
              <option value="Active">Highly Active (6-7 days/week)</option>
              <option value="Athlete">Competitive Athlete / Heavy Labor</option>
            </select>
          </div>

          {/* Dietary Preference */}
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Dietary Preference</label>
            <select
              value={form.dietaryPreference}
              onChange={(e) => handleChange('dietaryPreference', e.target.value as DietaryPreference)}
              className={`w-full px-4 py-3 rounded-2xl border ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/5 border-light-lavender text-primary-purple focus:border-accent-pink'} focus:outline-none transition-all`}
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Eggetarian">Eggetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

          {/* Water Intake Goal */}
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Water Target (ml)</label>
            <input
              type="number"
              step="100"
              value={form.waterGoal || ''}
              onChange={(e) => handleChange('waterGoal', parseInt(e.target.value) || 0)}
              className={`w-full px-4 py-3 rounded-2xl border ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/5 border-light-lavender text-primary-purple focus:border-accent-pink'} focus:outline-none transition-all`}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              onSave(form);
              setIsSaved(true);
              setTimeout(() => setIsSaved(false), 2500);
            }}
            className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] ${
              isDark 
                ? 'bg-gradient-to-r from-theme-primary to-theme-secondary text-theme-bg' 
                : 'bg-gradient-to-r from-accent-pink to-accent-pink/80 text-brand-white'
            }`}
          >
            {isSaved ? '✓ Core Biometrics Synchronized' : 'Update Physical Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
