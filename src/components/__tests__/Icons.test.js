import React from 'react';
import { render } from 'react-testing-library';
import { Icon } from '../Icon';
import { iconTypes } from '../../utils/iconTypes';

test('renders correct icon type', () => {
  const { getByTitle } = render(<Icon icon={iconTypes.DELETE} />);
  expect(getByTitle('DeleteIcon')).toBeInTheDocument();
});
