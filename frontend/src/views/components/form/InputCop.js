import React from "react";
import { Box, FormControl,InputLabel, TextField } from "@mui/material";
import { theme } from "../../layout/Theme";



export default function InputCop(props) {
  
  return (
    <Box sx={theme.form.box}>
      { props.placeholder !== undefined ? <InputLabel>{ props.placeholder }</InputLabel>: '' }
      <FormControl fullWidth required={props.required === 'true' ? true: false} >
        <TextField value={props.value} error={props.error} helperText={props.helperText} onChange={props.onChange} size={props.size} name={props.name} variant="outlined" required={props.required === 'true' ? true: false} disabled={props.disabled === true ? true:false} />
      </FormControl>
    </Box>
  )
}