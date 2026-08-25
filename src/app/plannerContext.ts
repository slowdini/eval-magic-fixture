import { createContext, type Dispatch, useContext } from 'react'

import type { PlannerAction, PlannerState } from '../domain/planner'

interface PlannerContextValue {
  state: PlannerState
  dispatch: Dispatch<PlannerAction>
}

export const PlannerContext = createContext<PlannerContextValue | null>(null)

export function usePlanner(): PlannerContextValue {
  const value = useContext(PlannerContext)
  if (!value) throw new Error('usePlanner must be used inside PlannerProvider')
  return value
}
