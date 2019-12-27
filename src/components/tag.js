import React from "react";
import { Link } from "gatsby"

export default ({ children, to }) => (
    <Link to={to} className="tag">{ children }</Link>
)