import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
  
export default function CalendarGfg() {
  const [value, onChange] = useState(new Date());
  
  return (
    <div class="calendarWrapper"style={{position:"absolute", left:"50%", overflow:"hidden", display:"flex", justifyContent:"center", alignItems:"center", top:"55%", backgroundColor:"#F2F2F2", height:"40%", width:"20vw",
    borderRadius:"50px", boxShadow:"0 0 15px", transform: "translateX(140%)"}}>
    <div style={{position:"absolute", backgroundColor:"white", height:"fit-content", width:"20vw"}}>
        <h3 style={{position:"absolute", left:"38%", top:"-19%"}}>Calendar</h3>
      <Calendar
      
        onChange={onChange}
        value={value}
      />
    </div>
    </div>
  );
}