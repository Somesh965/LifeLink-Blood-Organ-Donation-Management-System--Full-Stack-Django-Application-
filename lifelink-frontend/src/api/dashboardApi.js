import api from "./axios";

export const getDashboardStatistics = async () => {

    const [
        donors,
        recipients,
        bloodRequests,
        bloodBanks,
        hospitals,
        donations,
        organDonations,
    ] = await Promise.all([
        api.get("donors/"),
        api.get("recipients/"),
        api.get("bloodrequests/"),
        api.get("bloodbanks/"),
        api.get("hospitals/"),
        api.get("donations/"),
        api.get("organdonations/"),
    ]);

    return {
        totalDonors: donors.data.count,
        totalRecipients: recipients.data.count,
        totalBloodRequests: bloodRequests.data.count,
        totalBloodBanks: bloodBanks.data.count,
        totalHospitals: hospitals.data.count,
        totalDonations: donations.data.count,
        totalOrganDonations: organDonations.data.count,
    };
};