"use client"
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [heartRate, setHeartRate] = useState(0);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    // Simulate fetching step count data from an API
    const fetchStepCountData = async () => {
      // Simulating API call
      return 4000; // Replace with actual data
    };

    const updateData = () => {
      // Simulate fetching heart rate data from an API
      // Generate a random heart rate within a normal range (e.g., 60-100 bpm)
      const randomHeartRate = Math.floor(Math.random() * (100 - 60 + 1) + 60);

      // Update state
      setHeartRate(randomHeartRate);

      // Simulate fetching step count data from an API
      fetchStepCountData().then((stepCountData) => {
        setStepCount(stepCountData);
      });
    };

    // Update data initially and set interval for periodic updates
    updateData();
    const intervalId = setInterval(updateData, 5000); // Update every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div id="container" className='flex justify-center flex-row items-center gap-14'>
        <div id="heartRate" className='flex flex-col items-center justify-center mt-16'>
          <img src="/Assets/heartRate.gif" alt="" className='w-60 mt-2 bg-none'/>
          <p id='HeartbeatCounter' className=''>{heartRate} <span>bpm</span></p>
        </div>
        <div id="steps" className='mt-28 border-black flex items-center flex-col'>
          <img src="/Assets/Human_footprints.svg" alt="" className='w-40 mt-2 rounded-full  border-gray-500'/>
          <p id='Stepcount' className='mt-8 gap-1 '>{stepCount} <span>steps</span></p>
          <p className='text-gray-400 text-sm'>{10000 - stepCount} <span>Steps remaining</span></p>
        </div>
      </div>
    </>
  );
};

export default Page;
