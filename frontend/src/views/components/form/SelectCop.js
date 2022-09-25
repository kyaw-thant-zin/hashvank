import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { theme } from "../../layout/Theme";

export default function SelectCop(props) {

    const options = props.menuitems
    

    return (
        <Box minWidth={props.minWidth} sx={theme.form.box}>
            <InputLabel>{ props.placeholder }</InputLabel>
            <FormControl size={props.size} fullWidth required={props.required === 'true' ? true: false} error={props.error}>
                <Select
                    id="demo-simple-select"
                    value={props.data.value}
                    onChange={props.data.change}
                    name={props.name}
                >
                    {
                        options.map((menuitem, index) => (
                            <MenuItem value={menuitem.value} key={index}>{menuitem.name}</MenuItem>
                        ))
                    }
                </Select>
                <FormHelperText>{ props.helperText }</FormHelperText>
            </FormControl> 
        </Box>
    )

}