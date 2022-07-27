import React, {useState} from 'react';

import styles from './Ref.module.scss';
import Referals from "../../components/Referals";

const Ref = (props) => {
    const [viewPassword, setViewPassword] = useState(false);

    const [dataRef, setDataRef] = React.useState();

    const [loading, setLoading] = React.useState(true);

    const [useInfo, setUseInfo] = useState('');

    const data = { "userName": localStorage.getItem('username'),
        "password": localStorage.getItem('password'),
        "hwid": "string"
    }

    React.useEffect(() => {
        fetch('https://api.betvds.ru/api/User/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((json) => {
            setUseInfo(json);
        });
    }, [])

    console.log(useInfo)

    // данные для рефералов

    const headerToken = useInfo.token;
    const myHeaders = new Headers({
        'Authorization': `Bearer ${useInfo.token}`
    });

    React.useEffect(() => {
        if (useInfo) {
            fetch('https://api.betvds.ru/api/User/GetMyReferals', {
                headers: myHeaders ,
            }).then((res) => {
                return res.json();
            }).then((json) => {
                setDataRef(json);
            });
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [useInfo])


    //

    return (
        <div style={{width: '100%'}}>
            {useInfo && dataRef ? (
                <div className={' i_cont'}>
                    <div className="head_i">
                        <div className="left_potr">
                            <div className="img_wrap">
                                <img src="img/wallet.svg" alt="" />
                            </div>
                            <div className="title">
                                Реферальная программа
                            </div>
                        </div>
                        <div className="right_potr">
                            <button className="btn_b" onClick={() => props.setRefModal(true)}>подробнее</button>
                        </div>
                    </div>
                    <div className={styles.refInfo}>
                        <div className={styles.leftCol}>
                            <h3 className={styles.title}>
                                <img src="img/ref-1.svg" alt="" />
                                Информация о пользователе
                            </h3>
                            <div className={styles.info}>
                                <h4 className={styles.infoTitle}>
                                    Логин:
                                </h4>
                                <p className={styles.infoContent}>
                                    <p>
                                        {useInfo.user.userName}
                                    </p>
                                </p>
                            </div>
                            <div className={styles.info}>
                                <h4 className={styles.infoTitle}>
                                    Почта:
                                </h4>
                                <p className={styles.infoContent}>
                                    <p>
                                        {useInfo.user.email}
                                    </p>
                                </p>
                            </div>
                            <div className={styles.info}>
                                <h4 className={styles.infoTitle}>
                                    Пароль:
                                </h4>
                                <p className={styles.infoContent}>
                                    <div className={styles.infoPasswordWrapper}>
                                        <input type={viewPassword ? 'text' : 'password'} value={useInfo.user.password} className={styles.infoPassword} disabled/>
                                        <button className={styles.view}
                                                onClick={() => setViewPassword(!viewPassword)}>
                                            <img src="img/view.svg" alt=""/>
                                        </button>
                                    </div>
                                </p>
                            </div>
                        </div>
                        <div className={styles.rightCol}>
                            <h3 className={styles.title}>
                                <img src="img/ref-2.svg" alt="" />
                                Реферальная система
                            </h3>
                            <div className={styles.info}>
                                <h4 className={styles.infoTitle}>
                                    Мой промокод:
                                </h4>
                                <p className={styles.infoContent}>
                                    <p>
                                        {useInfo.user.myReferalCode}
                                    </p>
                                </p>
                            </div>
                            <div className={styles.info}>
                                <h4 className={styles.infoTitle}>
                                    Рефералов:
                                </h4>
                                <p className={styles.infoContent}>
                                    <p>
                                        <strong>
                                            {useInfo.user.referalsCount}
                                        </strong>
                                    </p>
                                </p>
                            </div>
                            <div className={styles.info}>
                                <h4 className={styles.infoTitle}>
                                    Баланс:
                                </h4>
                                <p className={styles.infoContent}>
                                    <p>
                                        <strong>
                                            {useInfo.user.myReferalUnpaidBalance + ' '}
                                            р</strong>
                                    </p>
                                </p>
                            </div>
                        </div>
                    </div>
                    {<Referals data={dataRef.message}/>}
                </div>
            )
            : 'Загрузка...'
            }
        </div>
    );
};

export default Ref;