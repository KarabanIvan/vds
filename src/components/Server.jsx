import React from 'react';

const Server = ({ data, index, allChecked, myHeaders, refreshDatas, setContModal, setAllChecked, checkVps, setCheckVps }) => {

    function timestampToDate(ts) {
        let d = new Date();
        d.setTime(ts);
        return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
    }

    const [openAccord, setOpenAccord] = React.useState(false);

    const [changePassword, setChangePassword] = React.useState(false);

    const [newPassword, setNewPassword] = React.useState('');

    const [repPassword, setRepPassword] = React.useState('');

    const [changed, setChanged] = React.useState(false)

    const [start, setStart] = React.useState(() => {
        if (data.status === 2 || data.status === 3 || data.status === 4) {
            return true
        } else if (data.status === 0) {
            return true
        } else {
            return false
        }
    });

    const [stop, setStop] = React.useState(() => {
        if (data.status === 2 || data.status === 3 || data.status ===  4) {
            return true
        } else if (data.status === 1) {
            return true
        } else {
            return false
        }
    });

    const statusList = ['Активный', 'Остановлен', 'Создается', 'Добавлен', 'В ожидании'];
    const serverId = data.id;


    const onClickOpen = () => {
        setOpenAccord(!openAccord);
    }

    const onChecking = () => {
        let cloneCheckVps = Array.from(checkVps)
        if (cloneCheckVps.includes(data.id)) {
            let needIndex = cloneCheckVps.indexOf(data.id)
            if (needIndex !== -1) {
                cloneCheckVps.splice(needIndex, 1);
            }
            setAllChecked(false)
        } else {
            cloneCheckVps.push(data.id)
        }
        setCheckVps(cloneCheckVps)
    }

    const setPass = () => {
        const dataFetch = {
            "id": serverId,
            "password": newPassword,
            "isSave": true
        }
        if (newPassword !== repPassword) {
            alert('Пароли не совпадают')
        } else if (newPassword.length <= 4) {
            alert('Пароль слишком короткий')
        } else if (!newPassword || !repPassword) {
            alert('Заполните оба поля')
        }
        if ((newPassword && repPassword) && (newPassword === repPassword) && (newPassword.length > 4)) {
            fetch('https://api.betvds.ru/api/Vps/SetPassword', {
                method: 'POST',
                body: JSON.stringify(dataFetch),
                headers: {
                    'Authorization': `Bearer ${myHeaders}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
                    alert('Пароль успешно изменен')
                } else {
                    alert('Ошибка сервера')
                }
            })
            setChangePassword(false);
            }
        }

        const startVps = () => {
            const dataFetch = {
                "id": serverId,
            }
            fetch('https://api.betvds.ru/api/Vps/Start', {
                method: 'POST',
                body: JSON.stringify(dataFetch),
                headers: {
                    'Authorization': `Bearer ${myHeaders}`,
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                setStart(true)
                setStop(false)
            })
        }

    const stopVps = () => {
        const dataFetch = {
            "id": serverId,
        }
        fetch('https://api.betvds.ru/api/Vps/Stop', {
            method: 'POST',
            body: JSON.stringify(dataFetch),
            headers: {
                'Authorization': `Bearer ${myHeaders}`,
                'Content-Type': 'application/json',
            }
        }).then(() => {
            setStop(true)
            setStart(false)
        })
    }

    const selecting = false

    const accordionClass = () => {
        const checkBoxId = 'check-' + data.id
        setTimeout(() => {
            document.getElementById(checkBoxId).checked = false;
        }, 100)
        if (checkVps.includes(data.id) && openAccord) {
            setTimeout(() => {
                document.getElementById(checkBoxId).checked = true;
            }, 100)
            return  'panelAccord opened selected'
        } else if (checkVps.includes(data.id)) {
            setTimeout(() => {
                document.getElementById(checkBoxId).checked = true;
            }, 100)
            return  'panelAccord selected'
        } else if (openAccord) {
            setTimeout(() => {
                document.getElementById(checkBoxId).checked = false;
            }, 100)
            return 'panelAccord opened'
        } else {
            setTimeout(() => {
                document.getElementById(checkBoxId).checked = false;
            }, 100)
            return  'panelAccord'
        }
    }


    return (
        <div className="accordion-item">
            <div id={'accordion-button-' + index} className={accordionClass()}>
                <div className="wrap_inCH clearfix">
                    <div className="divCH">
                        <label className="containerCH">
                            <input type="checkbox" className="selSer" id={'check-' + data.id}/>
                            <span className="checkmark" onClick={() => onChecking()}></span>
                        </label>
                    </div>
                    <div className="divCHimg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="42" viewBox="0 0 35 42"
                             fill="none">
                            <path
                                d="M0 34.5906L14.384 37.4224V22.3802H0V34.5906ZM2.82423 25.7881H11.5642V33.4115L2.82423 31.6941V25.7881ZM17.9833 37.9823L35 41.331V22.3802H17.9833V37.9823ZM20.8076 25.7881H32.1802V37.3309L20.8076 35.0913V25.7881ZM17.9833 3.40791V18.9562H35V0L17.9833 3.40791ZM32.1802 15.5483H20.812V6.2936L32.1847 4.01627V15.5483H32.1802ZM0 18.9562H14.384V3.9732L0 6.85351V18.9562ZM2.82423 9.73919L11.5642 7.98948V15.5483H2.82423V9.73919Z"
                                fill="#2A73DE"/>
                        </svg>
                    </div>
                    <div className="flagCh">
                        <img src="img/germany.svg" alt="" />
                    </div>
                    <div className="ipCh">
                        <span>{data.ipAddress + ':' + data.port}</span>
                    </div>
                    <div className="statusCh">
                        <span className="good">{statusList[data.status]}</span>
                    </div>
                    <div className="dateCh">
                        <span>{timestampToDate(data.expirationDate)}</span>
                    </div>

                    <div className="btnRespam">
                        <div className="btnCh">
                            <button className="goMore" onClick={() => setContModal(true)}>Продлить</button>
                        </div>
                        <button className={ !openAccord ? "icon fopitem" : "icon fopitem rotate"} onClick={() => onClickOpen()} aria-hidden="accordion-button-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9"
                                 fill="none">
                                <line y1="-0.5" x2="9.68102" y2="-0.5"
                                      transform="matrix(0.658505 0.752577 -0.452865 0.891579 0 1)" stroke="white"/>
                                <line y1="-0.5" x2="9.68102" y2="-0.5"
                                      transform="matrix(-0.658505 0.752577 0.452865 0.891579 12.75 1)"
                                      stroke="white"/>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
            <div className={!openAccord ? 'accordion-content' : 'accordion-content opened'} aria-content="accordion-button-1">
                <div className="contCH clearfix">
                    <div className="upravl">
                        <div className="gopom">
                            <button className="stop" disabled={stop ? true : false} style={stop ? {opacity: 0.4, cursor: 'default'} : {opacity: 1}} onClick={() => stopVps()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21"
                                     fill="none">
                                    <rect width="20" height="20.1724" rx="2" fill="#C71519"/>
                                    <rect x="5" y="5.04297" width="10" height="10.0862" rx="1" fill="white"/>
                                </svg>
                            </button>
                            <button className="play" style={start ? {opacity: 0.4, cursor: 'default'} : {opacity: 1}} onClick={() => startVps()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21"
                                     fill="none">
                                    <rect width="20" height="20.1724" rx="2" fill="#159064"/>
                                    <path d="M15 10.0869L6.75 15.3278L6.75 4.84593L15 10.0869Z" fill="white"/>
                                </svg>
                            </button>
                            <button className="reload">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21"
                                     fill="none">
                                    <rect width="20" height="20.1724" rx="2" fill="#EBBF25"/>
                                    <path
                                        d="M15 11.2781C15 9.83739 14.4732 8.45568 13.5355 7.43695C12.5979 6.41821 11.3261 5.84589 10 5.84589V4.03516L7.77778 6.44947L10 8.86378V7.05305C12.15 7.05305 13.8889 8.94225 13.8889 11.2781C13.8889 13.6139 12.15 15.5031 10 15.5031C9.28567 15.504 8.58496 15.2909 7.97483 14.8872C7.36471 14.4836 6.86879 13.9051 6.54155 13.2153C6.2143 12.5254 6.06841 11.7509 6.11988 10.9769C6.17136 10.2028 6.41822 9.45915 6.83333 8.82757L6.03333 7.97049C5.54961 8.65533 5.22308 9.45557 5.08081 10.3049C4.93853 11.1542 4.98461 12.0281 5.21523 12.8542C5.44584 13.6803 5.85434 14.4348 6.40689 15.0551C6.95943 15.6755 7.6401 16.1438 8.39248 16.4213C9.14487 16.6989 9.9473 16.7776 10.7333 16.651C11.5193 16.5244 12.2661 16.1961 12.912 15.6934C13.5579 15.1906 14.0843 14.5278 14.4474 13.76C14.8105 12.9921 14.9999 12.1413 15 11.2781Z"
                                        fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="users_data">
                        <div className="line1">
                            <div className="info_log">Логин: <span>{data.config.username}</span></div>
                        </div>
                        <div className="line2">
                            <div className="info_log">Пароль: <span>{data.config.password}</span></div>
                            <div className="change_btn">
                                <div className="wisible">
                                    <button className="change_pass" onClick={() => setChangePassword(true)} style={changePassword ? {display: 'none'} : {display: "inline-block"}} url-pass="ch1">Изменить</button>
                                </div>
                                <div className="unwisible" style={changePassword ? {display: 'block'} : {display: "none"}} url-pass-ch="ch1">
                                    <div className="peckir">

                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="password1">Новый пароль</label>
                                            <input type="text" className="form-control" id={'password1' + index} value={newPassword}
                                            onChange={(event) => {
                                                setNewPassword(event.target.value)
                                            }}
                                            />
                                        </div>
                                        <div className="form-group pad">
                                            <label className="sr-only" htmlFor="password2">Повторите пароль</label>
                                            <input type="text" className="form-control" id={'password2' + index} value={repPassword}
                                                   onChange={(event) => {
                                                       setRepPassword(event.target.value)
                                                   }}
                                            />
                                        </div>
                                        <div className="form-group2">
                                            <button className="normal" onClick={() => setPass()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"
                                                     viewBox="0 0 20 21" fill="none">
                                                    <g clip-path="url(#clip0_67_9109)">
                                                        <rect y="0.259766" width="20" height="20" rx="2" fill="#159064"/>
                                                        <path
                                                            d="M16.1082 3.48319C15.7991 3.28296 15.4232 3.21356 15.063 3.29022C14.7028 3.36689 14.3878 3.58335 14.1871 3.89208L8.13927 13.2137L5.34538 10.6304C5.212 10.5037 5.05477 10.4048 4.88284 10.3394C4.7109 10.2739 4.52768 10.2433 4.34381 10.2493C4.15994 10.2553 3.9791 10.2977 3.81177 10.3742C3.64444 10.4506 3.49396 10.5595 3.36907 10.6946C3.24419 10.8297 3.14738 10.9882 3.08428 11.161C3.02117 11.3338 2.99302 11.5174 3.00146 11.7012C3.00991 11.885 3.05477 12.0652 3.13346 12.2315C3.21215 12.3978 3.32308 12.5468 3.45983 12.6699L7.46483 16.3732C7.7315 16.6204 8.07038 16.7426 8.40705 16.7426C8.78094 16.7426 9.25927 16.586 9.57316 16.1099C9.75761 15.8287 16.5176 5.4043 16.5176 5.4043C16.6169 5.25128 16.685 5.0802 16.7182 4.90084C16.7513 4.72147 16.7488 4.53734 16.7108 4.35895C16.6728 4.18055 16.6 4.01139 16.4966 3.86113C16.3932 3.71087 16.2612 3.58245 16.1082 3.48319Z"
                                                            fill="white"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_67_9109">
                                                            <rect width="20" height="20" fill="white"
                                                                  transform="translate(0 0.259766)"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="form-group2">
                                            <button className="normal closePass" onClick={() => setChangePassword(false)} url-pass-close="ch1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"
                                                     viewBox="0 0 20 21" fill="none">
                                                    <rect y="0.259766" width="20" height="20" rx="2" fill="#C71519"/>
                                                    <path d="M5 5.25977L15 15.2598M15 5.25977L5 15.2598L15 5.25977Z"
                                                          stroke="white" stroke-width="1.875" stroke-linecap="round"
                                                          stroke-linejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="line3">
                            <div className="info_log">Описание: <span>IP-адрес и порт копировать вместе</span></div>
                        </div>
                    </div>
                    <div className="harakter">
                        <div className="lips">Характеристики сервера:</div>
                        <div className="infoHK">Процессор: <span>{data.config.cpu} CPUs</span></div>
                        <div className="infoHK">Память: <span>{data.config.ram} GB</span></div>
                        <div className="infoHK">Диск: <span>{data.config.disk} GB HDD+SSD</span></div>
                    </div>
                    <div className="harakter2">
                        <div className="lips2">Важно:</div>
                        <div className="text">В “ожидании” означает процесс создания сервера, который может
                            занимать до 15 минут
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Server;