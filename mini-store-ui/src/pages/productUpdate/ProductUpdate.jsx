import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProductUpdate.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import request from "../../utils/Request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Bounce, ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);
function ProductUpdate() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const productId = params.get('id');
    const productName = params.get('name');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState(2);
    const listImages = new Array(5).fill('image');
    const [destroyImages, setDestroyImages] = useState([]);
    const [token, setToken] = useState('');
    const getProduct = async () => {
        try {
            const response = await request.get('/api/v1/products/' + productId);
            setName(response.data.name);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setImages(response.data.productImages);
            setCategory(response.data.category.id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    const changeName = (event) => {
        setName(event.target.value);
    }
    const uploadImage = async (file) => {
        try {
            const data = new FormData();
            data.append('img', file);
            const response = await request.post('/cloudinary/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const dataResponse = {
                imageUrl: response.data.url,
                publicId: response.data.public_id
            }
            const imagesArr = [...images, dataResponse];
            setImages(imagesArr);
            console.log(images);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    const handleFile = (event) => {
        const file = event.target.files[0];
        uploadImage(file);
    }
    const destroyImage = async (index) => {
        try {
            const image = images.at(index);
            const newDestroyImages = [...destroyImages, image];
            setDestroyImages(newDestroyImages);
            // const response = await request.delete('/cloudinary/upload/' + image.public_id);
            const dataResponse = [...images];
            dataResponse.splice(index, 1);
            setImages(dataResponse);
            console.log(destroyImages);
            // return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const save = async (newProduct, destroyImages) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        try {
            request.delete('/api/v1/products/deleteImage', { data: destroyImages, headers });
            await request.put('/api/v1/products/' + productId, newProduct, { headers });
            toast.success("cập nhật thành công", {
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
                    navigate("/dashboard")
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveProduct = () => {
        // console.log(images[0].imageUrl);
        const newProduct = {
            name,
            price,
            description,
            categoryId: category,
            thumbnail: images.length > 0 ? images[0].imageUrl : '',
            images
        }
        console.log(destroyImages);
        save(newProduct, destroyImages);
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

    useEffect(() => {
        document.title = productName;
        getProduct();
        

        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        let tokenJson;
        if (token !== null && user !== null) {

            const userLogin = JSON.parse(user);
            if (userLogin.role.name === 'ROLE_ADMIN') {
                tokenJson = JSON.parse(token);
                checkInvalidToken(tokenJson);
                setToken(tokenJson.token);
            } else {
                navigate('/login');
            }

        }
        else {
            navigate('/login');
        }

    }, []);

    return (
        <div className={cx("wrapper")}>
            <h2>Product Detail</h2>
            <div className={cx("form")}>
                <div className={cx("form-update")}>
                    <label htmlFor="product-name">Tên sản phẩm: </label>
                    <input value={name} id="product-name" onChange={(event) => changeName(event)} />
                    <label htmlFor="product-price">Giá: </label>
                    <input value={price} id="product-price" onChange={(event) => setPrice(event.target.value)} />
                    <label htmlFor="product-description">Mô tả: </label>
                    <textarea value={description} id="product-description" onChange={(event) => setDescription(event.target.value)} />
                    <label htmlFor="category">Loại sản phẩm: </label>
                    <select value={category} onChange={(event) => setCategory(event.target.value)} id="category">
                        <option value={2}>Đồ điện tử</option>
                        <option value={3}>Đồ gia dụng</option>
                        <option value={4}>Quần áo</option>
                        <option value={5}>Bánh kẹo</option>
                    </select>
                    <button onClick={handleSaveProduct}>Lưu</button>

                </div>
                <div className={cx("images")}>
                    {listImages.map((image, index) => {
                        return (
                            <label htmlFor={index} key={index} className={cx("custom-file-upload")}>
                                {images.at(index) === undefined ? <FontAwesomeIcon icon={faAdd} /> : <div style={{ width: '100%', height: '100%' }}>
                                    <img src={images[index].imageUrl} alt="zzz" />
                                    <button onClick={() => destroyImage(index)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>}
                                <input type="file" id={index} onChange={handleFile} disabled={images.at(index) === undefined ? false : true} />
                            </label>
                        )
                    })}
                </div>
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
        </div>
    );
}

export default ProductUpdate;