import { UserProfile, DailyTargets, Recommendation, RiskItem, MealPlanDay, LogEntry } from './types';
import { FOOD_DATABASE } from './foods';

// Calculate BMI
export function calculateBMI(weight: number, heightCm: number): { value: number; label: string; color: string } {
  const heightM = heightCm / 100;
  if (!weight || !heightM) return { value: 0, label: 'N/A', color: 'text-gray-400' };
  const bmi = weight / (heightM * heightM);
  
  let label = 'Normal';
  let color = 'text-emerald-500';
  if (bmi < 18.5) {
    label = 'Underweight';
    color = 'text-sky-500';
  } else if (bmi >= 25 && bmi < 29.9) {
    label = 'Overweight';
    color = 'text-amber-500';
  } else if (bmi >= 29.9) {
    label = 'Obese';
    color = 'text-rose-500';
  }
  return { value: parseFloat(bmi.toFixed(1)), label, color };
}

// Calculate BMR using Mifflin-St Jeor Equation
export function calculateBMR(weight: number, heightCm: number, age: number, gender: string): number {
  if (!weight || !heightCm || !age) return 0;
  if (gender === 'Male') {
    return 10 * weight + 6.25 * heightCm - 5 * age + 5;
  } else if (gender === 'Female') {
    return 10 * weight + 6.25 * heightCm - 5 * age - 161;
  } else {
    return 10 * weight + 6.25 * heightCm - 5 * age - 78; // average
  }
}

// Calculate TDEE
export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    'Sedentary': 1.2,
    'Light': 1.375,
    'Moderate': 1.55,
    'Active': 1.725,
    'Athlete': 1.9
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.2));
}

// Calculate Daily Targets
export function calculateDailyTargets(profile: UserProfile): DailyTargets {
  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  
  // Calorie adjustments based on Goal
  let calories = tdee;
  if (profile.goal === 'Lose Fat') {
    calories = tdee - 500;
    // Set safe minimums
    const minCalories = profile.gender === 'Male' ? 1500 : 1200;
    if (calories < minCalories) calories = minCalories;
  } else if (profile.goal === 'Gain Muscle') {
    calories = tdee + 300;
  }
  calories = Math.round(calories);

  // Macro Distributions based on Goal
  // Protein, Carbs, Fat percentages
  let pPct = 0.25;
  let cPct = 0.50;
  let fPct = 0.25;

  if (profile.goal === 'Lose Fat') {
    pPct = 0.35; // high protein to preserve muscle
    cPct = 0.35; // lower carbs
    fPct = 0.30;
  } else if (profile.goal === 'Gain Muscle') {
    pPct = 0.30;
    cPct = 0.45;
    fPct = 0.25;
  }

  const protein = Math.round((calories * pPct) / 4);
  const carbs = Math.round((calories * cPct) / 4);
  const fat = Math.round((calories * fPct) / 9);

  // Fiber: 14g per 1000kcal, minimum based on gender
  let fiber = Math.round(14 * (calories / 1000));
  const minFiber = profile.gender === 'Male' ? 38 : 25;
  if (fiber < minFiber) fiber = minFiber;

  return {
    calories,
    protein,
    carbs,
    fat,
    fiber,
    water: profile.waterGoal || 2500
  };
}

// Recommended intakes for micro-nutrients based on standard RDA guidelines
export const RDA_MICROS = {
  fiber: { value: 30, unit: 'g' },
  iron: { value: 15, unit: 'mg' },
  calcium: { value: 1000, unit: 'mg' },
  vitaminC: { value: 90, unit: 'mg' },
  vitaminD: { value: 15, unit: 'mcg' },
  vitaminB12: { value: 2.4, unit: 'mcg' },
  magnesium: { value: 400, unit: 'mg' },
  potassium: { value: 3500, unit: 'mg' },
  sodium: { value: 2000, unit: 'mg', limit: true }, // Upper limit
  sugar: { value: 50, unit: 'g', limit: true },      // Upper limit
  zinc: { value: 11, unit: 'mg' },
  vitaminA: { value: 800, unit: 'mcg' },
  vitaminK: { value: 120, unit: 'mcg' },
  folate: { value: 400, unit: 'mcg' }
};

