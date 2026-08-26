import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDonors, deleteDonor } from "../../api/donorApi";

function DonorList() {
    const [donors, setDonors] = useState([]);

    const [search, setSearch] = useState("");
    const [availability, setAvailability] = useState("");
    const [eligible, setEligible] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadDonors();
    }, [search, availability, eligible, currentPage]);

    const loadDonors = async () => {
    try {
        const params = {};

        if (search) params.search = search;
        if (availability) params.availability_status = availability;
        if (eligible !== "") params.is_eligible = eligible;

        // Pagination
        params.page = currentPage;

        const response = await getDonors(params);

        console.log(response.data);

        if (Array.isArray(response.data.result)) {
            setDonors(response.data.result);
        } else if (Array.isArray(response.data.results)) {
            setDonors(response.data.results);
        } else if (Array.isArray(response.data)) {
            setDonors(response.data);
        } else {
            console.error("Unexpected API Response:", response.data);
            setDonors([]);
        }

        // Pagination information
        setTotalPages(response.data.total_pages || 1);

    } catch (error) {
        console.error(error);
        setDonors([]);
        setTotalPages(1);
    }
};

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this donor?"
        );

        if (!confirmDelete) return;

        try {

            await deleteDonor(id);

            alert("Donor Deleted Successfully");

            loadDonors();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Donor Management</h2>

                <Link
                    to="/donors/add"
                    className="btn btn-primary"
                >
                    Add Donor
                </Link>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Donor..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={availability}
                        onChange={(e) =>
                            setAvailability(e.target.value)
                        }
                    >
                        <option value="">All Status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={eligible}
                        onChange={(e) =>
                            setEligible(e.target.value)
                        }
                    >
                        <option value="">All Eligibility</option>
                        <option value="true">Eligible</option>
                        <option value="false">Not Eligible</option>
                    </select>

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => {
                            setSearch("");
                            setAvailability("");
                            setEligible("");
                        }}
                    >
                        Clear
                    </button>

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>User ID</th>
                        <th>Weight</th>
                        <th>Last Donation</th>
                        <th>Status</th>
                        <th>Eligible</th>
                        <th width="220">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {donors.length === 0 ? (

                        <tr>

                            <td
                                colSpan="7"
                                className="text-center"
                            >
                                No Donors Found
                            </td>

                        </tr>

                    ) : (

                        donors.map((donor) => (

                            <tr key={donor.id}>

                                <td>{donor.id}</td>

                                <td>{donor.user}</td>

                                <td>{donor.weight}</td>

                                <td>{donor.last_donation_date}</td>

                                <td>

                                    <span
                                        className={
                                            donor.availability_status === "Available"
                                                ? "badge bg-success"
                                                : "badge bg-danger"
                                        }
                                    >
                                        {donor.availability_status}
                                    </span>

                                </td>

                                <td>

                                    {donor.is_eligible ? (
                                        <span className="badge bg-primary">
                                            Eligible
                                        </span>
                                    ) : (
                                        <span className="badge bg-secondary">
                                            Not Eligible
                                        </span>
                                    )}

                                </td>

                                <td>

                                    <Link
                                        to={`/donors/${donor.id}`}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/donors/edit/${donor.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(donor.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>
            <div className="d-flex justify-content-center mt-4">

    <button
        className="btn btn-secondary me-2"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
    >
        Previous
    </button>

    <span className="align-self-center">
        Page {currentPage} of {totalPages}
    </span>

    <button
        className="btn btn-secondary ms-2"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
    >
        Next
    </button>

</div>

        </div>
    );
}

export default DonorList;