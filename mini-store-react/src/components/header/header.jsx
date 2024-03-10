import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css';
import { Button, Form } from 'react-bootstrap';

function Header() {
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary container-fluid" fixed='top'>
            <Container fluid className='bg-info'>
                <Navbar.Brand href="/">
                    <img src='' alt='logo' width={30} height={30} className='me-2'/>
                    <span>Mini-store</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='bg-info'>
                    <Nav className="me-5">
                        <Nav.Link href="/trang-chu">Trang chủ</Nav.Link>
                        <Nav.Link href="#link">Sản phẩm bán chạy</Nav.Link>
                        <NavDropdown title="Danh mục" id="basic-nav-dropdown" className='dropdown'>
                            <NavDropdown.Item href='/do-dien-tu'>Đồ điện tử</NavDropdown.Item>
                            <NavDropdown.Item  href='/do-gia-dung'>
                                Đồ gia dụng
                            </NavDropdown.Item>
                            <NavDropdown.Item  href='/quan-ao'>Quần áo</NavDropdown.Item>
                            <NavDropdown.Item  href='/banh-keo'>Bánh kẹo</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="search-box me-auto">
                        <Form.Control
                            type="search"
                            placeholder="Nhập tên sản phẩm cần tìm"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" className='button-search'>Tìm kiếm</Button>
                    </Form>
                    <Button className='me-2'><a href='/login' style={{color: '#fff', textDecoration: 'none'}}>Đăng nhập</a></Button>
                    <Button><a href='/register' style={{color: '#fff', textDecoration: 'none'}}>Đăng ký</a></Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;