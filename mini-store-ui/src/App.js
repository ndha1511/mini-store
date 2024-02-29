import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "./routes/Routes";
import DefaultLayout from "./components/layouts/defaultLayout/DefaultLayout";
import {Fragment} from "react";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    if(route.layout)
                        Layout = route.layout;
                    else if (route.layout === null)
                        Layout = Fragment;
                    return (
                        <Route key={index} path={route.path} element={
                            <Layout>
                                <Page/>
                            </Layout>
                        }></Route>
                    )
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
