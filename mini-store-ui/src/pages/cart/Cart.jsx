import { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import request from '../../utils/Request';
import { Bounce, ToastContainer, toast } from 'react-toastify';
const cx = classNames.bind(styles);
function Cart() {
    const [cart, setCart] = useState([]);
    const [isCart, setIsCart] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [note, setNote] = useState('');
    const [err, setErr] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    let cost = 0;
    const navigate = useNavigate();
    useEffect(() => {
        let carts = localStorage.getItem('cart');
        if (carts !== null) {
            carts = JSON.parse(carts);
            setCart(carts);
            setIsCart(true);
        }
    }, [])
    const payment = () => {
        if (fullName === '' || phoneNumber === '' || address === '') {
            setErr('Vui lòng nhập đủ thông tin');
            return;
        } else {
            setDisabledButton(true);
            let user = localStorage.getItem('user');
            let token = localStorage.getItem('token');
            if (user === null || token === null) {
                navigate('/login');
            } else {
                user = JSON.parse(user);
                token = JSON.parse(token);
                checkInvalidToken(token).then((data) => {
                    fetchDataPayment(data, user).then(() => {
                        localStorage.removeItem('cart');
                    });
                });


            }
        }

    }
    const fetchDataPayment = async (newToken, user) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + newToken.token,
        };
        console.log(headers);
        try {
            const orderData = {
                userId: user.id,
                fullName,
                phoneNumber,
                address,
                paymentMethod,
                shippingMethod: 'giao hàng nhanh',
                shippingAddress: '123 street abc district bcd city',
                note,
                totalMoney: cost

            }
            const orderId = (await request.post('api/v1/orders', orderData, { headers })).data.id;
            cart.map(async (item, index) => {
                const orderDetailItem = {
                    orderId,
                    productId: item.productId,
                    price: item.price,
                    numberOfProducts: item.numberOfProducts,
                    totalMoney: item.totalMoney,
                    color: item.color
                }
                await request.post('api/v1/order_details', orderDetailItem, { headers });
            });
            toast.success("đặt hàng thành công", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                onClose: () => {
                    navigate("/")
                }
            });

        } catch (error) {
            console.log(error);
        }
    }
    const checkInvalidToken = async (data) => {
        try {
            const response = await request.post('api/v1/users/invalidToken', data);
            localStorage.setItem('token', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            const errResponse = error.response;
            if (errResponse.status === 400 || errResponse.status === 403) {
                navigate('/login');
            }
        }

    }
    return (
        <div className={cx("wrapper")}>
            {isCart ? <div className={cx("carts")}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Màu sắc</th>
                            <th>Ảnh</th>
                            <th>Đơn giá</th>
                            <th>Tổng tiền</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => {
                            cost += item.totalMoney;
                            return (
                                <tr key={index}>
                                    <td>{item.productName}</td>
                                    <td>
                                        <button>-</button>
                                        <input value={item.numberOfProducts} disabled />
                                        <button>+</button>
                                    </td>
                                    <td>
                                        {item.color}
                                    </td>
                                    <td>
                                        <img src={item.thumbnail} alt='zz' width={80} height={80} />
                                    </td>

                                    <td>
                                        {item.price}
                                    </td>
                                    <td>{item.totalMoney}</td>
                                    <td>
                                        <button><FontAwesomeIcon icon={faTrash} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Thành tiền: {cost}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className={cx("info")}>
                    <h4>Thông tin giao hàng</h4>
                    <div className={cx("form")}>
                        <div>
                            <label htmlFor='fullName'>Họ và tên người nhận: </label>
                            <input id='fullName' value={fullName} onChange={(event) => setFullName(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='phoneNumber'>Số điện thoại người nhận: </label>
                            <input id='phoneNumber' value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='addess'>Địa chỉ người nhận: </label>
                            <input id='address' value={address} onChange={(event) => setAddress(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='note'>Ghi chú: </label>
                            <input id='note' value={note} onChange={(event) => setNote(event.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='paymentMethod'>Phương thức thanh toán: </label>
                            <select id='paymentMethod' value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                                <option value='cod'>Thanh toán khi nhận hàng</option>
                            </select>
                            <span style={{ color: 'red' }}>{err}</span>
                        </div>
                    </div>
                    <button className={cx("payment")} onClick={payment} disabled={disabledButton}>Đặt hàng</button>
                </div>
            </div> :
                <div>
                    <h3>Bạn chưa có sản phẩm nào trong giỏ hàng</h3>
                    <button onClick={() => navigate('/')}>Về mua sắm</button>
                </div>}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}

            />
        </div>
    );
}

export default Cart;