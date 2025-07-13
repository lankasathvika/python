import React from 'react'
import C5 from './card5'
import img1 from '../../assets/client1.svg';
import img2 from '../../assets/client2.svg';
import img3 from '../../assets/client3.svg';
import blog1 from '../../assets/blog1.svg';
import blog2 from '../../assets/blog2.svg'
import C4 from './card4';
import C6 from './card6';

const H7 = () => {
    const blogs = [
        {
            img:blog1,
            date:"May 1, 2023",
            head:"How to create a Design Agency Website",
            body:"Experience the magic of design as we reveal the creation of our website in our latest YouTube video. Join us on a visual journey from concept to reality, exploring the art and craftsmanship behind our digital presence."
        },
        {
            img:blog2,
            date:"June 5, 2023",
            head:"Job Application Submission To make it Easier for Us",
            body:"Simplify your job application process with our latest video guide. Learn efficient tips and tricks to streamline your submission, ensuring a smoother and more successful application experience."
        }
    ]
    const arr =[
        {
            img:img1,
            name:"Robert Anderson",
            role:"CEO of Company",
            rating:5,
            head:"Awesome Prescriptions!",
            comment:"MediBot has been a lifesaver for me. I live in a remote area and it's difficult to get to a doctor's office. With MediBot, I can consult with a doctor from the comfort of my own home."
        },
        {
            img:img2,
            name:"Annisa Dinney",
            role:"CEO of Company",
            rating:5,
            head:"Awesome Prescriptions!",
            comment:"I love the chatbot feature. It's so convenient to be able to ask quick health questions and get immediate responses. It's like having a doctor in my pocket!"
        },
        {
            img:img3,
            name:"John Marchell",
            role:"CEO of Company",
            rating:5,
            head:"Awesome Prescriptions!",
            comment:"MediBot has helped me manage my chronic condition so much better. I can track my symptoms, medications, and progress all in one place. It's made a huge difference in my life."
        }
    ]
  return (
    <div className='py-5 mb-5'>
        {/* Testimonials */}
        <div className='d-flex flex-column text-start col-10 mx-auto my-5'>
            <h6 className='sub-head fw-bold text-primary'>Testimonials</h6>
            <h1 className='head'>Our Client <span className='text-primary'>Testinmonials</span></h1>
            <p className='body'>Enhance the credibility with compelling client testimonials, providing authentic endorsements that bolster trust and affirm the quality of products or services for potential customers.</p>
        </div>
        {/* Feedback */}
        <div className='d-flex flex-wrap gap-5 justify-content-center my-5'>
            {
                arr.map((card,index)=>(
                    <C5 key={index} arr={card}/>
                ))
            }
        </div>
        {/* Blogs */}
        <div className='d-flex flex-column justify-content-center gap-3 py-5'>
            <div className='col-10 mx-auto'>
                <h6 className='sub-head fw-bold text-primary'>Latest Articles</h6>
                <h1 className='head'>From Our <span className='text-primary'>Blog</span></h1>
                <p className='body'>Dive into a world of insights and expertise on our blog page, where we share valuable content to enrich your knowledge and keep you inspired.</p>
            </div>
            <div className='d-flex flex-wrap gap-5 justify-content-center'>
                {
                    blogs.map((card,index)=>(
                        <C6 arr={card}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default H7