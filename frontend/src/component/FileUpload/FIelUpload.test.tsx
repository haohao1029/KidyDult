import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FileUpload from './FileUpload';

describe('FileUpload', () => {
  const mockOnUpdateSelectedFiles = jest.fn();

  beforeEach(() => {
    Object.defineProperty(window, 'FileReader', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        readAsDataURL: jest.fn(),
        onloadend: jest.fn(),
        result: '',
      })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<FileUpload onUpdateSelectedFiles={mockOnUpdateSelectedFiles} selectedFiles={[]} />);
    expect(getByText(/Click to Select the file | drag and drop files here/i)).toBeInTheDocument();
  });

  it('handles file drop', () => {
    const { getByText } = render(<FileUpload onUpdateSelectedFiles={mockOnUpdateSelectedFiles} selectedFiles={[]} />);
    const dropZone = getByText(/Click to Select the file | drag and drop files here/i);

    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });

    expect(mockOnUpdateSelectedFiles).toHaveBeenCalledWith([file]);
  });

   it('handles file select', () => {
     const { getByTestId } = render(<FileUpload onUpdateSelectedFiles={mockOnUpdateSelectedFiles} selectedFiles={[]} />);
     const fileInput = getByTestId("file-input") as HTMLInputElement;

     const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
     fireEvent.change(fileInput, { target: { files: [file] } });
     expect(mockOnUpdateSelectedFiles).toHaveBeenCalledWith([file]);
   });

  it('shows an error if the wrong file type is dropped', () => {
    const { getByText } = render(<FileUpload onUpdateSelectedFiles={mockOnUpdateSelectedFiles} selectedFiles={[]} />);
    const dropZone = getByText(/Click to Select the file | drag and drop files here/i);

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });

    expect(alertSpy).toHaveBeenCalledWith('Please upload only .txt files!');
    expect(mockOnUpdateSelectedFiles).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
