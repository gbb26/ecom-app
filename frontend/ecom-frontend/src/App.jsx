import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Homepage/Home";
import Nav from "./components/Navbar/Nav";
import Prods from "./pages/Products/ProdDet/ProdDet";
import Footer from "./components/Footer/Footer";
import { AppContext } from "./utils/context";

function App() {
  return (
    <AppContext>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:prodID" element={<Prods />} />
      </Routes>
      <Footer />
    </AppContext>
  );
}

export default App;
