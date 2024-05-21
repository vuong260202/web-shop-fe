import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {routes} from "./routes";
import AuthService from "./utils/AuthUtil";
import FetchApi from "./components/api/Fetch.api";
import webService from "./utils/webUtil";
import FooterComponent from "./components/footer/FooterComponent";
import Header from "./components/header/Header";

const App = () => {
    useEffect(() => {
        console.log("check token");
        FetchApi.authAPI.getUser().then((res) => {
            console.log(res);

            if (!res || res.status === 401) {
                AuthService.deleteTokenAndRole();
            }
        })
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
                            element={
                                <div style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <Page />
                                    <FooterComponent />
                                </div>

                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
};

export default App;
