import type { PlannedMeal, Recipe, ShoppingItem } from './types'

function normalized(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase()
}

function rounded(value: number): number {
  return Math.round((value + Number.EPSILON) * 1000) / 1000
}

export function buildShoppingList(
  recipes: Recipe[],
  meals: PlannedMeal[],
): ShoppingItem[] {
  const recipesById = new Map(recipes.map((recipe) => [recipe.id, recipe]))
  const items = new Map<
    string,
    Omit<ShoppingItem, 'recipeIds'> & { recipeIds: Set<string> }
  >()

  for (const meal of meals) {
    const recipe = recipesById.get(meal.recipeId)
    if (!recipe || recipe.servings <= 0 || meal.servings <= 0) continue

    const scale = meal.servings / recipe.servings
    for (const ingredient of recipe.ingredients) {
      const name = ingredient.name.trim().replace(/\s+/g, ' ')
      const unit = ingredient.unit.trim()
      const key = `${normalized(name)}::${normalized(unit)}`
      const existing = items.get(key)

      if (existing) {
        existing.quantity = rounded(
          existing.quantity + ingredient.quantity * scale,
        )
        existing.recipeIds.add(recipe.id)
      } else {
        items.set(key, {
          key,
          name,
          quantity: rounded(ingredient.quantity * scale),
          unit,
          recipeIds: new Set([recipe.id]),
        })
      }
    }
  }

  return [...items.values()]
    .map((item) => ({
      ...item,
      recipeIds: [...item.recipeIds].sort(),
    }))
    .sort(
      (left, right) =>
        left.name.localeCompare(right.name) ||
        left.unit.localeCompare(right.unit),
    )
}
