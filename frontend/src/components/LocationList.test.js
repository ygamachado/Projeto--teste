import { render, screen } from '@testing-library/react';
import LocationList from './LocationList';

jest.mock('react-router-dom', () => ({
  Link: 'a',
}));

test('should render LocationList component', () => {
  render(<LocationList />);
  expect(screen.getByText('Local 1')).toBeInTheDocument();
});
