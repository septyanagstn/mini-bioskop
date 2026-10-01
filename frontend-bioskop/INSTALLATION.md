# streamflow-video_streaming-vibrant_block_based - Installation Guide

Get your Vue.js template up and running in minutes.

---

## Prerequisites

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor like **VS Code** (recommended)

To verify Node.js is installed:
```bash
node --version
npm --version
```

---

## Installation Steps

### Step 1: Extract the Template

Extract the downloaded zip file:

```bash
unzip streamflow-video_streaming-vibrant_block_based_vue.zip
cd streamflow-video_streaming-vibrant_block_based
```

**What's Inside:**
- `src/` - Vue components, views, and router
- `public/` - Static assets
- `package.json` - Project dependencies
- `tailwind.config.js` - Tailwind CSS configuration

---

### Step 2: Install Dependencies

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

---

### Step 3: Start the Development Server

```bash
npm run dev
```

Your site will be available at **http://localhost:5173**

---

## Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

---

## Project Structure

```
streamflow-video_streaming-vibrant_block_based/
├── public/
├── src/
│   ├── assets/         # Static assets and global CSS
│   ├── components/     # Reusable UI components
│   ├── views/          # Page components
│   ├── router/         # Vue Router configuration
│   ├── App.vue         # Root component
│   └── main.js         # Entry point
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Need Help?

- [Vue.js Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
