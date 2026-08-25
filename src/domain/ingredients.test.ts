import { describe, expect, it } from 'vitest'

import { buildShoppingList } from './ingredients'
import type { PlannedMeal, Recipe } from './types'

describe('buildShoppingList', () => {
  it('scales planned servings and aggregates only matching ingredient units', () => {
    const recipes: Recipe[] = [
      {
        id: 'tomato-soup',
        name: 'Tomato soup',
        summary: 'A quick soup',
        servings: 2,
        prepMinutes: 10,
        cookMinutes: 20,
        tags: ['vegetarian'],
        ingredients: [
          { name: 'Tomatoes', quantity: 400, unit: 'g' },
          { name: 'Stock', quantity: 500, unit: 'ml' },
        ],
        instructions: ['Simmer.'],
      },
      {
        id: 'tomato-pasta',
        name: 'Tomato pasta',
        summary: 'A weeknight pasta',
        servings: 4,
        prepMinutes: 10,
        cookMinutes: 15,
        tags: ['quick'],
        ingredients: [
          { name: ' tomatoes ', quantity: 600, unit: 'g' },
          { name: 'Stock', quantity: 1, unit: 'l' },
        ],
        instructions: ['Toss.'],
      },
    ]
    const meals: PlannedMeal[] = [
      {
        day: 'monday',
        recipeId: 'tomato-soup',
        servings: 3,
      },
      {
        day: 'tuesday',
        recipeId: 'tomato-pasta',
        servings: 2,
      },
    ]

    expect(buildShoppingList(recipes, meals)).toEqual([
      {
        key: 'stock::l',
        name: 'Stock',
        quantity: 0.5,
        unit: 'l',
        recipeIds: ['tomato-pasta'],
      },
      {
        key: 'stock::ml',
        name: 'Stock',
        quantity: 750,
        unit: 'ml',
        recipeIds: ['tomato-soup'],
      },
      {
        key: 'tomatoes::g',
        name: 'Tomatoes',
        quantity: 900,
        unit: 'g',
        recipeIds: ['tomato-pasta', 'tomato-soup'],
      },
    ])
  })
})
