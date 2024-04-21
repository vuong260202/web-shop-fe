import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {routes} from "./routes";
import AuthService from "./service/AuthService";

const App = () => {
    useEffect(() => {
        console.log("check token");
    }, []);

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
