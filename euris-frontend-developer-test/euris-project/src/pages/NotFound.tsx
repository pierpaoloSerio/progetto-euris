import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="home-link">
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
