import React from 'react'
import Post from '../components/Jobs_comp/Post'
import Application_card from '../components/Jobs_comp/application'
import {applications} from './data'
import {useState,useEffect} from 'react'
import Axios from 'axios';
import post from '../assets/post.svg'
import { jobs } from './data';
import { useNavigate,useLocation } from 'react-router-dom'
const HrJobs = () => {

  const { state } = useLocation();
  const [doctor, setDoctor] = useState(null);
  const [applications,setApplications]=useState([]);


  useEffect(()=>{
    Axios.get(`https://medibotbackend.onrender.com/doctorRoute/doctorPage/applicationsReceived/${state}`)
    .then((res) => setApplications(res.data))
    .catch((err) => alert(err));
  },[])

  useEffect(() => {
    Axios.get(`https://medibotbackend.onrender.com/doctorRoute/doctorPage/${state}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => alert(err));
  }, []); 
  const navigate=useNavigate();


  const filteredApplications = applications.filter(app => app.status !== 'rejected');
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    location: '',
    jobMode: '',
    salary: '',
    skills: '',
    jobDescription: '',
});

const [job, setJob] = useState([]);

const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
};

const postJob = () => {
    jobs.push(formData);    
    setJob((prevJob) => [...prevJob, formData]);
    console.log(formData);
    Axios.put(`https://medibotbackend.onrender.com/doctorRoute/jobs/${doctor._id}`,formData).
        then((res)=>{
            if (res.status === 200 && res.data.message === 'Update Successful') {
              alert("Update successful");
            } else {
              alert("update failed");
            }
          }).catch((err)=>alert(err));
    setFormData({
      title: '',
    role: '',
    location: '',
    jobMode: '',
    salary: '',
    skills: '',
    jobDescription: '',
    });
};
  return (
    (applications)?
    <div>
      <div className='mb-5 pb-5'>
        <div className='my-5 py-3 pb-5 position-relative'>
            <div className='bg-primary' style={{height:'300px'}}></div>
            {/* Card */}
            <div className='col-11 mx-auto position-absolute translate-middle-x top-0 mt-5 pt-5 start-50'>
                <div className='shadow rounded-3 d-flex flex-row p-5 text-start align-items-center mt-5 bg-white'>
                    <div className='d-flex flex-column col-9'>
                        <h2 className='sub-head fw-bold'>Post a Job</h2>
                        <form className='d-flex flex-wrap gap-3 align-items-end'>
                            <div className='col-5'>
                                <label className='form-label' for='head'>Job title</label>
                                <input id='title' className='form-control' onChange={handleChange}/>
                            </div>
                            <div className='col-5'>
                                <label className='form-label' for='role'>Role</label>
                                <input id='role' className='form-control' onChange={handleChange}/>
                            </div>
                            <div className='col-5'>
                                <label className='form-label' for='location'>Location</label>
                                <input id='location' className='form-control' onChange={handleChange}/>
                            </div>
                            <div className='col-5'>
                                <label className='form-label' for='type'>Job mode</label>
                                <input id='jobMode' className='form-control' onChange={handleChange}/>
                            </div>
                            <div className='col-5'>
                                <label className='form-label' for='salary'>Salary</label>
                                <input id='salary' className='form-control' onChange={handleChange}/>
                            </div>
                            <div className='col-5'>
                                <label className='form-label' for='skills'>Skills</label>
                                <input id='skills' className='form-control' onChange={handleChange}/>
                            </div>
                            <div className='col-9'>
                                <label className='form-label' for='description'>Job description</label>
                                <textarea id='jobDescription' className='form-control' onChange={handleChange}></textarea>
                            </div>
                            <div className='rounded-5 bg-primary d-flex align-items-center justify-content-center btn' style={{height:'60px', width:'60px'}} onClick={postJob}>    
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="30" viewBox="0 0 36 30" fill="none">
                                    <path d="M32.5487 0.331995L1.77349 12.2498C0.535039 12.8048 0.116162 13.9162 1.47415 14.5194L9.36932 17.039L28.4588 5.19146C29.5011 4.44769 30.5682 4.64602 29.65 5.46422L13.2547 20.3718L12.7397 26.6806C13.2167 27.6547 14.0901 27.6592 14.6473 27.1751L19.1833 22.8649L26.9519 28.7068C28.7563 29.7795 29.7381 29.0873 30.1263 27.1211L35.2218 2.89123C35.7509 0.471082 34.8486 -0.595258 32.5487 0.331995Z" fill="white"/>
                                </svg>
                            </div>
                        </form>
                    </div>
                    <div className=''>
                        <img src={post} className='img-fluid'/>
                    </div>
                </div>
            </div>
        </div>
        <div className='my-5 py-5'></div>
    </div>
      {/* Search */}
      <div className='d-flex flex-row'>
        {/* Filter */}
        <div className=''></div>
        {/* Applications */}
        <div className='my-5'>
          <div className='d-flex flex-wrap col-10 mx-auto gap-5 justify-content-between'>
            {filteredApplications.map((application, index) => (
              <Application_card key={index} doctor={doctor} arr={application} />
            ))}
          </div>
        </div>
      </div>
    </div>:<div>loading</div>
  )
}

export default HrJobs