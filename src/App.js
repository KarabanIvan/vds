import React, {useState} from 'react';

import Lk from "./pages/Lk";
import Login from "./pages/Login";

function App() {

    const [auth, setAuth] = useState(() => {
        if (localStorage.getItem('isAuth') === 'true') {
            return 'true'
        } else {
            return 'false'
        }
    })


    const [logData, setLogData] = useState(() => {
        if (localStorage.getItem('isAuth') === 'true') {
            const objData = { "userName": localStorage.getItem('username'),
                "password": localStorage.getItem('password'),
                "hwid": "string"
            }
            return objData
        } else {
            return {}
        }
    })

    const [userInfo, setUserInfo] = useState('')

    const [logFlag, setLogFlag] = useState(false)


    React.useEffect(() => {
        fetch('https://api.betvds.ru/api/User/login', {
            method: 'POST',
            body: JSON.stringify(logData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.ok) {
                setAuth('true')
                localStorage.setItem('isAuth', 'true')
                localStorage.setItem('username', logData.userName)
                localStorage.setItem('password', logData.password)
                return res.json();
            } else {
                setAuth('false')
                return 'stop'
            }
        }).then((json) => {
            setUserInfo(json);
        });
    }, [logFlag])



    const [loginData, setLoginData] = useState({})
    console.log(userInfo);
    return (
        <>
            <div style={{width: 0, height: 0, overflow: 'hidden'}}><input type="text" /><input type="password" /></div>
        <div className="App">
            {
                auth === 'true' ? <Lk userInfo={userInfo}/> : <Login logFlag={logFlag} setLogFlag={(val) => setLogFlag(val)} setLogData={(obj) => setLogData(obj)} />
            }
        </div>
            </>
    );
}

export default App;
