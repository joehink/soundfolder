import React from "react";
import classNames from "classnames";

export default ({ children, size = "lg" }) => {
    const containerClasses = classNames({
        container: true,
        "lg": size === "lg",
        "sm": size === "sm"
    })
    return (
        <div className={containerClasses}>
            { children }
        </div>
    )   
}
