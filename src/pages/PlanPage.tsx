import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import { usePlanner } from '../app/plannerContext'
import { recipes } from '../data/recipes'
import { WEEKDAYS, type PlannedMeal, type Weekday } from '../domain/types'

function dayLabel(day: Weekday): string {
  return day[0].toLocaleUpperCase() + day.slice(1)
}

function DayPlanner({ day, meal }: { day: Weekday; meal?: PlannedMeal }) {
  const { dispatch } = usePlanner()
  const [recipeId, setRecipeId] = useState(meal?.recipeId ?? '')
  const [servings, setServings] = useState(meal?.servings ?? 4)
  const recipe = recipes.find((candidate) => candidate.id === meal?.recipeId)
  const label = dayLabel(day)

  function schedule(event: FormEvent) {
    event.preventDefault()
    if (!recipeId || !Number.isFinite(servings) || servings < 1) return
    dispatch({
      type: 'schedule-meal',
      meal: { day, recipeId, servings },
    })
  }

  return (
    <article className="day-card">
      <div className="day-card-heading">
        <div>
          <p className="eyebrow">Dinner</p>
          <h2>{label}</h2>
        </div>
        {recipe && meal ? (
          <button
            className="button button-quiet"
            type="button"
            aria-label={`Clear ${label}`}
            onClick={() => dispatch({ type: 'clear-meal', day })}
          >
            Clear
          </button>
        ) : null}
      </div>

      {recipe && meal ? (
        <p className="scheduled-meal">
          <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          <span>{meal.servings} servings</span>
        </p>
      ) : (
        <p className="muted">Nothing planned yet.</p>
      )}

      <form className="day-form" onSubmit={schedule}>
        <label>
          <span>Recipe for {label}</span>
          <select
            value={recipeId}
            onChange={(event) => setRecipeId(event.target.value)}
          >
            <option value="">Choose a recipe</option>
            {recipes.map((candidate) => (
              <option value={candidate.id} key={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Servings for {label}</span>
          <input
            type="number"
            min="1"
            max="12"
            value={servings}
            onChange={(event) => setServings(event.target.valueAsNumber)}
          />
        </label>
        <button className="button" type="submit">
          Save {label}
        </button>
      </form>
    </article>
  )
}

export function PlanPage() {
  const { state } = usePlanner()

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Your week at a glance</p>
          <h1>Dinner plan</h1>
          <p>Pick one dinner per day and adjust the servings for your table.</p>
        </div>
        <Link className="button button-secondary" to="/shopping-list">
          Build shopping list
        </Link>
      </div>
      <div className="plan-grid">
        {WEEKDAYS.map((day) => (
          <DayPlanner
            day={day}
            key={day}
            meal={state.meals.find((meal) => meal.day === day)}
          />
        ))}
      </div>
    </section>
  )
}
