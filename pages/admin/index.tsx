import React from 'react'

import { DashboardOutlined } from '@mui/icons-material'

import { AdminLayout } from 'components/layouts'


const DashboardPage = () => {
    return (
        <AdminLayout
            title={'Dashboard'}
            subTitle={'Estadísticas generales'}
            icon={ <DashboardOutlined/> }
        >
            <h3>Hola Mundo</h3>
        </AdminLayout>
    )
}

export default DashboardPage
