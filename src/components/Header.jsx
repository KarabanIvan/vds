import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <div className="post_repot">
                <div className="logo">
                    <Link to="/"><img src="img/logo.svg" /></Link>
                </div>
                <div className="right_wrap">
                    <div className="login">
                        <a href="#">
                            <img src="img/login.svg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;