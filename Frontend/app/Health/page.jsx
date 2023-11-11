"use client"
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [heartRate, setHeartRate] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [connected, setConnected] = useState(false);

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

      // Update state only if connected
      if (connected) {
        setHeartRate(randomHeartRate);
      }

      // Simulate fetching step count data from an API
      fetchStepCountData().then((stepCountData) => {
        setStepCount(stepCountData);
      });
    };

    // Update data initially and set interval for periodic updates
    updateData();
    const intervalId = setInterval(updateData, 30000); // Update every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [connected]);

  const connectToSmartwatch = () => {
    // Simulate connecting to a smartwatch and fetching heart rate data
    // Replace this with actual logic to connect to a smartwatch
    // and retrieve heart rate data

    // Show connecting message
    alert('Connecting to smartwatch...');

    // Simulate delay (e.g., 5 seconds)
    setTimeout(() => {
      // Update state to indicate connected
      setConnected(true);
      // Show connected message
      alert('Connected to smartwatch!');
    }, 5000);
  };

  const disconnectFromSmartwatch = () => {
    // Simulate disconnecting from a smartwatch
    // Replace this with actual logic to disconnect from a smartwatch
    setConnected(false);
    setHeartRate('--'); // Show '--' when disconnected
    // Additional logic for disconnecting, if needed
  };

  return (
    <>
      <div id="container" className='flex justify-center flex-row items-center gap-14'>
        {connected && (
          <div className="absolute top-20 right-0 m-4 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="ml-2">Connected</span>
          </div>
        )}
        <div id="heartRate" className={`flex flex-col items-center justify-center mt-16 `}>
          <img src="/Assets/heartRate.gif" alt="" className='w-60 mt-2 bg-none'/>
          <p id='HeartbeatCounter' className={`${connected ? '' : 'hidden'}}`}>{heartRate} <span>bpm</span></p>
        </div>
        <div id="steps" className='mt-28 border-black flex items-center flex-col'>
          <img src="/Assets/Human_footprints.svg" alt="" className='w-40 mt-2 rounded-full  border-gray-500'/>
          <p id='Stepcount' className='mt-8 gap-1 '>{stepCount} <span>steps</span></p>
          <p className='text-gray-400 text-sm'>{10000 - stepCount} <span>Steps remaining</span></p>
        </div>
        
      </div>
      <div id="button" className='flex justify-center items-center'>
      {!connected ? (
          <button onClick={connectToSmartwatch} className='bg-blue-500 text-white p-2 mt-8 rounded-md'>
            Connect to Smartwatch
          </button>
        ) : (
          <button onClick={disconnectFromSmartwatch} className='bg-red-500 text-white p-2 mt-8 rounded-md'>
            Disconnect
          </button>
        )}</div>
    </>
  );
};

export default Page;
