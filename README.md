# PC Manager

**PC Manager** is a web dashboard designed to help organizations manage and monitor their IT equipment inventory. The platform allows administrators to register, classify, and manage computers and hardware components in a structured way, making it easier to track status changes, analyze inventory through key performance indicators (KPIs), and generate reports with interactive visualizations.

The system provides features for managing computers, components, and users, tracking computer status change history, and visualizing inventory data through charts and filters. Additionally, PC Manager includes role-based access control, where administrators have full CRUD access to all resources while regular users can view reports and inventory data.

## Tech Stack

- **Frontend**: Vue 3, TypeScript, Vite, Pinia, Vue Router, Tailwind CSS
- **Package manager**: npm

## Project Structure

- `src/`: Vue 3 + Vite frontend application (main dashboard UI)

## Prerequisites

- **Node.js**: version `^20.19.0` or `>=22.12.0`
- **npm**: comes bundled with Node.js

You can verify your versions with:
```sh
node -v
npm -v
```

## How to Run the Project

1. **Clone the repository**
```sh
   git clone <your-repo-url>
   cd pc-manager
```

2. **Install dependencies**
```sh
   npm install
```

3. **Run the app in development mode**
```sh
   npm run dev
```

4. **Open the app**
   The dev server URL will be shown in the terminal (by default something like `http://localhost:5173`). Open it in your browser to access PC Manager.

## Authors

- **Juan Pablo Avendaño**
- **Juan Manuel Zapata**
- **Andru Quiroz**
