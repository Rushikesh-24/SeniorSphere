"use client"
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
    const storedContacts = JSON.parse(localStorage.getItem('emergencyContacts')) || [];
    setEmergencyContacts(storedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);

  const addContact = () => {
    if (newName.trim() !== '' && newContact.trim() !== '') {
      const newEmergencyContact = { name: newName, number: newContact };
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
      <table className='mt-4 border-collapse border'>
        <thead>
          <tr>
            <th className='border p-4 px-10'>Name</th>
            <th className='border p-5 px-10'>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {fixedNumbers.map(({ name, number }, index) => (
            <tr key={index}>
              <td className='border p-2'>{name}</td>
              <td className='border p-2'>{number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className='mt-8 text-gray-700 text-2xl'>User-added Numbers</h2>
      <table className='mt-4 border-collapse border'>
        <thead>
          <tr>
            <th className='border p-2 px-10'>Name</th>
            <th className='border p-2 px-10'>Contact Number</th>
            <th className='border p-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {emergencyContacts.map((contact, index) => (
            <tr key={index}>
              <td className='border p-2'>{contact.name}</td>
              <td className='border p-2'>{contact.number}</td>
              <td className='border p-2'>
                <button onClick={() => removeContact(index)} className='rounded-2xl bg-red-500 text-white px-4 py-2'>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='gap-3 flex justify-center items-center mt-5'>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter a name"
          className='h-12 w-56 border-2 shadow-xl'
        />
        <input
          type="text"
          value={newContact}
          onChange={(e) => setNewContact(e.target.value)}
          placeholder="Enter a contact number"
          className='h-12 border-2 shadow-xl w-56'
        />
        <button onClick={addContact} className='rounded-2xl bg-green-500 text-white px-4 py-2'>Add Contact</button>
      </div>
    </div>
  );
};

export default EmergencyContacts;
