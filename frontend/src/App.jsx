import React from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        background: "radial-gradient(at top, #fbfcfd 5%, #f3f4f6 100%)",
      }}
    >
      <header
        style={{
          marginBottom: 40,
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <center>
          <h1>Full-Stack Technical Challenge</h1>
          <p>
            AI-powered blog article generator. Create articles on any topic in
            seconds.
          </p>
        </center>
      </header>
      <main
        style={{
          marginBottom: 40,
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
