import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatVND, getProductById } from "../../services/productService";
import CarouselsCustom from "../../components/carousels/carousels";
import './productDetail.css';
import { Button, Modal } from "react-bootstrap";
import ButtonHover from "../../components/button/buttonHover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { add } from "../../redux/reducers/cartReducer";

const colors = [
    'Đen', 'Đỏ', 'Trắng', 'Hồng phấn'
]
const size = [
    'S', 'M', 'L', 'XL', 'XXL'
]
function ProductDetail() {
    const [id, setId] = useState('');
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState('1');
    const [activeBtn, setActiveBtn] = useState();
    const [disabled, setDisabled] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [activeBtnSize, setActiveBtnSize] = useState();
    const dispatch = useDispatch();



    useEffect(() => {
        const currentParams = new URLSearchParams(window.location.search);
        const productId = currentParams.get('id');
        const productName = currentParams.get('name');

        if (!productId || !productName) navigate('/trang-chu');
        else {
            document.title = productName;
            getProductById(productId)
                .then(resp => { 
                    setProduct(resp); 
                    setId(productId); 
                    setQuantity('1'); 
                    if ((activeBtn || activeBtn === 0) && (activeBtnSize || activeBtnSize === 0)) setDisabled(false);
                })
                .catch(err => console.error(err));
            
            // console.log(product)
            
        }
    }, [navigate, activeBtn, activeBtnSize]);
    const incrementQuantity = () => {
        setQuantity((prev) => Number(prev) + 1);
    }
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity((prev) => Number(prev) - 1);
    }

    const changeQuantity = (event) => {
        const value = event.key;
        if (value === 'Backspace') {
            if (quantity.length > 1)
                setQuantity((prev) => prev.slice(0, -1))
            else
                setQuantity('');
        }
        if (Number(value) || value === '0') {
            setQuantity(prev => prev + value);
        }

    }
    const outInputQuantity = () => {
        if (quantity === '') setQuantity(() => '1');
    }

    const clickBtn = (key) => {
        setActiveBtn(() => key);
    }
    const clickBtnSize = (key) => {
        setActiveBtnSize(() => key);
    }
    const addToCart = () => {
        let cart = [];
        const itemCart = {
            productId: Number(id),
            productName: product.name,
            color: colors[activeBtn],
            size: size[activeBtnSize],
            price: product.price,
            quantity: Number(quantity),
            img: product.thumbnail
        }

        const cartStore = localStorage.getItem("cart");
        if (cartStore) {
            let isCart = false;
            cart = JSON.parse(cartStore);
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].productId === itemCart.productId &&
                    cart[i].color === itemCart.color &&
                    cart[i].size === itemCart.size) {
                    cart[i].quantity += Number(itemCart.quantity);
                    isCart = true;
                } else {
                    continue;
                }
            }
            if (!isCart) { cart.push(itemCart); };
        } else {
            cart.push(itemCart);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(add());
        setShowAlert(true);
    }
    return (
        <div className="wrapper container">
            <Modal show={showAlert} onHide={() => setShowAlert(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thêm sản phẩm vào giỏ hàng thành công</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { setShowAlert(false); navigate('/gio-hang') }}>
                        Đi tới giỏ hàng
                    </Button>
                    <Button variant="success" onClick={() => setShowAlert(false)}>
                        Tiếp tục mua sắm
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="images">
                <CarouselsCustom dataRender={product.productImages} width={500} height={500} />
                <div className="product-info">
                    <h5 style={{ width: "60%" }}>{product.name}</h5>
                    <p>Giá bán: <span>{formatVND(product.price)}</span></p>
                    <div>
                        <p>Màu sắc: </p>
                        {colors.map((item, index) => {
                            return <div className="list-btn" key={index}>
                                <ButtonHover
                                    color={'black'}
                                    borderColor={'gray'}
                                    borderColorHover={'#10ccf4'}
                                    colorHover={'#10ccf4'}
                                    content={item}
                                    click={clickBtn}
                                    active={index === activeBtn}
                                    index={index}
                                    width={100}
                                    height={30}
                                />
                            </div>

                        })}
                    </div>
                    <div>
                        <p>Kích thước: </p>
                        {size.map((item, index) => {
                            return <div className="list-btn" key={index}>
                                <ButtonHover
                                    color={'black'}
                                    borderColor={'gray'}
                                    borderColorHover={'#10ccf4'}
                                    colorHover={'#10ccf4'}
                                    content={item}
                                    click={clickBtnSize}
                                    active={index === activeBtnSize}
                                    index={index}
                                    width={100}
                                    height={30}
                                />
                            </div>

                        })}
                    </div>
                    <div>
                        <p>Số lượng: </p>
                        <Button className="btn-quantity" onClick={decrementQuantity}>-</Button>
                        <input className="input-quantity"
                            value={quantity}
                            onKeyDown={changeQuantity}
                            onBlur={outInputQuantity}
                            readOnly />
                        <Button className="btn-quantity" onClick={incrementQuantity}>+</Button>
                        <p style={{ marginLeft: 50 }}>Số lượng trong kho: 3333</p>
                    </div>
                    <div style={{ marginTop: 130, display: 'flex', width: 420, justifyContent: "space-between" }}>
                        <ButtonHover
                            color={'black'}
                            borderColor={'gray'}
                            borderColorHover={'#10ccf4'}
                            colorHover={'#10ccf4'}
                            content={<div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FontAwesomeIcon icon={faCartPlus} />
                                <span>Thêm vào giỏ hàng</span>
                            </div>}
                            width={200}
                            height={60}
                            disabled={disabled}
                            action={addToCart}
                        />
                        <ButtonHover
                            color={'black'}
                            borderColor={'gray'}
                            borderColorHover={'#10ccf4'}
                            colorHover={'#10ccf4'}
                            content={"Mua ngay"}
                            width={200}
                            height={60}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;