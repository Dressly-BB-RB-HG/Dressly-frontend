import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigacio from '../components/Navigacio'

function Layout() {
    return (
            < >
                <Navigacio />
                <Outlet />
            </>
    )
}


export default Layout
