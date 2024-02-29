
import styles from "./Dashbroad.module.scss";
import classNames from "classnames/bind";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../utils/Request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);



function Dashbroad() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const getProducts = async (newPage) => {
        try {
            const response = await request.get('api/v1/products?page=' + newPage + '&limit=10');
            setProducts(response.data.products);
            setTotalPage(response.data.totalPage);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    const prevPage = () => {
        if (page > 0) {
            setPage(nextPage => {
                const newPage = nextPage - 1;
                getProducts(newPage);
                return newPage;
            });
        }
    }
    const nextPage = () => {
        if (page < totalPage) {
            setPage(prevPage => {
                const newPage = prevPage + 1;
                getProducts(newPage);
                return newPage;
            });

        }
    }
    useEffect(() => {
        document.title = 'Dashbroad';
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
            const userLogin = JSON.parse(user);
            if (userLogin.role.name === 'ROLE_ADMIN') {
                tokenJson = JSON.parse(token);
                checkInvalidToken(tokenJson);
                getProducts(page);
            } else {
                navigate('/login');
            }

        }
        else {
            navigate('/login');
        }
    }, [])
    return (
        <div className={cx("wrapper")}>
            <h2>Danh sách sản phẩm</h2>
            <div>
                <label htmlFor="search-product">Tìm kiếm sản phẩm: </label>
                <input id="search-product" />
                <button>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <button onClick={() => navigate('/dashboard/create')}>
                    <FontAwesomeIcon icon={faAdd} />
                    Thêm mới
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Thumbnail</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((value, index) => {
                        return (
                            <tr key={index} className={cx("product-item")}>
                                <td>
                                    {value.id}
                                </td>
                                <td>
                                    {value.name}
                                </td>
                                <td>
                                    <img src={value.thumbnail} alt="thumbnail" width={50} height={50} />
                                </td>
                                <td>
                                    {value.price}
                                </td>
                                <td>
                                    <button onClick={() => navigate("/dashboard/product?name=" + value.name + "&id=" + value.id)}>Update</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        )

                    })}
                </tbody>


            </table>

            <div>
                {page !== 0 ? <button onClick={() => prevPage()}>Prev</button> : <Fragment />}
                <button onClick={() => nextPage()}>Next</button>
            </div>

        </div>
    );
}

export default Dashbroad;