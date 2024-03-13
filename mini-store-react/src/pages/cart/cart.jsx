import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import './cart.css';
import { useEffect, useState } from 'react';
import { getItemToLocalStorage } from '../../utils/localStorageHandle';
import { formatVND } from '../../services/productService';
import TrTableCustom from './trTable';
import { useSelector } from 'react-redux';
import * as formik from 'formik';
import * as yup from 'yup';
function Cart() {
    const [cart, setCart] = useState([]);
    const isCart = useSelector((state) => state.addToCart.cart);
    let totalMoney = 0;
    const [reRender, setReRender] = useState(false);
    const { Formik } = formik;

    const trimTrailingWhitespace = value => value.replace(/\s+$/, '');
    const schema = yup.object().shape({
        fullName: yup.string().required("Họ tên không được để trống"),
        phoneNumber: yup.string().transform(trimTrailingWhitespace).matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ').required("Số điện thoại không được để trống"),
        address: yup.string().required("Địa chỉ không được để trống"),
        paymentMethod: yup.string().matches("cod", 'Phương thức này hiện không thực hiện được').required(),
    });

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }

    //     setValidated(true);
    // };
    useEffect(() => {
        document.title = 'Giỏ hàng';
        if (getItemToLocalStorage("cart")) {
            setCart(getItemToLocalStorage("cart"));
        }
    }, [reRender]);
    const render = () => {
        setReRender(prev => !prev);
    }
    return (
        <div className="wrapper container">
            {isCart ? <div style={{ width: '80%' }}>
                <h3>Giỏ hàng</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Ảnh</th>
                            <th>Màu sắc</th>
                            <th>Kích thước</th>
                            <th>Tổng tiền</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => {
                            totalMoney += item.price * item.quantity;
                            return <TrTableCustom
                                key={index}
                                index={index}
                                name={item.productName}
                                price={item.price}
                                quantity={item.quantity}
                                color={item.color}
                                size={item.size}
                                productId={item.productId}
                                render={render}
                                img={item.img}
                            />
                        }

                        )}
                    </tbody>
                </Table>
                <div style={{ display: 'flex', width: '100%', alignItems: 'flex-end', flexDirection: 'column' }}>
                    <h4>Thành tiền: {formatVND(totalMoney)} </h4>

                </div>
                
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => console.log(values)}
                    initialValues={{
                        fullName: '',
                        phoneNumber: '',
                        address: '',
                        paymentMethod: 'cod',
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', marginBottom: 50 }}>
                            <h4>Thông tin thanh toán</h4>
                            <Row className="mb-5" style={{ width: "50%" }}>

                                <Form.Group as={Col} md="6" controlId="validationCustom01" >
                                    <Form.Label>Họ và tên người nhận</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.fullName}
                                    />
                                    <Form.Control.Feedback type='invalid'>{errors.fullName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom02">
                                    <Form.Label>Số điện thoại người nhận</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        isInvalid={!!errors.phoneNumber}
                                    />
                                    <Form.Control.Feedback type='invalid'>{errors.phoneNumber}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-5" style={{ width: "50%" }}>

                                <Form.Group as={Col} md="12" controlId="validationCustom01" >
                                    <Form.Label>Địa chỉ người nhận</Form.Label>
                                    <Form.Control
                                        name="address"
                                        type="text"
                                        value={values.address}
                                        onChange={handleChange}
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
                                </Form.Group>

                            </Row>
                            <Row className="mb-5" style={{ width: "50%" }}>

                                <Form.Group as={Col} md="6" controlId="validationCustom01" >
                                    <Form.Label>Phương thức thanh toán</Form.Label>
                                    <Form.Select 
                                        name='paymentMethod'
                                        value={values.paymentMethod}
                                        onChange={handleChange}
                                        isInvalid={!!errors.paymentMethod}
                                    >
                                        <option value="cod">Thanh toán khi nhận hàng</option>
                                        <option value="paycard">Thanh toán qua ví điện tử</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type='invalid'>{errors.paymentMethod}</Form.Control.Feedback>
                                </Form.Group>

                            </Row>

                            <Button variant='success' type='submit'>Thanh toán</Button>
                        </Form>
                    )}
                </Formik>
            </div> :
                <div style={{ height: "50vh", display: "flex", alignItems: 'center', justifyItems: "center", width: '1200px', flexDirection: 'column' }}>
                    <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    <a href='/trang-chu' className='btn btn-success'>Đến trang mua sắm</a>
                </div>

            }



        </div>
    );
}

export default Cart;