// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import UserDetails from "./pages/UserDetails";
import UserList from "./pages/UserList";

const App: React.FC = () => (
  <Theme>
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  </Theme>
);

export default App;
