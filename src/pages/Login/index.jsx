import React from 'react';

import styles from './Login.module.scss';

const Login = ({setLogData, setLogFlag, logFlag, logResponse}) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [validate, setValidate] = React.useState(false)

    const lkAuthorize = () => {
        if (username && password) {
            setValidate(false)
            setLogFlag(!logFlag)
        } else {
            setValidate(true)
        }
    }

    React.useEffect(() => {
        const logDatas = { "userName": username,
            "password": password,
            "hwid": "string"
        }
        setLogData(logDatas);
    }, [username, password])

    return (
        <div className={styles.login}>
            <div className={styles.login__form}>
                <input type="text" className={styles.login__input} value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Логин'/>
                <input type="password" className={styles.login__input} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль'/>
                <span style={validate ? {color: 'red', marginTop: -15, marginBottom: 15, display: 'block'} : {display: "none"}}>Незаполненное поле</span>
                <span style={logResponse && username && password ? {color: 'red', marginTop: -15, marginBottom: 15, display: 'block'} : {display: "none"}}>Логин или пароль введены неверно</span>
                <button className={styles.login__submit} onClick={() => lkAuthorize()}>
                    Войти
                </button>
            </div>
        </div>
    );
};

export default Login;