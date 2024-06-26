import React from 'react';
import PropTypes from 'prop-types';

function ErrorComponent({ errorMessage="something went wrong" }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
}

ErrorComponent.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorComponent;
