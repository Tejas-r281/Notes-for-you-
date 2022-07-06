import React from 'react'
import ListFile from "./ListFile.js";
import InputFile from "./InputFile.js";
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