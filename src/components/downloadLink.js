import React from "react";

import { FaDownload } from "react-icons/fa";

export default ({ children, href, mp3 = false }) => (
    <a className={`downloadLink ${mp3 ? 'mp3' : ''}`} href={href} download>
        <i><FaDownload /></i>
        { children }
    </a>
);
