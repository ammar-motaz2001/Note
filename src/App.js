import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './component/Layout/Layout'
// import register from './component/register/register'
import Signin from './component/Signin/signin'
import Home from './component/Home/Home'
import Register from './component/Register/register'
import { RecoilRoot } from 'recoil'
import Layput from './component/LayoutTwo/Layput'

export default function App() {


 const routes= createHashRouter([
    {path:'',element:<Layout/>,children:[
      
      {path:"Home",element:<Home/>}
    ]
    },

    {path:'',element:<Layput/>,children:[
      {path:'register',element:<Register/>},
      {index:true,element:<Signin/>},
    ]}

  ])
  return <>
    <RecoilRoot>
    <RouterProvider router={routes}/>
    </RecoilRoot>
    </>
  
}
