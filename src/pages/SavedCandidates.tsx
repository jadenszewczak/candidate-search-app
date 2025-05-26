import { useState, useEffect } from "react";
import type { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(saved);
  }, []);

  const removeCandidate = (id: number) => {
    const updated = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updated);
    localStorage.setItem("savedCandidates", JSON.stringify(updated));
  };

  if (savedCandidates.length === 0) {
    return (
      <>
        <h1>Potential Candidates</h1>
        <p>No candidates have been accepted yet.</p>
      </>
    );
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={`${candidate.login} avatar`}
                    className="table-avatar"
                  />
                </td>
                <td>{candidate.name || "Not specified"}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location || "Not specified"}</td>
                <td>{candidate.email || "Not specified"}</td>
                <td>{candidate.company || "Not specified"}</td>
                <td>
                  <a
                    href={candidate.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => removeCandidate(candidate.id)}
                    className="btn btn-reject btn-small"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SavedCandidates;
