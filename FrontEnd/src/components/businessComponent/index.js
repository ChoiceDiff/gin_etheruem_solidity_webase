import React, { useState,useEffect } from 'react'
// import Header from '../publicComponent/header'
import Footer from '../publicComponent/footer'
import Header from '../publicComponent/header';
import Main from './main/main'
import { Select } from 'antd';
import { Link,useNavigate  } from 'react-router-dom'
const { Option } = Select;

export default function Home() {
    return (
      <div>
        <Header/>      
        <Main/>
        <Footer/>
      </div>
    )
 
}