// Calculate Nutrition Analysis Totals
export function calculateAnalysisTotals(entries: LogEntry[], targets: DailyTargets) {
  const initial = {
    calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0, sugar: 0,
    sodium: 0, potassium: 0, iron: 0, calcium: 0, magnesium: 0, zinc: 0,
    vitaminA: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB6: 0,
    vitaminB12: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, folate: 0
  };

  const totals = entries.reduce((acc, entry) => {
    Object.keys(initial).forEach((k) => {
      const key = k as keyof typeof initial;
      acc[key] = parseFloat((acc[key] + (entry.nutrients[key] || 0)).toFixed(2));
    });
    return acc;
  }, { ...initial });

  // Map to detailed structure
  const items = [
    { name: 'Calories', current: totals.calories, target: targets.calories, unit: 'kcal', type: 'macro' },
    { name: 'Protein', current: totals.protein, target: targets.protein, unit: 'g', type: 'macro' },
    { name: 'Carbohydrates', current: totals.carbohydrates, target: targets.carbs, unit: 'g', type: 'macro' },
    { name: 'Fat', current: totals.fat, target: targets.fat, unit: 'g', type: 'macro' },
    { name: 'Fiber', current: totals.fiber, target: RDA_MICROS.fiber.value, unit: 'g', type: 'micro' },
    { name: 'Iron', current: totals.iron, target: RDA_MICROS.iron.value, unit: 'mg', type: 'micro' },
    { name: 'Calcium', current: totals.calcium, target: RDA_MICROS.calcium.value, unit: 'mg', type: 'micro' },
    { name: 'Vitamin C', current: totals.vitaminC, target: RDA_MICROS.vitaminC.value, unit: 'mg', type: 'micro' },
    { name: 'Vitamin D', current: totals.vitaminD, target: RDA_MICROS.vitaminD.value, unit: 'mcg', type: 'micro' },
    { name: 'Vitamin B12', current: totals.vitaminB12, target: RDA_MICROS.vitaminB12.value, unit: 'mcg', type: 'micro' },
    { name: 'Magnesium', current: totals.magnesium, target: RDA_MICROS.magnesium.value, unit: 'mg', type: 'micro' },
    { name: 'Potassium', current: totals.potassium, target: RDA_MICROS.potassium.value, unit: 'mg', type: 'micro' },
    { name: 'Sodium', current: totals.sodium, target: RDA_MICROS.sodium.value, unit: 'mg', type: 'limit' },
    { name: 'Sugar', current: totals.sugar, target: RDA_MICROS.sugar.value, unit: 'g', type: 'limit' },
    { name: 'Zinc', current: totals.zinc, target: RDA_MICROS.zinc.value, unit: 'mg', type: 'micro' },
    { name: 'Vitamin A', current: totals.vitaminA, target: RDA_MICROS.vitaminA.value, unit: 'mcg', type: 'micro' },
    { name: 'Vitamin K', current: totals.vitaminK, target: RDA_MICROS.vitaminK.value, unit: 'mcg', type: 'micro' },
    { name: 'Folate', current: totals.folate, target: RDA_MICROS.folate.value, unit: 'mcg', type: 'micro' }
  ];

  return { totals, items };
}

