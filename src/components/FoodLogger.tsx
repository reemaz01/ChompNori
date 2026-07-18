import React, { useState } from 'react';
import { FoodItem, LogEntry, MealCategory, LogUnit, Nutrients } from '../types';
import { FOOD_DATABASE } from '../foods';
import { Plus, Search, Trash2, Copy, Edit3, X, Sparkles, SlidersHorizontal, BookOpen } from 'lucide-react';

interface FoodLoggerProps {
  entries: LogEntry[];
  onAddEntry: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  onUpdateEntry: (id: string, updated: Partial<LogEntry>) => void;
  onDeleteEntry: (id: string) => void;
  onDuplicateEntry: (id: string) => void;
  isDark: boolean;
}

export function FoodLogger({ entries, onAddEntry, onUpdateEntry, onDeleteEntry, onDuplicateEntry, isDark }: FoodLoggerProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMeal, setActiveMeal] = useState<MealCategory>('Breakfast');
  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState<LogUnit>('gram');
  
  // Custom manual item addition state
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualCals, setManualCals] = useState<number>(150);
  const [manualProt, setManualProt] = useState<number>(10);
  const [manualCarbs, setManualCarbs] = useState<number>(20);
  const [manualFat, setManualFat] = useState<number>(5);
  const [manualFiber, setManualFiber] = useState<number>(2);

  // Available categories
  const categories = ['All', 'Grains', 'Protein', 'Dairy', 'Fruits', 'Vegetables', 'Nuts/Seeds', 'Fat/Oil'];

  // Filter food list
  const filteredFoods = FOOD_DATABASE.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate gram multipliers based on unit and base servingSizeGrams
  const calculateGrams = (qty: number, selectedUnit: LogUnit, baseGrams: number): number => {
    const multiplier: Record<LogUnit, number> = {
      gram: 1,
      serving: baseGrams,
      bowl: baseGrams * 2.5,
      cup: baseGrams * 2,
      piece: baseGrams // default piece equivalent to 1 serving
    };
    return Math.round(qty * (multiplier[selectedUnit] || 1));
  };

  // Helper to handle adding a food item from DB
  const handleAddFood = (food: FoodItem) => {
    const calculatedGrams = calculateGrams(quantity, unit, food.servingSizeGrams);
    const ratio = calculatedGrams / 100;

    // Scale all nutrients
    const scaledNutrients: Nutrients = {
      calories: Math.round(food.calories * ratio),
      protein: parseFloat((food.protein * ratio).toFixed(1)),
      carbohydrates: parseFloat((food.carbohydrates * ratio).toFixed(1)),
      fat: parseFloat((food.fat * ratio).toFixed(1)),
      fiber: parseFloat((food.fiber * ratio).toFixed(1)),
      sugar: parseFloat((food.sugar * ratio).toFixed(1)),
      sodium: parseFloat((food.sodium * ratio).toFixed(1)),
      potassium: parseFloat((food.potassium * ratio).toFixed(1)),
      iron: parseFloat((food.iron * ratio).toFixed(1)),
      calcium: parseFloat((food.calcium * ratio).toFixed(1)),
      magnesium: parseFloat((food.magnesium * ratio).toFixed(1)),
      zinc: parseFloat((food.zinc * ratio).toFixed(1)),
      vitaminA: parseFloat((food.vitaminA * ratio).toFixed(1)),
      vitaminB1: parseFloat((food.vitaminB1 * ratio).toFixed(1)),
      vitaminB2: parseFloat((food.vitaminB2 * ratio).toFixed(1)),
      vitaminB3: parseFloat((food.vitaminB3 * ratio).toFixed(1)),
      vitaminB6: parseFloat((food.vitaminB6 * ratio).toFixed(1)),
      vitaminB12: parseFloat((food.vitaminB12 * ratio).toFixed(1)),
      vitaminC: parseFloat((food.vitaminC * ratio).toFixed(1)),
      vitaminD: parseFloat((food.vitaminD * ratio).toFixed(1)),
      vitaminE: parseFloat((food.vitaminE * ratio).toFixed(1)),
      vitaminK: parseFloat((food.vitaminK * ratio).toFixed(1)),
      folate: parseFloat((food.folate * ratio).toFixed(1)),
    };

    onAddEntry({
      foodId: food.id,
      name: food.name,
      meal: activeMeal,
      quantity,
      unit,
      grams: calculatedGrams,
      nutrients: scaledNutrients
    });
  };

  // Helper to add custom food manually
  const handleAddManualFood = () => {
    if (!manualName.trim()) return;

    const scaledNutrients: Nutrients = {
      calories: manualCals,
      protein: manualProt,
      carbohydrates: manualCarbs,
      fat: manualFat,
      fiber: manualFiber,
      sugar: 0, sodium: 0, potassium: 0, iron: 0, calcium: 0, magnesium: 0, zinc: 0,
      vitaminA: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB6: 0, vitaminB12: 0,
      vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, folate: 0
    };

    onAddEntry({
      foodId: 'manual-custom',
      name: manualName,
      meal: activeMeal,
      quantity: 1,
      unit: 'serving',
      grams: 100,
      nutrients: scaledNutrients
    });

    setManualName('');
    setShowManualModal(false);
  };

  // Log summary categories
  const meals: MealCategory[] = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
      {/* Search & Selection Panel (Left Panel) */}
      <div className={`xl:col-span-5 p-5 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border backdrop-blur-md' : 'bg-brand-white border border-light-lavender shadow-md'} transition-all`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>Food Repository</h3>
          <button
            onClick={() => setShowManualModal(true)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 hover:scale-105 active:scale-95 transition-all ${
              isDark 
                ? 'bg-theme-primary/15 text-theme-secondary border border-theme-primary/20 hover:bg-theme-primary/25' 
                : 'bg-light-pink/25 text-accent-pink border border-light-lavender hover:bg-light-pink/40'
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Manual Add
          </button>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className={`text-[10px] font-bold uppercase block mb-1 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseFloat(e.target.value) || 0))}
              className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/10 border-light-lavender text-primary-purple focus:border-accent-pink'}`}
            />
          </div>
          <div>
            <label className={`text-[10px] font-bold uppercase block mb-1 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Metric Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as LogUnit)}
              className={`w-full px-3 py-2.5 rounded-xl text-sm border focus:outline-none ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/10 border-light-lavender text-primary-purple focus:border-accent-pink'}`}
            >
              <option value="gram">Grams (g)</option>
              <option value="serving">Standard Serving</option>
              <option value="bowl">Large Bowl</option>
              <option value="cup">Standard Cup</option>
              <option value="piece">Whole Piece</option>
            </select>
          </div>
        </div>

        {/* Target Meal Selector */}
        <div className="mb-4">
          <label className={`text-[10px] font-bold uppercase block mb-1.5 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>Target Meal slot</label>
          <div className={`grid grid-cols-4 gap-1 p-1 rounded-xl ${isDark ? 'bg-theme-bg' : 'bg-light-pink/10 border border-light-lavender/40'}`}>
            {meals.map((m) => (
              <button
                key={m}
                onClick={() => setActiveMeal(m)}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeMeal === m
                    ? isDark 
                      ? 'bg-theme-primary text-theme-bg shadow-md' 
                      : 'bg-accent-pink text-brand-white shadow-md'
                    : isDark 
                      ? 'text-theme-text-secondary hover:bg-white/5' 
                      : 'text-secondary-purple hover:bg-light-pink/20'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-theme-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 60+ healthy foods..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm focus:outline-none ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/10 border-light-lavender text-primary-purple focus:border-accent-pink'}`}
          />
        </div>

        {/* Categorization chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-2 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-all shrink-0 ${
                selectedCategory === cat
                  ? isDark 
                    ? 'bg-theme-primary/15 text-theme-secondary border-theme-primary/40 font-bold' 
                    : 'bg-accent-pink/15 text-accent-pink border-accent-pink/40 font-bold'
                  : isDark 
                    ? 'border-transparent text-theme-text-secondary hover:bg-white/5' 
                    : 'border-light-lavender text-secondary-purple hover:bg-light-pink/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food List container */}
        <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div 
                key={food.id}
                className={`p-3 rounded-2xl border ${isDark ? 'bg-theme-bg/40 border-theme-border/55 hover:border-theme-primary/40' : 'bg-light-pink/10 border-light-lavender/50 hover:border-accent-pink/40'} flex justify-between items-center transition-all group`}
              >
                <div>
                  <h4 className={`text-sm font-semibold ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>{food.name}</h4>
                  <p className={`text-[10px] font-mono mt-0.5 ${isDark ? 'text-theme-text-secondary' : 'text-secondary-purple'}`}>
                    {food.calories} kcal | P: {food.protein}g | C: {food.carbohydrates}g | F: {food.fat}g <span className="opacity-60">per 100g</span>
                  </p>
                </div>
                <button
                  onClick={() => handleAddFood(food)}
                  className={`p-2 rounded-xl border opacity-85 group-hover:opacity-100 hover:scale-105 active:scale-95 transition-all ${
                    isDark 
                      ? 'bg-theme-primary/15 text-theme-secondary border-theme-primary/20 hover:bg-theme-primary/25' 
                      : 'bg-accent-pink/15 text-accent-pink border-accent-pink/20 hover:bg-accent-pink/25'
                  }`}
                  title={`Add ${quantity} ${unit} to ${activeMeal}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <BookOpen className="w-8 h-8 text-theme-text-secondary mx-auto opacity-40 mb-2" />
              <p className="text-xs text-theme-text-secondary font-medium">No foods match your search filters.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                className={`text-[10px] underline mt-1 ${isDark ? 'text-theme-secondary font-bold' : 'text-accent-pink font-semibold hover:underline'}`}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logged Meal Table (Right Panel) */}
      <div className={`xl:col-span-7 p-5 rounded-3xl ${isDark ? 'bg-theme-surface border border-theme-border backdrop-blur-md' : 'bg-brand-white border border-light-lavender shadow-md'} flex flex-col justify-between transition-all`}>
        <div>
          <h3 className={`text-lg font-semibold tracking-tight mb-4 ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
            Today's Logged Meals
          </h3>

          <div className="space-y-6 max-h-[580px] overflow-y-auto pr-1">
            {meals.map((mealName) => {
              const mealEntries = entries.filter(e => e.meal === mealName);
              const mealCals = mealEntries.reduce((sum, e) => sum + e.nutrients.calories, 0);
              const mealProtein = mealEntries.reduce((sum, e) => sum + e.nutrients.protein, 0);

              return (
                <div key={mealName} className="space-y-2">
                  {/* Category Header */}
                  <div className={`flex justify-between items-center border-b pb-1.5 ${isDark ? 'border-theme-border' : 'border-light-lavender/60'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        mealName === 'Breakfast' ? isDark ? 'text-theme-danger' : 'text-rose-400' :
                        mealName === 'Lunch' ? isDark ? 'text-theme-success' : 'text-emerald-600' :
                        mealName === 'Snacks' ? isDark ? 'text-theme-secondary' : 'text-sky-600' :
                        isDark ? 'text-theme-primary' : 'text-primary-purple'
                      }`}>
                        {mealName}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isDark ? 'bg-theme-bg text-theme-text-secondary border border-theme-border/50' : 'bg-light-pink/25 text-accent-pink border border-light-lavender/30 font-bold'} font-mono`}>
                        {mealEntries.length} items
                      </span>
                    </div>
                    <span className={`text-xs font-mono font-bold ${isDark ? 'text-theme-text-secondary' : 'text-slate-400'}`}>
                      {mealCals} kcal | {mealProtein.toFixed(1)}g Protein
                    </span>
                  </div>

                  {/* Category Food items list */}
                  {mealEntries.length > 0 ? (
                    <div className="space-y-1.5">
                      {mealEntries.map((entry) => (
                        <div 
                          key={entry.id}
                          className={`p-3 rounded-2xl flex items-center justify-between gap-3 text-sm border transition-all ${
                            isDark 
                              ? 'bg-theme-bg/40 border-theme-border/55 hover:bg-theme-surface' 
                              : 'bg-light-pink/10 border-light-lavender/60 hover:bg-light-pink/20'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-1.5">
                              <span className={`font-semibold truncate block ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
                                {entry.name}
                              </span>
                              <span className={`text-[10px] font-mono ${isDark ? 'text-theme-text-secondary' : 'text-slate-400'}`}>
                                ({entry.quantity} {entry.unit} • {entry.grams}g)
                              </span>
                            </div>
                            <div className="text-[10px] font-mono mt-1 flex gap-2 flex-wrap text-theme-text-secondary">
                              <span>P: <strong className={isDark ? 'text-theme-danger/90' : 'text-rose-600'}>{entry.nutrients.protein}g</strong></span>
                              <span>C: <strong className={isDark ? 'text-theme-success/90' : 'text-emerald-600'}>{entry.nutrients.carbohydrates}g</strong></span>
                              <span>F: <strong className={isDark ? 'text-theme-secondary/95' : 'text-sky-600'}>{entry.nutrients.fat}g</strong></span>
                              <span>Fiber: <strong className={isDark ? 'text-theme-primary' : 'text-slate-700'}>{entry.nutrients.fiber}g</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${isDark ? 'bg-theme-bg border border-theme-border text-theme-text' : 'bg-light-pink/25 border border-light-lavender text-primary-purple font-extrabold'}`}>
                              {entry.nutrients.calories} kcal
                            </span>
                            <button
                              onClick={() => onDuplicateEntry(entry.id)}
                              className={`p-1.5 rounded-lg transition-all ${isDark ? 'text-theme-text-secondary hover:text-theme-text hover:bg-white/5' : 'text-slate-400 hover:text-primary-purple hover:bg-light-pink/10'}`}
                              title="Duplicate entry"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteEntry(entry.id)}
                              className={`p-1.5 rounded-lg transition-all ${isDark ? 'text-theme-danger hover:bg-theme-danger/10' : 'text-rose-500 hover:text-rose-400 hover:bg-rose-500/10'}`}
                              title="Delete entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-xs py-2 italic text-center ${isDark ? 'text-theme-text-secondary/70' : 'text-slate-500'}`}>No foods logged for {mealName}.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Global summary totals */}
        {entries.length > 0 && (
          <div className={`mt-6 pt-4 border-t flex justify-between items-center flex-wrap gap-4 ${isDark ? 'border-theme-border' : 'border-light-lavender'}`}>
            <div>
              <p className={`text-[10px] font-mono uppercase ${isDark ? 'text-theme-text-secondary' : 'text-slate-400'}`}>Total Logging Cumulative</p>
              <h4 className={`text-lg font-extrabold ${isDark ? 'text-theme-text' : 'text-primary-purple'}`}>
                {entries.reduce((sum, e) => sum + e.nutrients.calories, 0)} kcal
              </h4>
            </div>
            <div className={`flex gap-4 font-mono text-xs ${isDark ? 'text-theme-text-secondary' : 'text-slate-500'}`}>
              <div>
                <span>Prot: </span>
                <span className={`font-bold ${isDark ? 'text-theme-danger' : 'text-rose-600'}`}>{entries.reduce((sum, e) => sum + e.nutrients.protein, 0).toFixed(1)}g</span>
              </div>
              <div>
                <span>Carbs: </span>
                <span className={`font-bold ${isDark ? 'text-theme-success' : 'text-emerald-600'}`}>{entries.reduce((sum, e) => sum + e.nutrients.carbohydrates, 0).toFixed(1)}g</span>
              </div>
              <div>
                <span>Fat: </span>
                <span className={`font-bold ${isDark ? 'text-theme-secondary' : 'text-sky-600'}`}>{entries.reduce((sum, e) => sum + e.nutrients.fat, 0).toFixed(1)}g</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Manual Addition Modal */}
      {showManualModal && (
        <div className="fixed inset-0 bg-[#02060E]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md rounded-3xl p-6 ${isDark ? 'bg-theme-surface border border-theme-border text-theme-text shadow-lg' : 'bg-brand-white border border-light-lavender text-primary-purple shadow-xl'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add Custom Food</h3>
              <button onClick={() => setShowManualModal(false)} className={`p-1 rounded-lg text-theme-text-secondary ${isDark ? 'hover:bg-white/5' : 'hover:bg-light-pink/20'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1">Food Name</label>
                <input
                  type="text"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/10 border-light-lavender text-primary-purple focus:border-accent-pink'}`}
                  placeholder="e.g. Grandma's Apple Pie"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={manualCals}
                    onChange={(e) => setManualCals(parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/10 border-light-lavender text-primary-purple'}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={manualProt}
                    onChange={(e) => setManualProt(parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/10 border-light-lavender text-primary-purple'}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={manualCarbs}
                    onChange={(e) => setManualCarbs(parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/10 border-light-lavender text-primary-purple'}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Fat (g)</label>
                  <input
                    type="number"
                    value={manualFat}
                    onChange={(e) => setManualFat(parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/10 border-light-lavender text-primary-purple'}`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Fiber (g)</label>
                <input
                  type="number"
                  value={manualFiber}
                  onChange={(e) => setManualFiber(parseFloat(e.target.value) || 0)}
                  className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none ${isDark ? 'bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary' : 'bg-light-pink/10 border-light-lavender text-primary-purple'}`}
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <button
                  onClick={() => setShowManualModal(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${isDark ? 'bg-theme-bg hover:bg-theme-bg/85 border border-theme-border text-theme-text-secondary' : 'bg-light-pink/15 text-primary-purple hover:bg-light-pink/30 border border-light-lavender'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddManualFood}
                  className={`px-4 py-2 rounded-xl text-sm font-bold ${isDark ? 'bg-theme-primary text-theme-bg hover:bg-theme-primary/85' : 'bg-accent-pink hover:bg-accent-pink/90 text-white'}`}
                >
                  Log Custom Food
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
