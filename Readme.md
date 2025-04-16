# 📊 Sample Remote Application

A microfrontend built with Webpack Module Federation (`@module-federation/enhanced`), React, TypeScript, and TailwindCSS. This remote exposes reusable components like `DashboardCard`, `Demo`, and global styles for federation into a host application.

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js v16 or later
- npm (v8+) or yarn

---

### Git Clone

```bash
git clone https://github.com/sk5261/sample-remote.git
cd sample-remote
```

### 📦 Install Dependencies

```bash
npm install
```

🛠️ Development
```bash
npm start
```
This spins up the development server at:

```bash
http://localhost:3002/
```

🧪 Build for Production

```bash
npm run build
```
The output will be placed in the /dist directory.

📡 Module Federation Setup
This project exposes the following modules via remoteEntry.js:

Remote Module | Path
DashboardCard | ./src/App
Demo | ./src/components/Demo
styles | ./src/globals.css
To consume this remote in a host app:

```js
remotes: {
  sampleRemote: "sampleRemote@http://localhost:3002/remoteEntry.js"
}
```
And then dynamically import:

```js
const Demo = await import("sampleRemote/Demo");
```
in your host application. Right now we already have more efficient way of doing this.

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
