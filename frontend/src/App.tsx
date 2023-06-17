// App.tsx
import React, { useState, FC } from 'react';
import FileUpload from './component/FileUpload/FileUpload';
import parseLogFile from './component/FileUpload/parseLogFile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
interface FileResult {
  name: string;
  result: Record<string, number>;
}

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
