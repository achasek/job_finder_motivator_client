import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { ConstContext } from '../App';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import NewEventModal from '../components/NewEventModal';

const CalendarPage = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { BACK_URI } = useContext(ConstContext);
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2023-03-15' },
    { title: 'Event 2', date: '2023-03-22' },
    { title: 'Event 3', date: '2023-03-27' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (info) => {
    alert(`Event ${info.event.title} was clicked`);
  };

  const handleDateClick = (info) => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (title, date) => {
    const newEvent = { title, date };
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />
      <NewEventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default CalendarPage;