// Recommendations Engine
export function generateRecommendations(
  totals: ReturnType<typeof calculateAnalysisTotals>['totals'],
  profile: UserProfile,
  targets: DailyTargets
): Recommendation[] {
  const list: Recommendation[] = [];
  const pref = profile.dietaryPreference;

  // Protein check
  if (totals.protein < targets.protein * 0.7) {
    if (pref === 'Vegan') {
      list.push({
        id: 'rec-p1',
        type: 'warning',
        category: 'Protein',
        title: 'Increase Plant Protein',
        description: 'You are running low on your protein target. Incorporate high-protein vegan options like Soybean Chunks, Tofu, and Pumpkin Seeds.',
        swap: { from: 'White Rice', to: 'Soybean Chunks', reason: 'Soybean chunks contain 52g of protein per 100g compared to only 2.7g in white rice.' }
      });
    } else if (pref === 'Vegetarian' || pref === 'Eggetarian') {
      list.push({
        id: 'rec-p2',
        type: 'warning',
        category: 'Protein',
        title: 'Incorporate Dairy/Egg Protein',
        description: 'Incorporate paneer, boiled eggs, or greek yogurt into your meals to reach your protein goal.',
        swap: { from: 'Plain Yogurt', to: 'Greek Yogurt', reason: 'Greek yogurt has nearly 3x the protein concentration of normal curd.' }
      });
    } else {
      list.push({
        id: 'rec-p3',
        type: 'warning',
        category: 'Protein',
        title: 'Lean Animal Protein',
        description: 'Consider adding grilled chicken breast, salmon, or whey protein to easily reach your daily requirement.',
        swap: { from: 'Cheddar Cheese', to: 'Chicken Breast', reason: 'Chicken breast is extremely high in lean protein and much lower in saturated fat.' }
      });
    }
  } else {
    list.push({
      id: 'rec-p-ok',
      type: 'success',
      category: 'Protein',
      title: 'Optimal Protein Intake',
      description: 'Excellent! Your protein intake is robust and supports muscle preservation and satiety.'
    });
  }

  // Fiber check
  if (totals.fiber < RDA_MICROS.fiber.value * 0.7) {
    list.push({
      id: 'rec-f1',
      type: 'warning',
      category: 'Fiber',
      title: 'Incorporate High Fiber Seeds & Grains',
      description: 'Your digestive health can benefit from more dietary fiber. Add chia seeds, oats, or sprouts.',
      swap: { from: 'White Bread', to: 'Whole Wheat Bread', reason: 'Whole wheat bread has triple the fiber content of white bread, helping slow digestion.' }
    });
  }

  // Sodium limit check
  if (totals.sodium > RDA_MICROS.sodium.value) {
    list.push({
      id: 'rec-na1',
      type: 'warning',
      category: 'Sodium',
      title: 'Reduce Sodium Intake',
      description: 'You have exceeded the standard recommended limit of 2000mg sodium. Reduce processed items or table salt.',
      swap: { from: 'Cheddar Cheese', to: 'Paneer', reason: 'Paneer is extremely low in sodium (18mg/100g) compared to processed Cheddar (621mg/100g).' }
    });
  }

  // Sugar limit check
  if (totals.sugar > RDA_MICROS.sugar.value) {
    list.push({
      id: 'rec-su1',
      type: 'warning',
      category: 'Sugar',
      title: 'Control Refined Sugars',
      description: 'Your sugar intake is quite high. Try reducing refined sugars and switching to whole fresh fruits.',
      swap: { from: 'White Bread', to: 'Oats', reason: 'Oats have complex carbohydrates and negligible simple sugars.' }
    });
  }

  // Iron check
  if (totals.iron < RDA_MICROS.iron.value * 0.7) {
    list.push({
      id: 'rec-fe1',
      type: 'warning',
      category: 'Iron',
      title: 'Boost Iron Intake',
      description: 'Low iron can lead to fatigue. Boost iron absorption by pairing iron-rich foods with Vitamin C.',
      swap: { from: 'White Rice', to: 'Spinach', reason: 'Spinach provides 2.7mg of active iron per 100g and is packed with folate and vitamin A.' }
    });
  }

  // Vitamin D check
  if (totals.vitaminD < RDA_MICROS.vitaminD.value * 0.6) {
    list.push({
      id: 'rec-vitd1',
      type: 'info',
      category: 'Vitamins',
      title: 'Vitamin D Support',
      description: 'Vitamin D is crucial for bone density and immune function. Egg yolks, mushrooms, or salmon can provide this, or safe sun exposure.',
    });
  }

  return list.length ? list : [{
    id: 'rec-perfect',
    type: 'success',
    category: 'Balanced Nutrition',
    title: 'Outstanding Nutrition Metrics!',
    description: 'You are meeting or balancing your macros and micros with precision. Keep maintaining this incredible healthy trajectory!'
  }];
}

