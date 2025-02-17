import { useParams } from "react-router-dom"
import {useState, useEffect, useRef} from 'react'
import SocketIO from "../../config/socketio.config"
import { verify } from "../../helpers/MobileVerifier"
import './styles/index.css'
import useSound from 'use-sound';
import boopSfx from '../../assets/shot.mp3';

export const MobileController = ()=>{
    const {id} = useParams()    
    const [isMobile, setIsMobile] = useState<boolean>()
    const [animated, setAnimated] = useState(false)

    let data = useRef({
        userID: id,
        alpha: 0, 
        beta: 0, 
        gamma: 0
    })

    useEffect(()=>{
        function orientation(event:any){
            data.current = {
                userID: id,
                alpha: event.alpha, 
                beta: event.beta, 
                gamma: event.gamma
            }

            if(data.current.alpha !== null){
                SocketIO.socket.emit('MobileMove', data.current)
            }
        }

          if(window.DeviceOrientationEvent){
            window.addEventListener("deviceorientation", orientation, false);
          }else{
            alert("DeviceOrientationEvent is not supported");
          }

    })
    useEffect(()=>{

        setIsMobile(verify)

        if(verify){
            console.log('User is accessing in mobile')
            SocketIO.socket.emit('MobileControllerConnect', id)
        }
    //eslint-disable-next-line
    }, [])

    const [play] = useSound(boopSfx);

    const shoot = ()=>{
        SocketIO.socket.emit('Shoot', {userID: id, gamma: data.current.gamma, beta: data.current.beta, alpha: data.current.alpha})
    }

    return (<>
    {isMobile ? (<div id='shotgunDIV' className={animated ? 'shotgunDIVANIMATED' : ''} onClick={()=>{
            setAnimated(!animated)
            shoot()
            play()
        }} >
        <div className="">
        <div id="shotgun" ></div>
        <div id="shotgun1"></div>
        <div id="shotgun2"></div>
        <div id="shotgun3" className={animated ? 'shotgun3ANIMATED' : ''} onAnimationEnd={()=>{setAnimated(!animated)}}></div>
        <div id="shotgun4" className={animated ? 'shotgun4ANIMATED' : ''}></div>
        <div id="shotgun5" ></div>
        <div id="shotgun6"></div>
        <div id="shotgun8"></div>
        <div id="shotgun9"></div>
        <div id="shotgun10"></div>
        <div id="shotgun11"></div>
        <div id="shotgun12"></div>
        <div id="shotgun13"></div>
        <div id="shotgun14"></div>
        <div id="dot" className={animated ? 'dotANIMATED' : ''}></div>
        <div id="dot1" className={animated ? 'dot1ANIMATED' : ''}></div>
        <div id="dot2" className={animated ? 'dot2ANIMATED' : ''}></div>
        <div id="bullet" className={animated ? 'bulletANIMATED' : ''}></div>
        <div id="bullet1" className={animated ? 'bullet1ANIMATED' : ''}></div>
        <div id="bullet2" className={animated ? 'bullet2ANIMATED' : ''}></div>
        <div id="bullet3" className={animated ? 'bullet3ANIMATED' : ''}></div>
        <div id="bullet4" className={animated ? 'bullet4ANIMATED' : ''}></div>
        <div id="bullet5" className={animated ? 'bullet5ANIMATED' : ''}></div>
        <div id="bullet6" className={animated ? 'bullet6ANIMATED' : ''}></div>
        <div id="bullet7" className={animated ? 'bullet7ANIMATED' : ''}></div>
        <div id="bullet8" className={animated ? 'bullet8ANIMATED' : ''}></div>
        </div>
    </div>) : (<>Access in Mobile 😡</>)}
    </>)
}