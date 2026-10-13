
## 📁 Project Architecture

```
3dportfolionew/
├── index.html                   # Semantic HTML5 entry point
├── package.json                 # Project configuration & npm scripts
├── .gitignore                   # Git ignore specifications
├── README.md                    # Project documentation & guide
│
├── assets/                      # Static assets
│   ├── fonts/                   # Typography files & fallback styles
│   │   ├── bricolage-grotesque.woff2
│   │   ├── newsreader.woff2
│   │   └── fonts.css            # Font-face declarations
│   └── vendor/                  # Third-party vendor libraries
│       └── three.min.js         # Offline Three.js r128 bundle
│
├── css/                         # Modular CSS design system
│   ├── style.css                # Master stylesheet importing modules
│   ├── tokens.css               # Design tokens, color palette, dark/light theme, resets
│   ├── layout.css               # Top chrome, navigation rail, stations container
│   └── typography.css           # Headings, buttons, links, meta grid, media queries
│
└── js/                          # Modular ES JavaScript
    ├── main.js                  # Central bootstrap & module orchestrator
    ├── theme.js                 # Theme state, toggle handlers, and persistence
    ├── navigation.js            # Scroll tracker, station progress calculator, rail pip sync
    ├── scene.js                 # Three.js engine: renderer, camera spline, lights, render loop
    ├── objects.js               # Procedural 3D station models and spatial coordinates
    └── shards.js                # Ambient instanced particle field
```

---

## 🚀 Getting Started

### Option 1: Instant Local Preview (Zero Install)
You can serve the directory using any static file server:

- **VS Code Live Server:** Right-click [index.html](file:///c:/Users/USER/Downloads/3dportfolionew/index.html) and select **Open with Live Server**.
- **Python:**
  ```bash
  python -m http.server 3000
  ```
- **Node `npx`:**
  ```bash
  npx serve .
  ```

### Option 2: Modern Vite Dev Server (Hot Reloading)
```bash
# 1. Install optional dev dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Create production bundle
npm run build
