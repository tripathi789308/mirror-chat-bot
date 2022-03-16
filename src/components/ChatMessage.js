import React,{useState,useEffect} from "react";

export default function ChatMessage(props) {
    const { text, sendBy } = props.message;
    const messageClass = sendBy === "user" ? 'sent' : 'received';
    const [firstName,setFirstName] = useState("");
    useEffect(()=>{
      let value = props.name.split(" ");
      if(sendBy === "user")
      setFirstName(value[0]);
      else
      setFirstName("Bot");
    },[]);
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={firstName==="Bot" ? require('./robot.png'):`https://ui-avatars.com/api/?name=${firstName}`}/>
        <p>{text}</p>
      </div>
    </>)
  }
  