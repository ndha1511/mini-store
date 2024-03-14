import Dashboard from "../admin/dashboard/dashboard";
import DashboardLayout from "../layouts/dashboard/dashboardLayout";
import Cart from "../pages/cart/cart";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import ProductDetail from "../pages/productDetail/productDetail";
import Register from "../pages/register/register";
import { getProducts, getProductsByCategoryId } from "../services/productService";

export const routes = [
    { path: '/trang-chu', component: Home, getData: getProducts},
    { path: '/do-dien-tu', component: Home, getData: getProductsByCategoryId, categoryId: 2},
    { path: '/do-gia-dung', component: Home, getData: getProductsByCategoryId, categoryId: 3},
    { path: '/quan-ao', component: Home, getData: getProductsByCategoryId, categoryId: 4},
    { path: '/banh-keo', component: Home, getData: getProductsByCategoryId, categoryId: 5},
    { path: '/chi-tiet-san-pham', component: ProductDetail},
    { path: '/gio-hang', component: Cart},
    { path: '/dang-nhap', component: Login, layout: null},
    { path: '/dang-ky', component: Register, layout: null}, 
    { path: '/dashboard', component: Dashboard, layout: DashboardLayout},
]