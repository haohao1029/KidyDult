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
  return (
    <div className="p-4">
      <FileUpload onUpdateSelectedFiles={handleSelectedFiles} selectedFiles={selectedFiles} />
      {fileResults.map(({ name, result }, index) => {
        const sortedUsers = Object.entries(result).sort(([, a], [, b]) => b - a);
        return (
          <div key={index} className="mt-4">
            <h2 className="font-bold text-xl">{name}</h2>
            <ul>
              {sortedUsers.map(([user, count]) => (
                <li key={user}>
                  {user}: {count}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded py-2">
        Upload
      </button>
    </div>
  );
};

export default App;
