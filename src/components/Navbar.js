import React from "react";

export default function Navbar(props){
    return(
        <>
        <div style={{display:"flex",flexDirection:"column",padding:"0px",margin:"0px"}}>
        <h2 style={{padding:"0px",margin:"0px",float:"left"}}>Darpan</h2>
        <p style={{padding:"0px",margin:"5px"}}>Your personal mirror assistant</p>
        </div>
        <p style={{float:"right"}}>{props.name ? `hey, ${props.name}`:""}</p>
        </>
    )

}