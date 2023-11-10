"use client"
// pages/emergency-contacts.js
import React, { useState, useEffect } from 'react';

const EmergencyContacts = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newContact, setNewContact] = useState('');
  const fixedNumbers = [
    { name: 'Hospital', number: '123-456-7890' },
    { name: 'Police', number: '987-654-3210' },
  ];

  useEffect(() => {
    // Fetch user-added emergency contacts from a database or storage
    // For now, using local storage for simplicity
    const storedContacts = JSON.parse(localStorage.getItem('emergencyContacts')) || [];
    setEmergencyContacts(storedContacts);
  }, []);

  useEffect(() => {
    // Update local storage when emergencyContacts change
    localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);

  const addContact = () => {
    if (newName.trim() !== '' && newContact.trim() !== '') {
      const newEmergencyContact = `${newName}: ${newContact}`;
      setEmergencyContacts([...emergencyContacts, newEmergencyContact]);
      setNewName('');
      setNewContact('');
    }
  };

  const removeContact = (index) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts.splice(index, 1);
    setEmergencyContacts(updatedContacts);
  };

  return (
    <div className='flex justify-center flex-col items-center'>
      <h1 className='font-semibold text-4xl mt-3'>Emergency Contacts</h1>
      <h2 className='mt-8 text-gray-700 text-2xl'>Fixed Numbers</h2>
      <ul>
        {fixedNumbers.map(({ name, number }, index) => (
          <li key={index} className='mt-4 flex  items-center justify-center'>
            {name}: {number}
          </li>
        ))}
      </ul>
      <h2 className='mt-8 text-gray-700 text-2xl'>User-added Numbers</h2>
      <ul className='flex items-center justify-center'>
        {emergencyContacts.map((contact, index) => (
          <li key={index} className='mt-4 flex  items-center justify-center'>
            {contact}
            <button onClick={() => removeContact(index)} className='rounded-2xl bg-red-500 w-40 h-12 mx-4' >Remove</button>
          </li>
        ))}
      </ul>
      <div className='gap-3 flex justify-center items-center mt-5'>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter a name"
          className='h-10'
        />
        <input
          type="text"
          value={newContact}
          onChange={(e) => setNewContact(e.target.value)}
          placeholder="Enter a contact number"
        />
        <button onClick={addContact} className='rounded-2xl bg-green-500 w-40 h-12 '>Add Contact</button>
      </div>
    </div>
  );
};

export default EmergencyContacts;
