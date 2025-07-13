import {React,useState,useEffect} from 'react'
import {applications } from './data';
import C4 from '../components/P1_comp/card4';
import AppStatus from '../components/Jobs_comp/app_status';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';

const Jobs = () => {
    const { state } = useLocation();
    const [viewAppl, setviewAppl] = useState(true)
    const colors = ['#F3287A',"#2C6BDB","#FEC200"];
      accepted=[];
      shortlisted=[];
      rejected=[];
    const info = {
        username:'',
        dp:'',
        rating:5,
        resume:''
    }
    const handleView = ()=>{
        setviewAppl(!viewAppl);
    }
    const replaceIdsWithObjects = (array, status) => {
        const updatedArray = array.map((id) => {
            const jobObject = jobs.find((job) => job.id === id);
            if (jobObject) {
                jobObject.status = status;
            }
            return jobObject;
        });

        return updatedArray.filter((obj) => obj);
    };

    const [jobs,setJobs]=useState([]);
    const [company,setCompany]=useState([]);
    const [allDoctors,setAllDoctors]=useState([]);

    useEffect(() => {
        Axios.get('https://medibotbackend.onrender.com/doctorRoute/allDoctorIds')
          .then((res) => {
            const doctorIds = res.data;
            setAllDoctors(doctorIds);
            console.log(doctorIds);
            const requests = doctorIds.map((doctor) => {
                const idString = doctor._id.toString();
              return Axios.get(`https://medibotbackend.onrender.com/doctorRoute/doctorPage/${idString}`)
                .then((res) => {
                    setCompany((prev)=>[...prev,res.data.company]);
                  return res.data.applicationsPosted;
                })
                .catch((err) => {
                  console.error(err);
                  return [];
                });
            });
            return Promise.all(requests);
          })
          .then((applicationsPostedList) => {
            const flattenedList = applicationsPostedList.flat();
            setJobs(flattenedList);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);      

    useEffect(() => {
      return () => {
        applications.forEach((app) => {
            switch (app.status) {
                case 'accepted':
                    accepted.push(app.id);
                    break;
                case 'shortlisted':
                    shortlisted.push(app.id);
                    break;
                case 'rejected':
                    rejected.push(app.id);
                    break;
                default:
                    break;
            }
        });
        accepted.length && (accepted = replaceIdsWithObjects(accepted, 'accepted'));
        shortlisted.length && (shortlisted = replaceIdsWithObjects(shortlisted, 'shortlisted'));
        rejected.length && (rejected = replaceIdsWithObjects(rejected, 'rejected'));
      }
    }, []);

  return (
    (jobs)?
    <div className='m-5 p-5'>
        {(viewAppl)?(
            <div className='d-flex flex-column gap-5'>
                <div className='d-flex flex-row justify-content-center'>
                    <button className='btn btn-primary' onClick={handleView}>Application status</button>
                </div>
                <div className='d-flex flex-wrap justify-content-between gap-5'>
                    {jobs.map((card, index) => (
                        <C4 key={index} client={state} arr={card} company={company[index]} colour={colors[index % colors.length]} info={info} disable={false}/>
                    ))}
                </div>
            </div>
        ):(
        <div className='d-flex flex-column gap-5'>
            <div className='d-flex flex-row justify-content-center'>
                <button className='btn btn-primary' onClick={handleView}>View Jobs</button>
            </div>
            <div className='d-flex flex-column justify-content-center gap-5'>
             {
                accepted.map((array,index)=>{
                    <AppStatus key={index} arr={array}/>
                })
            }
            {/* Shortlisted */}
            {
                shortlisted.map((array,index)=>{
                    <AppStatus key={index} arr={array}/>
                })
            }
            {/* Rejected */}
            {
                rejected.map((array,index)=>{
                    <AppStatus key={index} arr={array}/>
                })
            }
            </div>
        </div>)}
    </div>:<div>loading</div>
  )
}

export default Jobs