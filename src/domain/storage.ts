import { createPlannerState, type PlannerState } from './planner'
import { WEEKDAYS, type PlannedMeal, type Weekday } from './types'

export const PLANNER_STORAGE_KEY = 'weeknight:planner:v1'

interface StoredPlannerState {
  version: 1
  state: PlannerState
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isWeekday(value: unknown): value is Weekday {
  return typeof value === 'string' && WEEKDAYS.includes(value as Weekday)
}

function isPlannedMeal(value: unknown): value is PlannedMeal {
  return (
    isRecord(value) &&
    isWeekday(value.day) &&
    typeof value.recipeId === 'string' &&
    value.recipeId.length > 0 &&
    typeof value.servings === 'number' &&
    Number.isFinite(value.servings) &&
    value.servings > 0
  )
}

function isPlannerState(value: unknown): value is PlannerState {
  if (!isRecord(value)) return false
  if (!Array.isArray(value.meals) || !value.meals.every(isPlannedMeal)) {
    return false
  }
  if (
    !Array.isArray(value.checkedShoppingItems) ||
    !value.checkedShoppingItems.every((key) => typeof key === 'string')
  ) {
    return false
  }
  return (
    new Set(value.meals.map((meal) => meal.day)).size === value.meals.length
  )
}

export function loadPlannerState(
  storage: Storage = localStorage,
): PlannerState {
  try {
    const raw = storage.getItem(PLANNER_STORAGE_KEY)
    if (!raw) return createPlannerState()
    const stored: unknown = JSON.parse(raw)
    if (
      !isRecord(stored) ||
      stored.version !== 1 ||
      !isPlannerState(stored.state)
    ) {
      return createPlannerState()
    }
    return stored.state
  } catch {
    return createPlannerState()
  }
}

export function savePlannerState(
  state: PlannerState,
  storage: Storage = localStorage,
): void {
  const stored: StoredPlannerState = { version: 1, state }
  storage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(stored))
}
