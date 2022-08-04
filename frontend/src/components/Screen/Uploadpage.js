import React from 'react'
import ListFile from "./UserAccceptedRejectedPending.js";
import InputFile from "./InputFileDecription.js";
import "./Uploadpage.css"

function Uploadpage() {
  return (
    <div className="container uploadpages">
    <InputFile/>
    <ListFile/>
    </div>
  )
}

export default Uploadpage