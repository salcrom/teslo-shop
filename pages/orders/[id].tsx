import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';

import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"

import { CartList, OrderSummary } from "components/cart"
import { ShopLayout } from "components/layouts"
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { dbOrders } from 'database';
import { IOrder } from 'interfaces';

interface Props {
    order: IOrder
}


const OrderPage:NextPage<Props> = ({ order }) => {
    console.log({order});
    return (
        <ShopLayout title='Resumen de la orden 123443566' pageDescription={'Resumen de la orden'}>
            <Typography variant='h1' component='h1'>Orden: ABC123</Typography>

            {/* <Chip
                sx={{ my: 2}}
                label='Pendiente de pago'
                variant='outlined'
                color='error'
                icon={ <CreditCardOffOutlined />}
            /> */}
            <Chip
                sx={{ my: 2}}
                label='Orden ya fue pagada'
                variant='outlined'
                color='success'
                icon={ <CreditScoreOutlined />}
            />

            <Grid container>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ( 3 productos)</Typography>
                            <Divider sx={{ my:1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href={ '/checkout/address' } passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Sergio Alcántara Romero</Typography>
                            <Typography>Avda. España, 30</Typography>
                            <Typography>3º C</Typography>
                            <Typography>Ceuta, 51001</Typography>
                            <Typography>España</Typography>
                            <Typography>+34 53425243534</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href={ '/cart' } passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                {/* TODO:  */}
                                    <h1>Pagar</h1>
                            </Box>

                            <Chip
                                sx={{ my: 2}}
                                label='Orden ya fue pagada'
                                variant='outlined'
                                color='success'
                                icon={ <CreditScoreOutlined />}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }}
    }

    if (order.user !== session.user._id ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }}
    }

    return {
        props: {
            order
        }
    }
}
export default OrderPage
