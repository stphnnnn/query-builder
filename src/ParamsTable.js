import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from './Icon';
import { IconTypes } from './iconTypes';

export const ParamsTable = ({ params, setParams }) => {
  const handleQueryRemove = index => {
    setParams(oldParams => oldParams.filter((_, i) => i !== index));
  };

  const handleQueryChange = (index, key, value) => {
    setParams(oldParams =>
      oldParams.map((param, i) => {
        if (i !== index) return param;
        return {
          ...param,
          [key]: value,
        };
      })
    );
  };

  return (
    <div className="ParamsTable">
      <div className="row">
        <div>Query</div>
        <div>Value</div>
      </div>
      {params.map(({ query, value }, i) => (
        <div className="row" key={i}>
          <input
            value={query}
            onChange={({ target }) =>
              handleQueryChange(i, 'query', target.value)
            }
          />
          <input
            value={value}
            onChange={({ target }) =>
              handleQueryChange(i, 'value', target.value)
            }
          />
          <button
            onClick={() => handleQueryRemove(i)}
            aria-label="Delete row"
            disabled={i === 0}
          >
            <Icon icon={IconTypes.DELETE} />
          </button>
        </div>
      ))}
    </div>
  );
};

ParamsTable.propTypes = {
  params: PropTypes.arrayOf(
    PropTypes.shape({ query: PropTypes.string, value: PropTypes.string })
  ),
  setParams: PropTypes.func.isRequired,
};

ParamsTable.defaultProps = {
  params: [],
};
