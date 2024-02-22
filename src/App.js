
// 
// App.js
import React, { useEffect, useState } from 'react';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
  const [audioFiles, setAudioFiles] = useState(() => {
    const storedPlaylist = localStorage.getItem('playlist');
    return storedPlaylist ? JSON.parse(storedPlaylist) : [];
  });

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(audioFiles));
  }, [audioFiles]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAudioFiles = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setAudioFiles((prevFiles) => [...prevFiles, ...newAudioFiles]);
  };

  return (
    <div className='total-container'>
      <h1>Audio Player App</h1>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        multiple
      />
      <AudioPlayer playlist={audioFiles} setPlaylist={setAudioFiles} />
    </div>
  );
};

export default App;



