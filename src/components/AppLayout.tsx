import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  { to: '/recipes', label: 'Recipes' },
  { to: '/plan', label: 'Plan' },
  { to: '/shopping-list', label: 'Shopping list' },
]

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/recipes" aria-label="Weeknight home">
          <span className="brand-mark" aria-hidden="true">
            W
          </span>
          <span>
            <strong>Weeknight</strong>
            <small>Plan dinner. Shop once.</small>
          </span>
        </NavLink>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
