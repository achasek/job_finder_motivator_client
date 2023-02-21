import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calender.css'
  
export default function CalendarGfg() {
  const [value, onChange] = useState(new Date());
  
  return (
    <div className="calendarWrapper">
    <div className='calendar__container'>
        <h3>Calendar</h3>
      <Calendar
      
        onChange={onChange}
        value={value}
      />
    </div>
    </div>
  );
}