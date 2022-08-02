import React, {useState} from 'react';

import styles from './Ref.module.scss';
import Referals from "../../components/Referals";

const Ref = (props) => {
    const [viewPassword, setViewPassword] = useState(false);

    const [loading, setLoading] = React.useState(true);
    console.log(props.dataRef)
    return (
        <div style={{width: '100%'}}>
            {props.dataRef && props.dataRef.success ? (
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
                                        {props.useInfo.user.userName}
                                    </p>
                                </p>
                            </div>
                            <div className={styles.info}>
                                <h4 className={styles.infoTitle}>
                                    Почта:
                                </h4>
                                <p className={styles.infoContent}>
                                    <p>
                                        {props.useInfo.user.email}
                                    </p>
                                </p>
                            </div>
                            <div className={styles.info}>
                                <h4 className={styles.infoTitle}>
                                    Пароль:
                                </h4>
                                <p className={styles.infoContent}>
                                    <div className={styles.infoPasswordWrapper}>
                                        <input type={viewPassword ? 'text' : 'password'} value={props.useInfo.user.password} className={styles.infoPassword} disabled/>
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
                                        {props.useInfo.user.myReferalCode}
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
                                            {props.useInfo.user.referalsCount}
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
                                            {props.useInfo.user.myReferalUnpaidBalance + ' '}
                                            р</strong>
                                    </p>
                                </p>
                            </div>
                        </div>
                    </div>
                    {<Referals data={props.dataRef.message}/>}
                </div>
            )
            : 'Загрузка...'
            }
        </div>
    );
};

export default Ref;