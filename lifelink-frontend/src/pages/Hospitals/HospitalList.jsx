import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getHospitals,
    deleteHospital,
} from "../../api/hospitalApi";

function HospitalList() {

    const [hospitals, setHospitals] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadHospitals();
    }, [search, status, currentPage]);

    const loadHospitals = async () => {

        try {

            const params = {
                page: currentPage,
            };

            if (search) params.search = search;
            if (status) params.status = status;

            const response = await getHospitals(params);

            if (Array.isArray(response.data.result)) {
                setHospitals(response.data.result);
            } else if (Array.isArray(response.data.results)) {
                setHospitals(response.data.results);
            } else if (Array.isArray(response.data)) {
                setHospitals(response.data);
            } else {
                setHospitals([]);
            }

            setTotalPages(response.data.total_pages || 1);

        } catch (error) {

            console.error(error);
            setHospitals([]);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this Hospital?")) return;

        try {

            await deleteHospital(id);

            alert("Hospital Deleted Successfully");

            loadHospitals();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Hospitals</h2>

                <Link
                    to="/hospitals/add"
                    className="btn btn-primary"
                >
                    Add Hospital
                </Link>

            </div>

            <div className="row mb-3">

                <div className="col-md-6">

                    <input
                        className="form-control"
                        placeholder="Search Hospital..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Hospital</th>
                        <th>Registration</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {hospitals.length === 0 ? (

                        <tr>
                            <td colSpan="7" className="text-center">
                                No Hospitals Found
                            </td>
                        </tr>

                    ) : (

                        hospitals.map((hospital) => (

                            <tr key={hospital.id}>

                                <td>{hospital.id}</td>

                                <td>{hospital.hospital_name}</td>

                                <td>{hospital.registration_number}</td>

                                <td>{hospital.city}</td>

                                <td>{hospital.phone_number}</td>

                                <td>{hospital.status}</td>

                                <td>

                                    <Link
                                        to={`/hospitals/${hospital.id}`}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/hospitals/edit/${hospital.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(hospital.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

            <div className="d-flex justify-content-center mt-3">

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

export default HospitalList;