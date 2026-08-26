import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getRecipients,
    deleteRecipient,
} from "../../api/recipientApi";

function RecipientList() {

    const [recipients, setRecipients] = useState([]);

    const [search, setSearch] = useState("");
    const [requestType, setRequestType] = useState("");
    const [isActive, setIsActive] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadRecipients();
    }, [search, requestType, isActive, currentPage]);

    const loadRecipients = async () => {

        try {

            const params = {
                page: currentPage,
            };

            if (search) params.search = search;
            if (requestType) params.request_type = requestType;
            if (isActive !== "") params.is_active = isActive;

            const response = await getRecipients(params);

            console.log(response.data);

            if (Array.isArray(response.data.result)) {
                setRecipients(response.data.result);
            } else if (Array.isArray(response.data.results)) {
                setRecipients(response.data.results);
            } else if (Array.isArray(response.data)) {
                setRecipients(response.data);
            } else {
                setRecipients([]);
            }

            setTotalPages(response.data.total_pages || 1);

        } catch (error) {

            console.error(error);

            setRecipients([]);

        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this recipient?")) return;

        try {

            await deleteRecipient(id);

            alert("Recipient deleted successfully.");

            loadRecipients();

        } catch (error) {

            console.error(error);

            alert("Delete failed.");

        }
    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Recipients</h2>

                <Link
                    to="/recipients/add"
                    className="btn btn-primary"
                >
                    Add Recipient
                </Link>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value)}
                    >

                        <option value="">All Request Types</option>
                        <option value="Blood">Blood</option>
                        <option value="Organ">Organ</option>

                    </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value)}
                    >

                        <option value="">All</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>

                    </select>

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => {

                            setSearch("");
                            setRequestType("");
                            setIsActive("");
                            setCurrentPage(1);

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
                        <th>User</th>
                        <th>Request Type</th>
                        <th>Hospital</th>
                        <th>Emergency Contact</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {recipients.length === 0 ? (

                        <tr>

                            <td colSpan="7" className="text-center">

                                No recipients found.

                            </td>

                        </tr>

                    ) : (

                        recipients.map((recipient) => (

                            <tr key={recipient.id}>

                                <td>{recipient.id}</td>

                                <td>{recipient.user}</td>

                                <td>{recipient.request_type}</td>

                                <td>{recipient.hospital_name}</td>

                                <td>{recipient.emergency_contact_name}</td>

                                <td>
                                    {recipient.is_active ? "Active" : "Inactive"}
                                </td>

                                <td>

                                    <Link
                                        to={`/recipients/${recipient.id}`}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/recipients/edit/${recipient.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(recipient.id)}
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

export default RecipientList;