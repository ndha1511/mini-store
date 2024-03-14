import { Nav } from "react-bootstrap";
import './style.css'


function SideBar() {
    return (
        <div className="sidebar bg-warning">
            <div className="header"><h2>Logo</h2></div>
            <div className="menu">
                <Nav className="flex-column nav-hover">
                    <Nav.Link href="/dashboard" className="nav-link-custom">Dashboard</Nav.Link>
                </Nav>
                <Nav className="flex-column nav-hover">
                    <Nav.Link href="/product-manager" className="nav-link-custom">Quản lý sản phẩm</Nav.Link>
                </Nav>
                <Nav className="flex-column nav-hover">
                    <Nav.Link href="/order-manager" className="nav-link-custom">Quản lý đơn hàng</Nav.Link>
                </Nav>
                <Nav className="flex-column nav-hover">
                    <Nav.Link href="/order-manager" className="nav-link-custom">Thống kê doanh thu</Nav.Link>
                </Nav>
            </div>
            <div className="footer">
                <button>Đăng xuất</button>
            </div>


        </div>
    );
}

export default SideBar;