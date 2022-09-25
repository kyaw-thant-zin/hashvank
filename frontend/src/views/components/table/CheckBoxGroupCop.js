import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import React from "react";

import {theme} from '../../layout/Theme';

export default function CheckBoxGroupCop(props) {

  return (
    <Grid container sx={{ justifyContent: 'space-between' }}>
        <Grid item>
            <FormGroup sx={theme.form.formGroupCheckbox}>
                <FormControlLabel control={<Checkbox name="showAccount" onChange={props.onChange} checked={props.checked.showAccount} value={props.value.showAccount} checkedIcon={<CheckBoxOutlinedIcon sx={{ color: '#7764E4' }} />} />} label="Account"  />
            </FormGroup>
        </Grid>
        <Grid item>
            <FormGroup sx={theme.form.formGroupCheckbox}>
                <FormControlLabel control={<Checkbox name="showTitle" onChange={props.onChange} checked={props.checked.showTitle} value={props.value.showTitle} checkedIcon={<CheckBoxOutlinedIcon sx={{ color: '#7764E4' }} />} />} label="Title"  />
            </FormGroup>
        </Grid>
        <Grid item>
            <FormGroup sx={theme.form.formGroupCheckbox}>
                <FormControlLabel control={<Checkbox name="showHashtag" onChange={props.onChange} checked={props.checked.showHashtag} value={props.value.showHashtag} checkedIcon={<CheckBoxOutlinedIcon sx={{ color: '#7764E4' }} />} />} label="Hashtag"  />
            </FormGroup>
        </Grid>
    </Grid>
  )
}