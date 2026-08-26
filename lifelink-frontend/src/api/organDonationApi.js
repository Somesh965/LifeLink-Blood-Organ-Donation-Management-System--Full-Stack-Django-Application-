import api from "./axios";

// Get all organ donations
export const getOrganDonations = (params) => {
    return api.get("organdonations/", { params });
};

// Get organ donation by ID
export const getOrganDonation = (id) => {
    return api.get(`organdonations/${id}/`);
};

// Create organ donation
export const createOrganDonation = (data) => {
    return api.post("organdonations/create/", data);
};

// Update organ donation
export const updateOrganDonation = (id, data) => {
    return api.put(`organdonations/${id}/update/`, data);
};

// Delete organ donation
export const deleteOrganDonation = (id) => {
    return api.delete(`organdonations/${id}/delete/`);
};