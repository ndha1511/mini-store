import { Pagination } from "react-bootstrap";

function PaginationCustom({ 
    currentPage, onNext, onPrev, 
    onFirst, onLast, onCurrentPage, totalPages }) {
    
    const renderPageNumbers = () => {
        let pageNumbers = [];
        const startPage = Math.max(0, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);
        for (let i = startPage; i < endPage; i++) {
            pageNumbers.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => onCurrentPage(i)}>
                    {i + 1}
                </Pagination.Item>,
            );
        }
        return pageNumbers;


    }

    return (
        <div>
            <Pagination className="m-2">
                {currentPage !== 1 && currentPage > 0 ? <Pagination.First onClick={onFirst} /> : <></>}
                {currentPage !== 0 ? <Pagination.Prev onClick={onPrev} /> : <></>}
                {renderPageNumbers().map((item) => {
                        return item;
                })}
                {currentPage <= totalPages - 2 ? <Pagination.Next onClick={onNext} /> : <></>}
                {currentPage !== totalPages && currentPage <= totalPages - 3 ? <Pagination.Last onClick={onLast} /> : <></>}
            </Pagination>

        </div>
    );
}

export default PaginationCustom;