import React from 'react'

const C3 = ({arr}) => {
  return (
    <div className='position-relative m-5 px-3'style={{backgroundColor:"#D8ECFF"}}>
        <img className='img-fluid px-5' src={arr.img} />
        <div className='position-absolute top-100 start-50 translate-middle bg-white shadow rounded-3 p-4 col-10'>
           <h2 className='sub-head fw-bold'>{arr.head}</h2>
           <p className='body'>{arr.body}</p>
        </div>
    </div>
  )
}

export default C3