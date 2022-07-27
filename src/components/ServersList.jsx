import React, {useState} from 'react';
import Server from "./Server";
import Pagination from "./Pagination";

const ServersList = ({ data, allChecked, myHeaders, refreshDatas, checkVps, setCheckVps }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [vpsPerPage] = useState(8)

    const totalVps = data.length

    const countPage = totalVps / vpsPerPage

    const lastCountryIndex = currentPage * vpsPerPage
    const firstCountryIndex = lastCountryIndex - vpsPerPage
    const currentVps = data.slice(firstCountryIndex, lastCountryIndex)


    return (
        <>
        <div className="panel_all">
            <div className="accordion_fn">
                <div className="accordion">
                    {
                        currentVps.map((item, index) => (
                            <Server data={item} key={index} checkVps={checkVps} setCheckVps={setCheckVps} myHeaders={myHeaders} refreshDatas={refreshDatas} allChecked={allChecked} index={index} />
                        ))
                    }
                </div>



            </div>
        </div>
            {
                countPage > 1 ? (<Pagination vpsPerPage={vpsPerPage} currentPage={currentPage} setCurrentPage={(i) => {
                    setCurrentPage(i)
                }} totalVps={totalVps}/>)
                    : <div></div>
            }
            </>
    );
};

export default ServersList;