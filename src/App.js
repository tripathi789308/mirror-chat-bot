import React, { useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from './components/Navbar.js';
import SignIn from './components/SignIn.js';
import SignOut from './components/SignOut.js';
import ChatRoom from './components/ChatRoom.js'

firebase.initializeApp({
  apiKey: "AIzaSyA5V7_3OEuvZWMUnN_9eHs2pYoYrGCVCsU",
  authDomain: "mirror-chat-942e2.firebaseapp.com",
  projectId: "mirror-chat-942e2",
  storageBucket: "mirror-chat-942e2.appspot.com",
  messagingSenderId: "122188895576",
  appId: "1:122188895576:web:d5758ee5717aae5f61812d",
  measurementId: "G-FXFYEKZ2VF"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);
  const [name,setName]=useState("");

  return (
    <div className="App">
      <header>
        <Navbar name={name} />
        <SignOut auth={auth} setName={setName} />
      </header>

      <section className='container'>
        {user ? <ChatRoom setName={setName} name={name} firestore={firestore} auth={auth}/> : <SignIn auth={auth} />}
      </section>

    </div>
  );
}

export default App;
