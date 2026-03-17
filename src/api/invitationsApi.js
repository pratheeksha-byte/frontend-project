import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchInvitations = async () => {
  const { data } = await API.get("/invitations");
  return data;
};

export const resendInvite = async (id) => {
  const { data } = await API.post(`/invitations/${id}/resend`);
  return data;
};

export const revokeInvite = async (id) => {
  const { data } = await API.delete(`/invitations/${id}`);
  return data;
};