import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"

import { ShopLayout } from "../../components/layouts"
import { countries } from "../../utils"
import { CartContext } from '../../context';



type FormData = {
    firstName: string,
    lastName : string,
    address  : string,
    address2?: string,
    zip      : string,
    city     : string,
    country  : string,
    phone    : string
}

const getAddressFromCookies = ():FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName : Cookies.get('lastName') || '',
        address  : Cookies.get('address') || '',
        address2 : Cookies.get('address2') || '',
        zip      : Cookies.get('zip') || '',
        city     : Cookies.get('city') || '',
        country  : Cookies.get('country') || '',
        phone    : Cookies.get('phone') || '',
    }
}



const AddressPage = () => {

    // const [hidrated, setHidrated] = useState(false);
    // useEffect(() => {
    //     setHidrated(true);
    // }, []); si continua el error de hidratación, 


    const { updateAddress } = useContext(CartContext)
    const router = useRouter();
    const [ defaultCountry, setDefaultCountry ] = useState('');


    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: countries[0].code,
            phone: '',
        }
    });

    useEffect(() => {
        const address = getAddressFromCookies()
        reset( address );
        setDefaultCountry( address.country )
    }, [ reset ])

    const onSubmitAddress = ( data: FormData) => {
        updateAddress( data );
        router.push('/checkout/summary')
    }

    return (
        // hidrated && (
        <ShopLayout title={"Dirección"} pageDescription={"Confirmar dirección del destino"}>

            <form onSubmit={ handleSubmit(onSubmitAddress) } noValidate>

                <Typography variant='h1' component='h1'>Dirección</Typography>
                <Grid container spacing={2} sx={{ mt:2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Nombre'
                            variant='filled'
                            fullWidth
                            {
                                ...register('firstName', {
                                    required: 'Este campo es requerido'
                                })
                            }
                            error={ !!errors.firstName }
                            helperText={ errors.firstName?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Apellidos'
                            variant='filled'
                            fullWidth
                            {
                                ...register('lastName', {
                                    required: 'Este campo es requerido'
                                })
                            }
                            error={ !!errors.lastName }
                            helperText={ errors.lastName?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Dirección'
                            variant='filled'
                            fullWidth
                            {
                                ...register('address', {
                                    required: 'Este campo es requerido'
                                })
                            }
                            error={ !!errors.address }
                            helperText={ errors.address?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Dirección2 (Opcional)'
                            variant='filled'
                            fullWidth
                            { ...register('address2') }
                            error={ !!errors.address2 }
                            helperText={ errors.address2?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Código Postal'
                            variant='filled'
                            fullWidth
                            {
                                ...register('zip', {
                                    required: 'Este campo es requerido'
                                })
                            }
                            error={ !!errors.zip }
                            helperText={ errors.zip?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Ciudad'
                            variant='filled'
                            fullWidth
                            {
                                ...register('city', {
                                    required: 'Este campo es requerido'
                                })
                            }
                            error={ !!errors.city }
                            helperText={ errors.city?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                key={ defaultCountry }
                                variant='filled'
                                label='País'
                                defaultValue={ defaultCountry }
                                {
                                    ...register('country', {
                                        required: 'Este campo es requerido'
                                    })
                                }
                                error={ !!errors.country }
                                helperText={ errors.country?.message }
                            >
                                {
                                    countries.map( country => (
                                        <MenuItem
                                            key={ country.code }
                                            value={ country.code }
                                        >
                                            { country.name }
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Teléfono'
                            variant='filled'
                            fullWidth
                            {
                                ...register('phone', {
                                    required: 'Este campo es requerido'
                                })
                            }
                            error={ !!errors.phone }
                            helperText={ errors.phone?.message }
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt:5 }} display='flex' justifyContent='center'>
                    <Button type='submit' color='secondary' className='circular-btn' size='large'>
                        Revisar pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    // )
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//     const { token = '' } = req.cookies;

//     let isValidToken = false;

//     try {
//         await jwt.isValidToken( token );
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if ( !isValidToken ) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }



export default AddressPage
