import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobList from './JobList';
import MapComponent from './MapComponent';
import FavoriteJobs from './FavoriteJobs';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Load saved favorites from localStorage
    return JSON.parse(localStorage.getItem('favoriteJobs')) || [];
  });

  // Fetch jobs from Indeed API (replace with a suitable API)
  const fetchJobs = async () => {
    const response = await axios.get('YOUR_JOB_API_ENDPOINT', {
      params: {
        keyword,
        location,
        jobType
      }
    });
    setJobs(response.data.jobs); // Assuming the API returns jobs in `response.data.jobs`
  };

  // Save favorites to local storage
  const saveFavoriteJob = (job) => {
    const updatedFavorites = [...favorites, job];
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteJobs', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchJobs();
  }, [keyword, location, jobType]);

  return (
    <div>
      <h1>Job Board</h1>

      {/* Search & Filter */}
      <input
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      >
        <option value="">Select Job Type</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="contract">Contract</option>
      </select>

      {/* Job List */}
      <JobList
        jobs={jobs}
        onJobClick={(job) => setSelectedJob(job)}
        onSaveJob={saveFavoriteJob}
      />

      {/* Map Component */}
      {selectedJob && (
        <MapComponent location={selectedJob.location} />
      )}

      {/* Favorites */}
      <FavoriteJobs favoriteJobs={favorites} />
    </div>
  );
};

export default App;
