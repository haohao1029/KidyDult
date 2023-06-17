// Home.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('http://localhost:5000/upload', (req, res, ctx) => {
    return res(ctx.json({ data: 'Files uploaded successfully' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText('Upload Your Txt Files:')).toBeInTheDocument();
    expect(screen.getByText('Results:')).toBeInTheDocument();
  });

  it('displays uploaded files', async () => {
    const { container } = render(<Home />);
    const fileInput = container.querySelector('input[type="file"]');

    const file = new File(['user1 user2 user3'], 'test.txt', { type: 'text/plain' });
    // Mock the text method
    file.text = async () => 'user1 user2 user3';

    if (fileInput) {
      Object.defineProperty(fileInput, 'files', {
        value: [file],
      });

      fireEvent.change(fileInput);

      await waitFor(() => expect(screen.getByText('test.txt')).toBeInTheDocument());
    }
  });

  it('uploads files successfully', async () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
    window.alert = () => { };  // provide an empty implementation for window.alert

    const { container } = render(<Home />);
    const fileInput = container.querySelector('input[type="file"]');
    const file = new File(['user1 user2 user3'], 'test.txt', { type: 'text/plain' });

    // Mock the text method
    file.text = async () => 'user1 user2 user3';

    if (fileInput) {
      Object.defineProperty(fileInput, 'files', {
        value: [file],
      });

      fireEvent.change(fileInput);
      fireEvent.click(screen.getByText('Upload'));

      await waitFor(() => expect(screen.queryByText('test.txt')).toBeNull());
    }
    window.alert = jsdomAlert;  // restore the jsdom alert

  });
});
