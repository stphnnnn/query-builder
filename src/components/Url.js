import React from 'react';
import PropTypes from 'prop-types';

export const Url = ({ url }) => (
  <div className="Url" data-testid="url">
    {url && <a href={url}>{url}</a>}
  </div>
);

Url.propTypes = {
  url: PropTypes.string,
};
