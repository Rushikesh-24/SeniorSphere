"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
    const [heartRate, setHeartRate] = useState(0);
  const [stepCount, setStepCount] = useState(0);

  // Simulating data fetching, replace with actual data fetching logic
  useEffect(() => {
    // Simulate fetching heart rate and step count data from an API
    const fetchData = async () => {
      // Replace these with actual API calls or use a state management library like Redux
      const heartRateData = await fetchHeartRateData();
      const stepCountData = await fetchStepCountData();

      setHeartRate(heartRateData);
      setStepCount(stepCountData);
    };

    fetchData();
  }, []);

  // Replace these functions with actual API calls
  const fetchHeartRateData = async () => {
    // Simulating API call
    return 75; // Replace with actual data
  };

  const fetchStepCountData = async () => {
    // Simulating API call
    return 4000; // Replace with actual data
  };
  return (
    <>
    <div id="container" className='flex justify-center flex-row items-center gap-14'>
        <div id="heartRate" className='flex flex-col items-center justify-center'>
            <img src="/Assets/heartRate.jpg" alt="" className='w-96 mt-2 bg-none'/>
            <p id='HeartbeatCounter' className='-mt-20'>{heartRate} <span>bpm</span></p>
        </div>
        <div id="steps" className='mt-28 border-black flex items-center flex-col'>
            <img src="/Assets/Human_footprints.svg" alt="" className='w-40 mt-2 rounded-full  border-gray-500'/>
            <p id='Stepcount' className='mt-8 gap-1'>{stepCount} <span>steps</span></p>
            <p>{10000-stepCount} <span>Steps remaining</span></p>
        </div>
    </div>
    
    </>
  )
}

export default page