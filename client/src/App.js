import { Switch, Route } from "react-router-dom";
import React ,{ useEffect , lazy, Suspense}  from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import {LoadingOutlined} from "@ant-design/icons"
import SideDrawer from "./components/drawer/SideDrawer";
import { currentUser } from "./functions/auth";


// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
// import Home from "./pages/Home";
// import Header from "./components/nav/Header";
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import History from "./pages/user/History";
// import UserRoutes from "./components/routes/UserRoutes";
// import Password from "./pages/user/Password";
// import WishList from "./pages/user/WishList";
// import AdminRoutes from "./components/routes/AdminRuotes";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CategoryCreate from "./pages/admin/Category/CategoryCreate";
// import CategoryUpdate from "./pages/admin/Category/CategoryUpdate";
// import SubCreate from "./pages/admin/Sub/SubCreate";
// import SubUpdate from "./pages/admin/Sub/SubUpdate";
// import ProductCreate from "./pages/admin/Product/ProductCreate";
// import AllProducts from "./pages/admin/Product/AllProducts";
// import ProductUpdate from "./pages/admin/Product/ProductUpdate";
// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/sub/SubHome";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import SideDrawer from "./components/drawer/SideDrawer";
// import Checkout from "./pages/Checkout";
// import CreateCoupon from "./pages/admin/coupon/CreateCoupon";
// import Payment from "./pages/Payment";



//using lazy

const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoutes = lazy(() => import("./components/routes/UserRoutes"));
const Password = lazy(() => import("./pages/user/Password"));
const WishList = lazy(() => import("./pages/user/WishList"));
const AdminRoutes = lazy(() => import("./components/routes/AdminRuotes"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() => import("./pages/admin/Category/CategoryCreate"));
const CategoryUpdate = lazy(() => import("./pages/admin/Category/CategoryUpdate"));
const SubCreate = lazy(() => import("./pages/admin/Sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/Sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/Product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/Product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/Product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));
const Payment = lazy(() => import("./pages/Payment"));



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        // console.log("token" , idTokenResult);
        currentUser(idTokenResult.token)
          .then((res) => {
            // console.log(res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unSubscribe();
  }, []);
  return (
    <Suspense fallback={<div className="col text-center p-5"><LoadingOutlined/></div>}>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/register/complete">
          <RegisterComplete />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forgot/password">
          <ForgotPassword />
        </Route>
        <UserRoutes exact path="/user/history">
          <History />
        </UserRoutes>
        <UserRoutes exact path="/user/password">
          <Password />
        </UserRoutes>
        <UserRoutes exact path="/user/wishlist">
          <WishList />
        </UserRoutes>
        <AdminRoutes exact path="/admin/dashboard">
          <AdminDashboard />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/category">
          <CategoryCreate />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/category/:slug">
          <CategoryUpdate />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/sub">
          <SubCreate />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/sub/:slug">
          <SubUpdate />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/product">
          <ProductCreate />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/products">
          <AllProducts />
        </AdminRoutes>
        <AdminRoutes exact path="/admin/product/:slug">
          <ProductUpdate />
        </AdminRoutes>
        <Route exact path="/product/:slug">
          <Product />
        </Route>
        <Route exact path="/category/:slug">
          <CategoryHome />
        </Route>
        <Route exact path="/sub/:slug">
          <SubHome />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <UserRoutes exact path="/checkout">
          <Checkout />
        </UserRoutes>
        <AdminRoutes exact path="/admin/coupon">
          <CreateCoupon />
        </AdminRoutes>
        <UserRoutes exact path="/payment">
          <Payment />
        </UserRoutes>
      </Switch>
    </Suspense>
  );
}

export default App;