// Risk Analysis Scanner
export function scanRisks(totals: ReturnType<typeof calculateAnalysisTotals>['totals'], targets: DailyTargets): RiskItem[] {
  const risks: RiskItem[] = [];

  // 1. Protein Deficiency
  if (totals.protein < targets.protein * 0.5) {
    risks.push({
      id: 'r-protein',
      title: 'Severe Protein Deficit',
      description: `Your protein intake is extremely low (${Math.round(totals.protein)}g vs target ${targets.protein}g).`,
      severity: 'High',
      recommendation: 'Incorporate a high-protein source in every meal (e.g. eggs, tofu, paneer, sprouts, or protein powders).'
    });
  } else if (totals.protein < targets.protein * 0.75) {
    risks.push({
      id: 'r-protein-med',
      title: 'Suboptimal Protein Level',
      description: 'Your protein levels are below the required threshold for muscle retention.',
      severity: 'Medium',
      recommendation: 'Add chia seeds, nuts, or Greek yogurt to snacks.'
    });
  }

  // 2. Iron Deficiency
  if (totals.iron < RDA_MICROS.iron.value * 0.5) {
    risks.push({
      id: 'r-iron',
      title: 'Anemia Risk (Low Iron)',
      description: 'Your iron intake is under half of standard RDA guidelines.',
      severity: 'High',
      recommendation: 'Incorporate dark leafy spinach, pumpkin seeds, lentils, and bajra. Combine with citrus fruits for absorption.'
    });
  }

  // 3. Calcium Risk
  if (totals.calcium < RDA_MICROS.calcium.value * 0.5) {
    risks.push({
      id: 'r-calcium',
      title: 'Low Calcium Intake',
      description: 'Deficient calcium levels can affect long-term skeletal bone density.',
      severity: 'Medium',
      recommendation: 'Add dairy curd, paneer, ragi flour, tofu, or fortified plant-milks.'
    });
  }

  // 4. Fiber Risk
  if (totals.fiber < RDA_MICROS.fiber.value * 0.5) {
    risks.push({
      id: 'r-fiber',
      title: 'Low Fiber Intake',
      description: 'Your current diet lacks enough indigestible plant fiber, affecting gut biome health.',
      severity: 'Medium',
      recommendation: 'Eat raw carrots, cucumbers, whole-grain rotis, oats, or apples.'
    });
  }

  // 5. Sugar Risk
  if (totals.sugar > RDA_MICROS.sugar.value * 1.5) {
    risks.push({
      id: 'r-sugar',
      title: 'Elevated Glycemic Load',
      description: 'Extremely high sugar levels lead to energy crashes and inflammatory strain.',
      severity: 'High',
      recommendation: 'Substitute sweet dates or refined items with berries or plain yogurt.'
    });
  }

  // 6. Sodium Risk
  if (totals.sodium > RDA_MICROS.sodium.value * 1.4) {
    risks.push({
      id: 'r-sodium',
      title: 'Cardiovascular Strain (High Sodium)',
      description: 'High sodium leads to water retention and blood pressure risks.',
      severity: 'High',
      recommendation: 'Avoid processed cheese, salted peanuts, or excess table salt.'
    });
  }

  return risks;
}

