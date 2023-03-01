import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ConstContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
}));

const NewEventModal = ({ isOpen, onClose, handleAddEvent }) => {
  const classes = useStyles();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { BACK_URI } = useContext(ConstContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);

  const handleAddClick = async () => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${BACK_URI}/api/events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        date: date,
      }),
    });

    if (!response.ok) {
      console.error('Failed to add event');
      return;
    }

    handleAddEvent({
      title: title,
      date: date,
    });

    setTitle('');
    setDate('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDate('');
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className={classes.modal}>
      <div className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Add New Event
        </Typography>
        <Box mb={2}>
          <TextField
            required
            fullWidth
            label="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            required
            fullWidth
            label="Date (YYYY-MM-DD)"
            value={date}
            onChange={handleDateChange}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Box mr={2}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
          <Button variant="contained" color="primary" onClick={handleAddClick}>
            Add
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default NewEventModal;
