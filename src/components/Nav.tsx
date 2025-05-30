import { Link, useLocation } from 'react-router-dom';
const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const location = useLocation();

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/SavedCandidates"
            className={`nav-link ${location.pathname === '/SavedCandidates' ? 'active' : ''}`}
          >
            Potential Candidates
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;