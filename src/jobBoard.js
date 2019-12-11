import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function JobBoard({job, open, handleClose}){

    return(
        <div>
            
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <b>{job.title}</b> - 
                    {job.company}
                    <img className='detail-logo' src={job.company_logo} />
                </DialogTitle>
                <DialogContent>
                <DialogContentText 
                    id="alert-dialog-slide-description"
                    dangerouslySetInnerHTML={{__html:job.description}}
                >
                
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" href={job.url}>
                    Apply Now
                </Button>
                
                </DialogActions>
            </Dialog>
        </div>
    )
}