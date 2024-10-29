import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddContact from "./components/AddContact";
import ContactItem from "./components/ContactItem";
import ContactList from "./components/ContactList";
import { getContacts } from "./reduxtoolkit/contactsSlice";


function App() {
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts)
  const [filter, setFilter] = useState("")
  const filteredContacts = filter
    ? contacts.filter((contact) => contact.who === filter)
    : contacts
  useEffect(() => {
    dispatch(getContacts())
  }, [])
  return (
    <div className="App">
      <AddContact />
      <h1>Contact List</h1>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="friend">Friends</option>
        <option value="family">Family</option>
        <option value="classmate">Classmates</option>
      </select>
      <ContactList>
        {filteredContacts.map((el) => (
          <ContactItem contact={el} key={el.id} />
        ))}
      </ContactList>
    </div>
  );
}

export default App;
