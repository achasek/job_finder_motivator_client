import "../styles/testtwo.css"
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

export default function TestTwo() {
  const [messages, setMessages] = useState()
  const [question, setQuestion] = useState()

  function handleButtonClick(event) {
    // Get the ID of the clicked button
    const buttonId = event.target.id;
    // Get the clicked button and add the "active" class to it
    const clickedButton = document.getElementById(buttonId);
    if (clickedButton) {
      clickedButton.classList.add('active');
    } else {
      console.error('Button not found');
    }
    // Get all other buttons and remove the "active" class from them
    const otherButtons = document.querySelectorAll('.listItem:not(#' + buttonId + ')');
    otherButtons.forEach((button) => {
      button.classList.remove('active');
    });
  }

const messagesX = [
    {
      id: 1,
      primary: 'message 1',
    },
    {
      id: 2,
      primary: 'message 1',
    },
    {
      id: 3,
      primary: 'message 1',
    },
    {
      id: 4,
      primary: 'message 1',
    },
    {
      id: 5,
      primary: "message 1",
    },
    {
      id: 6,
      primary: 'message 1',
    },
    {
      id: 7,
      primary: 'message 1',
    },
    {
      id: 8,
      primary: 'message 1',
    },
    {
      id: 9,
      primary: 'message 1',
    }
  ];

  const messagesY = [
    {
      id: 1,
      primary: 'Gecko',
    },
    {
      id: 2,
      primary: 'Capybara',
    },
    {
      id: 3,
      primary: 'ur mom',
    },
    {
      id: 4,
      primary: 'BBQ Chicken',
    },
    {
      id: 5,
      primary: "CatDog",
    },
    {
      id: 6,
      primary: 'Tony Hawk',
    },
    {
      id: 7,
      primary: 'cow aka (ur sister)',
    },
    {
      id: 8,
      primary: 'ur dad',
    },
    {
      id: 9,
      primary: 'ur grandma',
    }
  ];
useEffect(() => {
setMessages(messagesX)
setQuestion('Whats your goal?')
}, [])

 function handleNext() {
    setMessages(messagesY)
    setQuestion('fav animal?')
 }

 function handleBack() {
    setMessages(messagesX)
    setQuestion('Whats your goal?')
 }

  return (
    <div className="gridContainer">
      <Paper className="paper">
      <button type="button" className="bt" onClick={handleBack} style={{backgroundColor:"white", position:"absolute", left:"0%", fontSize:"4rem", border:"none"}}><BsArrowLeftShort/></button>
       <div style={{display:"flex", flexDirection:"column"}}>
        <h1 className="title">Goal</h1>
        <h1 className="titley">Check</h1>
        </div>
        <h3 className="question">{question}</h3>
        <List className="list">
          {messages?.map(({ id, primary}) => (
            <div key={id}>
              <ListItem onClick={handleButtonClick} className="listItem" id={id}>
                <ListItemText primary={primary}/>
              </ListItem>
            </div>
          ))}
        </List>
        <button type="button" className="bt" onClick={handleNext} style={{position:"relative", left:"40%", fontSize:"3rem", backgroundColor:"white", border:"none"}}><BsFillArrowRightCircleFill/></button>
      </Paper>
    </div>
  );
}