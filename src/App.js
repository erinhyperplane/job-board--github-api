import React from 'react';
import './App.css';
import Jobs from './jobs';



const JOB_API_URL = 'http://localhost:3001/api/jobs';

async function fetchJobs(updateCb){
  console.log('Fetching jobs');
  const res = await fetch(JOB_API_URL);
  console.log("res:");
  console.log(res);
  let json = await res.json();
  console.log('Finished fetching:');
  console.log(json);

  updateCb(json);
}

function App(updateCb) {
  const [jobList, updateJobs] = React.useState([]);
  
  React.useEffect(()=>{
    fetchJobs(updateJobs);
  },[]);
  
  return (
    <div className="job-board-container">
      <h1>Entry Level SDE Jobs</h1>
      <Jobs jobs = {jobList} />
    </div>
  );
}

export default App;
