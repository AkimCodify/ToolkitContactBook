import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../reduxtoolkit/contactsSlice';

const AddContact = () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const dispatch = useDispatch()
    const handleAdd = () => {
        const newContactObj = {
            name: value1,
            number: value2,
            who: value3 ? value3 : "friend",
            called: false,
            id: Date.now()
        }
        dispatch(addContact(newContactObj))
    }
    return (
      <div>
        <h1>Add Contact</h1>
        <input
          type="text"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          placeholder="Name"
        />
        <input
          type="tel"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          placeholder="Number"
        />
        <select value={value3} onChange={(e) => setValue3(e.target.value)}>
          <option value="friend">Friend</option>
          <option value="classmate">Classmate</option>
          <option value="family">Family</option>
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>
    );
};

export default AddContact;