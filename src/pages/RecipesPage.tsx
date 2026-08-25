import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { recipes, recipeTags } from '../data/recipes'

export function RecipesPage() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('all')
  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return recipes.filter((recipe) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${recipe.name} ${recipe.summary} ${recipe.tags.join(' ')}`
          .toLocaleLowerCase()
          .includes(normalizedQuery)
      return matchesQuery && (tag === 'all' || recipe.tags.includes(tag))
    })
  }, [query, tag])

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Six dependable dinners</p>
          <h1>Recipe catalog</h1>
          <p>
            Choose a recipe, set the servings, and let Weeknight do the math.
          </p>
        </div>
      </div>

      <div className="filters" aria-label="Recipe filters">
        <label>
          <span>Search recipes</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try chickpea or quick"
          />
        </label>
        <label>
          <span>Filter by tag</span>
          <select value={tag} onChange={(event) => setTag(event.target.value)}>
            <option value="all">All tags</option>
            {recipeTags.map((recipeTag) => (
              <option key={recipeTag} value={recipeTag}>
                {recipeTag}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <article className="recipe-card" key={recipe.id}>
              <div className="tag-row">
                {recipe.tags.map((recipeTag) => (
                  <span className="tag" key={recipeTag}>
                    {recipeTag}
                  </span>
                ))}
              </div>
              <h2>
                <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
              </h2>
              <p>{recipe.summary}</p>
              <dl className="recipe-meta">
                <div>
                  <dt>Time</dt>
                  <dd>{recipe.prepMinutes + recipe.cookMinutes} min</dd>
                </div>
                <div>
                  <dt>Serves</dt>
                  <dd>{recipe.servings}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No recipes found</h2>
          <p>Try a different search or tag.</p>
        </div>
      )}
    </section>
  )
}
