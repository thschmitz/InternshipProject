import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface title {
  setTitle: (type: string) => void,
  title: string
}

const TextArea: React.FC<title> = ({setTitle, title}) => {
  return(
    <div className="mt-10 ml-5 mr-5">
      <TextField value={title} id="outlined-basic" label="Título" variant="outlined" onChange={(e) => setTitle(e.target.value)} className="w-full mt-10"/>
    </div>
  )
}


export default TextArea;