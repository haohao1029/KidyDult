// FileUpload.tsx
import React, { FC, ChangeEvent, DragEvent, useState, useEffect } from 'react';

interface Props {
  onUpdateSelectedFiles: (files: File[]) => void;
  selectedFiles: File[];
}

const FileUpload: FC<Props> = ({ onUpdateSelectedFiles, selectedFiles }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    // console.log(files)
    if (!files) {
      alert('No files selected!');
      return;
    }

    validateAndUploadFiles(files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (!event.dataTransfer.files) {
      return;
    }

    validateAndUploadFiles(event.dataTransfer.files);
  };

  const validateAndUploadFiles = (files: FileList) => {

    const uploadFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type !== 'text/plain') {
        alert('Please upload only .txt files!');
        return;
      }
      uploadFiles.push(files[i]);
    }
    onUpdateSelectedFiles([...selectedFiles, ...uploadFiles]);
  };

  const handleDelete = (index: number) => {
    const updatedFileNames = [...selectedFiles];
    updatedFileNames.splice(index, 1);
    onUpdateSelectedFiles(updatedFileNames);
  };


  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => { document.getElementById('file-input')?.click(); }}
        className={`p-6 border-2 ${isDragging ? 'border-blue-500' : 'border-gray-300'}`}
      >
        <input type="file" multiple onChange={handleFilesChange} style={{ display: 'none' }} id="file-input" />
        <p className="mt-2">Click to Select the file or drag and drop files here</p>

      </div>
      {selectedFiles.map((file, index) => (
        <li key={index}>
          {file.name}{' '}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 rounded"
            onClick={() => handleDelete(index)}
          >
            X
          </button>
        </li>
      ))}

    </>
  );
};

export default FileUpload;
