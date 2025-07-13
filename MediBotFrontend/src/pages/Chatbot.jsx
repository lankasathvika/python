import React from 'react'
import Contact from '../components/Abt_comp/Contact'
import History from '../components/Abt_comp/History'
 import H5 from '../components/P1_comp/h5'
import img from './R.jpg'
const Chatbot = () => {
    const arr = ["I want to schedule an appointment with a physician","What is the cost for Prescription Drugs","I want to see someone for vision"];
  return (
    <div>
    <h1>Chat bot</h1>
    <div className='d-flex flex-row justify-content-between col-10 mx-auto pe-1'>
        <div className='d-flex flex-column gap-3'>
            <img className='img-fluid   ' width={550} height={250}  src={img}/>
            <div className=' d-flex flex-wrap gap-3 text-center '>
                {
                    arr.map((x)=>(
                        <div className='form-control'>
                            {x}
                        </div>
                    ))
                }
            </div>
        </div>
        <iframe width="500"
            height="700"
            src= "https://saisreesatyassss.github.io/test/"
            // src= "https://nextjs-zegocloud-uikits-cdgb.vercel.app/"
            title="GeeksforGeeks" > 
        </iframe> 
    </div>
    </div>
  )
}

export default Chatbot
