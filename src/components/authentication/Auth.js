import signup from "./Signup";
import userLogin from "./Login";
import adminLogin from "../admin/auth/Login";
import setPassword from "./SetPassword";

const Auth = () => {
    const Signup = () => {
        return signup;
    }

    const UserLogin = () => {
        return userLogin;
    }

    const AdminLogin = () => {
        return adminLogin;
    }

    const SetPassword = () => {
        return setPassword;
    }

    return {
        AdminLogin,
        UserLogin,
        Signup,
        SetPassword
    }
}

export default Auth;