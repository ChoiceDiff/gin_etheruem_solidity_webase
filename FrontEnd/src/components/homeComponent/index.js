import React, { useState,useEffect } from 'react'
// import Header from '../publicComponent/header'
import Footer from '../publicComponent/footer'
import Main from './main/main'
import Header from '../publicComponent/header';
export default function Home() {
    
    return (
      
      <div>
        <Header/>
        {/* <div className="logo">
                    <h1>
                        <Link to="/home" title="蚝饷商城">蚝饷商城</Link>
                    </h1>
                </div>
                
                <div className="search">
                    <input type="search" placeholder="搜索"/>
                    <button>搜索</button>
                </div>
            
                
                <div className="shopcar">
                    <Link to='/cart'>我的购物车</Link>
                    <i className="count">6</i>
                </div>
        <div/> */}
        <Main/>
        <Footer/>
      </div>
    )

}
