import React, {useState} from 'react';

import styles from './Popups.module.scss'

import countBg from '../../assets/img/count-bg.svg'

import close from '../../assets/img/close.svg'

const Popups = (props) => {

    const [paySys, setPaySys] = useState(0)

    const [activeTarif, setActiveTarif] = useState(0)

    return (
        <>
            <div className={
                props.refModal ? styles.backdrop + ' ' + styles.active : styles.backdrop
            } onClick={() => props.setRefModal(false)}>/</div>
            <div className={props.refModal ? styles.refPopup + ' ' + styles.active : styles.refPopup}>
                <button className={styles.close} onClick={() => props.setRefModal(false)}>
                    <img src={close} alt=""/>
                </button>
                <h3 className={styles.title}>
                    Как это работает?
                </h3>
                <p className={styles.txt}>
                    При покупке VDS каждому автоматически генерируется персональный промокод, дающий 5% с каждой VDS/продления и 5% скидки вашему рефералу.
                </p>
                <p className={styles.txt}>
                    С помощью не хитрых манипуляций многие договорились с нами о больших процентах. Условия рассматриваются индивидуально, главное пишите и мы обязательно договоримся.
                </p>
                <h3 className={styles.title}>
                    Как привлекать пользователей?
                </h3>
                <h4 className={styles.subtitle}>
                    Распространенные варианты привлечения клиентов:
                </h4>
                <div className={styles.row}>
                    <div className={styles.item}>
                        <span className={styles.item__count} style={{background: `url(${countBg}) center no-repeat`}}>
                            1
                        </span>
                        <p className={styles.item__txt}>
                            Посоветуйте сервис друзьям, добавив свою реферальную ссылку
                        </p>
                    </div>
                    <div className={styles.item + ' ' + styles.item_sm}>
                        <span className={styles.item__count} style={{background: `url(${countBg}) center no-repeat`}}>
                            2
                        </span>
                        <p className={styles.item__txt}>
                            Опубликуйте пост в своем блоге или странице в соцсети
                        </p>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.item__count} style={{background: `url(${countBg}) center no-repeat`}}>
                            3
                        </span>
                        <p className={styles.item__txt}>
                            Посоветуйте сервис в чатах, обусждениях и форумах, добавив свою реферальную ссылку
                        </p>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.item__count} style={{background: `url(${countBg}) center no-repeat`}}>
                            4
                        </span>
                        <p className={styles.item__txt}>
                            Если у вас есть собственная площадка, вы можете разместить баннер на ней
                        </p>
                    </div>
                    <div className={styles.item + ' ' + styles.item_lg}>
                        <span className={styles.item__count} style={{background: `url(${countBg}) center no-repeat`}}>
                            5
                        </span>
                        <p className={styles.item__txt}>
                            Напишите обзор, включив в него свою реферальную ссылку и послав во все известные интернет издания. Часто хорошие обзоры принимают совершенно бесплатно!
                        </p>
                    </div>
                </div>
            </div>

            <div className={props.payModal ? 'shadow opened' : 'shadow'} onClick={() => props.setPayModal(false)}>
                <div className="modal_center" onClick={event => event.stopPropagation()}>
                    <img src="img/v1.svg" className="fon1" />
                        <img src="img/v2.svg" className="fon2" />
                            <div className="close" onClick={() => props.setPayModal(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                     fill="none">
                                    <path
                                        d="M13 25.1905C19.7327 25.1905 25.1905 19.7327 25.1905 13C25.1905 6.26743 19.7327 0.80957 13 0.80957C6.26743 0.80957 0.80957 6.26743 0.80957 13C0.80957 19.7327 6.26743 25.1905 13 25.1905Z"
                                        stroke="#084C94" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path
                                        d="M17.5716 8.42859L8.42871 17.5714M8.42871 8.42859L17.5716 17.5714L8.42871 8.42859Z"
                                        stroke="#084C94" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div className="container_modal">
                                <h3>Купить тариф</h3>
                                <div className="form_ger">
                                    <div className="wrap_zag">
                                        <div className="svg">
                                            <span>1</span>
                                        </div>
                                        <div className="text">
                                            <p>Выберите способ оплаты</p>
                                            <span>(Выберите для себя наиболее удобный способ)  </span>
                                        </div>
                                    </div>
                                    <div className="group_btn1">
                                        <div className="flex_btn">
                                            <button className={paySys === 0 ? 'memory active' : 'memory'} onClick={() => setPaySys(0)}>
                                                <img src="img/visa.svg" className="mem1" />
                                            </button>
                                            <button className={paySys === 1 ? 'memory active' : 'memory'} onClick={() => setPaySys(1)}>
                                                <img src="img/qivi.svg" className="mem1" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="wrap_zag">
                                        <div className="svg">
                                            <span>2</span>
                                        </div>
                                        <div className="text">
                                            <p>Дополнительно</p>
                                            <span>Выберите количество и введите промокод, если он есть</span>
                                        </div>
                                    </div>
                                    <div className="group_btn">
                                        <div className="group">
                                            <input type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Введите кол-во</label>
                                        </div>
                                        <div className="group">
                                            <input type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Промокод</label>
                                        </div>
                                    </div>
                                    <div className="politic">
                                        <a href="politika_konfid.pdf" target="_blank">Политика безопасности</a>
                                    </div>
                                    <div className="btn_sub">
                                        <button type="submit">купить</button>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>

            <div className={props.contModal ? 'shadow opened' : 'shadow'} onClick={() => props.setContModal(false)}>
                <div className="modal_center" onClick={event => event.stopPropagation()}>
                    <img src="img/v1.svg" className="fon1" />
                    <img src="img/v2.svg" className="fon2" />
                    <div className="close" onClick={() => props.setContModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                             fill="none">
                            <path
                                d="M13 25.1905C19.7327 25.1905 25.1905 19.7327 25.1905 13C25.1905 6.26743 19.7327 0.80957 13 0.80957C6.26743 0.80957 0.80957 6.26743 0.80957 13C0.80957 19.7327 6.26743 25.1905 13 25.1905Z"
                                stroke="#084C94" stroke-linecap="round" stroke-linejoin="round"/>
                            <path
                                d="M17.5716 8.42859L8.42871 17.5714M8.42871 8.42859L17.5716 17.5714L8.42871 8.42859Z"
                                stroke="#084C94" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="container_modal">
                        <h3>Продлить тариф</h3>
                        <div className="form_ger">
                            <div className="wrap_zag">
                                <div className="svg">
                                    <span>1</span>
                                </div>
                                <div className="text">
                                    <p>Выберите способ оплаты</p>
                                    <span>(Выберите для себя наиболее удобный способ)  </span>
                                </div>
                            </div>
                            <div className="group_btn1">
                                <div className="flex_btn">
                                    <button className={paySys === 0 ? 'memory active' : 'memory'} onClick={() => setPaySys(0)}>
                                        <img src="img/visa.svg" className="mem1" />
                                    </button>
                                    <button className={paySys === 1 ? 'memory active' : 'memory'} onClick={() => setPaySys(1)}>
                                        <img src="img/qivi.svg" className="mem1" />
                                    </button>
                                </div>
                            </div>
                            <div className="wrap_zag">
                                <div className="svg">
                                    <span>2</span>
                                </div>
                                <div className="text">
                                    <p>Кол-во суток</p>
                                    <span>Выберите, на сколько суток хотите продлить тариф</span>
                                </div>
                            </div>
                            <div className="group_btn">
                                <div className={styles.tarifSelect}>
                                    <button
                                        className={activeTarif === 0 ? styles.tarifSelect__item + ' ' + styles.tarifSelect__itemActive : styles.tarifSelect__item}
                                        onClick={() => setActiveTarif(0)}
                                    >
                                        7
                                    </button>
                                    <button
                                        className={activeTarif === 1 ? styles.tarifSelect__item + ' ' + styles.tarifSelect__itemActive : styles.tarifSelect__item}
                                        onClick={() => setActiveTarif(1)}
                                    >
                                        14
                                    </button>
                                    <button
                                        className={activeTarif === 2 ? styles.tarifSelect__item + ' ' + styles.tarifSelect__itemActive : styles.tarifSelect__item}
                                        onClick={() => setActiveTarif(2)}
                                    >
                                        30
                                    </button>
                                </div>
                            </div>
                            <div className="wrap_zag">
                                <div className="svg">
                                    <span>3</span>
                                </div>
                                <div className="text">
                                    <p>Дополнительно</p>
                                    <span>введите промокод, если он есть</span>
                                </div>
                            </div>
                            <div className="group_btn">
                                <div className="group">
                                    <input type="text" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Промокод</label>
                                </div>
                            </div>
                            <div className="politic">
                                <a href="politika_konfid.pdf" target="_blank">Политика безопасности</a>
                            </div>
                            <div className="btn_sub">
                                <button type="submit">Продлить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popups;