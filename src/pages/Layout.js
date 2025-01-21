import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigacio from '../components/Navigacio'
import Lablec from '../components/Lablec'

function Layout() {
    return (
            < >
                <Navigacio />
                <Outlet />
                <Lablec />
            </>
    )
}


export default Layout
