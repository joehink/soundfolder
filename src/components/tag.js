import React from "react";
import { Link } from "gatsby"

export default ({ children, to }) => (
    <Link to={to} className="tag" onClick={(e) => e.stopPropagation()}><span className="text">{ children }</span></Link>
)