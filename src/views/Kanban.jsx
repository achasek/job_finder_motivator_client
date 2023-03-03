import React, { useEffect, useState, useContext } from 'react';
import "../styles/kanban.css";
import ListItemText from '@mui/material/ListItemText';
import { BsTrash } from 'react-icons/bs';
import { ConstContext, UserContext } from '../App';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';

const Kanban = () => {
  const [jobs, setJobs] = useState([]);
  const [draggables, setDraggables] = useState([]);
  const [containers, setContainers] = useState([]);
  const [interested, setInterested] = useState([]);
  const [applied, setApplied] = useState([]);
  const [interviewing, setInterviewing] = useState([]);
  const [offer, setOffer] = useState([]);
  const [rejection, setRejection] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const { BACK_URI } = useContext(ConstContext);
  const { currUser } = useContext(UserContext);

  
  const updatedStatus = async (jobId, newStatus) => {
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/job/${jobId}`,
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${token}`,
      },
      data:{ status: newStatus }
    };
    const { data, status, error } = await callExternalApi({ config });
    console.log({ status }, { data });
    if (status.code === 200) {
      // console.log({ data: data.posts });
      getJobs();
    }
  }

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

  useEffect(()=>{getJobs()},[]);

  const filterJobs = async () => {
    setInterested([...jobs?.filter((job) => {return job.status === "Interested"})]);
    setApplied([...jobs?.filter((job) => {return job.status === "Applied"})]);
    setInterviewing([...jobs?.filter((job) => {return job.status === "Interviewing"})]);
    setOffer([...jobs?.filter((job) => {return job.status === "Offer"})]);
    setRejection([...jobs?.filter((job) => {return job.status === "Rejection"})]);
    console.log({jobs},{interested},{applied},{interviewing},{offer},{rejection});
  }

  useEffect(() => {
    const tmpDraggables = document.querySelectorAll('.kanban-listitem__draggable');
    const tmpContainers = document.querySelectorAll('.kanban-inside__containers');

    filterJobs();

    tmpDraggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });
    setDraggables(tmpDraggables);

    tmpContainers.forEach((container) => {
      container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (draggable == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
        //TODO: set job status for the draggable item to the container id
        console.log({draggable}, {container});
        updatedStatus(draggable.id, container.id);
      });
    });
    setContainers(tmpContainers);
  }, [jobs]);
    
    const getDragAfterElement = (container, y) => {
      const draggableElements = [...container.querySelectorAll('.kanban-listitem__draggable:not(.dragging)')];
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

  return (
    <div className='kanban__container'>
      {console.log({interviewing})}
      <h1 className='kanban__title'>Welcome To your Kanban</h1>
      <div className='kanban__trash'><BsTrash /></div>
      <div className='kanban__add'>+</div>

      <div className='kanban__wrapper'>
        <div className='kanban-inside__containers' id='Interested'>
          <h1 className='task__status'>Interested</h1>
          <div className='kanban-todo__list'>
            <div className='kanban-listitem__draggable'>
              {interested?.map((job) => {
                return <ListItemText key={job._id} id={job._id} className='kanban-listitem__text' draggable="true" primary={job.company} secondary={job.position} />
              })}
            </div>
          </div>
        </div>

        <div className='kanban-inside__containers' id='Applied'>
          <h1 className='task__status'>Applied</h1>
          <div className='kanban-progress-list'>
            {applied?.map((job) => {
              return (<div key={job._id} id={job._id} className='kanban-listitem__draggable'>
                <ListItemText className='kanban-listitem__text' draggable="true" primary={job.company} secondary={job.position} />
              </div>)
            })}
          </div>
        </div>

        <div className='kanban-inside__containers' id='Interviewing'>
          <h1 className='task__status'>Interviewing</h1>
          <div className='kanban-finished__list'>
            {interviewing?.map((job) => {
              return (<div key={job._id} id={job._id} className='kanban-listitem__draggable'>
                <ListItemText className='kanban-listitem__text' draggable="true" primary={job.company} secondary={job.position} />
              </div>)
            })}
          </div>
        </div>

        <div className='kanban-inside__containers' id='Offer'>
          <h1 className='task__status'>Offer</h1>
          <div className='kanban-progress-list'>
            <div className='kanban-listitem__draggable'>
              {offer?.map((job) => {
                return <ListItemText key={job._id} id={job._id} className='kanban-listitem__text' draggable="true" primary={job.company} secondary={job.position} />
              })}
            </div>
          </div>
        </div>

        <div className='kanban-inside__containers' id='Rejection'>
          <h1 className='task__status'>Rejection</h1>
          <div className='kanban-progress-list'>
            <div className='kanban-listitem__draggable'>
              {rejection?.map((job) => {
                return <ListItemText key={job._id} id={job._id} className='kanban-listitem__text' draggable="true" primary={job.company} secondary={job.position} />
              })}            
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Kanban;