// Generate a customizable 2-Day Meal Planner
export function generateMealPlanner(profile: UserProfile, targets: DailyTargets): MealPlanDay[] {
  const pref = profile.dietaryPreference;
  const targetCals = targets.calories;

  // Filter foods by dietary preference
  const isAllowed = (itemName: string) => {
    const food = FOOD_DATABASE.find(f => f.name === itemName);
    if (!food) return true;
    if (pref === 'Vegan') {
      return !['Paneer (Cottage Cheese)', 'Curd / Plain Yogurt', 'Cow Milk (Toned)', 'Whole Boiled Egg', 'Chicken Breast (Grilled)', 'Salmon Fish', 'Greek Yogurt', 'Cheddar Cheese', 'Butter', 'Ghee'].includes(food.name);
    }
    if (pref === 'Vegetarian') {
      return !['Whole Boiled Egg', 'Chicken Breast (Grilled)', 'Salmon Fish'].includes(food.name);
    }
    if (pref === 'Eggetarian') {
      return !['Chicken Breast (Grilled)', 'Salmon Fish'].includes(food.name);
    }
    return true; // Non-Vegetarian
  };

  // Helper to pick foods
  const getFood = (alternatives: string[], fallback: string) => {
    const allowed = alternatives.filter(isAllowed);
    const chosenName = allowed.length > 0 ? allowed[Math.floor(Math.random() * allowed.length)] : fallback;
    return FOOD_DATABASE.find(f => f.name === chosenName) || FOOD_DATABASE[0];
  };

  // Day 1 Setup
  const breakfast1Food = getFood(['Rolled Oats (Dry)', 'Poha (Flattened Rice cooked)', 'Upma (Semolina Porridge cooked)'], 'Rolled Oats (Dry)');
  const lunch1Food = getFood(['Yellow Dal (Cooked)', 'Rajma / Kidney Beans (Cooked)', 'Chana / Chickpeas (Cooked)'], 'Yellow Dal (Cooked)');
  const lunch1Grain = getFood(['Roti (Whole Wheat)', 'Brown Rice (Cooked)', 'White Rice (Cooked)'], 'Roti (Whole Wheat)');
  const snack1Food = getFood(['Almonds', 'Peanuts', 'Cashew Nuts', 'Pumpkin Seeds'], 'Almonds');
  const dinner1Protein = getFood(['Chicken Breast (Grilled)', 'Paneer (Cottage Cheese)', 'Tofu (Firm)', 'Whole Boiled Egg'], 'Tofu (Firm)');
  const dinner1Veg = getFood(['Spinach (Raw)', 'Broccoli', 'Cucumber (Raw with peel)', 'Carrot (Raw)'], 'Broccoli');

  // Day 2 Setup
  const breakfast2Food = getFood(['Idli (Steamed Rice Cake)', 'Dosa (Fermented Crepe)', 'Whole Wheat Bread'], 'Whole Wheat Bread');
  const lunch2Food = getFood(['Salmon Fish', 'Greek Yogurt', 'Moong Dal (Sprouted)', 'Lentils (Brown)'], 'Moong Dal (Sprouted)');
  const lunch2Grain = getFood(['Brown Rice (Cooked)', 'Quinoa (Cooked)', 'Roti (Whole Wheat)'], 'Brown Rice (Cooked)');
  const snack2Food = getFood(['Banana', 'Apple (With Skin)', 'Orange', 'Mango'], 'Apple (With Skin)');
  const dinner2Protein = getFood(['Soybean Chunks (Dry)', 'Chicken Breast (Grilled)', 'Tofu (Firm)', 'Paneer (Cottage Cheese)'], 'Soybean Chunks (Dry)');
  const dinner2Veg = getFood(['Capsicum / Bell Pepper (Green)', 'Cauliflower', 'Tomato (Raw)'], 'Cauliflower');

  // Scale portion sizes to meet the exact calorie targets
  const scaleMeals = (dayMeals: Array<{ name: string; category: 'Breakfast'|'Lunch'|'Snacks'|'Dinner'; item: typeof FOOD_DATABASE[0]; baseGrams: number }>) => {
    const totalBaseCalories = dayMeals.reduce((sum, m) => sum + (m.item.calories * (m.baseGrams / 100)), 0);
    const multiplier = targetCals / totalBaseCalories;

    const mealsFormatted: any = {};
    let runningCalories = 0;
    let runningProtein = 0;
    let runningCarbs = 0;
    let runningFat = 0;

    dayMeals.forEach((m) => {
      const scaledGrams = Math.round(m.baseGrams * multiplier);
      const scaledCals = Math.round(m.item.calories * (scaledGrams / 100));
      const p = parseFloat((m.item.protein * (scaledGrams / 100)).toFixed(1));
      const c = parseFloat((m.item.carbohydrates * (scaledGrams / 100)).toFixed(1));
      const f = parseFloat((m.item.fat * (scaledGrams / 100)).toFixed(1));

      mealsFormatted[m.category] = {
        name: m.item.name,
        quantity: `${scaledGrams}g`,
        calories: scaledCals,
        protein: p,
        carbs: c,
        fat: f
      };

      runningCalories += scaledCals;
      runningProtein += p;
      runningCarbs += c;
      runningFat += f;
    });

    return {
      meals: mealsFormatted,
      totals: {
        calories: Math.round(runningCalories),
        protein: Math.round(runningProtein),
        carbs: Math.round(runningCarbs),
        fat: Math.round(runningFat)
      }
    };
  };

  const day1 = scaleMeals([
    { name: 'Breakfast', category: 'Breakfast', item: breakfast1Food, baseGrams: 80 },
    { name: 'Lunch Dal', category: 'Lunch', item: lunch1Food, baseGrams: 150 },
    { name: 'Lunch Grain', category: 'Lunch', item: lunch1Grain, baseGrams: 100 },
    { name: 'Snack', category: 'Snacks', item: snack1Food, baseGrams: 30 },
    { name: 'Dinner Protein', category: 'Dinner', item: dinner1Protein, baseGrams: 120 },
    { name: 'Dinner Veg', category: 'Dinner', item: dinner1Veg, baseGrams: 100 }
  ]);

  const day2 = scaleMeals([
    { name: 'Breakfast', category: 'Breakfast', item: breakfast2Food, baseGrams: 120 },
    { name: 'Lunch Prot', category: 'Lunch', item: lunch2Food, baseGrams: 130 },
    { name: 'Lunch Grain', category: 'Lunch', item: lunch2Grain, baseGrams: 100 },
    { name: 'Snack', category: 'Snacks', item: snack2Food, baseGrams: 150 },
    { name: 'Dinner Protein', category: 'Dinner', item: dinner2Protein, baseGrams: 50 },
    { name: 'Dinner Veg', category: 'Dinner', item: dinner2Veg, baseGrams: 120 }
  ]);

  // Merge double entries in Lunch / Dinner for the visual presentation
  const buildDayOutput = (dayNum: number, source: typeof day1) => {
    return {
      day: dayNum,
      meals: {
        Breakfast: source.meals.Breakfast,
        Lunch: {
          name: `${source.meals.Lunch.name} with ${FOOD_DATABASE.find(f => f.name === source.meals.Lunch.name)?.category === 'Protein' ? 'Grain' : 'Side'}`,
          quantity: source.meals.Lunch.quantity,
          calories: source.meals.Lunch.calories,
          protein: source.meals.Lunch.protein,
          carbs: source.meals.Lunch.carbs,
          fat: source.meals.Lunch.fat
        },
        Snacks: source.meals.Snacks,
        Dinner: {
          name: `${source.meals.Dinner.name} & Vegetables`,
          quantity: source.meals.Dinner.quantity,
          calories: source.meals.Dinner.calories,
          protein: source.meals.Dinner.protein,
          carbs: source.meals.Dinner.carbs,
          fat: source.meals.Dinner.fat
        }
      },
      totals: source.totals
    };
  };

  return [
    buildDayOutput(1, day1),
    buildDayOutput(2, day2)
  ];
}

