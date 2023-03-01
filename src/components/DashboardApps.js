import * as React from 'react';
import '../styles/dashboardapps.css';
import { useState } from 'react';

export default function DashboardApps() {
  const [applicationsSent, setApplicationsSent] = useState(0);
  const [responses, setResponses] = useState(0);

  const handleAddApplication = () => {
    setApplicationsSent(applicationsSent + 1);
  };

  const handleRemoveApplication = () => {
    if (applicationsSent > 0) {
      setApplicationsSent(applicationsSent - 1);
    }
  };

  const handleAddResponse = () => {
    setResponses(responses + 1);
  };

  const handleRemoveResponse = () => {
    if (responses > 0) {
      setResponses(responses - 1);
    }
  };

  return (
    <div className='applications__container'>
      <div className='applications__wrapper'>
        <div className='applications__amount'>
          <h3 className='app__title'>applications sent</h3>
          <p className='app__number'>{applicationsSent}</p>
          <div className="app__button-container">
            <button className="app__buttonP" onClick={handleAddApplication}>+</button>
            <button className="app__buttonM" onClick={handleRemoveApplication}>-</button>
          </div>
        </div>

        <div className='applications__responses'>
          <h3 className='app__title'>responses</h3>
          <p className='app__number'>{responses}</p>
          <div className="app__button-container">
            <button className="app__buttonP" onClick={handleAddResponse}>+</button>
            <button className="app__buttonM" onClick={handleRemoveResponse}>-</button>
          </div>
        </div>

        <div className='tamagatchi'>
          <div className='dino__img'></div>
        </div>
      </div>
    </div>
  );
}
