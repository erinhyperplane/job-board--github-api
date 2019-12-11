import React, { useState } from 'react';
import Job from './job.js';
import JobBoard from './jobBoard.js';
import './App.css';

import Typography from '@material-ui/core/Typography';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


function Jobs({jobs}){
   
//job board
    const [open, setOpen] = React.useState(false);
    const [selectedJobs, selectJob] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

//stepper
    const useStyles = makeStyles({
        root: {
        maxWidth: 400,
        flexGrow: 1,
        },
    });
  
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    
    const steps = Math.ceil(jobs.length / 20);
    const jobsOnPage = jobs.slice(activeStep,activeStep+20)

   return(
    <div className="jobs">
        <div>
            <Typography  component='h2' >Total number of jobs: {jobs.length} </Typography>
        </div>
        <MobileStepper
            variant="dots"
            steps={steps}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === steps-1}>
                Page {activeStep+1} of {steps}
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
                </Button>
            }
        />


        <JobBoard open={open} job={selectedJobs}  handleClose={handleClose} />
        <Typography>
            {jobsOnPage.map((job,i) => <Job key={i} job={job} onClick={()=>{
                handleClickOpen()
                selectJob(job)
                }} />)}
        </Typography>
        <MobileStepper
            variant="dots"
            steps={steps}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === steps-1}>
                Page {activeStep+1} of {steps}
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
                </Button>
            }
        />

    </div>
   )
}

export default Jobs;



