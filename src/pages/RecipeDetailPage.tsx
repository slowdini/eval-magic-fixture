import { Link, Navigate, useParams } from 'react-router-dom'

import { recipes } from '../data/recipes'

export function RecipeDetailPage() {
  const { recipeId } = useParams()
  const recipe = recipes.find((candidate) => candidate.id === recipeId)

  if (!recipe) return <Navigate replace to="/recipes" />

  return (
    <article className="page-stack recipe-detail">
      <Link className="back-link" to="/recipes">
        Back to recipe catalog
      </Link>
      <header className="recipe-hero">
        <div className="tag-row">
          {recipe.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <h1>{recipe.name}</h1>
        <p>{recipe.summary}</p>
        <dl className="recipe-meta recipe-meta-large">
          <div>
            <dt>Prep</dt>
            <dd>{recipe.prepMinutes} min</dd>
          </div>
          <div>
            <dt>Cook</dt>
            <dd>{recipe.cookMinutes} min</dd>
          </div>
          <div>
            <dt>Serves</dt>
            <dd>{recipe.servings}</dd>
          </div>
        </dl>
      </header>
      <div className="recipe-columns">
        <section>
          <h2>Ingredients</h2>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ingredient) => (
              <li key={`${ingredient.name}-${ingredient.unit}`}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Method</h2>
          <ol className="instruction-list">
            {recipe.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}
