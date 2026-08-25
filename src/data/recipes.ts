import type { Recipe } from '../domain/types'

export const recipes: Recipe[] = [
  {
    id: 'lemon-herb-chicken',
    name: 'Lemon herb chicken',
    summary: 'Roasted chicken thighs with lemon, garlic, and tender potatoes.',
    servings: 4,
    prepMinutes: 15,
    cookMinutes: 40,
    tags: ['gluten-free', 'one-pan'],
    ingredients: [
      { name: 'Chicken thighs', quantity: 8, unit: 'each' },
      { name: 'Baby potatoes', quantity: 700, unit: 'g' },
      { name: 'Lemon', quantity: 2, unit: 'each' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
    ],
    instructions: [
      'Heat the oven to 220°C.',
      'Toss the potatoes with oil, garlic, and salt in a roasting pan.',
      'Nestle in the chicken, add sliced lemon, and roast until golden.',
    ],
  },
  {
    id: 'coconut-chickpea-curry',
    name: 'Coconut chickpea curry',
    summary: 'A creamy pantry curry brightened with ginger and lime.',
    servings: 4,
    prepMinutes: 10,
    cookMinutes: 25,
    tags: ['vegan', 'one-pot'],
    ingredients: [
      { name: 'Chickpeas', quantity: 2, unit: 'cans' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Baby spinach', quantity: 120, unit: 'g' },
      { name: 'Lime', quantity: 1, unit: 'each' },
    ],
    instructions: [
      'Bloom the spices with grated ginger in a wide pot.',
      'Add chickpeas and coconut milk, then simmer until thickened.',
      'Fold in spinach and finish with lime juice.',
    ],
  },
  {
    id: 'tomato-basil-pasta',
    name: 'Tomato basil pasta',
    summary: 'Silky tomato pasta finished with basil and parmesan.',
    servings: 4,
    prepMinutes: 10,
    cookMinutes: 20,
    tags: ['vegetarian', 'quick'],
    ingredients: [
      { name: 'Rigatoni', quantity: 400, unit: 'g' },
      { name: 'Crushed tomatoes', quantity: 800, unit: 'g' },
      { name: 'Basil', quantity: 1, unit: 'bunch' },
      { name: 'Parmesan', quantity: 80, unit: 'g' },
    ],
    instructions: [
      'Boil the pasta in well-salted water.',
      'Simmer the tomatoes with olive oil until glossy.',
      'Toss pasta with sauce, basil, parmesan, and a splash of pasta water.',
    ],
  },
  {
    id: 'sheet-pan-salmon',
    name: 'Sheet-pan salmon',
    summary: 'Mustard-glazed salmon with crisp green beans and shallots.',
    servings: 4,
    prepMinutes: 15,
    cookMinutes: 20,
    tags: ['gluten-free', 'quick'],
    ingredients: [
      { name: 'Salmon fillets', quantity: 4, unit: 'each' },
      { name: 'Green beans', quantity: 500, unit: 'g' },
      { name: 'Shallots', quantity: 2, unit: 'each' },
      { name: 'Dijon mustard', quantity: 3, unit: 'tbsp' },
    ],
    instructions: [
      'Heat the oven to 210°C.',
      'Roast the beans and shallots for 8 minutes.',
      'Add mustard-glazed salmon and roast until just cooked.',
    ],
  },
  {
    id: 'black-bean-tacos',
    name: 'Black bean tacos',
    summary: 'Smoky beans, crunchy cabbage, and avocado in warm tortillas.',
    servings: 4,
    prepMinutes: 20,
    cookMinutes: 15,
    tags: ['vegan', 'quick'],
    ingredients: [
      { name: 'Black beans', quantity: 2, unit: 'cans' },
      { name: 'Corn tortillas', quantity: 12, unit: 'each' },
      { name: 'Red cabbage', quantity: 300, unit: 'g' },
      { name: 'Avocado', quantity: 2, unit: 'each' },
      { name: 'Lime', quantity: 1, unit: 'each' },
    ],
    instructions: [
      'Warm the beans with cumin and smoked paprika.',
      'Toss shredded cabbage with lime and salt.',
      'Fill warm tortillas with beans, cabbage, and avocado.',
    ],
  },
  {
    id: 'mushroom-risotto',
    name: 'Mushroom risotto',
    summary: 'A deeply savory risotto with browned mushrooms and thyme.',
    servings: 4,
    prepMinutes: 15,
    cookMinutes: 35,
    tags: ['vegetarian', 'weekend'],
    ingredients: [
      { name: 'Arborio rice', quantity: 320, unit: 'g' },
      { name: 'Mushrooms', quantity: 450, unit: 'g' },
      { name: 'Vegetable stock', quantity: 1.2, unit: 'l' },
      { name: 'Parmesan', quantity: 80, unit: 'g' },
    ],
    instructions: [
      'Brown the mushrooms in batches and set aside.',
      'Toast the rice, then add hot stock one ladle at a time.',
      'Fold in mushrooms, parmesan, and thyme.',
    ],
  },
]

export const recipeTags = [
  ...new Set(recipes.flatMap((recipe) => recipe.tags)),
].sort()
