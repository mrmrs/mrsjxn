import React, { useState, useRef } from 'react';

const IconPlay = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentcolor"><path d="M8 5v14l11-7z"></path></svg>
  )
}

const IconPause = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20"><path d="M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z"></path></svg>
  )
}

const IconPrev = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height='16' width='16'><path d="M0 0 H4 V14 L32 0 V32 L4 18 V32 H0 z"></path></svg>
  )
}

const IconNext = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height='16' width='16'>
      <path d="M0 0 L28 14 V0 H32 V32 H28 V18 L0 32 z"></path>
    </svg>
  )
}

const MusicPlayer = ({ tracks, currentTrackIndex, setCurrentTrackIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);


  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const playPause = () => {
    const status = !isPlaying;
    setIsPlaying(status);
    if (status) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setCurrentTime(0); // Reset time for a new track
  };

  const skipTrack = (direction) => {
    let index = currentTrackIndex + direction;
    if (index < 0) index = tracks.length - 1;
    else if (index >= tracks.length) index = 0;
    playTrack(index);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <div>
      <audio src={tracks[currentTrackIndex].url} ref={audioRef} autoPlay={isPlaying}
             onEnded={() => skipTrack(1)}
             onLoadedMetadata={onLoadedMetadata}
             onTimeUpdate={onTimeUpdate} />
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button onClick={() => skipTrack(-1)} style={{ border: 0, background: 'transparent' }}><IconPrev /></button>
    <button onClick={playPause} style={{ 
      all: 'unset', 
        borderRadius: '9999px', 
        aspectRatio: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', borderStyle: 'solid', borderWidth: '4px', borderColor: 'currentColor' , width: '64px', height: '64px' 
    }}>{isPlaying ? <IconPause /> : <IconPlay />}</button>
        <button style={{ background: 'transparent', border: 0, }} onClick={() => skipTrack(1)}><IconNext /></button>
      </div>
    <p style={{ maxWidth: '640px', margin: '16px auto', textAlign: 'center', fontSize: '32px', fontWeight: 'bold' }}>{tracks[currentTrackIndex].title}</p>
      <div style={{ width: '100%', backgroundColor: 'transparent', boxShadow: '0 0 0 1px currentColor', margin: '0 auto', maxWidth: '640px' }}>
        <div style={{ width: `${(currentTime / duration) * 100}%`, height: '8px', backgroundColor: 'black', transition: 'width .1s ease' }}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '640px', margin: '4px auto 4px auto' }}>
        <time style={{ fontSize: '10px' }}>{Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)}</time>
        <time style={{ fontSize: '10px' }}>{Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}</time>
      </div>
      <ul style={{ listStyle: 'none', margin: '16px auto 0 auto', padding: 0, width: '100%', maxWidth: '640px' }}>
        {tracks.map((track, index) => (
          <li key={index} style={{ margin: 0, padding: 0, borderBottom: '1px dashed', backgroundColor: currentTrackIndex === index ? 'black' : 'transparent', color: currentTrackIndex === index ? 'white' : 'black' }}>
            <button onClick={() => playTrack(index)} style={{ all:'unset', borderRadius: 0, outline: 0, textAlign: 'left', width: '100%', padding: '16px', background: 'transparent' }}>
              {track.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicPlayer;
