import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routers/routes";
import { Fragment } from "react";
import DefaultLayout from "./layouts/default/default_layout";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;

          if (route.layout)
            Layout = route.layout;
          else if (route.layout === null)
            Layout = Fragment;
          return (
            <Route key={index} path={route.path} element={
              <Layout >
                <Page cb={route.getData} categoryId={route.categoryId ? route.categoryId : null}/>
              </Layout>
            }></Route>
          )
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
