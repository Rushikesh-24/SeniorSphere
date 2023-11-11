// Import the Web Bluetooth API
"use client"

import { useEffect, useState } from "react";

const { requestDevice } = navigator.bluetooth;

const Page = () => {
  const [heartRate, setHeartRate] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [connected, setConnected] = useState(false);

  const connectToSmartwatch = async () => {
    // Check if the browser supports the Web Bluetooth API
if ('bluetooth' in navigator) {
  // Request Bluetooth device
  navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
    .then(device => {
      // Device is selected, connect and interact with it
      return device.gatt.connect();
    })
    .then(server => {
      // Access the Bluetooth service and characteristics
      return server.getPrimaryService('heart_rate');
    })
    .then(service => {
      // Access characteristics and interact with the device
      // ...
    })
    .catch(error => {
      console.error('Bluetooth error:', error);
    });
} else {
  console.error('Web Bluetooth API not supported in this browser.');
}

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
        )}
      </div>
    </>
  );
};

export default Page;
