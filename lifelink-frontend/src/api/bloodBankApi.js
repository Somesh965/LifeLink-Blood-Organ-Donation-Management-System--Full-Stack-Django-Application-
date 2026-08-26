import api from "./axios";

// Get all blood banks
export const getBloodBanks = () => {
    return api.get("bloodbanks/");
};

// Get blood bank by ID
export const getBloodBank = (id) => {
    return api.get(`bloodbanks/${id}/`);
};

// Create blood bank
export const createBloodBank = (data) => {
    return api.post("bloodbanks/create/", data);
};

// Update blood bank
export const updateBloodBank = (id, data) => {
    return api.put(`bloodbanks/${id}/update/`, data);
};

// Delete blood bank
export const deleteBloodBank = (id) => {
    return api.delete(`bloodbanks/${id}/delete/`);
};