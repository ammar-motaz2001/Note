import React, { useState } from 'react'
import imageTwo from '../../assets/register-removebg-preview.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {

    let[message,setMessage]=useState("")
    let[messageError,setErrorMessage]=useState("")
    let navigate=useNavigate()
    function sendRegisterData(values){
        axios.post("https://note-sigma-black.vercel.app/api/v1/users/signUp",values).then((res)=>{
            console.log(res)
            
            setMessage(res.data.msg)
            if(res.data.msg=="done"){
                navigate('/')
            }
        }).catch((err)=>{
            console.log(err)
            setErrorMessage(err.response.data.msg)
        })
    }


    let validationSchema=yup.object({
     name:yup.string().min(3,"Minmum 3 to Your Name").max(20,"Max is 20 letter").required("Your Name is Required"),
     email:yup.string().email("Invalid Email").required("Your Email is Required"),
     age:yup.number().min(16,"Your Age isn't suitable").max("70","Your Age is invalid").required("Your Age is Required"),
     phone:yup.string().matches(/^01[0125][0-9]{8}$/,"Your phone must Like this 012 XXXXXXXX").required("Your Phone is required"),
     password:yup.string().min(6).max(20).required("Your Password is Requird")
    })



    
let formik=useFormik({
    initialValues:{
    name:'',
    email:"",
    password:"",
    age:"",
    phone:""
},

   validationSchema:validationSchema,

    onSubmit:(values)=>{
        sendRegisterData(values)
    }
    })
  return (

    <>
      <div className="container mt-5 p-4 bg-transparent shadow " >
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <div>
                    <img src={imageTwo} className='w-100' alt="" />
                    </div>
                </div>

                <div className="col-md-6 formy">
                    <h1 className='text-center'>Register Now :</h1>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="name" className='fw-bold'></label>
                            <input onBlur={formik.handleBlur}  onChange={formik.handleChange} id='name' name='name' type="text" className='form-control' placeholder='Enter Your Name:' />
                            {formik.touched.name?<p className='text-danger text-center fw-bold'>{formik.errors.name}</p>:""}
                            <label htmlFor="email"></label>
                            <input onBlur={formik.handleBlur}  onChange={formik.handleChange} id='email' name='email' type="email" className='form-control' placeholder='Enter Your Email:' />
                            {formik.touched.email?<p className='text-danger text-center fw-bold'>{formik.errors.email}</p>:""}


                            <label htmlFor="password"></label>
                            <input onBlur={formik.handleBlur}  onChange={formik.handleChange} id='password' name='password' type="password" className='form-control' placeholder='Enter Your password:' />
                            {formik.touched.password?<p className='text-danger text-center fw-bold'>{formik.errors.password}</p>:""}


                            <label  htmlFor="age"></label>
                            <input onBlur={formik.handleBlur}  onChange={formik.handleChange}  id='age' name='age' type="number" className='form-control' placeholder=' Enter Your age:' />
                            {/* <p className='text-danger text-center fw-bold'>{formik.errors.age}</p> */}
                            {formik.touched.age?<p className='text-danger text-center fw-bold'>{formik.errors.age}</p>:""}

                            <label htmlFor="phone"></label>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='phone' name='phone' type="text" className='form-control' placeholder='Enter Your phone:' />
                            {formik.touched.phone?<p className='text-danger text-center fw-bold'>{formik.errors.phone}</p>:""}


                            <button type='submit' className='btn btn-danger w-100 mt-3'>Register</button>
                            {message?<p style={{fontSize:25}} className='text-center fw-bold text-success'>{message}</p>:""}
                            {messageError?<p style={{fontSize:25}}  className='text-center fw-bold text-danger'>{messageError}</p>:""}
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}
