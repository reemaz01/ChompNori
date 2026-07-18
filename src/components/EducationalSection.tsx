import React from 'react';
import { AlertCircle, BookOpen, ExternalLink, ShieldCheck, Waves, Info, Heart, Layers } from 'lucide-react';

interface EducationalSectionProps {
  isDark: boolean;
}

export function EducationalSection({ isDark }: EducationalSectionProps) {
  const links = [
    { name: 'World Health Organization (WHO)', url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet', desc: 'Global health diets, guidelines, and core metabolic directives.' },
    { name: 'USDA FoodData Central', url: 'https://fdc.nal.usda.gov/', desc: 'Official nutrient database providing accurate agricultural research details.' },
    { name: 'National Institutes of Health (NIH)', url: 'https://ods.od.nih.gov/', desc: 'Office of Dietary Supplements comprehensive vitamins/mineral fact sheets.' },
    { name: 'ICMR Guidelines (NIN)', url: 'https://www.nin.res.in/', desc: 'National Institute of Nutrition dietary reference values.' }
  ];

  return (
    <div className="space-y-6 mt-6">
      {/* Disclaimer Alert */}
      <div className={`p-5 rounded-3xl border ${
        isDark 
          ? 'bg-rose-950/15 border-rose-500/20 text-rose-300' 
          : 'bg-light-pink/20 border-accent-pink/40 text-rose-900 font-medium'
      } flex gap-4 items-start`}>
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
        <div>
          <h4 className="text-sm font-bold">Important Medical & Nutrition Disclaimer</h4>
          <p className="text-xs mt-1 leading-relaxed opacity-90">
            ChompNori NutriScope is purely an educational reference system. The biometric calculations (BMI, BMR, TDEE, macro-splits) represent statistical estimates based on academic guidelines (Mifflin-St Jeor formulas). This does not constitute clinical medical advice. Please consult a registered dietician or medical physician before initiating major changes to your personal calorie budget.
          </p>
        </div>
      </div>

      {/* Main Educational Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Principles */}
        <div className={`p-6 rounded-3xl ${isDark ? 'bg-slate-900/60 border border-white/10 shadow-neon-blue' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all`}>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-rose-500" />
            <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-primary-purple'}`}>
              Healthy Eating Guidelines
            </h3>
          </div>
          <ul className="space-y-3 text-xs leading-relaxed text-slate-400">
            <li className="flex gap-2 items-start">
              <span className="text-emerald-500 font-bold shrink-0">1.</span>
              <span><strong className={`${isDark ? 'text-white' : 'text-primary-purple'}`}>Prioritize Whole Foods:</strong> Choose unprocessed agricultural foods (fruits, vegetables, clean seeds, eggs, beans) over refined snacks.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-emerald-500 font-bold shrink-0">2.</span>
              <span><strong className={`${isDark ? 'text-white' : 'text-primary-purple'}`}>Hydrate Proactively:</strong> Water balances electrolyte concentration, assists digestional transit, and prevents false hunger signals.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-emerald-500 font-bold shrink-0">3.</span>
              <span><strong className={`${isDark ? 'text-white' : 'text-primary-purple'}`}>Mind Your Micronutrients:</strong> Caloric count determines weight flux, but mineral/vitamin saturation governs cellular health and fatigue resistance.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-emerald-400 font-bold shrink-0">4.</span>
              <span><strong className={`${isDark ? 'text-white' : 'text-primary-purple'}`}>Slow Glycemic Load:</strong> Combine simple carbs with fiber or high-quality fats to prevent metabolic insulin spikes.</span>
            </li>
          </ul>
        </div>

        {/* Nutritional Essentials */}
        <div className={`p-6 rounded-3xl ${isDark ? 'bg-slate-900/60 border border-white/10 shadow-neon-blue' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all`}>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-sky-400" />
            <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-primary-purple'}`}>
              Nutrient Significance
            </h3>
          </div>
          <div className="space-y-4 text-xs">
            <div>
              <h4 className={`font-bold ${isDark ? 'text-slate-200' : 'text-primary-purple'}`}>Why is Protein Essential?</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Proteins supply the nitrogenous building blocks (amino acids) needed to synthesize myofibrillar muscle tissue, support enzyme synthesis, and preserve resting metabolism during weight deficit.
              </p>
            </div>
            <div>
              <h4 className={`font-bold ${isDark ? 'text-slate-200' : 'text-primary-purple'}`}>The Role of Fiber</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Indigestible plant fiber optimizes intestinal gut microbiome health, adds stool bulk to support digestional transit, and dampens blood sugar spikes after high carbohydrate meals.
              </p>
            </div>
            <div>
              <h4 className={`font-bold ${isDark ? 'text-slate-200' : 'text-primary-purple'}`}>Vitamins and Minerals</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Vitamins (A, B-Complex, C, D, K) and Minerals (Iron, Calcium, Zinc) act as critical metabolic cofactors. They are mandatory for neurotransmitter conversion, red blood cell synthesis, and skeletal density.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Sources Links */}
      <div className={`p-6 rounded-3xl ${isDark ? 'bg-slate-900/60 border border-white/10 shadow-neon-blue' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all`}>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-primary-purple'}`}>
            Trusted Clinical Research Sources
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          We aggregate food values and metabolics based on research published by the following medical institutions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-2xl border flex flex-col justify-between hover:scale-[1.01] active:scale-[0.99] transition-all group ${
                isDark 
                  ? 'bg-slate-950/40 border-white/5 hover:bg-slate-950/80 hover:border-blue-500/20 text-slate-200' 
                  : 'bg-light-pink/10 border-light-lavender/50 hover:bg-light-pink/20 hover:border-accent-pink/30 text-primary-purple'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs font-bold ${isDark ? 'group-hover:text-blue-400' : 'group-hover:text-accent-pink'} transition-colors`}>{link.name}</h4>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-normal">{link.desc}</p>
              </div>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-3 block">
                Educational reference
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
