import { Fragment, useEffect, useState } from 'react';
import styles from './ProductDetail.module.scss';
import classNames from "classnames/bind";
import request from '../../utils/Request';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);
const colors = ['black', 'green', 'blue', 'yellow', 'white', 'red'];
export default function ProductDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const productId = params.get('id');
    const productName = params.get('name');
    // const [product, setProduct] = useState({});
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [colorSelected, setColorSelected] = useState(0);
    const [thumbnail, setThumbnail] = useState('');

    const settings = {
        dots: true,
        // arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    const getProduct = async () => {
        try {
            const response = await request.get('/api/v1/products/' + productId);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setImages(response.data.productImages);
            setCategory(response.data.category);
            setThumbnail(response.data.thumbnail);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    const addToCart = () => {
        const color = () => {
            switch (colorSelected) {
                case 0:
                    return 'đen'
                case 1:
                    return 'xanh lá'
                case 2:
                    return 'xanh dương'
                case 3:
                    return 'vàng'
                case 4:
                    return 'trắng'
                default: return 'đỏ'
            }
        }
        const cartItem = {
            productId,
            productName,
            price,
            thumbnail,
            numberOfProducts: quantity,
            totalMoney: price * quantity,
            color: color()
        }
        let cart = localStorage.getItem('cart');
        if (cart === null) {
            cart = [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            cart = JSON.parse(cart);
            let isCart = false;
            cart.map((item, index) => {
                if (item.productId === cartItem.productId) {
                    if (item.color === cartItem.color) {
                        item.numberOfProducts = item.numberOfProducts + cartItem.numberOfProducts;
                        item.totalMoney = item.price + item.numberOfProducts;
                        isCart = true;
                    }
                }
            })
            if (!isCart) {
                cart.push(cartItem);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        toast.success("đã thêm sản phẩm vào giỏ hàng", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
    useEffect(() => {
        document.title = productName;
        getProduct();

    }, [])
    return (
        <div className={cx("wrapper")}>
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
            <h2>{productName}</h2>
            <div className={cx("center")}>
                <div className={cx("images")}>
                    <Slider {...settings}>
                        {images.map((value, index) => (
                            <div key={index}>
                                <img src={value.imageUrl} alt={"zzz"} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className={cx("detail")}>
                    <p>Mô tả: {description}</p>
                    <p>Giá: {price}</p>
                    <p>Loại sản phẩm: {category.name}</p>
                    <div className={cx("amount")}>
                        <p>Số lượng: </p>
                        <button onClick={() => {
                            if (quantity > 1) setQuantity(quantity - 1);
                        }}>-</button>
                        <input value={quantity} disabled />
                        <button onClick={() => {
                            setQuantity(quantity + 1);
                        }}>+</button>
                    </div>
                    <div>
                        Màu sắc:
                        {colors.map((color, index) => {
                            return (
                                <button onClick={() => setColorSelected(index)} key={index} style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: color,
                                    marginLeft: 10,
                                    color: 'white'
                                }}>
                                    {colorSelected === index ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCircle} />}
                                </button>
                            )
                        })}
                    </div>
                    <button className={cx("addToCart")} onClick={addToCart}>Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    )
}