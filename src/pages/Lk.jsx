import React, {useState} from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Config from "./Config";
import Ref from "./Ref";
import Popups from "../components/Popups/Popups";

const Lk = ({ userInfo }) => {
    const [refModal, setRefModal] = useState(false)

    const [payModal, setPayModal] = useState(false)

    const [items, setItems] = useState([])

    const [allVps, setAllVps] = useState([])

    const [loading, setLoading] = useState(true)

    const [loadingRef, setLoadingRef] = useState(true)

    const [refData, setRefData] = useState(true)

    const refreshDatas = () => {
        setRefData(!refData)
    }

    const headerToken = userInfo.token
    const myHeaders = new Headers({
        'Authorization': `Bearer ${userInfo.token}`
    });


    React.useEffect(() => {
        if (userInfo) {
            const headerToken = userInfo.token
            const myHeaders = new Headers({
                'Authorization': `Bearer ${userInfo.token}`
            });
            fetch('https://api.betvds.ru/api/Vps/GetAll', {
                headers: myHeaders ,
            }).then((res) => {
                return res.json()
            }).then((json) => {
                setAllVps(json)
            });
            setLoading(false)
        } else {
            setLoading(true)
        }

    }, [userInfo]);

    const [refInf, setRefInf] = useState()

    let updateServersData = [...allVps]

    console.log(updateServersData)

    updateServersData.map((item) => {
        item.searchString = item.config.password + item.config.username + item.ipAddress + item.port
    })


    return (
        <>
            <Header />
            <div className="main_content">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home serversData={updateServersData} myHeaders={headerToken} refreshDatas={refreshDatas} loading={loading} />} />
                    <Route path="/config" element={<Config setPayModal={(state) => setPayModal(state)}/>} />
                    <Route path="ref" element={<Ref setRefModal={(state) => setRefModal(state)} />} />
                </Routes>
            </div>
            <Popups refModal={refModal} setRefModal={(state) => setRefModal(state)} payModal={payModal} setPayModal={(state) => setPayModal(state)} />
        </>
    );
};

export default Lk;