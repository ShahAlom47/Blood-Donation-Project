/* eslint-disable react/prop-types */


const PaginationButton = ({totalPages,setPage, page}) => {
    // const [page, setPage] = useState(1);
    return (
        <div className="flex items-end justify-center h-full lg:p-5 md:p-4 p-1">
        <button
            onClick={() => page>0> setPage(page - 1)}
            style={{ borderRadius: '0px 100%' }}
            className={`btn btn-p ${page === 1?'':''}`}
            disabled={page === 1}
        >
            Prev
        </button>
        <button
            onClick={() =>setPage(page + 1)}
            style={{ borderRadius: '100% 0px' }}
            className="btn btn-p "
            disabled={page === totalPages}
        >
            Next
        </button>
    </div>
    );
};

export default PaginationButton;