import React from 'react';
import { Recommendation, RiskItem } from '../types';
import { ShieldAlert, Sparkles, CheckCircle, ArrowRight, AlertTriangle, Info, ShieldCheck } from 'lucide-react';

interface RecommendationsProps {
  recommendations: Recommendation[];
  risks: RiskItem[];
  isDark: boolean;
}

export function Recommendations({ recommendations, risks, isDark }: RecommendationsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
      {/* Smart Recommendations Engine (Left Column) */}
      <div className={`lg:col-span-7 p-6 rounded-3xl ${isDark ? 'bg-slate-900/60 border border-white/10 shadow-neon-blue' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all`}>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-primary-purple'}`}>
              Nutritional Advisor AI
            </h3>
            <p className="text-xs text-slate-400 font-medium">Smart dietary adjustments tailored to your logs.</p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              className={`p-4 rounded-2xl border transition-transform duration-200 hover:scale-[1.01] ${
                rec.type === 'success' 
                  ? isDark ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50/50 border-emerald-200/60 text-emerald-800 font-medium'
                  : rec.type === 'warning'
                    ? isDark ? 'bg-amber-500/5 border-amber-500/20 text-amber-300' : 'bg-amber-50/50 border-amber-200/60 text-amber-800 font-medium'
                    : isDark ? 'bg-blue-500/5 border-blue-500/20 text-blue-300' : 'bg-blue-50/50 border-blue-200/60 text-blue-800 font-medium'
              }`}
            >
              <div className="flex items-start gap-3">
                {rec.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                ) : rec.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    rec.type === 'success' ? 'bg-emerald-500/10 text-emerald-600' :
                    rec.type === 'warning' ? 'bg-amber-500/10 text-amber-600' :
                    'bg-blue-500/10 text-blue-600'
                  }`}>
                    {rec.category}
                  </span>
                  <h4 className={`text-sm font-bold mt-2 ${isDark ? 'text-white' : 'text-primary-purple'}`}>{rec.title}</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {rec.description}
                  </p>

                  {/* Food Swap Widget */}
                  {rec.swap && (
                    <div className={`mt-4 p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-white/5' : 'bg-light-pink/15 border-light-lavender/50'}`}>
                      <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Recommended Smart Swap</p>
                      <div className="flex items-center gap-3 mt-2.5">
                        <span className="text-xs font-semibold text-rose-500 line-through truncate max-w-[120px]">{rec.swap.from}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-bold text-emerald-600 truncate max-w-[140px]">{rec.swap.to}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 italic leading-normal">
                        "{rec.swap.reason}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deficiency Risk Scanner (Right Column) */}
      <div className={`lg:col-span-5 p-6 rounded-3xl ${isDark ? 'bg-slate-900/60 border border-white/10 shadow-neon-blue' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all`}>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-primary-purple'}`}>
              Deficiency Risk Scanner
            </h3>
            <p className="text-xs text-slate-400 font-medium">Real-time health deficiency alerts.</p>
          </div>
        </div>

        {risks.length > 0 ? (
          <div className="space-y-4">
            {risks.map((risk) => (
              <div 
                key={risk.id}
                className={`p-4 rounded-2xl border ${
                  risk.severity === 'High' 
                    ? isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/50 border-rose-200'
                    : isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50/50 border-amber-200'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className={`text-sm font-bold ${
                    risk.severity === 'High' ? 'text-rose-500' : 'text-amber-500'
                  }`}>
                    {risk.title}
                  </h4>
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    risk.severity === 'High' 
                      ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                      : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  }`}>
                    {risk.severity} Severity
                  </span>
                </div>
                <p className={`text-xs mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                  {risk.description}
                </p>
                <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-250/10' : 'border-light-lavender/60'}`}>
                  <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Preemptive Fix</p>
                  <p className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {risk.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-400 mb-4">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-primary-purple'}`}>Zero High Risks Detected</h4>
            <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
              Your macro and micro ratios are balanced within safe limits. Maintain this healthy nutritional density!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
