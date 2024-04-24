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
import ForgotPasswordPage from "../pages/auth/forgotPassword.page";
import AdminManages from "../pages/admin/product/manages.page";
import ChangeProductPage from "../pages/admin/update/changeProduct.page";
import ChangeCategoryPage from "../pages/admin/update/changeCategoryPage";
import ProfilePage from "../pages/auth/profile.page";
import ChatPage from "../pages/chat/chat.page";

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
        path: '/auth/forgot-password',
        page: ForgotPasswordPage,
    },
    {
        path: '/admin/upload',
        page: Upload,
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
    },
    {
        path: '/admin/manage',
        page: AdminManages
    },
    {
        path: '/admin/:productId/update',
        page: ChangeProductPage,
    },
    {
        path: '/admin/:categoryId/category-update',
        page: ChangeCategoryPage,
    },
    {
        path: '/auth/profile',
        page: ProfilePage
    },
    {
        path: '/chat',
        page: ChatPage
    },
]