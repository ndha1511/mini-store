
import Header from "../../components/header/header";

function DefaultLayout({children}) {
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
}

export default DefaultLayout;