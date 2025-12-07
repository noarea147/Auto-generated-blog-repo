import React from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>Auto Blog</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
