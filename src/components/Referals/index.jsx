import React, {useState} from 'react';

import styles from './Referals.module.scss';
import Empty from "../Empty";
import Pagination from "../Pagination";

const Index = ({data}) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [vpsPerPage] = useState(5)

    function timestampToDate(ts) {
        let d = new Date();
        d.setTime(ts);
        return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
    }

    const totalVps = data.length

    const countPage = totalVps / vpsPerPage

    const lastCountryIndex = currentPage * vpsPerPage
    const firstCountryIndex = lastCountryIndex - vpsPerPage
    const currentVps = data.slice(firstCountryIndex, lastCountryIndex)


    return (
        <>
            <div className="head_i">
                <div className="left_potr">
                    <div className="img_wrap">
                        <img src="img/refs.svg" alt="" />
                    </div>
                    <div className="title">
                        Рефералы
                    </div>
                </div>
            </div>
            <div className={styles.referalsWrapper}>
                <div className={styles.referalsTable}>
                    <div className={styles.referals}>
                <div className={styles.header}>
                    <div className={styles.headerCol}>
                        Email
                    </div>
                    <div className={styles.headerCol}>
                        Статус
                    </div>
                    <div className={styles.headerCol}>
                        Сумма. Руб
                    </div>
                    <div className={styles.headerCol}>
                        Дата
                    </div>
                    <div className={styles.headerCol}>
                        Комментарий
                    </div>
                </div>
                <div className={styles.table}>
                    {
                        currentVps.length
                        ? (
                                currentVps.map((item) => (
                                    <div className={styles.row}>
                                        <div className={styles.tableCol}>
                                            <b>Email</b><span> {item.email} </span>
                                        </div>
                                        <div className={styles.tableCol}>
                                            <b>Статус</b><span> {item.amount > 0 ? <span className={styles.pay}>Оплатил</span> : <span className={styles.notpay}>Не оплатил</span>} </span>
                                        </div>
                                        <div className={styles.tableCol}>
                                            <b>Сумма. Руб</b><span> {item.amount} </span>
                                        </div>
                                        <div className={styles.tableCol}>
                                           <b>Дата</b> <span> {timestampToDate(item.timestamp)} </span>
                                        </div>
                                        <div className={styles.tableCol}>
                                            <b>Комментарии</b> <span> {item.comment} </span>
                                        </div>
                                    </div>
                                ))
                            )
                            : (
                                <Empty />
                            )
                    }
                </div>
                        {
                            countPage > 1 ? (<Pagination vpsPerPage={vpsPerPage} currentPage={currentPage} setCurrentPage={(i) => {
                                    setCurrentPage(i)
                                }} totalVps={totalVps}/>)
                                : <div></div>
                        }
            </div>
                </div>
            </div>
        </>
    );
};

export default Index;