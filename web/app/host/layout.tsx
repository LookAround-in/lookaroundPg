"use client";
import React, { ReactNode } from 'react'

const HostLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>{children}</div>
    )
}

export default HostLayout