import React from 'react';
import { Url } from './Url';
import { ParamsTable } from './ParamsTable';

const defaultParam = {
  query: '',
  value: '',
};

function App() {
  const [baseUrl, setBaseUrl] = React.useState('');

  const handleBaseUrlChange = event => {
    const { value } = event.target;
    setBaseUrl(value);
  };

  const [params, setParams] = React.useState([]);

  const addParam = (param = defaultParam) => {
    setParams(oldParams => [...oldParams, param]);
  };

  const handleQueryRemove = index => {
    setParams(oldParams => oldParams.filter((param, i) => i !== index));
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

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('base_url')) {
      setBaseUrl(urlParams.get('base_url'));
    }

    if (urlParams.has('query')) {
      const queries = urlParams.getAll('query');
      queries.forEach(query => {
        addParam({ ...defaultParam, query });
      });
    }
  }, []);

  const queryString = params
    .map(
      ({ query, value }) =>
        `${encodeURIComponent(query)}=${encodeURIComponent(value)}`
    )
    .join('&');

  const url = baseUrl && `${baseUrl}${queryString && `?${queryString}`}`;

  return (
    <div className="App">
      Base URL:{' '}
      <input
        value={baseUrl}
        onChange={handleBaseUrlChange}
        placeholder="https://..."
      />
      <table>
        <thead>
          <tr>
            <th>Query</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {params.map(({ query, value }, i) => (
            <tr key={i}>
              <th>
                <input
                  value={query}
                  onChange={({ target }) =>
                    handleQueryChange(i, 'query', target.value)
                  }
                />
              </th>
              <th>
                <input
                  value={value}
                  onChange={({ target }) =>
                    handleQueryChange(i, 'value', target.value)
                  }
                />
              </th>
              <th>
                <button onClick={() => handleQueryRemove(i)}>Remove</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addParam}>Add parameter</button>
      <Url url={url} />
    </div>
  );
}

export default App;
