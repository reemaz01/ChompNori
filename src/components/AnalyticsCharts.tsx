import React, { useState } from 'react';
import { Nutrients, DailyTargets } from '../types';

interface ChartsProps {
  totals: Nutrients;
  targets: DailyTargets;
  weeklyHistory: { date: string; calories: number }[];
  isDark: boolean;
}

export function AnalyticsCharts({ totals, targets, weeklyHistory, isDark }: ChartsProps) {
  const [hoveredMacro, setHoveredMacro] = useState<string | null>(null);

  // Calorie and Macro totals
  const totalMacros = (totals.protein * 4) + (totals.carbohydrates * 4) + (totals.fat * 9) || 1;
  const pPct = ((totals.protein * 4) / totalMacros) * 100;
  const cPct = ((totals.carbohydrates * 4) / totalMacros) * 100;
  const fPct = ((totals.fat * 9) / totalMacros) * 100;

  // target percentages for radar-like comparison
  const targetTotal = (targets.protein * 4) + (targets.carbs * 4) + (targets.fat * 9) || 1;
  const tpPct = ((targets.protein * 4) / targetTotal) * 100;
  const tcPct = ((targets.carbs * 4) / targetTotal) * 100;
  const tfPct = ((targets.fat * 9) / targetTotal) * 100;

  // SVG parameters for Macro Doughnut
  const radius = 60;
  const strokeWidth = 14;
  const circ = 2 * Math.PI * radius;

  const proteinOffset = circ - (pPct / 100) * circ;
  const carbOffset = circ - (cPct / 100) * circ;
  const fatOffset = circ - (fPct / 100) * circ;

  // Weekly history maximum for scale
  const maxCal = Math.max(...weeklyHistory.map(d => d.calories), targets.calories, 2000);

  // Radar chart logic (Concentric triangles)
  // Coordinates for the 3 macros points on a triangular grid:
  // Center: (100, 100)
  // Vertex 1 (Protein): 12 o'clock -> (100, 100 - length)
  // Vertex 2 (Carbs): 4 o'clock -> (100 + length * cos(30), 100 + length * sin(30))
  // Vertex 3 (Fat): 8 o'clock -> (100 - length * cos(30), 100 + length * sin(30))
  const getTriangleCoords = (pLen: number, cLen: number, fLen: number) => {
    const pX = 100;
    const pY = 100 - pLen;
    const cX = 100 + cLen * Math.cos(Math.PI / 6);
    const cY = 100 + cLen * Math.sin(Math.PI / 6);
    const fX = 100 - fLen * Math.cos(Math.PI / 6);
    const fY = 100 + fLen * Math.sin(Math.PI / 6);
    return `${pX},${pY} ${cX},${cY} ${fX},${fY}`;
  };

  const actualLenProtein = Math.min(80, (totals.protein / (targets.protein || 1)) * 60);
  const actualLenCarb = Math.min(80, (totals.carbohydrates / (targets.carbs || 1)) * 60);
  const actualLenFat = Math.min(80, (totals.fat / (targets.fat || 1)) * 60);

  const targetCoords = getTriangleCoords(60, 60, 60);
  const actualCoords = getTriangleCoords(actualLenProtein, actualLenCarb, actualLenFat);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Chart 1: Macro Distribution Doughnut */}
      <div className={`p-6 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border backdrop-blur-md shadow-lg' : 'bg-brand-white border border-light-lavender shadow-md'} relative overflow-hidden transition-all duration-300`}>
        <h3 className={`text-lg font-semibold tracking-tight mb-4 ${isDark ? 'text-theme-primary' : 'text-primary-purple'}`}>
          Macro Calorie Split
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Doughnut */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Protein Outer Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-theme-border/30 fill-none"
                strokeWidth={strokeWidth}
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="transition-all duration-500 ease-out fill-none stroke-theme-danger cursor-pointer"
                strokeWidth={strokeWidth + 2}
                strokeDasharray={circ}
                strokeDashoffset={isNaN(proteinOffset) ? circ : proteinOffset}
                strokeLinecap="round"
                onMouseEnter={() => setHoveredMacro('Protein')}
                onMouseLeave={() => setHoveredMacro(null)}
              />

              {/* Carb Inner Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius - 18}
                className="stroke-theme-border/30 fill-none"
                strokeWidth={strokeWidth}
              />
              <circle
                cx="80"
                cy="80"
                r={radius - 18}
                className="transition-all duration-500 ease-out fill-none stroke-theme-success cursor-pointer"
                strokeWidth={strokeWidth + 2}
                strokeDasharray={2 * Math.PI * (radius - 18)}
                strokeDashoffset={isNaN(carbOffset) ? 2 * Math.PI * (radius - 18) : (circ - 2*Math.PI*18) - (cPct / 100) * (2 * Math.PI * (radius - 18))}
                strokeLinecap="round"
                onMouseEnter={() => setHoveredMacro('Carbohydrates')}
                onMouseLeave={() => setHoveredMacro(null)}
              />

              {/* Fat Innermost Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius - 36}
                className="stroke-theme-border/30 fill-none"
                strokeWidth={strokeWidth}
              />
              <circle
                cx="80"
                cy="80"
                r={radius - 36}
                className="transition-all duration-500 ease-out fill-none stroke-theme-secondary cursor-pointer"
                strokeWidth={strokeWidth + 2}
                strokeDasharray={2 * Math.PI * (radius - 36)}
                strokeDashoffset={isNaN(fatOffset) ? 2 * Math.PI * (radius - 36) : (circ - 2*Math.PI*36) - (fPct / 100) * (2 * Math.PI * (radius - 36))}
                strokeLinecap="round"
                onMouseEnter={() => setHoveredMacro('Fat')}
                onMouseLeave={() => setHoveredMacro(null)}
              />
            </svg>

            <div className="absolute text-center flex flex-col items-center">
              <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>
                {hoveredMacro || 'Active'}
              </span>
              <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
                {hoveredMacro === 'Protein' ? `${Math.round(pPct)}%` :
                 hoveredMacro === 'Carbohydrates' ? `${Math.round(cPct)}%` :
                 hoveredMacro === 'Fat' ? `${Math.round(fPct)}%` :
                 `${Math.round(totals.calories)} kcal`}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center min-w-[140px]">
            {/* Protein Indicator */}
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-theme-danger shadow-sm" />
              <div>
                <p className={`text-xs font-medium ${isDark ? 'text-theme-text-secondary' : 'text-slate-700'}`}>Protein</p>
                <p className={`text-sm font-mono font-semibold ${isDark ? 'text-theme-danger' : 'text-rose-600'}`}>
                  {Math.round(totals.protein * 4)} kcal <span className="text-xs text-slate-400 font-normal">({Math.round(pPct) || 0}%)</span>
                </p>
              </div>
            </div>

            {/* Carbs Indicator */}
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-theme-success shadow-sm" />
              <div>
                <p className={`text-xs font-medium ${isDark ? 'text-theme-text-secondary' : 'text-slate-700'}`}>Carbohydrates</p>
                <p className={`text-sm font-mono font-semibold ${isDark ? 'text-theme-success' : 'text-emerald-600'}`}>
                  {Math.round(totals.carbohydrates * 4)} kcal <span className="text-xs text-slate-400 font-normal">({Math.round(cPct) || 0}%)</span>
                </p>
              </div>
            </div>

            {/* Fat Indicator */}
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-theme-secondary shadow-sm" />
              <div>
                <p className={`text-xs font-medium ${isDark ? 'text-theme-text-secondary' : 'text-slate-700'}`}>Fat</p>
                <p className={`text-sm font-mono font-semibold ${isDark ? 'text-theme-secondary' : 'text-sky-400'}`}>
                  {Math.round(totals.fat * 9)} kcal <span className="text-xs text-slate-400 font-normal">({Math.round(fPct) || 0}%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart 2: Weekly Calorie Bar Chart */}
      <div className={`p-6 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border backdrop-blur-md shadow-lg' : 'bg-brand-white border border-light-lavender shadow-md'} relative overflow-hidden transition-all duration-300`}>
        <h3 className={`text-lg font-semibold tracking-tight mb-4 ${isDark ? 'text-theme-primary' : 'text-primary-purple'}`}>
          Weekly Calorie Log
        </h3>
        <div className="h-44 flex items-end justify-between pt-6 px-2 gap-2 relative">
          {/* Target Baseline Dotted Line */}
          <div 
            className={`absolute left-0 right-0 border-t border-dashed ${isDark ? 'border-theme-danger/50' : 'border-accent-pink/50'} z-0 pointer-events-none transition-all duration-300`}
            style={{ bottom: `${(targets.calories / maxCal) * 100}%` }}
          >
            <span className={`absolute -top-5 right-1 text-[10px] font-mono px-1.5 py-0.5 rounded-md ${isDark ? 'text-theme-danger bg-theme-danger/10 border border-theme-border/50' : 'text-accent-pink bg-light-pink border border-light-lavender/50 font-bold'}`}>
              Target: {targets.calories}
            </span>
          </div>

          {weeklyHistory.map((day, i) => {
            const barHeightPct = (day.calories / maxCal) * 100;
            const isToday = i === weeklyHistory.length - 1;
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center group relative z-10">
                <div className={`w-full rounded-t-lg h-28 flex items-end overflow-hidden ${isDark ? 'bg-theme-bg' : 'bg-light-pink/15'}`}>
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-700 ease-out ${
                      isToday 
                        ? isDark 
                          ? 'bg-gradient-to-t from-theme-primary to-theme-secondary' 
                          : 'bg-gradient-to-t from-primary-purple to-secondary-purple'
                        : isDark
                          ? 'bg-gradient-to-t from-theme-success to-theme-success/70 hover:from-theme-success hover:to-theme-success/90'
                          : 'bg-gradient-to-t from-accent-pink to-light-pink/70 hover:opacity-90'
                    }`}
                    style={{ height: `${Math.max(4, barHeightPct)}%` }}
                  />
                </div>
                {/* Tooltip */}
                <div className={`absolute bottom-28 hidden group-hover:flex flex-col items-center border rounded-lg px-2 py-1 shadow-lg pointer-events-none scale-90 origin-bottom transition-all ${isDark ? 'bg-theme-surface border-theme-border text-theme-text' : 'bg-slate-950/90 border-transparent text-white'}`}>
                  <span className="text-[10px] font-mono leading-none">{day.calories} kcal</span>
                </div>
                <span className={`text-[10px] font-mono mt-2 truncate max-w-full text-center uppercase tracking-tight ${isToday ? isDark ? 'text-theme-primary font-bold' : 'text-accent-pink font-black' : isDark ? 'text-theme-text-secondary' : 'text-secondary-purple font-medium'}`}>
                  {day.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 3: Macro Radar Balance HUD */}
      <div className={`p-6 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border backdrop-blur-md shadow-lg' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all duration-300`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold tracking-tight ${isDark ? 'text-theme-primary' : 'text-primary-purple'}`}>
            Macro Balance Analysis
          </h3>
          <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${isDark ? 'bg-theme-bg text-theme-secondary border border-theme-border' : 'bg-light-pink/25 text-accent-pink border border-light-lavender'}`}>
            Target vs Actual Ratio
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-around gap-4">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {/* Polar background grids */}
              <polygon points={getTriangleCoords(60, 60, 60)} className={isDark ? "fill-none stroke-theme-border" : "fill-none stroke-slate-200/10"} strokeWidth="1" />
              <polygon points={getTriangleCoords(40, 40, 40)} className={isDark ? "fill-none stroke-theme-border" : "fill-none stroke-slate-200/10"} strokeWidth="1" />
              <polygon points={getTriangleCoords(20, 20, 20)} className={isDark ? "fill-none stroke-theme-border" : "fill-none stroke-slate-200/10"} strokeWidth="1" />
              
              {/* Axis Lines */}
              <line x1="100" y1="100" x2="100" y2="20" className={isDark ? "stroke-theme-border" : "stroke-slate-200/10"} strokeWidth="1" />
              <line x1="100" y1="100" x2={100 + 80 * Math.cos(Math.PI/6)} y2={100 + 80 * Math.sin(Math.PI/6)} className={isDark ? "stroke-theme-border" : "stroke-slate-200/10"} strokeWidth="1" />
              <line x1="100" y1="100" x2={100 - 80 * Math.cos(Math.PI/6)} y2={100 + 80 * Math.sin(Math.PI/6)} className={isDark ? "stroke-theme-border" : "stroke-slate-200/10"} strokeWidth="1" />

              {/* Target Polygon (Orange dashed outline) */}
              <polygon 
                points={targetCoords} 
                className={isDark ? "fill-theme-danger/5 stroke-theme-danger/40" : "fill-rose-500/5 stroke-rose-500/40"} 
                strokeWidth="1.5" 
                strokeDasharray="3 3"
              />

              {/* Actual Polygon (Neon filled) */}
              <polygon 
                points={actualCoords} 
                className={isDark ? "fill-theme-primary/35 stroke-theme-primary" : "fill-purple-500/30 stroke-purple-400"} 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Label points */}
              <text x="100" y="15" textAnchor="middle" className={`text-[10px] font-bold ${isDark ? 'fill-theme-danger' : 'fill-rose-600'}`}>Protein</text>
              <text x={100 + 72 * Math.cos(Math.PI/6)} y={100 + 44 * Math.sin(Math.PI/6)} textAnchor="start" className={`text-[10px] font-bold ${isDark ? 'fill-theme-success' : 'fill-emerald-600'}`}>Carbs</text>
              <text x={100 - 72 * Math.cos(Math.PI/6)} y={100 + 44 * Math.sin(Math.PI/6)} textAnchor="end" className={`text-[10px] font-bold ${isDark ? 'fill-theme-secondary' : 'fill-sky-600'}`}>Fat</text>
            </svg>
          </div>

          <div className="flex-1 flex flex-col gap-3.5 w-full md:max-w-[200px]">
            <div>
              <span className={`text-xs block font-medium ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Protein Target Met</span>
              <div className="flex items-center gap-2 mt-1">
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-theme-bg' : 'bg-light-pink/20'}`}>
                  <div className="h-full bg-theme-danger rounded-full" style={{ width: `${Math.min(100, (totals.protein / (targets.protein || 1)) * 100)}%` }} />
                </div>
                <span className="text-xs font-mono font-bold">{Math.round((totals.protein / (targets.protein || 1)) * 100)}%</span>
              </div>
            </div>

            <div>
              <span className={`text-xs block font-medium ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Carbohydrates Target Met</span>
              <div className="flex items-center gap-2 mt-1">
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-theme-bg' : 'bg-light-pink/20'}`}>
                  <div className="h-full bg-theme-success rounded-full" style={{ width: `${Math.min(100, (totals.carbohydrates / (targets.carbs || 1)) * 100)}%` }} />
                </div>
                <span className="text-xs font-mono font-bold">{Math.round((totals.carbohydrates / (targets.carbs || 1)) * 100)}%</span>
              </div>
            </div>

            <div>
              <span className={`text-xs block font-medium ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Fat Target Met</span>
              <div className="flex items-center gap-2 mt-1">
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-theme-bg' : 'bg-light-pink/20'}`}>
                  <div className="h-full bg-theme-secondary rounded-full" style={{ width: `${Math.min(100, (totals.fat / (targets.fat || 1)) * 100)}%` }} />
                </div>
                <span className="text-xs font-mono font-bold">{Math.round((totals.fat / (targets.fat || 1)) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart 4: Micronutrient Completion Dashboard */}
      <div className={`p-6 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border backdrop-blur-md shadow-lg' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all duration-300`}>
        <h3 className={`text-lg font-semibold tracking-tight mb-4 ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
          Essential Micronutrients Completion
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Iron (Fe)', value: totals.iron, target: 15, unit: 'mg', color: 'bg-theme-danger' },
            { label: 'Calcium (Ca)', value: totals.calcium, target: 1000, unit: 'mg', color: 'bg-theme-warning' },
            { label: 'Vitamin C', value: totals.vitaminC, target: 90, unit: 'mg', color: 'bg-theme-success' },
            { label: 'Vitamin D', value: totals.vitaminD, target: 15, unit: 'mcg', color: 'bg-theme-secondary' },
            { label: 'Vitamin B12', value: totals.vitaminB12, target: 2.4, unit: 'mcg', color: 'bg-theme-primary' },
            { label: 'Magnesium', value: totals.magnesium, target: 400, unit: 'mg', color: 'bg-theme-accent' }
          ].map((item) => {
            const pct = Math.min(100, Math.round((item.value / item.target) * 100));
            return (
              <div key={item.label} className={`p-3 rounded-2xl border hover:scale-[1.02] transition-transform duration-200 ${isDark ? 'bg-theme-bg/50 border-theme-border/50' : 'bg-light-pink/10 border-light-lavender/50'}`}>
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-semibold ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>{item.label}</span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>{item.value.toFixed(1)} / {item.target} {item.unit}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-theme-border/30' : 'bg-light-pink/20'}`}>
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold leading-none ${isDark ? 'text-theme-text' : 'text-slate-900'}`}>{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
