import React from 'react'

import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material';

import { AdminLayout } from 'components/layouts'
import { SummaryTile } from 'components/admin';


const DashboardPage = () => {
    return (
        <AdminLayout
            title={'Dashboard'}
            subTitle={'Estadísticas generales'}
            icon={ <DashboardOutlined/> }
        >
            <Grid container spacing={2}>
                <SummaryTile
                    title={ 1 }
                    subTitle={'Órdenes totales'}
                    icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={ 2 }
                    subTitle={'Órdenes pagadas'}
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={ 3 }
                    subTitle={'Órdenes pendientes'}
                    icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={ 4 }
                    subTitle={'Clientes'}
                    icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={ 5 }
                    subTitle={'Productos'}
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={ 6 }
                    subTitle={'Sin existencias'}
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={ 7 }
                    subTitle={'Bajo inventario'}
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={ 8 }
                    subTitle={'Actualización en...'}
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage
