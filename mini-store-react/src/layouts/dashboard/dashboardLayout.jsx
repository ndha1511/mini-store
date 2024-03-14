import SideBar from "./sidebar";


function DashboardLayout({ children }) {
    return (
        <div className="layout">
            <div>
                <SideBar />
            </div>
            <div className="content">
                <div className="header-layout"></div>
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;