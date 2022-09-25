import React from "react";
import { Box } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';


import { theme } from "../layout/Theme";



export default function CustomAnchorLink(props) {
  
  return (
    <Box sx={theme.form.box}>
      <a href={props.href} rel="noreferrer" target="_blank">
        <LaunchIcon />
      </a>
    </Box>
  )
}