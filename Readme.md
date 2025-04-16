# 📊 analytics-remote

A microfrontend built with Webpack Module Federation (`@module-federation/enhanced`), React, TypeScript, and TailwindCSS. This remote exposes reusable components like `DashboardCard`, `Demo`, and global styles for federation into a host application.

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js v16 or later
- npm (v8+) or yarn

---

### 📦 Install Dependencies

```bash
npm install
🛠️ Development
bash
Copy
Edit
npm start
This spins up the development server at:

arduino
Copy
Edit
http://localhost:3002/
🧪 Build for Production
bash
Copy
Edit
npm run build
The output will be placed in the /dist directory.

📡 Module Federation Setup
This project exposes the following modules via remoteEntry.js:


Remote Module	Path
DashboardCard	./src/App
Demo	./src/components/Demo
styles	./src/globals.css
To consume this remote in a host app:

js
Copy
Edit
remotes: {
  analyticsRemote: "sampleRemote@http://localhost:3002/remoteEntry.js"
}
And then dynamically import:

js
Copy
Edit
const Demo = await import("analyticsRemote/Demo");
🧰 Tech Stack
React 18

TypeScript

Webpack 5 + Module Federation

TailwindCSS

Radix UI

Chart.js, clsx, lucide-react

📝 Notes
Ensure your host app matches shared dependency versions (React, ReactDOM, etc.).

Port 3002 is hardcoded for development. Adjust in webpack.config.js if needed.

TailwindCSS and PostCSS are fully configured with postcss-loader.
