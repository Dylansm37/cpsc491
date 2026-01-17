import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login_Signup";
import UploadFiles from "./pages/UploadFiles";
import Settings from "./pages/Settings";
import Manage from "./pages/ManageFiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/upload" element={<UploadFiles />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/manage" element={<Manage />} />
    </Routes>
  );
}

export default App;
