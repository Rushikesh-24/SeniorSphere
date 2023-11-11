// Import the Web Bluetooth API
"use client"

import { useEffect, useState } from "react";

const { requestDevice } = navigator.bluetooth;

const Page = () => {
  const [heartRate, setHeartRate] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [connected, setConnected] = useState(false);

  const connectToSmartwatch = async () => {
    try {
      // Check if the browser supports the Web Bluetooth API
      if ('bluetooth' in navigator) {
        // Request Bluetooth device
        const device = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] });
  
        // Connect to the Bluetooth device
        const server = await device.gatt.connect();
  
        // Access the Heart Rate service
        const service = await server.getPrimaryService('heart_rate');
  
        // Access the Heart Rate Measurement characteristic
        const characteristic = await service.getCharacteristic('heart_rate_measurement');
  
        // Start notifications for Heart Rate Measurement
        await characteristic.startNotifications();
  
        // Event listener for receiving heart rate data
        characteristic.addEventListener('characteristicvaluechanged', handleHeartRateData);
  
        console.log('Connected to heart rate monitor. Waiting for data...');
  
      } else {
        console.error('Web Bluetooth API not supported in this browser.');
      }
    } catch (error) {
      console.error('Bluetooth error:', error);
    }
  };
  
  // Function to handle incoming heart rate data
  const handleHeartRateData = (event) => {
    const value = event.target.value;
    const heartRate = value.getUint8(1); // Extract heart rate value from the DataView
  
    console.log('Heart Rate:', heartRate);
    // You can now use the 'heartRate' variable to handle the heart rate data in your application
  };
  
  // Call the function to connect to the smartwatch
  connectToSmartwatch();
  

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
