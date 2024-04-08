import Login from "../components/authentication/Login";
import ProductDetail from "../components/product/Detail";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import AdminLogin from "../components/admin/auth/Login";
import Signup from "../components/authentication/Signup";
import SetPassword from "../components/authentication/SetPassword";
import Upload from "../components/Upload";
import Tables from "../components/Transaction";
import Product from "../components/product/AdminProducts";
import UpdateProductDetail from "../components/UpdateProductDetails";
import Home from "../components/Home";
import ProductSearch from "../components/product/ProductSearch";
import Transaction from "../components/Transaction";

export const routes = [
    {
        path: '/',
        page: Home,
    },
    {
        path: '/:id/detail',
        page: ProductDetail
    },
    {
        path: '*',
        page: NotFoundPage,
    },
    {
        path: '/admin/login',
        page: AdminLogin,
    },
    {
        path: '/auth/login',
        page: Login
    },
    {
        path: '/auth/sign-up',
        page: Signup,
    },
    {
        path: '/change-password',
        page: SetPassword,
    },
    {
        path: '/admin/upload',
        page: Upload,
    },
    {
        path: '/admin/products',
        page: Product,
    },
    {
        path: '/admin/transaction',
        page: Tables,
    },
    {
        path: '/admin/:id/edit',
        page: UpdateProductDetail,
    },
    {
        path: '/product/search',
        page: ProductSearch,
    },
    {
        path: '/transaction/history',
        page: Transaction
    }
]