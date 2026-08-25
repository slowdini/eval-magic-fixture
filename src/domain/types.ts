export const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

export type Weekday = (typeof WEEKDAYS)[number]

export interface Ingredient {
  name: string
  quantity: number
  unit: string
}

export interface Recipe {
  id: string
  name: string
  summary: string
  servings: number
  prepMinutes: number
  cookMinutes: number
  tags: string[]
  ingredients: Ingredient[]
  instructions: string[]
}

export interface PlannedMeal {
  day: Weekday
  recipeId: string
  servings: number
}

export interface ShoppingItem {
  key: string
  name: string
  quantity: number
  unit: string
  recipeIds: string[]
}
