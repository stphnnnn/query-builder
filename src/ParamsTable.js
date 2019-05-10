import React from 'react';
import PropTypes from 'prop-types';

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
    <table className="ParamsTable">
      <thead>
        <tr>
          <th>Query</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {params.map(({ query, value }, i) => (
          <tr key={i}>
            <td>
              <input
                value={query}
                onChange={({ target }) =>
                  handleQueryChange(i, 'query', target.value)
                }
              />
            </td>
            <td>
              <input
                value={value}
                onChange={({ target }) =>
                  handleQueryChange(i, 'value', target.value)
                }
              />
            </td>
            <td>
              <button onClick={() => handleQueryRemove(i)} disabled={i === 0}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
