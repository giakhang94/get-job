import { useAllJobsContext } from '../pages/AllJob';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
const PageBtnContainer = () => {
    const navigator = useNavigate();
    const location = useLocation();
    console.log(location);
    const { numOfPage, currentPage, totalJobs, params } = useAllJobsContext();
    const numOfPageArray = Array.from(Array(numOfPage).keys());

    const handleChangePage = (pageNumber) => {
        const { search, pathname } = location;
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber);
        console.log(searchParams.toString());
        navigator(`${pathname}?${searchParams.toString()}`);
    };

    const addPageBtn = ({ pageNumber, activeClass }) => {
        return (
            <button
                className={`btn page-btn ${activeClass && 'active'}`}
                onClick={() => {
                    handleChangePage(pageNumber);
                }}
            >
                {pageNumber}
            </button>
        );
    };

    const renderPagebtn = () => {
        const pageButtons = [];
        pageButtons.push(addPageBtn({ pageNumber: 1, activeClass: currentPage === 1 }));
        //dot dot dot before current page
        if (currentPage > 3) {
            pageButtons.push(<span className="page-btn dots">...</span>);
        }
        //1 before currentpage
        if (currentPage !== 1 && currentPage !== 2) {
            pageButtons.push(addPageBtn({ pageNumber: currentPage - 1, activeClass: false }));
        }
        //currentPage
        if (currentPage !== 1 && currentPage !== numOfPage) {
            pageButtons.push(addPageBtn({ pageNumber: currentPage, activeClass: true }));
        }
        //1 after currentpage
        if (currentPage !== numOfPage && currentPage !== numOfPage - 1) {
            pageButtons.push(addPageBtn({ pageNumber: currentPage + 1, activeClass: false }));
        }
        //dot dot dot after current page
        if (currentPage < 8) {
            pageButtons.push(<span className="page-btn dots">...</span>);
        }
        pageButtons.push(addPageBtn({ pageNumber: numOfPage, activeClass: currentPage === numOfPage }));
        return pageButtons;
    };
    return (
        <Wrapper>
            <button
                className="btn prev-btn"
                onClick={() => {
                    let prevPage = currentPage - 1;
                    if (prevPage < 1) prevPage = numOfPage;
                    handleChangePage(prevPage);
                }}
            >
                <HiChevronDoubleLeft />
            </button>
            <div className="btn-container">{renderPagebtn()}</div>
            <button
                className="btn next-btn"
                onClick={() => {
                    let nextPage = currentPage + 1;
                    if (nextPage > numOfPage) nextPage = 1;
                    handleChangePage(nextPage);
                }}
            >
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    );
};
export default PageBtnContainer;
