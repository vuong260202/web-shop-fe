// import React, {useState} from "react";
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Navigate,
//     useNavigate, useNavigation,
// } from "react-router-dom";
// import {routes} from "./routes";
// import {Input, Layout, Menu} from "antd";
// import items from "./components/menu/Item";
// import DefaultComponent from "./components/default/Default";
// import Footers from "./footer/Footer";
// import HeaderComponent from "./components/header/HeaderComponent";
// import Home from "./components/Home";
//
// const {Header, Content, Sider} = Layout;
//
// const App = () => {
//     const [collapsed, setCollapsed] = useState(false);
//     const navigate = useNavigate();
//
//     const handleH3 = () => {
//         console.log("click");
//         // navigate("/");
//     };
//
//     return (
//         <Layout style={{minHeight: "100vh"}}>
//             <Sider
//                 collapsible
//                 collapsed={collapsed}
//                 onCollapse={(value) => setCollapsed(value)}
//             >
//                 <div
//                     style={{textAlign: "center", color: "white"}}
//                     className="demo-logo-vertical"
//                 >
//                     <h3 onClick={handleH3()}>abc-shop</h3>
//                 </div>
//                 <Menu
//                     style={{textAlign: "left"}}
//                     theme="dark"
//                     defaultSelectedKeys={["1"]}
//                     mode="inline"
//                     items={items()}
//                 />
//             </Sider>
//             <Router>
//                 <Routes>
//                     {routes.map((route) => {
//                         const Page = route.page;
//                         return (
//                             <Route
//                                 key={route.path}
//                                 path={route.path}
//                                 element={
//                                     <Layout>
//                                         <HeaderComponent/>
//                                         <Page/>
//                                         <Footers/>
//                                     </Layout>
//                                 }
//                             />
//                         );
//                     })}
//                 </Routes>
//             </Router>
//         </Layout>
//     );
// };
//
// export default App;

import React, {useState} from "react";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import {routes} from "./routes";

const App = () => {
    if (
        localStorage.getItem("token") === "null" ||
        localStorage.getItem("token") === ""
    ) {
        <Navigate to="/"/>;
    } else {
        <Navigate to="/home"/>;
    }

    return (
        <Router>
            <Routes>
                {/* authenticate */}
                {routes.map((route) => {
                    const Page = route.page;
                    return (
                        <Route
                            path={route.path}
                            element={<Page/>}
                        />
                    );
                })}
            </Routes>
        </Router>
    );
};

export default App;
