import { useEffect, useState } from "react";
import { formatVND } from "../../services/productService";
import { deleteCart, updateCart } from "../../utils/localStorageHandle";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { remove } from "../../redux/reducers/cartReducer";

function TrTableCustom({ index, name, price, quantity, color, size, img, productId, render }) {
    const [quantityProduct, setQuantityProduct] = useState(quantity);
    const [totalPrice, setTotalPrice] = useState(price * quantity);
    const dispatch = useDispatch();
    const decrementQuantity = () => {
        if (quantityProduct > 1) {
            setQuantityProduct(prev => {
                updateCart(
                    {
                        productId,
                        productName: name,
                        color,
                        size,
                        price,
                        quantity: prev - 1,
                        img
                    }
                );
                return prev - 1;
            });
            render();
        };

    }
    const incrementQuantity = () => {
        setQuantityProduct(prev => {
            updateCart(
                {
                    productId,
                    productName: name,
                    color,
                    size,
                    price,
                    quantity: prev + 1,
                    img
                }
            );
            return prev + 1;
        });
        render();
    }
    const handleDelete = () => {
        const cart = deleteCart(index)
        if(cart.length === 0) dispatch(remove());
        render();

    }
    useEffect(() => {
        setTotalPrice(price * quantityProduct);
    }, [quantityProduct, price])
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{formatVND(price)}</td>
            <td>
                <button onClick={decrementQuantity}>-</button>
                <input style={{width: "50px", textAlign: "center"}} value={quantityProduct} readOnly />
                <button onClick={incrementQuantity}>+</button>
            </td>
            <td><img src={img} width={50} height={50} alt="product_image"/></td>
            <td>{color}</td>
            <td>{size}</td>
            <td>{formatVND(totalPrice)}</td>
            <td onClick={handleDelete}><Button variant="danger">Xóa</Button></td>
        </tr>
    );
}

export default TrTableCustom;