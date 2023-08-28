import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

export default function ChatRoom(props) {
  const scroll = useRef();
  const focus = useRef(null);
  let auth = props.auth;
  let firestore = props.firestore;
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("messages==>", messages);
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    props.setName(props.auth.currentUser.displayName);
    focus.current.focus();
  }, []);

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { uid } = auth.currentUser;
      setFormValue("");
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        sendBy: "user",
        uid,
      });
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        sendBy: "bot",
        uid,
      });
      scroll.current.scrollIntoView({ behavior: "smooth" });
      setLoading(false);
    } catch (e) {
      console.log("found an error", e);
    } finally {
      focus.current.focus();
    }
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <>
              {msg.uid === auth.currentUser.uid && (
                <ChatMessage key={msg.id} message={msg} name={props.name} />
              )}
            </>
          ))}

        <span ref={scroll}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          ref={focus}
          disabled={loading}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message here"
        />

        <button type="submit" className="send" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}
