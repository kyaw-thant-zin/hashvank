import React from "react";
import { Box, Checkbox } from "@mui/material";
import { theme } from "../../layout/Theme";



export default function CheckboxCop(props) {

  return (
    <Box sx={theme.form.box}>
      <Checkbox checked={props.checked} onChange={props.onChange} value={props.value} />
    </Box>
  )
}