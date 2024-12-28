import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails";

const App: React.FC = () => {
  return (
    <Theme>
      <Router>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </div>
      </Router>
    </Theme>
  );
};

export default App;
