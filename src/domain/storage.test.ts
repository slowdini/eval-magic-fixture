import { beforeEach, describe, expect, it } from 'vitest'

import {
  PLANNER_STORAGE_KEY,
  loadPlannerState,
  savePlannerState,
} from './storage'

describe('planner storage', () => {
  beforeEach(() => localStorage.clear())

  it('round-trips a versioned planner state', () => {
    const state = {
      meals: [
        { day: 'friday' as const, recipeId: 'tomato-pasta', servings: 3 },
      ],
      checkedShoppingItems: ['tomatoes::g'],
    }

    savePlannerState(state)

    expect(loadPlannerState()).toEqual(state)
    expect(JSON.parse(localStorage.getItem(PLANNER_STORAGE_KEY) ?? '')).toEqual(
      {
        version: 1,
        state,
      },
    )
  })

  it('returns an empty valid state when stored data is malformed', () => {
    localStorage.setItem(
      PLANNER_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        state: {
          meals: [{ day: 'funday', recipeId: 42, servings: -1 }],
          checkedShoppingItems: 'tomatoes::g',
        },
      }),
    )

    expect(loadPlannerState()).toEqual({
      meals: [],
      checkedShoppingItems: [],
    })
  })
})
