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

    const [refInf, setRefInf] = useState()

    const [loading, setLoading] = useState(true)

    const [contModal, setContModal] = useState(false)

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
            fetch('https://api.betvds.ru/api/User/GetMyReferals', {
                headers: myHeaders ,
            }).then((res) => {
                return res.json()
            }).then((json) => {
                setRefInf(json)
            });
            setLoading(false)
        } else {
            setLoading(true)
        }

    }, [userInfo]);


    let updateServersData = [...allVps]

    updateServersData.map((item) => {
        item.searchString = item.config.password + item.config.username + item.ipAddress + item.port
    })


    return (
        <>
            <Header />
            <div className="main_content">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home serversData={updateServersData} setContModal={(state) => setContModal(state)} myHeaders={headerToken} refreshDatas={refreshDatas} loading={loading} />} />
                    <Route path="/config" element={<Config setPayModal={(state) => setPayModal(state)}/>} setContModal={(state) => setContModal(state)} />
                    <Route path="ref" element={<Ref useInfo={userInfo} dataRef={refInf} setRefModal={(state) => setRefModal(state)} />} />
                </Routes>
            </div>
            <Popups refModal={refModal} setRefModal={(state) => setRefModal(state)} payModal={payModal} setPayModal={(state) => setPayModal(state)} contModal={contModal} setContModal={(state) => setContModal(state)} />
        </>
    );
};

export default Lk;