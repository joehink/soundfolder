import React from "react";
import classNames from "classnames";

export default ({ children, size = "lg" }) => {
    const containerClass = classNames({
        container: true,
        "lg": size === "lg",
        "sm": size === "sm"
    })
    return (
        <div className={containerClass}>
            { children }
        </div>
    )   
}
