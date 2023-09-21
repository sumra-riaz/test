import { createSlice } from "@reduxjs/toolkit";
import NetworkCall from "../../network/NetworkCall";
import modalService from "../../services/modalService";
import { message } from "antd";

const initialState = {
  contactsDetails: {
    contacts_ids: [],
    contacts: {},
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    saveContacts: (state, action) => {
      state.contactsDetails = {
        ...action?.payload,
        contacts_ids: [
          ...state.contactsDetails.contacts_ids,
          ...action.payload.contacts_ids,
        ],
        contacts: {
          ...state.contactsDetails.contacts,
          ...action.payload.contacts,
        },
      };
    },
    reset: (state, action) => {
      state.contactsDetails = {
        contacts_ids: [],
        contacts: {},
      };
    },
  },
});

export const fetchContacts = (filter) => {
  return async (dispatch) => {
    try {
      const response = await NetworkCall.fetch(
        modalService.getContacts(filter),
        true
      );
      dispatch(saveContacts(response));
    } catch (error) {
      message.error(error.message);
    }
  };
};

// Action creators are generated for each case reducer function
export const { saveContacts, reset } = modalSlice.actions;
export const contactsList = (state) => state?.modal?.contactsDetails;
export default modalSlice.reducer;
