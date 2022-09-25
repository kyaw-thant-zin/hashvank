import React from "react";
import { Avatar, Grid, Typography } from "@mui/material";

import './Table.scss';

export default function ImageWithTextCop(props) {

    return (
        <Grid container spacing={2} alignItems='center' >
            <Grid item xs={3}>
                <Avatar sx={{ width: '47px', height: 'auto' }} src={props.src} variant="square" />
            </Grid>
            <Grid item xs={9} >
                <a href={props.src} className="underLineLink" rel="noreferrer" target="_blank">
                    <Typography className="multiLineEllipsis" sx={{ fontSize: '10px' }} >{props.src}</Typography>
                </a>
            </Grid>
        </Grid>
    )

}