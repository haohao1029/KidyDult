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

  };
  const handleDelete = (index: number) => {
    const updatedFileNames = [...selectedFiles];
    updatedFileNames.splice(index, 1);
    handleSelectedFiles(updatedFileNames);
  };

  return (
    <div className="p-4 grid md:grid-cols-2">
      <div className="pr-4">
        <h1>Upload Your Txt Files:</h1>
        <FileUpload onUpdateSelectedFiles={handleSelectedFiles} selectedFiles={selectedFiles} />

        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded py-2 md:max-lg:w-full">
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
                    {index +1}. {user} - {count}
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
