import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import App from '../App';

it('renders without crashing', () => {
  const { getByText } = render(<App />);
  expect(getByText('Query Builder')).toBeInTheDocument();
});

it('a new table row is added when add parameter button is clicked', () => {
  const { getByLabelText, getAllByLabelText } = render(<App />);

  fireEvent.click(getByLabelText('Add parameter'));

  expect(getAllByLabelText('Query')).toHaveLength(2);
  expect(getAllByLabelText('Value')).toHaveLength(2);
});

it('table rows can be deleted when delete button is clicked', () => {
  const { getByLabelText, getAllByLabelText } = render(<App />);

  fireEvent.click(getByLabelText('Add parameter'));
  fireEvent.click(getAllByLabelText('Delete row')[1]);

  expect(getAllByLabelText('Query')).toHaveLength(1);
  expect(getAllByLabelText('Value')).toHaveLength(1);
});

it('url starts with the base url', () => {
  const { getByLabelText, getByText } = render(<App />);

  const testBaseUrl = 'http://google.com';
  const baseUrlInput = getByLabelText('Base URL');
  fireEvent.change(baseUrlInput, { target: { value: testBaseUrl } });

  expect(getByText(testBaseUrl, { exact: false })).toBeInTheDocument();
});

it('parameters are added to the url', () => {
  const { getByLabelText, getByText } = render(<App />);

  const testBaseUrl = 'http://google.com';
  const baseUrlInput = getByLabelText('Base URL');
  fireEvent.change(baseUrlInput, { target: { value: testBaseUrl } });

  const testQuery = 'test';
  const queryInput = getByLabelText('Query');
  fireEvent.change(queryInput, { target: { value: testQuery } });

  const testValue = 'works';
  const valueInput = getByLabelText('Value');
  fireEvent.change(valueInput, { target: { value: testValue } });

  const expectedUrl = `${testBaseUrl}?${testQuery}=${testValue}`;

  expect(getByText(expectedUrl)).toBeInTheDocument();
});
