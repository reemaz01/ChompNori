export type DietaryPreference = 'Vegetarian' | 'Eggetarian' | 'Non-Vegetarian' | 'Vegan';

export type Goal = 'Lose Fat' | 'Maintain' | 'Gain Muscle';

export type ActivityLevel = 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Athlete';

export type MealCategory = 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';

export type LogUnit = 'gram' | 'serving' | 'bowl' | 'cup' | 'piece';

export interface UserProfile {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number; // in cm
  weight: number; // in kg
  goal: Goal;
  activityLevel: ActivityLevel;
  dietaryPreference: DietaryPreference;
  waterGoal: number; // in ml
}

export interface Nutrients {
  calories: number;       // kcal
  protein: number;        // g
  carbohydrates: number;  // g
  fat: number;            // g
  fiber: number;          // g
  sugar: number;          // g
  sodium: number;         // mg
  potassium: number;      // mg
  iron: number;           // mg
  calcium: number;        // mg
  magnesium: number;      // mg
  zinc: number;           // mg
  vitaminA: number;       // mcg RAE
  vitaminB1: number;      // mg
  vitaminB2: number;      // mg
  vitaminB3: number;      // mg
  vitaminB6: number;      // mg
  vitaminB12: number;     // mcg
  vitaminC: number;       // mg
  vitaminD: number;       // mcg
  vitaminE: number;       // mg
  vitaminK: number;       // mcg
  folate: number;         // mcg DFE
}

export interface FoodItem extends Nutrients {
  id: string;
  name: string;
  category: string; // Fruit, Vegetable, Grain, Protein, Dairy, Fat/Oil, etc.
  servingSizeGrams: number; // Grams per standard serving
}

export interface LogEntry {
  id: string;
  foodId: string;
  name: string;
  timestamp: string; // ISO string or simple time
  meal: MealCategory;
  quantity: number; // in the selected unit
  unit: LogUnit;
  grams: number; // calculated actual weight
  nutrients: Nutrients;
}

export interface DailyTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  water: number;
}

export interface RiskItem {
  id: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  recommendation: string;
}

export interface Recommendation {
  id: string;
  type: 'success' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  swap?: { from: string; to: string; reason: string };
}

export interface MealPlanDay {
  day: number;
  meals: {
    Breakfast: { name: string; quantity: string; calories: number; protein: number; carbs: number; fat: number };
    Lunch: { name: string; quantity: string; calories: number; protein: number; carbs: number; fat: number };
    Snacks: { name: string; quantity: string; calories: number; protein: number; carbs: number; fat: number };
    Dinner: { name: string; quantity: string; calories: number; protein: number; carbs: number; fat: number };
  };
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
