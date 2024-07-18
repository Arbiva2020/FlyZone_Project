import React, {useRef, useState} from 'react'
import './DemoPage.css'
import Header from '../../components/Header/Header'
import media2 from '../../assets/media2.mp4'
import Button from '../../components/Generic/Button/Button'

const DemoPage = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState ()
    const videoRef = useRef(null)

    const handleTogglePlay = ()=> {
        if(isPlaying) {
            videoRef.current.pause();
        }else{
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
    };

    const handleProgress = ()=>{
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        const progress = (currentTime/duration) * 100;
        setProgress(progress)
    }

  return (
    <div className='demo_main'>
        <Header />
        <div className='demo_headline'>
            Play Demo
        </div>
        <div className='demo_show'>
            <video 
                className='demo_video'
                ref={videoRef}
                onTimeUpdate={handleProgress}
            >
            <source src={media2} type="video/mp4"/>
            </video>
            <div className='demo_play'>
                <h4 onClick={handleTogglePlay} style={isPlaying ? {color:"white"} : {color:"#B943B4"}}>
                    {isPlaying ? "Pause" : "Play"}
                </h4>
                <progress className='demo_progress' value={progress} max="100" style={{progressColor: 'rgb(185, 67, 180'}}/>
            </div>
        </div>
    </div>
  )
}

export default DemoPage