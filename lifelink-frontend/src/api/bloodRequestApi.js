import api from "./axios";

// Get all blood requests
export const getBloodRequests = (params = {}) => {
    return api.get("bloodrequests/", { params });
};

// Get blood request by ID
export const getBloodRequest = (id) => {
    return api.get(`bloodrequests/${id}/`);
};

// Create blood request
export const createBloodRequest = (data) => {
    return api.post("bloodrequests/create/", data);
};

// Update blood request
export const updateBloodRequest = (id, data) => {
    return api.put(`bloodrequests/${id}/update/`, data);
};

// Delete blood request
export const deleteBloodRequest = (id) => {
    return api.delete(`bloodrequests/${id}/delete/`);
};