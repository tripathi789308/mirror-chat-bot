import React, { useEffect } from "react";

export default function SignOut(props) {
    useEffect(()=>{
        props.setName("");
    },[props.auth.currentUser]);
    return props.auth.currentUser && (
      <button className="sign-out" onClick={() => props.auth.signOut()}>Sign Out</button>
    )
  }