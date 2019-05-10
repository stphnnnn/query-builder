import React from 'react';
import { Url } from './Url';
import { ParamsTable } from './ParamsTable';
import { BaseUrlInput } from './BaseUrlInput';
import { Spacer } from './Spacer';

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
      <BaseUrlInput value={baseUrl} onChange={handleBaseUrlChange} />
      <Spacer />
      <ParamsTable params={params} setParams={setParams} />
      <button onClick={addParam}>Add parameter</button>
      <Url url={url} />
    </div>
  );
}

export default App;
