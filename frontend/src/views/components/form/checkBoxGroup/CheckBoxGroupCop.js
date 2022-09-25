import { Radio, FormControlLabel, FormGroup, Grid } from "@mui/material";
import React from "react";

import { theme } from "../../layout/Theme";
import VideoViewCop from "../../VideoViewCop";
import './CheckBoxGroupCop.scss'

export default function CheckBoxGroupCop(props) {

  return (
    <Grid item xs={3} sm={2}>
        <FormGroup sx={theme.form.formGroupCheckbox} className={ props.checked ? "checkbox-g-v-warp checked" : "checkbox-g-v-warp" }>
            <VideoViewCop controls={false} url={props.url} onLoadedData={props.onLoadedData} />
            <FormControlLabel control={<Radio name={props.name} onChange={props.onChange} value={props.value} sx={{
                color: '#FFF',
                '&.Mui-checked': {
                    color: '#FFF',
                },
                }} 
            />}  />
        </FormGroup>
    </Grid>
  )
}