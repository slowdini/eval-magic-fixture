import { type PropsWithChildren, useEffect, useReducer } from 'react'

import { plannerReducer } from '../domain/planner'
import { loadPlannerState, savePlannerState } from '../domain/storage'
import { PlannerContext } from './plannerContext'

export function PlannerProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(
    plannerReducer,
    undefined,
    loadPlannerState,
  )

  useEffect(() => savePlannerState(state), [state])

  return (
    <PlannerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlannerContext.Provider>
  )
}
