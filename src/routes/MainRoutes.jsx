import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Category, Home, Item } from "../pages";
import { Navbar } from "../components";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/item/:itemId" element={<Item />} /> {/* Ajusta el parámetro a itemId si es necesario */}
      </Routes>
    </BrowserRouter>
  );
};
