import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { App } from './App'
import { savePlannerState } from '../domain/storage'

describe('Weeknight', () => {
  beforeEach(() => localStorage.clear())

  it('filters the recipe catalog by search text and tag', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/recipes']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Recipe catalog' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Plan' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Shopping list' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Coconut chickpea curry')).toBeInTheDocument()
    expect(screen.getByText('Lemon herb chicken')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Search recipes'), 'chickpea')

    expect(screen.getByText('Coconut chickpea curry')).toBeInTheDocument()
    expect(screen.queryByText('Lemon herb chicken')).not.toBeInTheDocument()

    await user.clear(screen.getByLabelText('Search recipes'))
    await user.selectOptions(screen.getByLabelText('Filter by tag'), 'vegan')

    expect(screen.getByText('Coconut chickpea curry')).toBeInTheDocument()
    expect(screen.getByText('Black bean tacos')).toBeInTheDocument()
    expect(screen.queryByText('Lemon herb chicken')).not.toBeInTheDocument()
  })

  it('schedules a recipe and serving count for a day', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/plan']}>
        <App />
      </MemoryRouter>,
    )

    await user.selectOptions(
      screen.getByLabelText('Recipe for Monday'),
      'tomato-basil-pasta',
    )
    const servings = screen.getByLabelText('Servings for Monday')
    await user.clear(servings)
    await user.type(servings, '2')
    await user.click(screen.getByRole('button', { name: 'Save Monday' }))

    expect(
      screen.getByRole('link', { name: 'Tomato basil pasta' }),
    ).toBeInTheDocument()
    expect(screen.getByText('2 servings')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Clear Monday' }),
    ).toBeInTheDocument()
  })

  it('builds and checks off a shopping list from planned servings', async () => {
    const user = userEvent.setup()
    savePlannerState({
      meals: [
        { day: 'monday', recipeId: 'black-bean-tacos', servings: 2 },
        {
          day: 'tuesday',
          recipeId: 'coconut-chickpea-curry',
          servings: 4,
        },
      ],
      checkedShoppingItems: [],
    })
    render(
      <MemoryRouter initialEntries={['/shopping-list']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Shopping list' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Generated from 2 planned dinners'),
    ).toBeInTheDocument()
    const lime = screen.getByRole('checkbox', {
      name: 'Lime, 1.5 each',
    })
    expect(lime).not.toBeChecked()

    await user.click(lime)

    expect(lime).toBeChecked()
  })

  it('shows recipe ingredients and ordered instructions', () => {
    render(
      <MemoryRouter initialEntries={['/recipes/coconut-chickpea-curry']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Coconut chickpea curry' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Ingredients' }),
    ).toBeInTheDocument()
    expect(screen.getByText('2 cans Chickpeas')).toBeInTheDocument()
    expect(
      screen.getByText('Fold in spinach and finish with lime juice.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Back to recipe catalog' }),
    ).toBeInTheDocument()
  })
})
