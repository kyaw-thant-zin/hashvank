import * as React from 'react';

// MUI
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Slide } from "@mui/material";

export default function AlertCop(props) {

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    if(props.open) {
        setOpen(true)
    }
  }, [props.open])

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <div>
      <Snackbar
        open={open}
        // autoHideDuration={5000}
        onClose={handleClose}
        message="Note archived"
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={TransitionUp}
        color='green'
      >
        <Alert onClose={handleClose} variant="filled" severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
    </Snackbar>
    </div>
  );
}