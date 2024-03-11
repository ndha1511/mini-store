import Home from "../pages/home/home";
import ProductDetail from "../pages/productDetail/productDetail";
import { getProducts, getProductsByCategoryId } from "../services/productService";

export const routes = [
    { path: '/trang-chu', component: Home, getData: getProducts},
    { path: '/do-dien-tu', component: Home, getData: getProductsByCategoryId, categoryId: 2},
    { path: '/do-gia-dung', component: Home, getData: getProductsByCategoryId, categoryId: 3},
    { path: '/quan-ao', component: Home, getData: getProductsByCategoryId, categoryId: 4},
    { path: '/banh-keo', component: Home, getData: getProductsByCategoryId, categoryId: 5},
    { path: '/chi-tiet-san-pham', component: ProductDetail},
]