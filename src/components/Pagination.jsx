import React from 'react';

const Pagination = ({ vpsPerPage, totalVps, currentPage, setCurrentPage }) => {
    let pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalVps/vpsPerPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <div className="pagination">
            <ul>
                {
                    pageNumbers.map(number => (
                        <li key={number} className={currentPage === number ? 'active' : ''}>
                            <button onClick={() => {
                                setCurrentPage(number)
                            }}>
                                {number}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;