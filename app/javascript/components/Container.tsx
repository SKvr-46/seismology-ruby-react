import React from "react"

interface ContainerpPropsType {
    children: React.ReactNode;
}

export const Container = (props:ContainerpPropsType) => {
    const {children} = props
    return(
        <div className="container">
            {children}
        </div>
    )
}
