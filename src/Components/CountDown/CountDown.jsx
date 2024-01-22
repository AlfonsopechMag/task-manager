import React, {useState, useEffect, useRef} from 'react'
import './countDown.css'

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}


export default function Countdown(props) {
  const {status,initialTime, timeLeft, timeFinished, untilTime, timeSpent} = props;
  const [secondsRemaining, setSecondsRemaining] = useState(initialTime)
  const [statusClock, setStatusClock] = useState(STATUS.STOPPED)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

  useEffect(()=>{
    if (untilTime != "" || untilTime != 0) {
      setSecondsRemaining(untilTime)
    }else{
      setSecondsRemaining(initialTime);
    }
    
  },[initialTime])

  function useInterval(callback, delay) {
    const savedCallback = useRef()
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }
  
  const twoDigits = (num) => String(num).padStart(2, '0')

  const handleStart = () => {
    setStatusClock(STATUS.STARTED)
  }
  const handleStop = () => {
    setStatusClock(STATUS.STOPPED)
  }
  const handleReset = () => {
    setStatusClock(STATUS.STOPPED)
    setSecondsRemaining(initialTime)
  }
  
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        timeLeft(secondsRemaining - 1)
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        timeFinished(true)
        setStatusClock(STATUS.STOPPED)
      }
    },
    statusClock === STATUS.STARTED ? 1000 : null,
    // passing null stops the interval
  )

  return (
    <div className="countDown">
      <div className='label_timer'> 
        <span>Timer</span>
      </div>
     
        <div className='control_timer'>
          <button onClick={handleStart} type="button" disabled={status === "In Progress" ? false : true}>
            Start
          </button>
          <button onClick={handleStop} type="button" disabled={status === "In Progress" ? false : true}>
            Stop
          </button>
          <button onClick={handleReset} type="button" disabled={status === "In Progress" ? false : true}>
            Reset
          </button>
        </div>
      
      
      <div className='timer'>
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
      {console.log("timeSpent==>",timeSpent)}
      {
        timeSpent != ""  && status === "Done" ? (<div><span className='time_spent'>Time Spent: {timeSpent}</span></div>) : (<div>Status: {statusClock}</div>)
      }
      
    </div>
  )
}

