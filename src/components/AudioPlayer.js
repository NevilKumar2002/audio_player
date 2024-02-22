import React, { useState, useEffect } from 'react';
import "../index.css";
import "../App.css"

const AudioPlayer = ({ playlist }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [audioRef, setAudioRef] = useState(new Audio());
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const[storageUrl, setStorageUrl]=useState();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('audioData'));
    if (savedData) {
      setCurrentTrack(playlist.findIndex((track) => track.url === savedData.url));
      setCurrentTime(savedData.currentTime);
    }
  }, [playlist]);

  useEffect(() => {
    localStorage.setItem(
      'audioData',
      JSON.stringify({
        name: playlist[currentTrack]?.name || '',
        url: playlist[currentTrack]?.url || '',
        currentTime,
      })
    );
  }, [currentTrack, currentTime, playlist]);


  const playNextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.currentTime);
  };

  const handleEnded = () => {
    playNextTrack();
  };

  const handlePlayPause = (url) => {
    const blobUrl = url;
    const match = blobUrl.match(/(.*?):(.*)/);
    let remainingPart;
    if (match) {
      const [, protocol, tempRemainingPart] = match;
      remainingPart = tempRemainingPart;
    }
    // alert(remainingPart);
    // alert(url);
    const blobUrl1= audioRef.src;
    const match1 = blobUrl1.match(/(.*?):(.*)/);
    let remainingPart1;
    if (match1) {
      const [, protocol, tempRemainingPart] = match1;
      remainingPart1 = tempRemainingPart;
    }

    console.log(remainingPart1);
    setStorageUrl(remainingPart1);
    
    
    if (audioRef.src !== url) {
      audioRef.src = url;
      audioRef.currentTime = currentTime;
      audioRef.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
    }
    
  };

  return (
    <div className="audio-player-container">
      <h2 className='play-list-name'>Your Play List</h2>
      {isPlaying ? (
        <img src="https://i.gifer.com/44zG.gif" alt="Now Playing" className='audio-image' />
      ) : null}
      {/* <button onClick={() => handlePlayPause(playlist[currentTrack]?.url)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button> */}
      <audio
        ref={(ref) => setAudioRef(ref)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <ul className="playlist">
      
        {playlist.map((track, index) => (
          <li key={index}>
            <div className="track-buttons">
              <button onClick={() => setCurrentTrack(index)}>
                {track.name}
              </button>
              <button onClick={() => handlePlayPause(track.url)}>
                {isPlaying && audioRef.src === track.url ? 'Pause' : 'Play'}
              </button>
              
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioPlayer;

