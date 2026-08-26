import api from "./axios";

export const getDonors = (params = {}) => {
    return api.get("donors/", { params });
};

export const getDonor = (id) => {
    return api.get(`donors/${id}/`);
};

export const createDonor = (data) => {
    return api.post("donors/create/", data);
};

export const updateDonor = (id, data) => {
    return api.put(`donors/${id}/update/`, data);
};

export const deleteDonor = (id) => {
    return api.delete(`donors/${id}/delete/`);
};