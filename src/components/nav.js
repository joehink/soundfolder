import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import logo from "../images/logo.svg";
import logoWhite from "../images/logo-white.svg";

export default ({ white = false }) => {
    const navClasses = classNames({
        nav: true,
        white
    });

    return (
        <nav className={navClasses}>
            <div className="navLinks">
                <Link to="/" className="brand"><img src={white ? logoWhite : logo} /></Link>
                <Link to="/categories" className="link">Categories</Link>
                <Link to="/faq" className="link">Why is it free?</Link>
            </div>
        </nav>
    )
};

