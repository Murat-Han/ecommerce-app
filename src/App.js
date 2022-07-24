import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Home from "./pages/Admin/Home";
import Orders from "./pages/Admin/Orders";
import AllProducts from "./pages/Admin/Products";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import LogOutAvoidRoute from "./pages/Auth/LogOutAvoidRoute";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import ProtectedSettingsRoute from "./pages/Auth/ProtectedSettingsRoute";
import ProtectedRouteAdmin from "./pages/Admin/ProtectedRouteAdmin";
import Settings from "./pages/Settings";
import ProductUpdate from "./pages/Admin/ProductUpdate";
import NewProduct from "./pages/Admin/Products/new";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="content">
        <Routes>
          {/* Keeping out from Signin Signup Routes While any user is logged In*/}
          <Route  element={<LogOutAvoidRoute />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route
            path="/products/:product_id"
            element={<ProductDetail />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Products />}></Route>
          {/* Admin Protected Route*/}
          <Route path="/admin" element={<ProtectedRouteAdmin />}>
            <Route index element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<AllProducts />}/>
            <Route path="products/:productId" element={<ProductUpdate/>} />
            <Route path="products/new" element={<NewProduct/>} />
          </Route>
          {/* Admin Protected Route*/}
          <Route path="/" element={<ProtectedSettingsRoute />}>
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* Normal User Protected Route*/}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
