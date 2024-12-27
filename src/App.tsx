// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Theme } from "@radix-ui/themes";

const App: React.FC = () => (
  <Theme>
    <Router>
      <Routes></Routes>
    </Router>
  </Theme>
);

export default App;
