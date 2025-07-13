import React from 'react'
import img1 from '../../Icon/bulb.svg';
import img2 from '../../Icon/target.svg';
import C2 from './card2';
const H4 = () => {
    const card1 = {img:img1,head:"Our Vision",subHead:"MediBot envisions a world where healthcare is accessible, convenient, and personalized for everyone, regardless of their location or circumstances. We aim to bridge the gap between patients and healthcare providers, empowering individuals to take control of their health and well-being."};
    const card2 = {img:img2,head:"Our Mission",subHead:"Our mission is to revolutionize healthcare delivery by providing a comprehensive telemedicine platform that seamlessly integrates virtual consultations, AI-powered chatbot assistance, and personalized health management tools."};
  return (
    <div className='py-5' style={{backgroundColor:"#ECF5FE"}}>
        <div className='d-flex flex-row justify-content-center gap-5'>
            <C2 arr={card1}/>
            <C2 arr={card2}/>
        </div>
    </div>
  )
}

export default H4