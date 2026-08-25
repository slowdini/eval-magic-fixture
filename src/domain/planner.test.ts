import { describe, expect, it } from 'vitest'

import { createPlannerState, plannerReducer } from './planner'

describe('plannerReducer', () => {
  it('keeps one meal per day and toggles shopping-list checks', () => {
    let state = createPlannerState()

    state = plannerReducer(state, {
      type: 'schedule-meal',
      meal: { day: 'monday', recipeId: 'tomato-soup', servings: 2 },
    })
    state = plannerReducer(state, {
      type: 'schedule-meal',
      meal: { day: 'monday', recipeId: 'tomato-pasta', servings: 4 },
    })
    state = plannerReducer(state, {
      type: 'toggle-shopping-item',
      key: 'tomatoes::g',
    })

    expect(state).toEqual({
      meals: [{ day: 'monday', recipeId: 'tomato-pasta', servings: 4 }],
      checkedShoppingItems: ['tomatoes::g'],
    })

    state = plannerReducer(state, {
      type: 'toggle-shopping-item',
      key: 'tomatoes::g',
    })
    state = plannerReducer(state, { type: 'clear-meal', day: 'monday' })

    expect(state).toEqual({ meals: [], checkedShoppingItems: [] })
  })
})
