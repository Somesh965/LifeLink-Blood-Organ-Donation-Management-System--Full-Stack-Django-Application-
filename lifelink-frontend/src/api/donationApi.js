import api from "./axios";

// Get all donations
export const getDonations = (params) => {
    return api.get("donations/", { params });
};

// Get donation by ID
export const getDonation = (id) => {
    return api.get(`donations/${id}/`);
};

// Create donation
export const createDonation = (data) => {
    return api.post("donations/create/", data);
};

// Update donation
export const updateDonation = (id, data) => {
    return api.put(`donations/${id}/update/`, data);
};

// Delete donation
export const deleteDonation = (id) => {
    return api.delete(`donations/${id}/delete/`);
};