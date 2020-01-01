import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import logo from "../images/logo.svg";
import logoWhite from "../images/logo-white.svg";

import SearchBar from "../components/searchBar";

export default ({ white = false, searchTerm, search = true }) => {
    const navClasses = classNames({
        nav: true,
        white
    });
    return (
        <nav className={navClasses}>
            <div className="navLinks">
                <Link to="/" className="brand"><img src={white ? logoWhite : logo} alt="Sound Folder logo" /></Link>
                <Link to="/categories" className="link">Categories</Link>
                <Link to="/faq" className="link">Why is it free?</Link>
            </div>
        { search && <SearchBar searchTerm={searchTerm} /> }
        </nav>
    )
};

