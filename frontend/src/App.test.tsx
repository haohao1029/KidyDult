import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  
  // Optional: If you have some text in the Home component that is unique to it, 
  // you could ensure that it's present in the DOM.
  // Replace "Unique text in home" with the actual text.
  // const uniqueElement = screen.getByText("Unique text in home");
  // expect(uniqueElement).toBeInTheDocument();
});
