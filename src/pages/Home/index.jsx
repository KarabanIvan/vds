import React, {useMemo} from 'react';
import ServersList from "../../components/ServersList";
import Empty from "../../components/Empty";

const Index = ({ serversData, loading, myHeaders, refreshDatas }) => {

    const [isServers, setIsServers] = React.useState(true)
    const serversInfo = serversData.length
    const [allChecked, setAllChecked] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')

    const [checkVps, setCheckVps] = React.useState([])

    let componentServers;

    const searchedData = React.useMemo(() => {
        if (!loading) {
            return [...serversData].filter(item => item.searchString.includes(searchQuery))
        }
        return false
    }, [searchQuery, serversData]);

    const checkingVsp = () => {
        if (checkVps.length) {
            let checkedArray = []
            setCheckVps(checkedArray);
        } else {
            let checkedArray = []
            for (let i = 1; i <= searchedData.length; i++) {
                checkedArray.push(i)
            }
            setCheckVps(checkedArray);
        }
    }


    if (loading) {
        componentServers = <h2 style={{textAlign: 'center'}}>Идет загрузка...</h2>
    } else if (!loading && !serversInfo) {
        setTimeout(() => {
            componentServers = <Empty />
        }, 1000)
    } else if (searchedData.length === 0) {
        componentServers = <Empty txt='Ничего не найдено'/>
    } else if (!loading && serversData) {
        componentServers = <ServersList data={searchedData} myHeaders={myHeaders} checkVps={checkVps} setCheckVps={(array) => setCheckVps(array)}  refreshDatas={refreshDatas} allChecked={allChecked} />
    }

    return (
        <div className="i_cont column_pas">
            <div className="head_i">
                <div className="left_potr">
                    <div className="img_wrap">
                        <img src="img/server.svg" alt="" />
                    </div>
                    <div className="title">
                        Серверы
                    </div>
                </div>
                <div className="right_potr">
                    <a href="#" className="btn_b">купить новый</a>
                    <a href="#" className="btn_w">продлить выбранные</a>
                </div>
            </div>

            <div className="search_panel">
                <div className="lable">
                    <i className="search_go">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path
                                d="M12.623 11.627L10.2383 9.24219C11.0085 8.25924 11.4254 7.04564 11.4219 5.79688C11.4219 4.68436 11.092 3.59682 10.4739 2.67179C9.85581 1.74677 8.97731 1.0258 7.94947 0.600055C6.92164 0.174312 5.79064 0.0629185 4.69949 0.27996C3.60835 0.497002 2.60607 1.03273 1.8194 1.8194C1.03273 2.60607 0.497002 3.60835 0.27996 4.69949C0.0629185 5.79064 0.174312 6.92164 0.600055 7.94947C1.0258 8.97731 1.74677 9.85581 2.67179 10.4739C3.59682 11.092 4.68436 11.4219 5.79688 11.4219C7.04564 11.4254 8.25924 11.0085 9.24219 10.2383L11.627 12.623C11.7596 12.754 11.9386 12.8274 12.125 12.8274C12.3114 12.8274 12.4904 12.754 12.623 12.623C12.6886 12.5577 12.7406 12.4801 12.7761 12.3946C12.8116 12.3092 12.8299 12.2175 12.8299 12.125C12.8299 12.0325 12.8116 11.9408 12.7761 11.8554C12.7406 11.7699 12.6886 11.6923 12.623 11.627ZM1.57813 5.79688C1.57813 4.96249 1.82555 4.14683 2.28911 3.45307C2.75268 2.7593 3.41156 2.21857 4.18243 1.89926C4.95331 1.57995 5.80156 1.49641 6.61992 1.65919C7.43827 1.82197 8.18998 2.22377 8.77998 2.81377C9.36999 3.40377 9.77178 4.15548 9.93457 4.97384C10.0973 5.7922 10.0138 6.64045 9.69449 7.41132C9.37519 8.1822 8.83446 8.84108 8.14069 9.30464C7.44692 9.7682 6.63127 10.0156 5.79688 10.0156C4.67847 10.0141 3.60632 9.5691 2.81548 8.77827C2.02465 7.98744 1.57968 6.91528 1.57813 5.79688Z"
                                fill="#939393"/>
                        </svg>
                    </i>
                    <input type="text" placeholder="Поиск" autoComplete="off" name='search' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
            </div>


            <div className="overflo_wrap">

                <div className="over_hiden serversWrapper">
                    <div className="inner_hiden">
                        <div className="big_custom_polt">
                            <div className="coups clearfix">
                                <label className="containerCH">
                                    <input type="checkbox" className="selAll" onClick={() => {checkingVsp()}} />
                                    <span className="checkmark"></span>
                                </label>
                                <div className="os">
                                    ОС
                                </div>
                                <div className="region">
                                    Регион
                                </div>
                                <div className="ipder">
                                    IP-адрес для подключения
                                </div>
                                <div className="status">
                                    Статус
                                </div>
                                <div className="time_left">
                                    Истекает через
                                </div>
                                <div className="prodlen">
                                    Продление
                                </div>
                            </div>
                        </div>
                        {
                            componentServers
                        }
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Index;