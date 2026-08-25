import { WEEKDAYS, type PlannedMeal, type Weekday } from './types'

export interface PlannerState {
  meals: PlannedMeal[]
  checkedShoppingItems: string[]
}

export type PlannerAction =
  | { type: 'schedule-meal'; meal: PlannedMeal }
  | { type: 'clear-meal'; day: Weekday }
  | { type: 'toggle-shopping-item'; key: string }
  | { type: 'replace-state'; state: PlannerState }

export function createPlannerState(): PlannerState {
  return { meals: [], checkedShoppingItems: [] }
}

export function plannerReducer(
  state: PlannerState,
  action: PlannerAction,
): PlannerState {
  switch (action.type) {
    case 'schedule-meal': {
      const meals = state.meals
        .filter((meal) => meal.day !== action.meal.day)
        .concat(action.meal)
        .sort(
          (left, right) =>
            WEEKDAYS.indexOf(left.day) - WEEKDAYS.indexOf(right.day),
        )
      return { ...state, meals }
    }
    case 'clear-meal':
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.day !== action.day),
      }
    case 'toggle-shopping-item': {
      const isChecked = state.checkedShoppingItems.includes(action.key)
      return {
        ...state,
        checkedShoppingItems: isChecked
          ? state.checkedShoppingItems.filter((key) => key !== action.key)
          : [...state.checkedShoppingItems, action.key].sort(),
      }
    }
    case 'replace-state':
      return action.state
  }
}
