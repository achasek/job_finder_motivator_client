import * as React from 'react';
import '../styles/dashboardapps.css'



export default function DashboardApps(){ 

  return (
 <div className='applications__container'>

  <div className='applications__wrapper'>
  <div className='applications__amount'>
    <h3 className='app__title'>applications sent</h3>
    <p className='app__number'>0</p>
  </div>

  <div className='applications__responses'>
  <h3 className='app__title'>responses</h3>
  <p className='app__number'>0</p>
  </div>

  <div className='tamagatchi'>
  <h3 className='app__title'>tamagatchi</h3>
  <p>dinosaur</p>
  </div>

 </div>
  </div>
  );
}