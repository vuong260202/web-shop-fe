import NotFoundPage from "../pages/notFound/NotFoundPage";
import SetPassword from "../pages/auth/changePassword.page";
import Upload from "../pages/admin/Upload.page";
import Product from "../pages/admin/product/products.page";
import UpdateProductDetail from "../pages/admin/product/UpdateProductDetails";
import ProductSearch from "../components/product/ProductSearch";
import ProductDetail from "../pages/product/productDetail.page";
import Home from "../pages/home/home.page";
import Filter from "../pages/product/filter.page";
import Transaction from "../pages/transaction/Transaction.page";
import LoginPage from "../pages/auth/login.page";
import AdminLogin from "../components/admin/auth/Login";
import SignupPage from "../pages/auth/signup.page";

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
        path: '/auth/login',
        page: LoginPage,
    },
    {
        path: '/admin/login',
        page: AdminLogin,
    },
    {
        path: '/auth/sign-up',
        page: SignupPage,
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
        page: Transaction,
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
    },
    {
        path: '/search',
        page: Filter,
    }
]