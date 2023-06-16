// App.tsx
import React, { useState, FC } from 'react';
import FileUpload from './component/FileUpload/FileUpload';
import parseLogFile from './component/FileUpload/parseLogFile';

interface FileResult {
  name: string;
  result: Record<string, number>;
}

const App: FC = () => {
  const [fileResults, setFileResults] = useState<FileResult[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSelectedFiles = async (files: File[]) => {
    setSelectedFiles(files);
    const results: FileResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const result = await parseLogFile(files[i]);
      results.push({ name: files[i].name, result });
    }
    setFileResults(results);
    console.log(selectedFiles)
  };
  const handleDelete = (index: number) => {
    const updatedFileNames = [...selectedFiles];
    updatedFileNames.splice(index, 1);
    handleSelectedFiles(updatedFileNames);
  };

  const uploadFiles = async () => {
    // Create a new FormData instance
    const formData = new FormData();

    // Add each file to the form data
    selectedFiles.forEach((file, index) => {
      formData.append('files', file);
    });

    // Send a POST request to the server with the form data
    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        alert('Error uploading files');
        return
      }

      const responseData = await response.text();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading files');
      return
    }
    alert('Files uploaded successfully');
  };

  return (
    <div className="p-4 grid md:grid-cols-2">
      <div className="pr-4">
        <h1>Upload Your Txt Files:</h1>
        <FileUpload onUpdateSelectedFiles={handleSelectedFiles} selectedFiles={selectedFiles} />

        <button onClick={uploadFiles} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded py-2 w-full lg:w-auto">
          Upload
        </button>
      </div>
      <div className="pl-4">
        <h1>Results:</h1>
        {fileResults.map(({ name, result }, index) => {
          const sortedUsers = Object.entries(result).sort(([, a], [, b]) => b - a);
          return (
            <div key={index} className="">
              <div className="flex justify-between">
                <h2 className="font-bold text-xl">{name}</h2>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 rounded"
                  onClick={() => handleDelete(index)}
                >
                  X
                </button>

              </div>
              <ul>
                {sortedUsers.map(([user, count], index) => (
                  <li key={user}>
                    {index + 1}. {user} - {count}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
