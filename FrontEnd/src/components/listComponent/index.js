import React from 'react'
import { Link } from 'react-router-dom'
import ListContent from './listContent/listContent'
import Header from '../publicComponent/header'
import Footer from '../publicComponent/footer'
export default function List() {
    return (
        <div>
          <Header/>
          <ListContent/>
          <Footer/>
        </div>
    )
}
