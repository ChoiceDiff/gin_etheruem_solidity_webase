import React from 'react'
import "./index.css"
export default  function Index()  {
    return (
      <div className='clothesSizeContainer'>
        
        <div className='clothesSizeDiv'>
             <img className='clothesSizeImg' src={require('../../images/testclothes02.jpg')}></img>
             <span className='clothesSizeSpan'>hhhh</span>
             <span className='clothesSizeSpan'>hhhh</span>
             <span className='clothesSizeSpan'>hhhh</span>
        </div>
        <div className='clothesSizeDiv'>
            <img className='clothesSizeImg' src={require('../../images/testclothes01.jpg')}></img>
            <span className='clothesSizeSpan'>hhhh</span>
            <span className='clothesSizeSpan'>hhhh</span>

        </div>
        <div className='clothesSizeDiv'>
             <img className='clothesSizeImg' src={require('../../images/testclothes03.jpg')}></img>
        </div>
      </div>
    )
}
