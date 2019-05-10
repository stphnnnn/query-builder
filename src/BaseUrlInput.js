import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';

function useUniqueElementId(prefix = '') {
  const [uniqueId] = React.useState(`${prefix}-${nanoid()}`);
  return uniqueId;
}

export const BaseUrlInput = props => {
  const id = useUniqueElementId('input');
  return (
    <div className="BaseUrlInput">
      <label htmlFor={id}>Base URL:</label>
      <input id={id} {...props} />
    </div>
  );
};

BaseUrlInput.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

BaseUrlInput.defaultProps = {
  value: '',
  disabled: false,
  placeholder: 'https://...',
};
