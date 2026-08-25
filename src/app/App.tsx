import { Navigate, Route, Routes } from 'react-router-dom'

import { AppLayout } from '../components/AppLayout'
import { PlanPage } from '../pages/PlanPage'
import { RecipeDetailPage } from '../pages/RecipeDetailPage'
import { RecipesPage } from '../pages/RecipesPage'
import { ShoppingListPage } from '../pages/ShoppingListPage'
import { PlannerProvider } from './PlannerProvider'

export function App() {
  return (
    <PlannerProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/shopping-list" element={<ShoppingListPage />} />
          <Route path="*" element={<Navigate replace to="/recipes" />} />
        </Route>
      </Routes>
    </PlannerProvider>
  )
}
