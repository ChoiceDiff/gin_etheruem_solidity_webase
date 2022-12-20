import React, { useState,useEffect } from 'react'
// import Header from '../publicComponent/header'
import Footer from '../publicComponent/footer'
import Main from './main/main'
import Header from '../publicComponent/header';

export default function Home() {
   
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    )
 
}
