import api from "./axios";

// Get all hospitals
export const getHospitals = (params) => {
    return api.get("hospitals/", { params });
};

// Get hospital by ID
export const getHospital = (id) => {
    return api.get(`hospitals/${id}/`);
};

// Create hospital
export const createHospital = (data) => {
    return api.post("hospitals/create/", data);
};

// Update hospital
export const updateHospital = (id, data) => {
    return api.put(`hospitals/${id}/update/`, data);
};

// Delete hospital
export const deleteHospital = (id) => {
    return api.delete(`hospitals/${id}/delete/`);
};