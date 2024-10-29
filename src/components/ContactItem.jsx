import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from '../reduxtoolkit/contactsSlice';
import './styles.css'

const ContactItem = ({contact}) => {
    const [value1, setValue1] = useState(contact.name);
    const [value2, setValue2] = useState(contact.number);
    const [value3, setValue3] = useState(contact.who);
    const [checked, setCheck] = useState(contact.called)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const handleEdit = () => {
        const filteredContact = {
            name: value1,
            number: value2,
            who: value3,
            called: false,
            id: contact.id
        }
        dispatch(editContact(filteredContact))
        setShow(!show)
    }
    const handleCheckboxChange = () => {
      const checkboxContact = {
        name: contact.name,
        number: contact.number,
        who: contact.who,
        called: !contact.called,
        id: contact.id
      };
      dispatch(editContact(checkboxContact));
      setCheck(!checked);
    };
    return (
        <li className={checked ? 'check' : null}>
            <input type="checkbox" onChange={() => {
                        handleCheckboxChange()
                    }
                }
            checked={checked}/>
            <span>{contact.name}</span>
            <button onClick={() => dispatch(deleteContact(contact.id))}>Delete</button>
            <button onClick={() => setShow(!show)}>Edit</button>
            {show ? <div>
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
                <button onClick={handleEdit}>Save</button>
            </div> : null}
        </li>
    );
};

export default ContactItem;