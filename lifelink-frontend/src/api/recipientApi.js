import api from "./axios";

// Get all recipients
export const getRecipients = (params = {}) => {
    return api.get("recipients/", { params });
};

// Get recipient by ID
export const getRecipient = (id) => {
    return api.get(`recipients/${id}/`);
};

// Create recipient
export const createRecipient = (data) => {
    return api.post("recipients/create/", data);
};

// Update recipient
export const updateRecipient = (id, data) => {
    return api.put(`recipients/${id}/update/`, data);
};

// Delete recipient
export const deleteRecipient = (id) => {
    return api.delete(`recipients/${id}/delete/`);
};