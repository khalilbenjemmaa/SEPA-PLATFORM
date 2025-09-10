# Angular Project Structure for SEPA B2B2C

└── 📁src
    ├── 📁app                         # Main Angular application source code
    │   ├── 📁core                    # Global singletons, app-wide services, and core utilities
    │   │   ├── 📁guards              # Route guards (protect pages based on auth/roles)
    │   │   │   ├── auth.guard.ts     # Ensures only authenticated users access certain routes
    │   │   │   └── role.guard.ts     # Restricts access based on user role (admin, HR, employee)
    │   │   ├── 📁interceptors        # HTTP interceptors for cross-cutting concerns
    │   │   │   ├── auth.interceptor.ts   # Attaches JWT tokens to outgoing HTTP requests
    │   │   │   └── error.interceptor.ts  # Handles HTTP errors globally (e.g., 401, 500)
    │   │   ├── 📁models              # TypeScript interfaces / data models (typed contracts)
    │   │   │   ├── cart.model.ts     # Defines cart structure (items, quantities, totals)
    │   │   │   ├── product.model.ts  # Product entity: id, name, category, prices, stock
    │   │   │   ├── user.model.ts     # User entity: id, companyId, role, profile data
    │   │   │   └── order.model.ts    # Order entity: items, status, totals, delivery info
    │   │   ├── 📁services            # Application-wide services (logic/data access)
    │   │   │   ├── auth.service.ts   # Handles login, logout, token refresh, SSO
    │   │   │   ├── cart.service.ts   # Manages cart state & persistence (sync with backend)
    │   │   │   ├── product.service.ts# Fetches products, categories, search filters
    │   │   │   ├── order.service.ts  # Order CRUD, history, reporting
    │   │   │   ├── payment.service.ts# Payment APIs (Stripe, PayPal, SEPA integration)
    │   │   │   └── api.service.ts    # Wrapper around HttpClient for consistent API calls
    │   │   ├── 📁utils               # Helper functions (not services, stateless utilities)
    │   │   │   ├── validators.ts     # Custom form validators (e.g., VAT/SIRET validation)
    │   │   │   └── helpers.ts        # Generic utilities (date formatters, constants, etc.)
    │   │   ├── core.module.ts        # Angular CoreModule (import once in AppModule)
    │   │   └── index.ts              # Barrel export for cleaner imports
    │   │
    │   ├── 📁shared                  # Reusable UI elements, pipes, directives (used everywhere)
    │   │   ├── 📁components          # Generic UI components
    │   │
    │   ├── 📁features                # Feature modules grouped by business domain (per backlog)
    │   │   ├── 📁auth
    │   │   │   ├── login             # Login screen
    │   │   │   │   ├── login.component.ts|html|scss|spec.ts
    │   │   │   ├── register-company  # Company registration (HR admins)
    │   │   │   │   ├── register-company.component.ts|html|scss|spec.ts
    │   │   │   └── auth.module.ts    # Declares & exports auth-related components
    │   │   │
    │   │   ├── 📁profile             # User profile management
    │   │   │   ├── profile.component.ts|html|scss|spec.ts
    │   │   │   └── profile.module.ts
    │   │   │
    │   │   ├── 📁products            # Catalog (list, detail, card)
    │   │   │   ├── product-card
    │   │   │   │   ├── product-card.component.ts|html|scss|spec.ts
    │   │   │   ├── product-detail
    │   │   │   │   ├── product-detail.component.ts|html|scss|spec.ts
    │   │   │   ├── product-list
    │   │   │   │   ├── product-list.component.ts|html|scss|spec.ts
    │   │   │   └── products.module.ts
    │   │   │
    │   │   ├── 📁cart                # Shopping cart
    │   │   │   ├── cart.component.ts|html|scss|spec.ts
    │   │   │   └── cart.module.ts
    │   │   │
    │   │   ├── 📁orders              # Orders management
    │   │   │   ├── order-list
    │   │   │   │   ├── order-list.component.ts|html|scss|spec.ts
    │   │   │   ├── order-detail
    │   │   │   │   ├── order-detail.component.ts|html|scss|spec.ts
    │   │   │   └── orders.module.ts
    │   │   │
    │   │   ├── 📁payments            # Payments & checkout
    │   │   │   ├── checkout
    │   │   │   │   ├── checkout.component.ts|html|scss|spec.ts
    │   │   │   └── payments.module.ts
    │   │   │
    │   │   ├── 📁dashboard           # Admin/HR analytics (Phase 2)
    │   │   │   ├── dashboard.component.ts|html|scss|spec.ts
    │   │   │   └── dashboard.module.ts
    │   │   │
    │   │   └── 📁home                # Landing/homepage
    │   │       ├── home.component.ts|html|scss|spec.ts
    │   │       └── home.module.ts
    │   │
    │   ├── 📁layout                  # Global layout (header/footer/containers)
    │   │   ├── header
    │   │   │   ├── header.component.ts|html|scss|spec.ts
    │   │   ├── footer
    │   │   │   ├── footer.component.ts|html|scss|spec.ts
    │   │   ├── main-layout
    │   │   │   ├── main-layout.component.ts|html|scss|spec.ts
    │   │   └── layout.module.ts
    │   │
    │   ├── 📁state                   # Centralized NgRx store (Redux Toolkit equivalent in Angular)
    │   │   ├── 📁auth
    │   │   │   ├── auth.actions.ts
    │   │   │   ├── auth.reducer.ts
    │   │   │   ├── auth.effects.ts
    │   │   │   └── auth.selectors.ts
    │   │   ├── 📁cart
    │   │   │   ├── cart.actions.ts
    │   │   │   ├── cart.reducer.ts
    │   │   │   ├── cart.effects.ts
    │   │   │   └── cart.selectors.ts
    │   │   ├── app.state.ts          # Root state interface (global shape of store)
    │   │   └── index.ts              # Barrel export for store setup
    │   │
    │   ├── app.config.ts             # Angular app config (providers, imports)
    │   ├── app.config.server.ts      # Server-side rendering (SSR) config
    │   ├── app.routes.ts             # Client-side routing
    │   ├── app.routes.server.ts      # Server-side routes for SSR
    │   ├── app.component.ts|html|scss|spec.ts # Root component (app shell)
    │   └── app.module.ts             # Root Angular module
    │
    ├── 📁assets                      # Static files
    │   ├── 📁icons                   # App icons (logos, SVGs)
    │   │   └── google-logo.svg
    │   ├── 📁images                  # Static images (logos, banners, placeholders)
    │   │   └── logo.png
    │   └── 📁i18n                     # Internationalization (translations)
    │       ├── en.json               # English translations
    │       └── fr.json               # French translations
    │
    ├── 📁environments                # Environment-specific configs
    │   ├── environment.ts            # Development environment
    │   ├── environment.prod.ts       # Production environment
    │   └── environment.staging.ts    # Staging/test environment
    │
    ├── index.html                    # Entry point HTML file
    ├── main.ts                       # Angular bootstrap file
    ├── main.server.ts                # SSR entry point
    ├── server.ts                     # Express/Nest SSR server
    └── styles.scss                   # Global styles
