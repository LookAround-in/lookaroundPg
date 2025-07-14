"use client";
import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {

    // TODO : logic to redirect if user is not logged in 
    return (
        <div>{children}</div>
    )
}

export default AuthLayout