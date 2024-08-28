import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Products from "./Components/Products/Products.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Notfound from "./Components/Notfound/Notfound.jsx";
import UserContextProvider from "./Components/Context/UserContext.jsx";
import CartContextProvider from "./Components/Context/CartContext.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import Allorders from "./Components/Allorders/Allorders.jsx";
import WishList from "./Components/WishList/WishList.jsx";
import './index.css';
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <ProtectedRoute><Home /></ProtectedRoute>,},{
        path: "cart",
        element: <ProtectedRoute><Cart /></ProtectedRoute>,}
      ,{path: "categories",
        element: <ProtectedRoute><Categories /></ProtectedRoute>,}
        ,{path: "brands",
        element: <ProtectedRoute><Brands /></ProtectedRoute>,},{
        path: "checkout",
        element: <ProtectedRoute><Checkout /></ProtectedRoute>,},
        {path: "allorders",
        element: <ProtectedRoute><Allorders /></ProtectedRoute>,},
        {path: "products",
          element: <ProtectedRoute><Products /></ProtectedRoute>,},{
        path: "productdetails/:id",
        element: <ProtectedRoute><ProductDetails /></ProtectedRoute>,},{
        path: "register",
        element: <Register />, }, {
        path: "wishlist",
        element: <WishList />,},{
        index:true,
        element: <Login />, },{
        path: "*",
        element: <Notfound />,},
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
          <Toaster />
        </UserContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;