import React from 'react';
import { render } from 'react-testing-library';
import { Url } from '../Url';

const testUrl = 'http://google.com';

test('renders url when url prop is present', () => {
  const { getByText } = render(<Url url={testUrl} />);
  expect(getByText(testUrl)).toBeInTheDocument();
});

test('renders a link when url prop is present', () => {
  const { getByText } = render(<Url url={testUrl} />);
  expect(getByText(testUrl).getAttribute('href')).toEqual(testUrl);
});

test('renders nothing when url prop is not present', () => {
  const { getByTestId } = render(<Url />);
  expect(getByTestId('url').hasChildNodes()).toBeFalsy();
});
