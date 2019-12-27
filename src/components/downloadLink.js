import React from "react";

export default ({ children, href, mp3 = false }) => (
    <a className={`downloadLink ${mp3 ? 'mp3' : ''}`} href={href} download>
        <i className="fa fa-download" aria-hidden="true"></i>
        { children }
    </a>
);
