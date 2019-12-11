var fetch = require('node-fetch');

var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = `https://jobs.github.com/positions.json`;

async function fetchGithub(){
    console.log('fetching github...')

    //fetch all jobs
    let resultCount = 1, onPage = 0;
    const allJobs = [];

    while(resultCount>0){
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('got', resultCount, 'jobs');
        onPage++;
    }
    console.log('got total of',allJobs.length, 'jobs');

    //filter algo
    const JrJobs = allJobs.filter(job =>{
        const jobTitle = job.title.toLowerCase();
        if(
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('platform') ||
            jobTitle.includes('architect')
        ){
            return false;
        }
        return true;
    })
    console.log('filtered down to',JrJobs.length,'jobs');

    //set in redis
    const success = await setAsync('github', JSON.stringify(JrJobs));
    console.log({success});

}
fetchGithub();
module.exports = fetchGithub;