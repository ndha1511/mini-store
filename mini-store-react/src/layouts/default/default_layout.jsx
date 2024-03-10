
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

function DefaultLayout({children}) {
    return (
        <div>
            <Header/>
            {children ? children : <div style={{height: "500px"}}></div>}
            <Footer/>
        </div>
    );
}

export default DefaultLayout;