// Calculate Healthy Score (0 - 100)
export function calculateHealthyScore(totals: ReturnType<typeof calculateAnalysisTotals>['totals'], targets: DailyTargets, waterCurrent: number): number {
  if (targets.calories === 0) return 0;
  
  let score = 100;

  // Calorie deviation penalty (target vs current)
  const calDeviation = Math.abs(totals.calories - targets.calories) / targets.calories;
  if (calDeviation > 0.1) score -= Math.min(20, (calDeviation - 0.1) * 50);

  // Protein shortfall penalty
  const proteinRatio = totals.protein / targets.protein;
  if (proteinRatio < 0.8) score -= Math.min(25, (0.8 - proteinRatio) * 50);

  // Fiber shortfall penalty
  const fiberRatio = totals.fiber / RDA_MICROS.fiber.value;
  if (fiberRatio < 0.7) score -= Math.min(15, (0.7 - fiberRatio) * 30);

  // Water deficiency penalty
  const waterRatio = waterCurrent / targets.water;
  if (waterRatio < 0.8) score -= Math.min(15, (0.8 - waterRatio) * 30);

  // Sugar excess penalty
  if (totals.sugar > RDA_MICROS.sugar.value) {
    score -= Math.min(15, ((totals.sugar - RDA_MICROS.sugar.value) / RDA_MICROS.sugar.value) * 15);
  }

  // Sodium excess penalty
  if (totals.sodium > RDA_MICROS.sodium.value) {
    score -= Math.min(15, ((totals.sodium - RDA_MICROS.sodium.value) / RDA_MICROS.sodium.value) * 15);
  }

  return Math.max(10, Math.round(score));
}
