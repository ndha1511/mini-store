import DashbroadLayout from "../components/layouts/dashboardLayout/DashboardLayout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Cart from "../pages/cart/Cart";
import CreateProduct from "../pages/createProduct/CreateProduct";
import Dashbroad from "../pages/dashbroad/Dashbroad";
import Home from "../pages/home/Home";
import OrderManagement from "../pages/order/OrderManagement";
import ProductDetail from "../pages/productDetail/ProductDetail";
import ProductUpdate from "../pages/productUpdate/ProductUpdate";

const routes = [
    {path: '', component: Home},
    {path: '/product', component: ProductDetail},
    {path: '/cart', component: Cart},
    {path: '/register', component: Register, layout: null},
    {path: '/login', component: Login, layout: null},
    {path: '/dashboard', component: Dashbroad, layout: DashbroadLayout},
    {path: '/dashboard/product', component: ProductUpdate, layout: DashbroadLayout},
    {path: '/dashboard/create', component: CreateProduct, layout: DashbroadLayout},
    {path: '/dashboard/orders', component: OrderManagement, layout: DashbroadLayout}
]

export {routes}