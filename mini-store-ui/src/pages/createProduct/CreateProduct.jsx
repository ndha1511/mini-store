import { Bounce, ToastContainer, toast } from "react-toastify";
import styles from "../productUpdate/ProductUpdate.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import request from "../../utils/Request";
const cx = classNames.bind(styles);
function CreateProduct() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState(2);
    const listImages = new Array(5).fill('image');
    const [destroyImages, setDestroyImages] = useState([]);
    const [token, setToken] = useState('');
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
    const destroyImage =  (index) => { 
        try {
            const image = images.at(index);
            // console.log(image);
            const newDestroyImages = [...destroyImages, image];
            setDestroyImages(newDestroyImages);
            const response =  request.delete('/cloudinary/upload/' + image.publicId);
            const dataResponse = [...images];
            dataResponse.splice(index, 1);
            setImages(dataResponse);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    const save = async (newProduct) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        try {
            await request.post('/api/v1/products', newProduct, {headers});
            toast.success("thêm mới thành công", {
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
        save(newProduct);
    }
    useEffect(() => {
        document.title = "Thêm sản phẩm";
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

        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        let tokenJson;
        if (token !== null && user !== null) {
            tokenJson = JSON.parse(token);
            checkInvalidToken(tokenJson);
            setToken(tokenJson.token);

        }
        else {
            navigate('/login');
        }
    }, []);
    return (
        
        <div className={cx("wrapper")}>
            <h2>Create Product</h2>
            <div className={cx("form")}>
                <div className={cx("form-update")}>
                    <label htmlFor="product-name">Tên sản phẩm: </label>
                    <input value={name} id="product-name" onChange={(event) => setName(event.target.value)} />
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
                    <button onClick={handleSaveProduct} >Lưu</button>

                </div>
                <div className={cx("images")}>
                    {listImages.map((image, index) => {
                        return (
                            <label htmlFor={index} key={index} className={cx("custom-file-upload")}>
                                {images.at(index) === undefined ? <FontAwesomeIcon icon={faAdd} /> : <div style={{width: '100%', height: '100%'}}>
                                    <img src={images[index].imageUrl} alt="zzz" />
                                    <button onClick={() => destroyImage(index)}>
                                        <FontAwesomeIcon icon={faTrashCan}/>
                                    </button>
                                </div>}
                                <input type="file" id={index} onChange={handleFile} disabled={images.at(index) === undefined ? false : true} accept="image/*"/>
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

export default CreateProduct;