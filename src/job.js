import React from 'react';


import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';



function Job({job, onClick}){

    return (
    <Paper onClick={onClick} className="job">
        <div>
            <Typography variant='h5' component='h1' id="job-title">{job.title}</Typography>
            <Typography>{job.company}</Typography>
            <Typography>{job.location}</Typography>
        </div>
        <div>
            <Typography>posted on <i>{job.created_at.split(' ').slice(0,3).join(' ')}</i></Typography>
        </div>
        
  
    </Paper>
    )
    
}

export default Job;