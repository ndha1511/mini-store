
import { useEffect, useState } from "react";
import CarouselsCustom from "../../components/carousels/carousels";
import "./home.css";
import CardCustom from "../../components/card/card";
import PaginationCustom from "../../components/pagination/pagination";
import DropdownCustom from "../../components/dropdown/dropdown";
import { useNavigate } from "react-router-dom";

function Home({cb, categoryId}) {
    const currentParams = new URLSearchParams(window.location.search);
    
    let page = currentParams.get("page");
    let limit = currentParams.get("limit");
    let sort = currentParams.get("sort");
    let des = currentParams.get("desc");
    if(!page) page = 1;
    if(!limit) limit = 12;
    if(!sort) sort = "createdAt";
    if(!des) des = true;
    const [sortBy, setSortBy] = useState(sort);
    const navigate = useNavigate();
    const [desc, setDesc] = useState(des);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(page - 1);
    const [totalPages, setTotalPages] = useState(1);

    const carousels = [
        {imageUrl: 'https://kkfashion.vn/wp-content/uploads/2018/10/kk-fashion-big-sale-off-2018.jpg'},
        {imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/27f1ce107056811.5f9e69654c37d.jpg'}, 
    ]
    
    // console.log(page, limit);
    const sortPrice = [
        {name: "Tăng dần", sortBy: "price", desc: false},
        {name: "Giảm dần", sortBy: "price", desc: true} 
    ];
    const sortDate = [
        {name: "Mới nhất", sortBy: "createdAt", desc: true},
        {name: "Cũ nhất", sortBy: "createdAt", desc: false}
    ]
    useEffect(() => {
        document.title = "Trang chủ";
        if(categoryId) {
            cb(categoryId, currentPage, limit, sortBy, desc)
            .then((resp) => {
                setProducts(() => [...resp.products]);
                setTotalPages(() => resp.totalPage);
            })
            .catch((err) => console.log(err));
        } else {
            cb(currentPage, limit, sortBy, desc)
            .then((resp) => {
                setProducts(() => [...resp.products]);
                setTotalPages(() => resp.totalPage);
            })
            .catch((err) => console.log(err));
        }
        

    }, [currentPage, sortBy, desc, cb, categoryId, page, limit]);
    const onNext = () => {
        if(sort !== "createdAt" && des !== true)
            navigate(`${window.location.pathname}?page=${page + 1}&limit=${limit}&sort=${sortBy}&desc=${desc}`);
        else
            navigate(`${window.location.pathname}?page=${page + 1}&limit=${limit}`);
        setCurrentPage((prev) => prev + 1);
    }

    const onPrev = () => {
        if(sort !== "createdAt" && des !== true)
            navigate(`${window.location.pathname}?page=${page - 1}&limit=${limit}&sort=${sortBy}&desc=${desc}`);
        else
            navigate(`${window.location.pathname}?page=${page - 1}&limit=${limit}`);
        setCurrentPage((prev) => prev - 1);
    }

    const onLast = () => {
        if(sort !== "createdAt" && des !== true)
            navigate(`${window.location.pathname}?page=${totalPages}&limit=${limit}&sort=${sortBy}&desc=${desc}`);
        else
            navigate(`${window.location.pathname}?page=${totalPages}&limit=${limit}`);
        
        setCurrentPage(() => totalPages - 1);
    }

    const onFirst = () => {
        if(sort !== "createdAt" && des !== true)
            navigate(`${window.location.pathname}?page=${1}&limit=${limit}&sort=${sortBy}&desc=${desc}`);
        else
            navigate(`${window.location.pathname}?page=${1}&limit=${limit}`);
        setCurrentPage(() => 0);
    }

    const onCurrentPage = (page) => {
        if(sort !== "createdAt" && des !== true)
            navigate(`${window.location.pathname}?page=${page + 1}&limit=${limit}&sort=${sortBy}&desc=${desc}`);
        else
            navigate(`${window.location.pathname}?page=${page + 1}&limit=${limit}`);
        setCurrentPage(() => page);
    }

    const onSort = (sortBy, desc) => {
        navigate(`${window.location.pathname}?page=${currentPage}&limit=${limit}&sort=${sortBy}&desc=${desc}`);
        setDesc(() => desc);
        setSortBy(() => sortBy);
    }

    const clickCard = (productId, productName) => {
        navigate("/chi-tiet-san-pham?id=" + productId + '&name=' + productName);
    }
    
    return (
        <div className="wrapper">
            <CarouselsCustom dataRender={carousels} width={"100%"} height={300}/>
            <div className="container">
                <h3>Danh sách sản phẩm</h3>
                <h5>Sắp xếp theo: </h5>
                <div className="box-sort">
                   
                    <DropdownCustom variantColor="light" dropdownName="Giá" dropdownItems={sortPrice} onSort={onSort}/>
                    <DropdownCustom variantColor="light" dropdownName="Ngày đăng" dropdownItems={sortDate} onSort={onSort}/>
                </div>
                <div className="list-products">
                    {products.length > 0 ? products.map((item, index) => {
                        return (
                            <CardCustom src={item.thumbnail}
                                productName={item.name}
                                price={item.price}
                                key={index}
                                productId={item.id}
                                click={clickCard}
                            />
                        );
                    }) : <div className="empty-product"><h2>Hiện chưa có sản phẩm nào</h2></div>}
                </div>
                <div className="pagination">
                    <PaginationCustom
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNext={onNext}
                        onPrev={onPrev}
                        onFirst={onFirst}
                        onLast={onLast}
                        onCurrentPage={onCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;