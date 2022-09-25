import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from "react";

import { theme } from "../layout/Theme";

export default function DialogCop(props) {

    return (
        <Dialog open={props.open} onClose={props.handleClose} fullWidth={true} maxWidth="sm" >
            <DialogTitle>CSV IMPORT</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" sx={{ fontFamily: '"GothamBook", sans-serif', marginBottom: '20px'  }}>
                    {props.fileName}
                </Typography>
                <Button variant="outlined" sx={theme.button.contentHeader} onClick={props.handleDialogClickImport} startIcon={<UploadFileIcon />} >
                    FILE UPLOAD
                    <input ref={props.fileInputRef} type="file" accept=".csv" hidden onChange={props.handleSetFileName} />
                </Button>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} variant="outlined" color="error">CANCLE</Button>
                <Button variant="outlined" color="success" onClick={props.handleFileUpload}>IMPORT</Button>
            </DialogActions>
        </Dialog>
    )
}