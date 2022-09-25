import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import './Table.scss';

export default function IconWithTextCop(props) {

    const [isCopied, setIsCopied] = React.useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
        } else {
        return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(props.text)
          .then(() => {
            // If successful, update the isCopied state value
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
        });

        if(isCopied) {

        }
    }

    return (
        <Grid container spacing={0} alignItems='center' justifyContent='center' >
            <Grid item >
                <a href={props.text} className="underLineLink" rel="noreferrer" target="_blank">
                    <Typography className="multiLineEllipsis" sx={{ fontSize: '10px', width: '100px' }} >{props.text}</Typography>
                </a>
            </Grid>
            <Grid item>
                <IconButton sx={{ color: '#7764E4',  }} onClick={handleCopyClick}>
                    <ContentCopyOutlinedIcon sx={{ width: '15px', height: '15px' }} />
                </IconButton>
            </Grid>
        </Grid>
    )

}