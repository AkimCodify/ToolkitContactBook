import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    contacts: [],
    status: ""
}

export const getContacts = createAsyncThunk("contacts/getContacts", async () => {
    const {data} = await axios.get('http://localhost:8000/contacts')
    return data
})

export const addContact = createAsyncThunk("contacts/addContact", async (newContact) => {
    await axios.post('http://localhost:8000/contacts', newContact)
    return newContact
})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id) => {
    await axios.delete(`http://localhost:8000/contacts/${id}`)
    return id
})

export const editContact = createAsyncThunk("contacts/editContact", async (filteredContact) => {
    await axios.put(`http://localhost:8000/contacts/${filteredContact.id}`, filteredContact)
    return filteredContact
})


const contactsSlice = createSlice({
    name: "ContactSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get Contacts
        builder.addCase(getContacts.fulfilled, (state, action) => {
            state.status = "success get"
            state.contacts = action.payload
        })
        builder.addCase(getContacts.rejected, (state) => {
            state.status = "error get"
            console.error(state.status);
        })
        // add Contacts
        builder.addCase(addContact.fulfilled, (state, action) => {
            state.status = "success add"
            state.contacts.push(action.payload)
        })
        builder.addCase(addContact.rejected, (state) => {
            state.status = "error add"
            console.error(state.status);
        })
        // delete Contacts
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            state.status = "success delete"
            state.contacts = state.contacts.filter((el) => el.id !== action.payload)
        })
        builder.addCase(deleteContact.rejected, (state) => {
            state.status = "error delete"
            console.error(state.status);
        })
        // edit Contacts
        builder.addCase(editContact.fulfilled, (state, action) => {
            state.status = "success edit"
            state.contacts = state.contacts.map((el) => el.id === action.payload.id ? action.payload : el)
        })
        builder.addCase(editContact.rejected, (state) => {
            state.status = "error edit"
            console.error(state.status);
        })
    }
})

export default contactsSlice.reducer