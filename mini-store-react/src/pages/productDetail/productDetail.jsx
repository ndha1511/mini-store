import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatVND, getProductById } from "../../services/productService";
import CarouselsCustom from "../../components/carousels/carousels";
import './productDetail.css';
import { Button } from "react-bootstrap";
import ButtonHover from "../../components/button/buttonHover";

const colors = [
    'Đen', 'Đỏ', 'Trắng'
]

function ProductDetail() {
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState('1');


    useEffect(() => {
        const currentParams = new URLSearchParams(window.location.search);
        const productId = currentParams.get('id');

        if (!productId) navigate('/trang-chu');
        else {
            getProductById(productId)
                .then(resp => setProduct(resp))
                .catch(err => console.error(err));
        }
    }, [navigate]);
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
    return (
        <div className="wrapper container">
            <div className="images">
                <CarouselsCustom dataRender={product.productImages} width={500} height={500} />
                <div className="product-info">
                    <h5 style={{ width: "60%" }}>{product.name}</h5>
                    <p>Giá bán: <span>{formatVND(product.price)}</span></p>
                    <div>
                        <p>Màu sắc: </p>
                        {colors.map((item, index) => {
                            return <ButtonHover
                                key={index}
                                className="btn-colors"
                                color={'black'}
                                borderColor={'gray'}
                                borderColorHover={'#10ccf4'}
                                colorHover={'#10ccf4'}
                                content={item}
                            />
                            
                        })}
                    </div>
                    <div>
                        <p>Số lượng: </p>
                        <Button onClick={decrementQuantity}>-</Button>
                        <input className="input-quantity" value={quantity} onKeyDown={changeQuantity} onBlur={outInputQuantity} />
                        <Button onClick={incrementQuantity}>+</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;