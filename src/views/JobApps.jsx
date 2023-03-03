import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ProfileSideBar } from '../components';
import EditJobButton from '../components/EditJobbutton';
import DeleteJobButton from '../components/DeleteJobbutton';
import JobCommentForm from '../components/JobCommentForm';
import '../styles/jobapps.css';
import { ConstContext, UserContext } from '../App';

const JobApps = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [jobs, setJobs] = useState([]);
  const { BACK_URI } = useContext(ConstContext);
  const { currUser } = useContext(UserContext);

  const getJobs = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/job/`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${token}`,
      },
    };
    const { data, status, error } = await callExternalApi({ config });
    console.log({ status }, { data });
    if (status.code === 200) {
      // console.log({ data: data.posts });
      setJobs(data.jobs);
    }
  };

  useEffect(() => {
    // console.log('Hello');
    getJobs();
  }, []);
  
  const handleDelete = (jobId) => {
    const updatedJobs = jobs.filter((job) => job._id !== jobId);
    setJobs(updatedJobs);
  };


  return (
    <div className="jobs__page">
      <ProfileSideBar />
      <h1 className='jobPage__title'> Job Applications</h1>
        {/* -------------------------- job title and Content section below ------------------------- */}
      <div className="jobs__container">
        {jobs?.map((job) => (
          <div className='jobs__Pcontainer' key={job._id}>
            <h2 className='job__title'>{job.company} : {job.position}</h2>
            <br/>
            <div className="each__Job" >
              <h3>URL :</h3>
              <p className='content__container1'>{job.url}</p>
              <h3>Status :</h3>
              <p className='content__container1'>{job.status}</p>
              <h3>Date Applied :</h3>
              <p className='content__container1'>{job.date_applied ? job.date_applied : null}</p>
              <h3>Date of Response :</h3>
              <p className='content__container1'>{job.date_response ? job.date_response : null}</p>
              <h3>Description :</h3>
              <p className='content__container1'>{job.description}</p>
              <hr />
                {/* -------------------------- like and comment total section below ------------------------- */}
              <p>
                Comments: {job.comments.length}
              </p>
              <hr /> 
              <JobCommentForm job={job} getJobs={getJobs} />
              <hr />
              {job.comments.length > 0 && (
              <div>
                {/* -------------------------- comments section below ------------------------- */}
                <h3>Scroll Comments Below: <ion-icon name="caret-down-outline"></ion-icon></h3>
                <div className="comments__box1">
                  {job.comments?.map((comment) => (
                  <div className='each__comment1' key={comment._id}>
                    <div className='comment__author1'>
                      <img className='comment__pic1' src={comment.owner_picture} />  
                      <p>User: {comment.owner_name}</p>
                  <p className='comment1'>~ {comment.content}</p>
                    </div>
                  <hr />
                  <hr />
                </div>
              ))}
              </div>
            </div>
          )}
          </div>
            {/* -------------------------- edit/delete section below ------------------------- */}
          {(currUser._id === job.owner)?
            <div className='edit__delete'>
              <EditJobButton job={job} getJobs={getJobs} />
              <DeleteJobButton job={job} onDelete={handleDelete} getJobs={getJobs} />
            </div>
          :null }
        </div>
      ))}
      </div>
    </div>
  );
};

export default JobApps;
