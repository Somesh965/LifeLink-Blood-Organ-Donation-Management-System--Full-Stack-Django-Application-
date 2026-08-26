import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getBloodRequests,
    deleteBloodRequest,
} from "../../api/bloodRequestApi";

function BloodRequestList() {

    const [bloodRequests, setBloodRequests] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [urgency, setUrgency] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadBloodRequests();
    }, [search, status, urgency, currentPage]);

    const loadBloodRequests = async () => {

        try {

            const params = {
                page: currentPage,
            };

            if (search) params.search = search;
            if (status) params.status = status;
            if (urgency) params.urgency = urgency;

            const response = await getBloodRequests(params);

            if (Array.isArray(response.data.result)) {
                setBloodRequests(response.data.result);
            } else if (Array.isArray(response.data.results)) {
                setBloodRequests(response.data.results);
            } else if (Array.isArray(response.data)) {
                setBloodRequests(response.data);
            } else {
                setBloodRequests([]);
            }

            setTotalPages(response.data.total_pages || 1);

        } catch (error) {

            console.error(error);

            setBloodRequests([]);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this blood request?")) return;

        try {

            await deleteBloodRequest(id);

            alert("Blood Request Deleted Successfully");

            loadBloodRequests();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Blood Requests</h2>

                <Link
                    to="/bloodrequests/add"
                    className="btn btn-primary"
                >
                    Add Blood Request
                </Link>

            </div>

            <div className="row mb-3">

                <div className="col-md-4">

                    <input
                        className="form-control"
                        placeholder="Search..."
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
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                        <option>Completed</option>
                        <option>Cancelled</option>

                    </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                    >

                        <option value="">All Urgency</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>

                    </select>

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Patient</th>
                        <th>Blood Group</th>
                        <th>Units</th>
                        <th>Hospital</th>
                        <th>Urgency</th>
                        <th>Status</th>
                        <th>Required Date</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {bloodRequests.length === 0 ? (

                        <tr>

                            <td colSpan="9" className="text-center">

                                No Blood Requests Found

                            </td>

                        </tr>

                    ) : (

                        bloodRequests.map((request) => (

                            <tr key={request.id}>

                                <td>{request.id}</td>

                                <td>{request.patient_name}</td>

                                <td>{request.blood_group}</td>

                                <td>{request.units_required}</td>

                                <td>{request.hospital_name}</td>

                                <td>{request.urgency}</td>

                                <td>{request.status}</td>

                                <td>{request.required_date}</td>

                                <td>

                                    <Link
                                        to={`/bloodrequests/${request.id}`}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/bloodrequests/edit/${request.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(request.id)}
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

export default BloodRequestList;