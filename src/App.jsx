import { useState } from 'react'
import MusicPlayer from './components/MusicPlayer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


  const mrsjxnTracks = [
    { title: 'No Love', url: '/mrsjxn-no-love.mp3', time: '5:00'},
    { title: 'Valis', url: '/mrsjxn-valis.mp3', time: '4:30'},
    { title: 'Minibaar', url: '/mrsjxn-minibaar.mp3', time: '5:36'},
    { title: 'Touch This', url: '/mrsjxn-touch-this.mp3', time: '6:35'},
    { title: 'homeworkrevolution808', url: '/mrsjxn-homeworkrevolution808.mp3', time: '3:11'},
    { title: 'BBB', url: '/mrsjxn-BBB.mp3', time: '3:00'},
    { title: 'SRCD Party', url: '/mrsjxn-SRCD-Party.mp3', time: '3:50'},
    { title: 'Morning Bounce', url: '/mrsjxn-morning-bounce.mp3', time: '2:30'},
    { title: 'Space Owl', url: '/mrsjxn-space-owl.mp3', time: '2:40'},
  ]

  const jxnTracks = [
    { title: 'Let Go', url: '/jxnblk-MB-166.mp3', time: '5:00'},
    { title: 'Really Wanna', url: '/jxnblk-MB-165.mp3', time: '4:30'},
    { title: 'MMMXIII', url: 'https://dlu344star2bj.cloudfront.net/jxnblk-mmmxiii.mp3', time: '20:13'},
  ]

  const mrsTracks = [
    { title: 'Do it Like', url: '/mrmrs-do-it-like.mp3', time: '4:26'},
    { title: 'You & I Go Back', url: '/mrmrs-you-and-i-go-back.mp3', time: '2:31'},
    { title: 'Freak', url: '/mrmrs-freak.mp3', time: '2:29'},
    { title: 'The Sunshine Hits', url: '/mrmrs-sunshine-hits.mp3', time: '3:10'},
  ]

function App() {
  const [count, setCount] = useState(0)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState(mrsjxnTracks)
  const [mrmrsViewBox, setMrmrsViewBox] = useState(64)
  const [jxnViewBox, setJxnViewBox] = useState(64)

  const handleMrs = () => {
    setTracks(mrsTracks)
    setMrmrsViewBox(128)
    setJxnViewBox(128)
    setCurrentTrackIndex(0);
  }

  const handleMrsJxn = () => {
    setMrmrsViewBox(64)
    setJxnViewBox(64)
    setTracks(mrsjxnTracks)
    setCurrentTrackIndex(0);
  }

  const handleJxn = () => {
    setTracks(jxnTracks)
    setMrmrsViewBox(0)
    setJxnViewBox(0)
    setCurrentTrackIndex(0);
  }

  return (
    <>
      <div style={{ minHeight: '90dvh'}}>
    <nav style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <button style={{ all: 'unset' }} onClick={handleMrs}>MRMRS</button>
        <button style={{ all: 'unset' }} onClick={handleMrsJxn}>MRSJXN</button>
        <button style={{ all: 'unset' }} onClick={handleJxn}>JXNBLK</button>
    </nav>
    <div style={{ position: 'relative', marginTop: '32px', marginBottom: '32px', height: '192px' }}>
    <div style={{ position: 'absolute', top:0, right: 0, left: 0, bottom: 0, display: 'flex', justifyContent:'center', alignItems: 'center'}}>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox='0 0 128 128' enableBackground="new 0 0 128 128" xmlSpace="preserve" style={{ width: '192px' }}>
    <mask id="mrsMask">
      <rect x="0" y="0" width={mrmrsViewBox} height="128" fill="white" />
    </mask>
	<path fill="currentColor" d="M64,22C52,22,8,30,8,58s16,28,32,32l4,16l4-8h32l4,8l4-16c16-4,32-4,32-32S76,22,64,22 M16,66
		c0-8.8,7.2-16,16-16s16,7.2,16,16s-7.2,16-16,16S16,74.8,16,66 M80,66c0-8.8,7.2-16,16-16s16,7.2,16,16s-7.2,16-16,16
		S80,74.8,80,66" mask="url(#mrsMask)"/>
</svg>
    </div>
    <div style={{ position: 'absolute', top:0, right: 0, left: 0, bottom: 0, display: 'flex', justifyContent:'center', alignItems: 'center'}}>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox='0 0 128 128' enableBackground="new 0 0 128 128" xmlSpace="preserve" style={{width: '192px'}}>
   <mask id="jxnMask">
      <rect x={jxnViewBox} y="0" width="128" height="128" fill="white" />
    </mask>
<g id="Layer_1" mask='url(#jxnMask)'>
	<path fill="currentColor" d="M64,0v4h12l-2,2l20,8l-2,2l12,4l-4,2l6,6h-4l4,28c2.7,4,4,8.7,4,14s-1.7,10-5,14l-9,24c-4,8-20,20-32,20
		s-28-12-32-20l-9-24c-3.3-4-5-8.7-5-14s1.3-10,4-14V22l4,2l8-12l2,4L64,0z M72,40c-10.7-6.7-21.3-10-32-10c-5.3,2.7-8.7,8.7-10,18
		l0,0l-2,26c0,7,9,28,10,30c8,14,24,17,26,17s18-3,26-17c1-2,10-23,10-30l-1-22l-5-12l-2,2l-8-4v4l-10-6 M57,88h14c1.1,0,2,0.9,2,2
		s-0.9,2-2,2H57c-1.1,0-2-0.9-2-2S55.9,88,57,88 M53,104h22c1.1,0,2,0.9,2,2s-0.9,2-2,2H53c-1.1,0-2-0.9-2-2S51.9,104,53,104"/>
</g>
</svg>
    </div>
    </div>
<MusicPlayer tracks={tracks} currentTrackIndex={currentTrackIndex} setCurrentTrackIndex={setCurrentTrackIndex} />
      </div>
    <footer style={{ marginTop: '32px'}}>
        <small style={{ textAlign: 'center', display: 'block' }}>© 2048</small>
    </footer>
    </>
  )
}

export default App
