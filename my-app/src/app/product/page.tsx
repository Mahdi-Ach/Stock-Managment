'use client'
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { AddProduct, FetchProductsById, UpdateProduct } from "../service/productservice/ProductService";
import './product.css';

export default function ProductInfo() {
    const [loading,setLoading] = useState(false)
    const searchParams = useSearchParams()
    const SignupSchema = yup.object().shape({
        title: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        description: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        price: yup.number()
            .min(1, 'should be greater than 0!')
            .integer()
            .required('Required'),
        discountPercentage: yup.number()
            .min(2, 'should be greater than 0!')
            .required('Required'),
        brand: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        category: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    });
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            discountPercentage: '',
            brand: '',
            category: ''
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            if(searchParams.get('id')){
               await UpdateProduct(values,searchParams.get('id'))
               return
            }
            await AddProduct(values)
        },
    });
    const fetchdata = async (id:string)=>{
        try{
          let products  = await FetchProductsById(id)
          console.log(formik)
          formik.values.title = products?.title
          formik.values.description = products?.description
          formik.values.price = products?.price
          formik.values.discountPercentage = products?.discountPercentage
          formik.values.brand = products?.brand
          formik.values.category = products?.category
          setLoading(true)
        }catch(err){
          console.log(err)
        }
      }
      useEffect(()=>{
        const id = searchParams.get('id')
        try{
            if(id){
                fetchdata(id)
            }
        }catch(e){
            console.log(e)
        }
    },[loading])

    return (
        <>
        {loading && <Box display="flex"
            flexDirection="column"
            gap={4}>

            <form id="form-product" onChange={formik.handleChange}
 onSubmit={formik.handleSubmit}>
                <Box>
                    <TextField
                        fullWidth
                        id="outlined-title-input"
                        label="title"
                        name="title"
                        value={formik.values.title}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                </Box>
                <Box>
                    <TextField 
                    multiline 
                    minRows={3} 
                    fullWidth 
                    id="outlined-description-input" 
                    label="description" 
                    name="description" 
                    value={formik.values.description}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </Box>
                <Box display="flex" gap="20px">
                    <Box sx={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            id="outlined-price"
                            label="price"
                            type="number"
                            name="price"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.price}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}

                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            id="outlined-discountPercentage"
                            label="discountPercentage"
                            type="number"
                            name="discountPercentage"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.discountPercentage}
                        error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                        helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}

                        />
                    </Box>
                </Box>
                <Box display="flex" gap="20px">
                    <Box sx={{ width: '100%' }}>
                        <TextField 
                        fullWidth 
                        id="outlined-brand-input" 
                        label="brand" 
                        name="brand"
                        value={formik.values.brand}
                        error={formik.touched.brand && Boolean(formik.errors.brand)}
                        helperText={formik.touched.brand && formik.errors.brand} 
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <TextField 
                        name="category" 
                        fullWidth 
                        id="outlined-category-input" 
                        label="category" 
                        value={formik.values.category}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={formik.touched.category && formik.errors.category}
                        />
                    </Box>
                </Box>
                <Button type="submit" variant="contained">{searchParams.get('id') ? "Edit": "Add"}</Button>
            </form>
        </Box>}
        </>
    )
}

