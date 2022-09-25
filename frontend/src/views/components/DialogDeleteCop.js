
import React from "react";

// MUI
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check';
import { Box } from "@mui/system";

export default function DialogDeleteCop(props) {

    return (
        <Dialog open={props.open} onClose={props.handleClose} fullWidth={true} maxWidth="xs" >
            <DialogTitle sx={{ color: 'rgb(1, 67, 97)', fontSize: '16px' }}>Are your sure you want to delete it?</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ fontFamily: '"GothamBook", sans-serif', fontSize: '13px' }}>
                    This campaign will be deleted immediately. You can't undo this action.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={props.handleClose} loading="true" sx={{ marginRight: '20px' }}>CANCLE</Button>
                <Box sx={{ position: 'relative' }}>
                    <Button size="small" color={props.success ? "success":"error"} onClick={props.handleClickDelete} variant="outlined" startIcon={props.success ? <CheckIcon /> : <DeleteIcon />}>DELETE</Button>
                    {
                        props.loading ? (
                            <CircularProgress 
                                size={24}
                                sx={{
                                color: 'rgb(76, 175, 80)',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                                }}
                            />
                        ) : ''
                    }
                </Box>
            </DialogActions>
        </Dialog>
    )
}