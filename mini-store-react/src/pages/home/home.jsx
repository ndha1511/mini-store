
import { useEffect, useState } from "react";
import CarouselsCustom from "../../components/carousels/carousels";
import "./home.css";
import { getProducts } from "../../services/productService";
import CardCustom from "../../components/card/card";
import PaginationCustom from "../../components/pagination/pagination";

function Home() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        getProducts(currentPage, 10)
            .then((resp) => {
                setProducts(() => [...resp.products]);
                setTotalPages(() => resp.totalPage);
            })
            .catch((err) => console.log(err));

    }, [currentPage]);
    const onNext = () => {
        if(currentPage < totalPages)
            setCurrentPage((prev) => prev + 1);
    }

    const onPrev = () => {
        if(currentPage > 0)
            setCurrentPage((prev) => prev - 1);
    }

    const onLast = () => {
        setCurrentPage(() => totalPages - 1);
    }

    const onFirst = () => {
        setCurrentPage(() => 0);
    }
    
    const onCurrentPage = (page) => {
        setCurrentPage(() => page);
    }
    return (
        <div className="wrapper">
            <CarouselsCustom />
            <div>
                <h3>Danh sách sản phẩm</h3>
                <div className="list-products">
                    {products.map((item, index) => {
                        return (
                            <CardCustom src={item.thumbnail} 
                            productName={item.name} 
                            price={item.price}
                            key={index} 
                            />
                        );
                    })}
                </div>
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
    );
}

export default Home;