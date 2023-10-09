import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import TextEditor from "./pages/TextEditor";
import ListDocs from "./pages/ListDocs";
import Login from "./pages/Login";
import Navbar from "./comps/Navbar";
import { useState } from "react";
import { userContext } from "./utils/userContext";

function App() {
  const [user, setUser] = useState({ email: "" });
  return (
    <userContext.Provider value={[user, setUser]}>
      {/* If no user email is present in the app the user will be redirected here to log in */}
      {user.email === "" && <Navigate to="/" replace={true} />}

      <Navbar />
      <Routes>
        <Route path="/editor" element={<TextEditor />} />
        <Route path="/editor/:docId" element={<TextEditor />} />
        <Route path="/list" element={<ListDocs />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
