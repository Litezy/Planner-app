
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs'
import { LuTimerReset } from 'react-icons/lu'


const TimerWidget = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [min, setMin] = useState(0)
  const [hr, setHr] = useState(0)
  const [sec, setSec] = useState(0)
  const [mainhr, setMainHr] = useState(0)
  const Icon = isRunning  ? BsFillPauseCircleFill : BsFillPlayCircleFill
  let timedsec = useRef(0)
  let timedmin = useRef(0)
  let timedhr = useRef(0)
  let maintimedhr = useRef(0) 


  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (timedsec.current > 59) {
          timedsec.current = 0
          if (timedmin.current > 59) {
            timedmin.current = 0
            if (timedhr.current > 59) {
              timedhr.current = 0
              if(maintimedhr.current > 24) {
                maintimedhr.current = 0
                timedhr.current = 0
                timedmin.current = 0
                timedsec.current = 0
              }else {
                maintimedhr.current += 1
                setMainHr(`${maintimedhr.current}`)
              }
            } else {
              timedhr.current += 1
              setHr(`${timedhr.current}`)
            }
          } else {
            timedmin.current += 1
            setMin(`${timedmin.current}`)
          }
        } else {
          timedsec.current += 1
          setSec(`${timedsec.current}`)
        }
      }, 16);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    resetler()
    setIsRunning(false) 
  };
  const resetler = () => {
    setSec(0)
    setMin(0)
    setHr(0)
    timedmin.current = 0
    timedsec.current = 0
    timedhr.current = 0
    maintimedhr.current = 0
  }

  return (
    <div>
      <div style={{ minWidth: 300 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
          <div className="timehd">{` ${mainhr < 10 ? '0' : ''}${mainhr}: ${hr < 10 ? '0' : ''}${hr}: ${min < 10 ? '0' : ''}${min}: ${sec < 10 ? '0' : ''}${sec}`}</div>
          <div className="iconspad">
            {/* < onClick={stopStopwatch} /> */}
            <Icon onClick={startStopwatch} style={{ fontSize: '3rem' }} />
            <LuTimerReset onClick={resetStopwatch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
