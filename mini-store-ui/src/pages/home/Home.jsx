import styles from './Home.module.scss';
import classNames from "classnames/bind";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import request from '../../utils/Request';

const cx = classNames.bind(styles);

const sliderImage = [
    'https://www.sliderrevolution.com/wp-content/uploads/2022/03/template-preview-1.jpg',
    'https://theme.hstatic.net/200000525857/1001046367/14/slider_2.jpg?v=167',
    'https://theme.hstatic.net/200000525857/1001046367/14/slider_1.jpg?v=167',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/14d5f677630559.5c8d3005a7c9c.png'
]

export default function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await request.get('api/v1/products?page=' + currentPage + '&limit=20');
                setProducts(response.data.products);
                setTotalPage(response.data.totalPage);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [currentPage])
    return (
        <div className={cx("wrapper")}>
            <div className={cx("slide")}>
                <Slider {...settings}>
                    {sliderImage.map((uri, index) => (
                        <div key={index}>
                            <img src={uri} alt={"zzz"} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className={cx("center")}>
                <h2>Danh sách sản phẩm</h2>
                <div className={cx("filter")}>
                    <p>Lọc</p>
                    <label htmlFor=''></label>
                </div>
                <div className={cx("products")}>
                    {products.map((value, index) => (
                        <div key={index}>
                            <img src={value.thumbnail} alt={"product"} />
                            <p>{value.name}</p>
                            <div>
                                <p>Price: {value.price}</p>
                                <button onClick={() => navigate('/product?name=' + value.name + '&id=' + value.id)}>Xem chi tiết</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}