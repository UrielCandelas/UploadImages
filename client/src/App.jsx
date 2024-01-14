import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import HomeProvider from "./context/HomeContext";

function App() {
  return (
    <HomeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consult" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </HomeProvider>
  );
}

export default App;
