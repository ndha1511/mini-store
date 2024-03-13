import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
    const isCart = useSelector((state) => state.addToCart.cart);
    const navigate = useNavigate();

    
    return (
        <Navbar expand="lg" className="bg-body-tertiary container-fluid" fixed='top'>
            <Container fluid className='bg-info'>
                <Navbar.Brand href="/trang-chu">
                    <img src='https://res.cloudinary.com/ddzibjsaq/image/upload/v1710250034/vcpu1ilk0cnrfquedcjx.png' alt='logo' width={30} height={30} className='me-2'/>
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
                    <Button className='me-2 btn-cart' onClick={() => navigate('/gio-hang')}>
                        <FontAwesomeIcon icon={faCartShopping}/>
                        <div className='circle' style={{display: isCart ? 'block' : 'none'}}></div>
                    </Button>
                    <Button className='me-2'><a href='/dang-nhap' style={{color: '#fff', textDecoration: 'none'}}>Đăng nhập</a></Button>
                    <Button><a href='/dang-ky' style={{color: '#fff', textDecoration: 'none'}}>Đăng ký</a></Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;