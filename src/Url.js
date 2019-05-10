import React from 'react';
import PropTypes from 'prop-types';

export const Url = ({ url }) =>
  url && (
    <div className="Url">
      <a href={url}>{url}</a>
    </div>
  );

Url.propTypes = {
  url: PropTypes.string,
};
