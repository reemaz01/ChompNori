import { FoodItem } from './types';

// Nutrition database containing 60 foods with realistic values per 100g
export const FOOD_DATABASE: FoodItem[] = [
  {
    id: 'rice-white',
    name: 'White Rice',
    category: 'Grains',
    servingSizeGrams: 150,
    calories: 130, protein: 2.7, carbohydrates: 28, fat: 0.3, fiber: 0.4, sugar: 0.1,
    sodium: 1, potassium: 35, iron: 1.2, calcium: 10, magnesium: 12, zinc: 0.5,
    vitaminA: 0, vitaminB1: 0.08, vitaminB2: 0.01, vitaminB3: 1.6, vitaminB6: 0.1, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.04, vitaminK: 0, folate: 58
  },
  {
    id: 'roti-wholewheat',
    name: 'Roti (Whole Wheat)',
    category: 'Grains',
    servingSizeGrams: 40,
    calories: 264, protein: 9.2, carbohydrates: 53.4, fat: 3.1, fiber: 10.1, sugar: 1.2,
    sodium: 320, potassium: 240, iron: 3.6, calcium: 35, magnesium: 82, zinc: 2.1,
    vitaminA: 0, vitaminB1: 0.35, vitaminB2: 0.12, vitaminB3: 4.1, vitaminB6: 0.28, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.8, vitaminK: 2.1, folate: 42
  },
  {
    id: 'dal-yellow',
    name: 'Yellow Dal (Cooked)',
    category: 'Protein',
    servingSizeGrams: 150,
    calories: 116, protein: 7.0, carbohydrates: 20.0, fat: 0.4, fiber: 7.8, sugar: 0.8,
    sodium: 2, potassium: 360, iron: 2.1, calcium: 19, magnesium: 36, zinc: 1.0,
    vitaminA: 4, vitaminB1: 0.15, vitaminB2: 0.06, vitaminB3: 0.8, vitaminB6: 0.12, vitaminB12: 0,
    vitaminC: 1.5, vitaminD: 0, vitaminE: 0.11, vitaminK: 1.7, folate: 120
  },
  {
    id: 'paneer',
    name: 'Paneer (Cottage Cheese)',
    category: 'Dairy',
    servingSizeGrams: 50,
    calories: 265, protein: 18.3, carbohydrates: 3.2, fat: 20.8, fiber: 0, sugar: 2.6,
    sodium: 18, potassium: 90, iron: 0.2, calcium: 480, magnesium: 15, zinc: 1.2,
    vitaminA: 180, vitaminB1: 0.05, vitaminB2: 0.25, vitaminB3: 0.1, vitaminB6: 0.04, vitaminB12: 1.1,
    vitaminC: 0, vitaminD: 0.5, vitaminE: 0.4, vitaminK: 1.5, folate: 12
  },
  {
    id: 'curd-plain',
    name: 'Curd / Plain Yogurt',
    category: 'Dairy',
    servingSizeGrams: 120,
    calories: 61, protein: 3.5, carbohydrates: 4.7, fat: 3.3, fiber: 0, sugar: 4.7,
    sodium: 46, potassium: 141, iron: 0.1, calcium: 121, magnesium: 12, zinc: 0.6,
    vitaminA: 27, vitaminB1: 0.04, vitaminB2: 0.14, vitaminB3: 0.1, vitaminB6: 0.05, vitaminB12: 0.4,
    vitaminC: 0.5, vitaminD: 0.1, vitaminE: 0.02, vitaminK: 0.2, folate: 7
  },
  {
    id: 'milk-cow',
    name: 'Cow Milk (Toned)',
    category: 'Dairy',
    servingSizeGrams: 200,
    calories: 58, protein: 3.2, carbohydrates: 4.8, fat: 3.0, fiber: 0, sugar: 4.8,
    sodium: 44, potassium: 150, iron: 0.05, calcium: 120, magnesium: 11, zinc: 0.4,
    vitaminA: 46, vitaminB1: 0.04, vitaminB2: 0.18, vitaminB3: 0.1, vitaminB6: 0.04, vitaminB12: 0.45,
    vitaminC: 1.0, vitaminD: 1.2, vitaminE: 0.07, vitaminK: 0.3, folate: 5
  },
  {
    id: 'oats',
    name: 'Rolled Oats (Dry)',
    category: 'Grains',
    servingSizeGrams: 40,
    calories: 389, protein: 16.9, carbohydrates: 66.3, fat: 6.9, fiber: 10.6, sugar: 1.0,
    sodium: 2, potassium: 429, iron: 4.7, calcium: 54, magnesium: 177, zinc: 4.0,
    vitaminA: 0, vitaminB1: 0.76, vitaminB2: 0.14, vitaminB3: 1.1, vitaminB6: 0.12, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.42, vitaminK: 3.2, folate: 56
  },
  {
    id: 'bread-white',
    name: 'White Bread',
    category: 'Grains',
    servingSizeGrams: 50,
    calories: 265, protein: 9.0, carbohydrates: 49.0, fat: 3.2, fiber: 2.7, sugar: 5.0,
    sodium: 490, potassium: 115, iron: 3.6, calcium: 260, magnesium: 25, zinc: 0.9,
    vitaminA: 0, vitaminB1: 0.45, vitaminB2: 0.33, vitaminB3: 4.3, vitaminB6: 0.08, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.22, vitaminK: 0.2, folate: 110
  },
  {
    id: 'egg-boiled',
    name: 'Whole Boiled Egg',
    category: 'Protein',
    servingSizeGrams: 50,
    calories: 155, protein: 12.6, carbohydrates: 1.1, fat: 10.6, fiber: 0, sugar: 1.1,
    sodium: 124, potassium: 126, iron: 1.8, calcium: 50, magnesium: 12, zinc: 1.3,
    vitaminA: 149, vitaminB1: 0.07, vitaminB2: 0.51, vitaminB3: 0.06, vitaminB6: 0.12, vitaminB12: 1.1,
    vitaminC: 0, vitaminD: 2.0, vitaminE: 1.0, vitaminK: 0.3, folate: 44
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast (Grilled)',
    category: 'Protein',
    servingSizeGrams: 100,
    calories: 165, protein: 31.0, carbohydrates: 0, fat: 3.6, fiber: 0, sugar: 0,
    sodium: 74, potassium: 256, iron: 1.0, calcium: 15, magnesium: 29, zinc: 1.0,
    vitaminA: 6, vitaminB1: 0.07, vitaminB2: 0.12, vitaminB3: 13.7, vitaminB6: 0.6, vitaminB12: 0.3,
    vitaminC: 0, vitaminD: 0.1, vitaminE: 0.3, vitaminK: 0.2, folate: 4
  },
  {
    id: 'fish-salmon',
    name: 'Salmon Fish',
    category: 'Protein',
    servingSizeGrams: 100,
    calories: 206, protein: 22.0, carbohydrates: 0, fat: 13.0, fiber: 0, sugar: 0,
    sodium: 60, potassium: 363, iron: 0.3, calcium: 9, magnesium: 27, zinc: 0.4,
    vitaminA: 12, vitaminB1: 0.2, vitaminB2: 0.15, vitaminB3: 8.0, vitaminB6: 0.6, vitaminB12: 3.2,
    vitaminC: 0, vitaminD: 10.9, vitaminE: 1.1, vitaminK: 0.5, folate: 26
  },
  {
    id: 'potato-boiled',
    name: 'Potato (Boiled)',
    category: 'Vegetables',
    servingSizeGrams: 100,
    calories: 87, protein: 1.9, carbohydrates: 20.1, fat: 0.1, fiber: 1.8, sugar: 0.9,
    sodium: 4, potassium: 379, iron: 0.3, calcium: 5, magnesium: 22, zinc: 0.3,
    vitaminA: 0, vitaminB1: 0.1, vitaminB2: 0.02, vitaminB3: 1.4, vitaminB6: 0.3, vitaminB12: 0,
    vitaminC: 13.0, vitaminD: 0, vitaminE: 0.01, vitaminK: 2.0, folate: 10
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'Fruits',
    servingSizeGrams: 120,
    calories: 89, protein: 1.1, carbohydrates: 22.8, fat: 0.3, fiber: 2.6, sugar: 12.2,
    sodium: 1, potassium: 358, iron: 0.3, calcium: 5, magnesium: 27, zinc: 0.15,
    vitaminA: 3, vitaminB1: 0.03, vitaminB2: 0.07, vitaminB3: 0.7, vitaminB6: 0.37, vitaminB12: 0,
    vitaminC: 8.7, vitaminD: 0, vitaminE: 0.1, vitaminK: 0.5, folate: 20
  },
  {
    id: 'apple',
    name: 'Apple (With Skin)',
    category: 'Fruits',
    servingSizeGrams: 150,
    calories: 52, protein: 0.3, carbohydrates: 13.8, fat: 0.2, fiber: 2.4, sugar: 10.4,
    sodium: 1, potassium: 107, iron: 0.12, calcium: 6, magnesium: 5, zinc: 0.04,
    vitaminA: 3, vitaminB1: 0.02, vitaminB2: 0.03, vitaminB3: 0.1, vitaminB6: 0.04, vitaminB12: 0,
    vitaminC: 4.6, vitaminD: 0, vitaminE: 0.18, vitaminK: 2.2, folate: 3
  },
  {
    id: 'orange',
    name: 'Orange',
    category: 'Fruits',
    servingSizeGrams: 130,
    calories: 47, protein: 0.9, carbohydrates: 11.8, fat: 0.1, fiber: 2.4, sugar: 9.4,
    sodium: 0, potassium: 181, iron: 0.1, calcium: 40, magnesium: 10, zinc: 0.07,
    vitaminA: 11, vitaminB1: 0.09, vitaminB2: 0.04, vitaminB3: 0.3, vitaminB6: 0.06, vitaminB12: 0,
    vitaminC: 53.2, vitaminD: 0, vitaminE: 0.18, vitaminK: 0.1, folate: 30
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'Fruits',
    servingSizeGrams: 150,
    calories: 60, protein: 0.8, carbohydrates: 15.0, fat: 0.4, fiber: 1.6, sugar: 13.7,
    sodium: 1, potassium: 168, iron: 0.16, calcium: 11, magnesium: 10, zinc: 0.09,
    vitaminA: 54, vitaminB1: 0.03, vitaminB2: 0.04, vitaminB3: 0.7, vitaminB6: 0.12, vitaminB12: 0,
    vitaminC: 36.4, vitaminD: 0, vitaminE: 0.9, vitaminK: 4.2, folate: 43
  },
  {
    id: 'papaya',
    name: 'Papaya',
    category: 'Fruits',
    servingSizeGrams: 140,
    calories: 43, protein: 0.5, carbohydrates: 10.8, fat: 0.3, fiber: 1.7, sugar: 7.8,
    sodium: 8, potassium: 182, iron: 0.25, calcium: 20, magnesium: 21, zinc: 0.08,
    vitaminA: 47, vitaminB1: 0.02, vitaminB2: 0.03, vitaminB3: 0.3, vitaminB6: 0.04, vitaminB12: 0,
    vitaminC: 60.9, vitaminD: 0, vitaminE: 0.3, vitaminK: 2.6, folate: 38
  },
  {
    id: 'spinach',
    name: 'Spinach (Raw)',
    category: 'Vegetables',
    servingSizeGrams: 50,
    calories: 23, protein: 2.9, carbohydrates: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4,
    sodium: 79, potassium: 558, iron: 2.7, calcium: 99, magnesium: 79, zinc: 0.53,
    vitaminA: 469, vitaminB1: 0.08, vitaminB2: 0.19, vitaminB3: 0.7, vitaminB6: 0.2, vitaminB12: 0,
    vitaminC: 28.1, vitaminD: 0, vitaminE: 2.0, vitaminK: 483, folate: 194
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'Vegetables',
    servingSizeGrams: 80,
    calories: 34, protein: 2.8, carbohydrates: 6.6, fat: 0.4, fiber: 2.6, sugar: 1.7,
    sodium: 33, potassium: 316, iron: 0.7, calcium: 47, magnesium: 21, zinc: 0.4,
    vitaminA: 31, vitaminB1: 0.07, vitaminB2: 0.12, vitaminB3: 0.6, vitaminB6: 0.18, vitaminB12: 0,
    vitaminC: 89.2, vitaminD: 0, vitaminE: 0.78, vitaminK: 102, folate: 63
  },
  {
    id: 'carrot',
    name: 'Carrot (Raw)',
    category: 'Vegetables',
    servingSizeGrams: 70,
    calories: 41, protein: 0.9, carbohydrates: 9.6, fat: 0.2, fiber: 2.8, sugar: 4.7,
    sodium: 69, potassium: 320, iron: 0.3, calcium: 33, magnesium: 12, zinc: 0.24,
    vitaminA: 835, vitaminB1: 0.07, vitaminB2: 0.06, vitaminB3: 1.0, vitaminB6: 0.14, vitaminB12: 0,
    vitaminC: 5.9, vitaminD: 0, vitaminE: 0.66, vitaminK: 13.2, folate: 19
  },
  {
    id: 'tomato',
    name: 'Tomato (Raw)',
    category: 'Vegetables',
    servingSizeGrams: 80,
    calories: 18, protein: 0.9, carbohydrates: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6,
    sodium: 5, potassium: 237, iron: 0.27, calcium: 10, magnesium: 11, zinc: 0.17,
    vitaminA: 42, vitaminB1: 0.04, vitaminB2: 0.02, vitaminB3: 0.6, vitaminB6: 0.08, vitaminB12: 0,
    vitaminC: 13.7, vitaminD: 0, vitaminE: 0.54, vitaminK: 7.9, folate: 15
  },
  {
    id: 'onion',
    name: 'Onion (Raw)',
    category: 'Vegetables',
    servingSizeGrams: 50,
    calories: 40, protein: 1.1, carbohydrates: 9.3, fat: 0.1, fiber: 1.7, sugar: 4.2,
    sodium: 4, potassium: 146, iron: 0.21, calcium: 23, magnesium: 10, zinc: 0.17,
    vitaminA: 0, vitaminB1: 0.05, vitaminB2: 0.03, vitaminB3: 0.12, vitaminB6: 0.12, vitaminB12: 0,
    vitaminC: 7.4, vitaminD: 0, vitaminE: 0.02, vitaminK: 0.4, folate: 19
  },
  {
    id: 'rajma',
    name: 'Rajma / Kidney Beans (Cooked)',
    category: 'Protein',
    servingSizeGrams: 150,
    calories: 127, protein: 8.7, carbohydrates: 22.8, fat: 0.5, fiber: 6.4, sugar: 0.3,
    sodium: 2, potassium: 405, iron: 2.2, calcium: 28, magnesium: 45, zinc: 1.0,
    vitaminA: 0, vitaminB1: 0.16, vitaminB2: 0.06, vitaminB3: 0.6, vitaminB6: 0.12, vitaminB12: 0,
    vitaminC: 1.2, vitaminD: 0, vitaminE: 0.03, vitaminK: 1.5, folate: 130
  },
  {
    id: 'chana',
    name: 'Chana / Chickpeas (Cooked)',
    category: 'Protein',
    servingSizeGrams: 150,
    calories: 164, protein: 8.9, carbohydrates: 27.4, fat: 2.6, fiber: 7.6, sugar: 4.8,
    sodium: 24, potassium: 291, iron: 2.9, calcium: 49, magnesium: 48, zinc: 1.5,
    vitaminA: 1, vitaminB1: 0.12, vitaminB2: 0.06, vitaminB3: 0.5, vitaminB6: 0.14, vitaminB12: 0,
    vitaminC: 1.3, vitaminD: 0, vitaminE: 0.35, vitaminK: 4.0, folate: 172
  },
  {
    id: 'poha',
    name: 'Poha (Flattened Rice cooked)',
    category: 'Grains',
    servingSizeGrams: 120,
    calories: 180, protein: 2.5, carbohydrates: 38.0, fat: 1.5, fiber: 0.7, sugar: 0.5,
    sodium: 150, potassium: 65, iron: 2.0, calcium: 15, magnesium: 18, zinc: 0.4,
    vitaminA: 5, vitaminB1: 0.08, vitaminB2: 0.02, vitaminB3: 1.1, vitaminB6: 0.08, vitaminB12: 0,
    vitaminC: 2.0, vitaminD: 0, vitaminE: 0.1, vitaminK: 0.1, folate: 18
  },
  {
    id: 'idli',
    name: 'Idli (Steamed Rice Cake)',
    category: 'Grains',
    servingSizeGrams: 50,
    calories: 120, protein: 2.8, carbohydrates: 25.0, fat: 0.3, fiber: 1.2, sugar: 0.2,
    sodium: 110, potassium: 50, iron: 0.8, calcium: 10, magnesium: 14, zinc: 0.3,
    vitaminA: 0, vitaminB1: 0.05, vitaminB2: 0.02, vitaminB3: 0.8, vitaminB6: 0.05, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.02, vitaminK: 0, folate: 12
  },
  {
    id: 'dosa',
    name: 'Dosa (Fermented Crepe)',
    category: 'Grains',
    servingSizeGrams: 60,
    calories: 168, protein: 3.9, carbohydrates: 29.0, fat: 3.7, fiber: 1.6, sugar: 0.4,
    sodium: 190, potassium: 75, iron: 1.2, calcium: 12, magnesium: 19, zinc: 0.4,
    vitaminA: 0, vitaminB1: 0.07, vitaminB2: 0.03, vitaminB3: 1.0, vitaminB6: 0.06, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.2, vitaminK: 0.1, folate: 16
  },
  {
    id: 'upma',
    name: 'Upma (Semolina Porridge cooked)',
    category: 'Grains',
    servingSizeGrams: 150,
    calories: 132, protein: 3.1, carbohydrates: 21.0, fat: 4.1, fiber: 1.4, sugar: 0.8,
    sodium: 210, potassium: 85, iron: 1.1, calcium: 16, magnesium: 15, zinc: 0.3,
    vitaminA: 10, vitaminB1: 0.12, vitaminB2: 0.04, vitaminB3: 1.5, vitaminB6: 0.05, vitaminB12: 0,
    vitaminC: 1.5, vitaminD: 0, vitaminE: 0.3, vitaminK: 1.2, folate: 24
  },
  {
    id: 'peanuts',
    name: 'Peanuts',
    category: 'Nuts/Seeds',
    servingSizeGrams: 28,
    calories: 567, protein: 25.8, carbohydrates: 16.1, fat: 49.2, fiber: 8.5, sugar: 4.7,
    sodium: 18, potassium: 705, iron: 4.6, calcium: 92, magnesium: 168, zinc: 3.3,
    vitaminA: 0, vitaminB1: 0.64, vitaminB2: 0.14, vitaminB3: 12.1, vitaminB6: 0.35, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 8.3, vitaminK: 0, folate: 240
  },
  {
    id: 'almonds',
    name: 'Almonds',
    category: 'Nuts/Seeds',
    servingSizeGrams: 28,
    calories: 579, protein: 21.2, carbohydrates: 21.6, fat: 49.9, fiber: 12.5, sugar: 4.4,
    sodium: 1, potassium: 733, iron: 3.7, calcium: 269, magnesium: 270, zinc: 3.1,
    vitaminA: 1, vitaminB1: 0.21, vitaminB2: 1.14, vitaminB3: 3.6, vitaminB6: 0.14, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 25.6, vitaminK: 0, folate: 44
  },
  {
    id: 'cashews',
    name: 'Cashew Nuts',
    category: 'Nuts/Seeds',
    servingSizeGrams: 28,
    calories: 553, protein: 18.2, carbohydrates: 30.2, fat: 43.8, fiber: 3.3, sugar: 5.9,
    sodium: 12, potassium: 660, iron: 6.7, calcium: 37, magnesium: 292, zinc: 5.8,
    vitaminA: 0, vitaminB1: 0.42, vitaminB2: 0.06, vitaminB3: 1.1, vitaminB6: 0.42, vitaminB12: 0,
    vitaminC: 0.5, vitaminD: 0, vitaminE: 0.9, vitaminK: 34.1, folate: 25
  },
  {
    id: 'soybean-chunk',
    name: 'Soybean Chunks (Dry)',
    category: 'Protein',
    servingSizeGrams: 30,
    calories: 345, protein: 52.0, carbohydrates: 33.0, fat: 0.5, fiber: 13.0, sugar: 7.0,
    sodium: 20, potassium: 1450, iron: 15.0, calcium: 350, magnesium: 240, zinc: 4.8,
    vitaminA: 2, vitaminB1: 0.45, vitaminB2: 0.25, vitaminB3: 2.2, vitaminB6: 0.4, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.5, vitaminK: 20.0, folate: 310
  },
  {
    id: 'tofu',
    name: 'Tofu (Firm)',
    category: 'Protein',
    servingSizeGrams: 80,
    calories: 144, protein: 17.3, carbohydrates: 2.8, fat: 8.7, fiber: 2.3, sugar: 0.5,
    sodium: 14, potassium: 244, iron: 2.7, calcium: 683, magnesium: 58, zinc: 1.6,
    vitaminA: 13, vitaminB1: 0.16, vitaminB2: 0.1, vitaminB3: 0.4, vitaminB6: 0.1, vitaminB12: 0,
    vitaminC: 0, vitaminD: 2.0, vitaminE: 0.1, vitaminK: 4.4, folate: 29
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato (Boiled)',
    category: 'Vegetables',
    servingSizeGrams: 120,
    calories: 76, protein: 1.4, carbohydrates: 17.7, fat: 0.1, fiber: 2.5, sugar: 5.7,
    sodium: 27, potassium: 230, iron: 0.5, calcium: 27, magnesium: 18, zinc: 0.2,
    vitaminA: 785, vitaminB1: 0.06, vitaminB2: 0.05, vitaminB3: 0.5, vitaminB6: 0.17, vitaminB12: 0,
    vitaminC: 12.8, vitaminD: 0, vitaminE: 0.9, vitaminK: 1.8, folate: 6
  },
  {
    id: 'corn',
    name: 'Sweet Corn (Boiled)',
    category: 'Vegetables',
    servingSizeGrams: 100,
    calories: 96, protein: 3.4, carbohydrates: 21.0, fat: 1.5, fiber: 2.4, sugar: 4.5,
    sodium: 15, potassium: 218, iron: 0.5, calcium: 2, magnesium: 26, zinc: 0.5,
    vitaminA: 13, vitaminB1: 0.09, vitaminB2: 0.06, vitaminB3: 1.7, vitaminB6: 0.14, vitaminB12: 0,
    vitaminC: 5.5, vitaminD: 0, vitaminE: 0.07, vitaminK: 0.3, folate: 23
  },
  {
    id: 'moong-dal',
    name: 'Moong Dal (Sprouted)',
    category: 'Protein',
    servingSizeGrams: 100,
    calories: 30, protein: 3.0, carbohydrates: 5.9, fat: 0.2, fiber: 1.8, sugar: 4.1,
    sodium: 10, potassium: 101, iron: 0.9, calcium: 13, magnesium: 21, zinc: 0.4,
    vitaminA: 2, vitaminB1: 0.08, vitaminB2: 0.1, vitaminB3: 0.7, vitaminB6: 0.09, vitaminB12: 0,
    vitaminC: 13.2, vitaminD: 0, vitaminE: 0.1, vitaminK: 22.7, folate: 61
  },
  {
    id: 'black-gram',
    name: 'Urad Dal / Black Gram (Cooked)',
    category: 'Protein',
    servingSizeGrams: 150,
    calories: 120, protein: 7.5, carbohydrates: 21.3, fat: 0.4, fiber: 6.5, sugar: 0.5,
    sodium: 4, potassium: 320, iron: 1.8, calcium: 24, magnesium: 40, zinc: 1.0,
    vitaminA: 0, vitaminB1: 0.13, vitaminB2: 0.05, vitaminB3: 0.6, vitaminB6: 0.11, vitaminB12: 0,
    vitaminC: 0.5, vitaminD: 0, vitaminE: 0.05, vitaminK: 1.1, folate: 115
  },
  {
    id: 'sprouts-mixed',
    name: 'Mixed Sprouts',
    category: 'Protein',
    servingSizeGrams: 100,
    calories: 45, protein: 4.2, carbohydrates: 8.5, fat: 0.3, fiber: 2.4, sugar: 3.5,
    sodium: 12, potassium: 150, iron: 1.2, calcium: 22, magnesium: 28, zinc: 0.6,
    vitaminA: 6, vitaminB1: 0.1, vitaminB2: 0.08, vitaminB3: 0.9, vitaminB6: 0.12, vitaminB12: 0,
    vitaminC: 15.0, vitaminD: 0, vitaminE: 0.15, vitaminK: 18.0, folate: 75
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    category: 'Dairy',
    servingSizeGrams: 120,
    calories: 73, protein: 10.0, carbohydrates: 3.6, fat: 1.9, fiber: 0, sugar: 3.6,
    sodium: 36, potassium: 141, iron: 0.05, calcium: 110, magnesium: 11, zinc: 0.6,
    vitaminA: 10, vitaminB1: 0.03, vitaminB2: 0.13, vitaminB3: 0.1, vitaminB6: 0.05, vitaminB12: 0.75,
    vitaminC: 0, vitaminD: 0.1, vitaminE: 0.01, vitaminK: 0.1, folate: 8
  },
  {
    id: 'cheese-cheddar',
    name: 'Cheddar Cheese',
    category: 'Dairy',
    servingSizeGrams: 28,
    calories: 403, protein: 24.9, carbohydrates: 1.3, fat: 33.1, fiber: 0, sugar: 0.5,
    sodium: 621, potassium: 98, iron: 0.15, calcium: 721, magnesium: 28, zinc: 3.1,
    vitaminA: 265, vitaminB1: 0.03, vitaminB2: 0.38, vitaminB3: 0.1, vitaminB6: 0.07, vitaminB12: 1.1,
    vitaminC: 0, vitaminD: 0.6, vitaminE: 0.29, vitaminK: 2.4, folate: 18
  },
  {
    id: 'butter',
    name: 'Butter',
    category: 'Fat/Oil',
    servingSizeGrams: 10,
    calories: 717, protein: 0.9, carbohydrates: 0.1, fat: 81.1, fiber: 0, sugar: 0.1,
    sodium: 11, potassium: 24, iron: 0.02, calcium: 24, magnesium: 2, zinc: 0.09,
    vitaminA: 684, vitaminB1: 0.01, vitaminB2: 0.03, vitaminB3: 0.04, vitaminB6: 0.01, vitaminB12: 0.17,
    vitaminC: 0, vitaminD: 1.5, vitaminE: 2.32, vitaminK: 7.0, folate: 3
  },
  {
    id: 'ghee',
    name: 'Ghee (Clarified Butter)',
    category: 'Fat/Oil',
    servingSizeGrams: 10,
    calories: 884, protein: 0.2, carbohydrates: 0, fat: 99.5, fiber: 0, sugar: 0,
    sodium: 2, potassium: 5, iron: 0, calcium: 4, magnesium: 0, zinc: 0.01,
    vitaminA: 840, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB6: 0, vitaminB12: 0.1,
    vitaminC: 0, vitaminD: 1.8, vitaminE: 2.8, vitaminK: 8.6, folate: 0
  },
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    category: 'Fat/Oil',
    servingSizeGrams: 13,
    calories: 884, protein: 0, carbohydrates: 0, fat: 100.0, fiber: 0, sugar: 0,
    sodium: 2, potassium: 1, iron: 0.56, calcium: 1, magnesium: 0, zinc: 0.03,
    vitaminA: 0, vitaminB1: 0, vitaminB2: 0, vitaminB3: 0, vitaminB6: 0, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 14.4, vitaminK: 60.2, folate: 0
  },
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'Fruits',
    servingSizeGrams: 100,
    calories: 160, protein: 2.0, carbohydrates: 8.5, fat: 14.7, fiber: 6.7, sugar: 0.7,
    sodium: 7, potassium: 485, iron: 0.55, calcium: 12, magnesium: 29, zinc: 0.64,
    vitaminA: 7, vitaminB1: 0.07, vitaminB2: 0.13, vitaminB3: 1.7, vitaminB6: 0.26, vitaminB12: 0,
    vitaminC: 10.0, vitaminD: 0, vitaminE: 2.07, vitaminK: 21.0, folate: 81
  },
  {
    id: 'dates-dry',
    name: 'Dates (Dried)',
    category: 'Fruits',
    servingSizeGrams: 30,
    calories: 277, protein: 1.8, carbohydrates: 75.0, fat: 0.2, fiber: 6.7, sugar: 66.5,
    sodium: 2, potassium: 696, iron: 0.9, calcium: 64, magnesium: 54, zinc: 0.44,
    vitaminA: 1, vitaminB1: 0.05, vitaminB2: 0.06, vitaminB3: 1.6, vitaminB6: 0.25, vitaminB12: 0,
    vitaminC: 0.4, vitaminD: 0, vitaminE: 0.05, vitaminK: 2.7, folate: 15
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    category: 'Fruits',
    servingSizeGrams: 150,
    calories: 30, protein: 0.6, carbohydrates: 7.6, fat: 0.1, fiber: 0.4, sugar: 6.2,
    sodium: 1, potassium: 112, iron: 0.24, calcium: 7, magnesium: 10, zinc: 0.1,
    vitaminA: 28, vitaminB1: 0.03, vitaminB2: 0.02, vitaminB3: 0.2, vitaminB6: 0.05, vitaminB12: 0,
    vitaminC: 8.1, vitaminD: 0, vitaminE: 0.05, vitaminK: 0.1, folate: 3
  },
  {
    id: 'cucumber',
    name: 'Cucumber (Raw with peel)',
    category: 'Vegetables',
    servingSizeGrams: 100,
    calories: 15, protein: 0.7, carbohydrates: 3.6, fat: 0.1, fiber: 0.5, sugar: 1.7,
    sodium: 2, potassium: 147, iron: 0.28, calcium: 16, magnesium: 13, zinc: 0.2,
    vitaminA: 5, vitaminB1: 0.03, vitaminB2: 0.03, vitaminB3: 0.1, vitaminB6: 0.04, vitaminB12: 0,
    vitaminC: 2.8, vitaminD: 0, vitaminE: 0.03, vitaminK: 16.4, folate: 7
  },
  {
    id: 'cauliflower',
    name: 'Cauliflower',
    category: 'Vegetables',
    servingSizeGrams: 100,
    calories: 25, protein: 1.9, carbohydrates: 5.0, fat: 0.3, fiber: 2.0, sugar: 1.9,
    sodium: 30, potassium: 299, iron: 0.42, calcium: 22, magnesium: 15, zinc: 0.27,
    vitaminA: 0, vitaminB1: 0.05, vitaminB2: 0.06, vitaminB3: 0.5, vitaminB6: 0.18, vitaminB12: 0,
    vitaminC: 48.2, vitaminD: 0, vitaminE: 0.08, vitaminK: 15.5, folate: 57
  },
  {
    id: 'capsicum',
    name: 'Capsicum / Bell Pepper (Green)',
    category: 'Vegetables',
    servingSizeGrams: 80,
    calories: 20, protein: 0.9, carbohydrates: 4.6, fat: 0.2, fiber: 1.7, sugar: 2.4,
    sodium: 3, potassium: 175, iron: 0.34, calcium: 10, magnesium: 10, zinc: 0.13,
    vitaminA: 18, vitaminB1: 0.06, vitaminB2: 0.03, vitaminB3: 0.5, vitaminB6: 0.22, vitaminB12: 0,
    vitaminC: 80.4, vitaminD: 0, vitaminE: 0.37, vitaminK: 7.4, folate: 10
  },
  {
    id: 'green-peas',
    name: 'Green Peas (Boiled)',
    category: 'Vegetables',
    servingSizeGrams: 80,
    calories: 84, protein: 5.4, carbohydrates: 15.6, fat: 0.2, fiber: 5.5, sugar: 5.9,
    sodium: 3, potassium: 244, iron: 1.5, calcium: 27, magnesium: 33, zinc: 1.2,
    vitaminA: 40, vitaminB1: 0.25, vitaminB2: 0.15, vitaminB3: 2.1, vitaminB6: 0.22, vitaminB12: 0,
    vitaminC: 14.2, vitaminD: 0, vitaminE: 0.14, vitaminK: 24.8, folate: 65
  },
  {
    id: 'lentils-brown',
    name: 'Brown Lentils (Cooked)',
    category: 'Protein',
    servingSizeGrams: 150,
    calories: 116, protein: 9.0, carbohydrates: 20.1, fat: 0.4, fiber: 7.9, sugar: 1.8,
    sodium: 2, potassium: 369, iron: 3.3, calcium: 19, magnesium: 36, zinc: 1.3,
    vitaminA: 1, vitaminB1: 0.17, vitaminB2: 0.07, vitaminB3: 1.1, vitaminB6: 0.18, vitaminB12: 0,
    vitaminC: 1.5, vitaminD: 0, vitaminE: 0.11, vitaminK: 1.7, folate: 181
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice (Cooked)',
    category: 'Grains',
    servingSizeGrams: 150,
    calories: 112, protein: 2.6, carbohydrates: 23.5, fat: 0.9, fiber: 1.8, sugar: 0.2,
    sodium: 1, potassium: 43, iron: 0.5, calcium: 10, magnesium: 44, zinc: 0.6,
    vitaminA: 0, vitaminB1: 0.18, vitaminB2: 0.04, vitaminB3: 2.6, vitaminB6: 0.14, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.05, vitaminK: 0.2, folate: 10
  },
  {
    id: 'bread-wholewheat',
    name: 'Whole Wheat Bread',
    category: 'Grains',
    servingSizeGrams: 50,
    calories: 247, protein: 13.0, carbohydrates: 41.0, fat: 3.4, fiber: 7.0, sugar: 5.6,
    sodium: 400, potassium: 250, iron: 2.5, calcium: 150, magnesium: 75, zinc: 1.8,
    vitaminA: 0, vitaminB1: 0.4, vitaminB2: 0.2, vitaminB3: 4.5, vitaminB6: 0.2, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.7, vitaminK: 1.4, folate: 50
  },
  {
    id: 'quinoa-cooked',
    name: 'Quinoa (Cooked)',
    category: 'Grains',
    servingSizeGrams: 150,
    calories: 120, protein: 4.4, carbohydrates: 21.3, fat: 1.9, fiber: 2.8, sugar: 0.9,
    sodium: 7, potassium: 172, iron: 1.5, calcium: 17, magnesium: 64, zinc: 1.1,
    vitaminA: 0, vitaminB1: 0.1, vitaminB2: 0.11, vitaminB3: 0.4, vitaminB6: 0.12, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.63, vitaminK: 3.2, folate: 42
  },
  {
    id: 'ragi-flour',
    name: 'Ragi / Finger Millet (Flour)',
    category: 'Grains',
    servingSizeGrams: 40,
    calories: 328, protein: 7.3, carbohydrates: 72.0, fat: 1.3, fiber: 11.5, sugar: 0.6,
    sodium: 11, potassium: 408, iron: 3.9, calcium: 344, magnesium: 137, zinc: 2.3,
    vitaminA: 6, vitaminB1: 0.42, vitaminB2: 0.19, vitaminB3: 1.1, vitaminB6: 0.2, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.8, vitaminK: 2.5, folate: 38
  },
  {
    id: 'bajra-flour',
    name: 'Bajra / Pearl Millet (Flour)',
    category: 'Grains',
    servingSizeGrams: 40,
    calories: 361, protein: 11.6, carbohydrates: 67.5, fat: 4.8, fiber: 1.3, sugar: 0.9,
    sodium: 5, potassium: 307, iron: 8.0, calcium: 42, magnesium: 137, zinc: 3.1,
    vitaminA: 22, vitaminB1: 0.38, vitaminB2: 0.21, vitaminB3: 2.3, vitaminB6: 0.25, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 1.9, vitaminK: 3.1, folate: 45
  },
  {
    id: 'jowar-flour',
    name: 'Jowar / Sorghum (Flour)',
    category: 'Grains',
    servingSizeGrams: 40,
    calories: 339, protein: 11.3, carbohydrates: 74.6, fat: 3.3, fiber: 6.3, sugar: 1.2,
    sodium: 2, potassium: 350, iron: 4.1, calcium: 28, magnesium: 120, zinc: 1.7,
    vitaminA: 0, vitaminB1: 0.35, vitaminB2: 0.14, vitaminB3: 2.9, vitaminB6: 0.3, vitaminB12: 0,
    vitaminC: 0, vitaminD: 0, vitaminE: 0.5, vitaminK: 1.1, folate: 20
  },
  {
    id: 'whey-protein',
    name: 'Whey Protein Powder',
    category: 'Protein',
    servingSizeGrams: 30,
    calories: 390, protein: 80.0, carbohydrates: 6.0, fat: 5.0, fiber: 0, sugar: 2.0,
    sodium: 160, potassium: 450, iron: 0.5, calcium: 400, magnesium: 30, zinc: 0.5,
    vitaminA: 10, vitaminB1: 0.1, vitaminB2: 0.4, vitaminB3: 0.2, vitaminB6: 0.1, vitaminB12: 1.5,
    vitaminC: 0, vitaminD: 0.5, vitaminE: 0.1, vitaminK: 0.2, folate: 10
  },
  {
    id: 'honey',
    name: 'Honey',
    category: 'Sweetener',
    servingSizeGrams: 15,
    calories: 304, protein: 0.3, carbohydrates: 82.4, fat: 0, fiber: 0.2, sugar: 82.1,
    sodium: 4, potassium: 52, iron: 0.42, calcium: 6, magnesium: 2, zinc: 0.22,
    vitaminA: 0, vitaminB1: 0, vitaminB2: 0.04, vitaminB3: 0.12, vitaminB6: 0.02, vitaminB12: 0,
    vitaminC: 0.5, vitaminD: 0, vitaminE: 0, vitaminK: 0, folate: 2
  },
  {
    id: 'pumpkin-seeds',
    name: 'Pumpkin Seeds',
    category: 'Nuts/Seeds',
    servingSizeGrams: 28,
    calories: 559, protein: 30.2, carbohydrates: 10.7, fat: 49.0, fiber: 6.0, sugar: 1.4,
    sodium: 7, potassium: 809, iron: 8.8, calcium: 46, magnesium: 592, zinc: 7.8,
    vitaminA: 1, vitaminB1: 0.27, vitaminB2: 0.15, vitaminB3: 4.4, vitaminB6: 0.1, vitaminB12: 0,
    vitaminC: 1.9, vitaminD: 0, vitaminE: 2.18, vitaminK: 7.4, folate: 58
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    category: 'Nuts/Seeds',
    servingSizeGrams: 15,
    calories: 486, protein: 16.5, carbohydrates: 42.1, fat: 30.7, fiber: 34.4, sugar: 0,
    sodium: 16, potassium: 407, iron: 7.7, calcium: 631, magnesium: 335, zinc: 4.6,
    vitaminA: 54, vitaminB1: 0.62, vitaminB2: 0.17, vitaminB3: 8.8, vitaminB6: 0.1, vitaminB12: 0,
    vitaminC: 1.6, vitaminD: 0, vitaminE: 0.5, vitaminK: 0, folate: 49
  }
];
