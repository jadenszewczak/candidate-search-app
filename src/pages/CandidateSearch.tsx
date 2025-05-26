import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import type { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Fetch initial candidates list
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const users = await searchGithub();
      setCandidates(users);
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  // Fetch detailed info for current candidate
  useEffect(() => {
    const fetchCandidateDetails = async () => {
      if (candidates.length > 0 && currentIndex < candidates.length) {
        const details = await searchGithubUser(candidates[currentIndex].login);
        setCurrentCandidate(details);
      }
    };
    fetchCandidateDetails();
  }, [candidates, currentIndex]);

  const saveCandidate = () => {
    if (currentCandidate) {
      console.log("Saving candidate:", currentCandidate);
      const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
      if (!saved.find((c: Candidate) => c.id === currentCandidate.id)) {
        saved.push(currentCandidate);
        localStorage.setItem("savedCandidates", JSON.stringify(saved));
      }
      nextCandidate();
    }
  };

  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const fetchMore = async () => {
        const moreUsers = await searchGithub();
        setCandidates(moreUsers);
        setCurrentIndex(0);
      };
      fetchMore();
    }
  };

  if (loading) {
    return <h1>Loading candidates...</h1>;
  }

  if (!currentCandidate) {
    return <h1>No candidates available</h1>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img
          src={currentCandidate.avatar_url}
          alt={`${currentCandidate.login} avatar`}
          className="candidate-avatar"
        />
        <h2>{currentCandidate.name || currentCandidate.login}</h2>
        <p>
          <strong>Username:</strong> {currentCandidate.login}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {currentCandidate.location || "Not specified"}
        </p>
        <p>
          <strong>Email:</strong> {currentCandidate.email || "Not specified"}
        </p>
        <p>
          <strong>Company:</strong>{" "}
          {currentCandidate.company || "Not specified"}
        </p>
        <p>
          <strong>Profile:</strong>{" "}
          <a
            href={currentCandidate.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentCandidate.html_url}
          </a>
        </p>

        <div className="button-container">
          <button onClick={nextCandidate} className="btn btn-reject">
            -
          </button>
          <button onClick={saveCandidate} className="btn btn-accept">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;
