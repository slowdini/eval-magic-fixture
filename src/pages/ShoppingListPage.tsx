import { Link } from 'react-router-dom'

import { usePlanner } from '../app/plannerContext'
import { recipes } from '../data/recipes'
import { buildShoppingList } from '../domain/ingredients'

function formatQuantity(quantity: number): string {
  return new Intl.NumberFormat('en', {
    maximumFractionDigits: 3,
  }).format(quantity)
}

export function ShoppingListPage() {
  const { state, dispatch } = usePlanner()
  const items = buildShoppingList(recipes, state.meals)

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Scaled and combined for you</p>
          <h1>Shopping list</h1>
          <p>
            Generated from {state.meals.length} planned{' '}
            {state.meals.length === 1 ? 'dinner' : 'dinners'}
          </p>
        </div>
        <Link className="button button-secondary" to="/plan">
          Edit dinner plan
        </Link>
      </div>

      {items.length > 0 ? (
        <ul className="shopping-list">
          {items.map((item) => {
            const checked = state.checkedShoppingItems.includes(item.key)
            const quantity = formatQuantity(item.quantity)
            return (
              <li
                className={checked ? 'shopping-item checked' : 'shopping-item'}
                key={item.key}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    aria-label={`${item.name}, ${quantity} ${item.unit}`}
                    onChange={() =>
                      dispatch({ type: 'toggle-shopping-item', key: item.key })
                    }
                  />
                  <span className="shopping-item-name">{item.name}</span>
                  <span className="shopping-item-quantity">
                    {quantity} {item.unit}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="empty-state">
          <h2>Your list is waiting</h2>
          <p>Plan at least one dinner to generate the ingredients you need.</p>
          <Link className="button" to="/plan">
            Plan dinners
          </Link>
        </div>
      )}
    </section>
  )
}
