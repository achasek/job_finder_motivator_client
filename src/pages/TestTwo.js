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
      primary: 'cow',
    },
    {
      id: 2,
      primary: 'capybara',
    },
    {
      id: 3,
      primary: 'ur mom',
    },
    {
      id: 4,
      primary: 'dog',
    },
    {
      id: 5,
      primary: "cat",
    },
    {
      id: 6,
      primary: 'mammoth',
    },
    {
      id: 7,
      primary: 'cow',
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
              <ListItem className="listItem">
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