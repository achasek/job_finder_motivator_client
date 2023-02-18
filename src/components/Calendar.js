import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
  
export default function CalendarGfg() {
  const [value, onChange] = useState(new Date());
  
  return (
    <div class="calendarWrapper"style={{position:"absolute", left:"40%", display:"flex", justifyContent:"center", alignItems:"center", top:"55%", backgroundColor:"#F2F2F2", height:"300px", width:"350px",
    borderRadius:"50px", boxShadow:"0 0 15px", minwidth:"fit-content", padding:"20px", transform: "translateX(140%)"}}>
    <div style={{ position:"absolute", backgroundColor:"white", height:"fit-content", minwidth:"20vw"}}>
        <h3 style={{position:"absolute", left:"38%", top:"-19%"}}>Calendar</h3>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
    </div>
  );
}