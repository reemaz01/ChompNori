import { UserProfile, LogEntry, MealPlanDay } from './types';

const DB_NAME = 'ChompNoriBiteBuddyDB';
const DB_VERSION = 1;

/**
 * Type-safe browser-native IndexedDB manager for ChompNori BiteBuddy.
 * Provides asynchronous transactional operations, auto-migration, and robust data persistence.
 */
class BiteBuddyDatabase {
  private db: IDBDatabase | null = null;

  /**
   * Initialize the database and ensure all object stores are created.
   */
  public init(): Promise<IDBDatabase> {
    if (this.db) {
      return Promise.resolve(this.db);
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        
        // 1. Profile store
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile');
        }
        
        // 2. Log Entries store (with id as keyPath)
        if (!db.objectStoreNames.contains('entries')) {
          db.createObjectStore('entries', { keyPath: 'id' });
        }
        
        // 3. Water tracking store
        if (!db.objectStoreNames.contains('water')) {
          db.createObjectStore('water');
        }
        
        // 4. Meal Planner store
        if (!db.objectStoreNames.contains('mealplan')) {
          db.createObjectStore('mealplan');
        }
        
        // 5. System settings store (Theme mode, etc.)
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings');
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Helper to execute a database transaction safely.
   */
  private async getStore(
    storeName: string,
    mode: IDBTransactionMode = 'readonly'
  ): Promise<IDBObjectStore> {
    const db = await this.init();
    const transaction = db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // ==========================================
  // PROFILE CRUD OPERATIONS
  // ==========================================

  public async getProfile(): Promise<UserProfile> {
    try {
      const store = await this.getStore('profile', 'readonly');
      return new Promise((resolve, reject) => {
        const request = store.get('current');
        request.onsuccess = () => {
          if (request.result) {
            resolve(request.result);
          } else {
            // Default profile if none exists in db
            const defaultProfile: UserProfile = {
              name: 'Chomp Nori',
              age: 26,
              gender: 'Male',
              height: 178,
              weight: 74,
              goal: 'Maintain',
              activityLevel: 'Moderate',
              dietaryPreference: 'Vegetarian',
              waterGoal: 2500
            };
            resolve(defaultProfile);
          }
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error fetching profile from DB:', error);
      throw error;
    }
  }

  public async saveProfile(profile: UserProfile): Promise<void> {
    // Basic Input Validation
    if (!profile.name || profile.name.trim() === '') {
      throw new Error('Profile name cannot be empty');
    }
    if (profile.age < 0 || profile.weight < 0 || profile.height < 0) {
      throw new Error('Biometric inputs must be positive numbers');
    }

    try {
      const store = await this.getStore('profile', 'readwrite');
      return new Promise((resolve, reject) => {
        const request = store.put(profile, 'current');
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error saving profile to DB:', error);
      throw error;
    }
  }

  // ==========================================
  // LOG ENTRIES CRUD OPERATIONS
  // ==========================================

  public async getEntries(): Promise<LogEntry[]> {
    try {
      const store = await this.getStore('entries', 'readonly');
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
          const results = request.result || [];
          if (results.length > 0) {
            // Sort by timestamp descending
            resolve(results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
          } else {
            // Seed default entries on first load
            const defaultEntries: LogEntry[] = [
              {
                id: 'seed-1',
                foodId: 'oats',
                name: 'Rolled Oats (Dry)',
                timestamp: new Date().toISOString(),
                meal: 'Breakfast',
                quantity: 50,
                unit: 'gram',
                grams: 50,
                nutrients: {
                  calories: 195, protein: 8.5, carbohydrates: 33.2, fat: 3.5, fiber: 5.3, sugar: 0.5,
                  sodium: 1, potassium: 215, iron: 2.4, calcium: 27, magnesium: 88, zinc: 2.0,
                  vitaminA: 0, vitaminB1: 0.38, vitaminB2: 0.07, vitaminB3: 0.6, vitaminB6: 0.06, vitaminB12: 0,
                  vitaminC: 0, vitaminD: 0, vitaminE: 0.21, vitaminK: 1.6, folate: 28
                }
              },
              {
                id: 'seed-2',
                foodId: 'curd-plain',
                name: 'Curd / Plain Yogurt',
                timestamp: new Date().toISOString(),
                meal: 'Breakfast',
                quantity: 1,
                unit: 'serving',
                grams: 120,
                nutrients: {
                  calories: 73, protein: 4.2, carbohydrates: 5.6, fat: 4.0, fiber: 0, sugar: 5.6,
                  sodium: 55, potassium: 169, iron: 0.1, calcium: 145, magnesium: 14, zinc: 0.7,
                  vitaminA: 32, vitaminB1: 0.05, vitaminB2: 0.17, vitaminB3: 0.1, vitaminB6: 0.06, vitaminB12: 0.48,
                  vitaminC: 0.6, vitaminD: 0.1, vitaminE: 0.02, vitaminK: 0.2, folate: 8
                }
              },
              {
                id: 'seed-3',
                foodId: 'roti-wholewheat',
                name: 'Roti (Whole Wheat)',
                timestamp: new Date().toISOString(),
                meal: 'Lunch',
                quantity: 2,
                unit: 'piece',
                grams: 80,
                nutrients: {
                  calories: 211, protein: 7.4, carbohydrates: 42.7, fat: 2.5, fiber: 8.1, sugar: 1.0,
                  sodium: 256, potassium: 192, iron: 2.9, calcium: 28, magnesium: 65, zinc: 1.7,
                  vitaminA: 0, vitaminB1: 0.28, vitaminB2: 0.1, vitaminB3: 3.3, vitaminB6: 0.22, vitaminB12: 0,
                  vitaminC: 0, vitaminD: 0, vitaminE: 0.64, vitaminK: 1.7, folate: 33
                }
              },
              {
                id: 'seed-4',
                foodId: 'dal-yellow',
                name: 'Yellow Dal (Cooked)',
                timestamp: new Date().toISOString(),
                meal: 'Lunch',
                quantity: 1,
                unit: 'bowl',
                grams: 375,
                nutrients: {
                  calories: 435, protein: 26.2, carbohydrates: 75.0, fat: 1.5, fiber: 29.2, sugar: 3.0,
                  sodium: 8, potassium: 1350, iron: 7.9, calcium: 71, magnesium: 135, zinc: 3.8,
                  vitaminA: 15, vitaminB1: 0.56, vitaminB2: 0.22, vitaminB3: 3.0, vitaminB6: 0.45, vitaminB12: 0,
                  vitaminC: 5.6, vitaminD: 0, vitaminE: 0.41, vitaminK: 6.4, folate: 450
                }
              }
            ];
            
            // Async write default entries so they persist immediately
            this.saveAllEntries(defaultEntries).catch(console.error);
            resolve(defaultEntries);
          }
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error fetching log entries from DB:', error);
      throw error;
    }
  }

  public async saveAllEntries(entries: LogEntry[]): Promise<void> {
    try {
      const db = await this.init();
      const transaction = db.transaction('entries', 'readwrite');
      const store = transaction.objectStore('entries');

      // Clear existing first
      store.clear();

      for (const entry of entries) {
        store.put(entry);
      }

      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('Error batch-saving entries to DB:', error);
      throw error;
    }
  }

  public async addEntry(entry: LogEntry): Promise<void> {
    if (!entry.name || entry.name.trim() === '') {
      throw new Error('Food name cannot be empty');
    }
    if (entry.quantity <= 0) {
      throw new Error('Food quantity must be greater than zero');
    }

    try {
      const store = await this.getStore('entries', 'readwrite');
      return new Promise((resolve, reject) => {
        const request = store.add(entry);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error adding entry to DB:', error);
      throw error;
    }
  }

  public async updateEntry(entry: LogEntry): Promise<void> {
    if (!entry.name || entry.name.trim() === '') {
      throw new Error('Food name cannot be empty');
    }
    if (entry.quantity <= 0) {
      throw new Error('Food quantity must be greater than zero');
    }

    try {
      const store = await this.getStore('entries', 'readwrite');
      return new Promise((resolve, reject) => {
        const request = store.put(entry);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error updating entry in DB:', error);
      throw error;
    }
  }

  public async deleteEntry(id: string): Promise<void> {
    try {
      const store = await this.getStore('entries', 'readwrite');
      return new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error deleting entry from DB:', error);
      throw error;
    }
  }

  // ==========================================
  // WATER TRACKING CRUD OPERATIONS
  // ==========================================

  public async getWater(): Promise<number> {
    try {
      const store = await this.getStore('water', 'readonly');
      return new Promise((resolve, reject) => {
        const request = store.get('current');
        request.onsuccess = () => {
          resolve(request.result !== undefined ? request.result : 1250);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error fetching water intake from DB:', error);
      throw error;
    }
  }

  public async saveWater(amount: number): Promise<void> {
    if (amount < 0) {
      throw new Error('Water intake cannot be negative');
    }

    try {
      const store = await this.getStore('water', 'readwrite');
      return new Promise((resolve, reject) => {
        const request = store.put(amount, 'current');
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error saving water intake to DB:', error);
      throw error;
    }
  }

  // ==========================================
  // MEAL PLANNER CRUD OPERATIONS
  // ==========================================

  public async getMealPlan(): Promise<MealPlanDay[]> {
    try {
      const store = await this.getStore('mealplan', 'readonly');
      return new Promise((resolve, reject) => {
        const request = store.get('current');
        request.onsuccess = () => {
          resolve(request.result || []);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error fetching meal plan from DB:', error);
      throw error;
    }
  }

  public async saveMealPlan(plan: MealPlanDay[]): Promise<void> {
    try {
      const store = await this.getStore('mealplan', 'readwrite');
      return new Promise((resolve, reject) => {
        const request = store.put(plan, 'current');
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error saving meal plan to DB:', error);
      throw error;
    }
  }

  // ==========================================
  // SYSTEM SETTINGS CRUD OPERATIONS
  // ==========================================

  public async getTheme(): Promise<boolean> {
    try {
      const store = await this.getStore('settings', 'readonly');
      return new Promise((resolve, reject) => {
        const request = store.get('isDark');
        request.onsuccess = () => {
          resolve(request.result !== undefined ? request.result : true);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error fetching theme setting from DB:', error);
      throw error;
    }
  }

  public async saveTheme(isDark: boolean): Promise<void> {
    try {
      const store = await this.getStore('settings', 'readwrite');
      return new Promise((resolve, reject) => {
        const request = store.put(isDark, 'isDark');
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error saving theme setting to DB:', error);
      throw error;
    }
  }
}

export const db = new BiteBuddyDatabase();
