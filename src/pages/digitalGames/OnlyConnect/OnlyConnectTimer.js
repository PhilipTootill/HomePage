import React, {useState, useEffect} from 'react';

function OnlyConnectTimer({expiredCallback, forceEnd}) {
  const maxTime = 300;
  const [timeTaken, setTimeTaken] = useState(0);
  const [callbackCalled, setCallbackCalled] = useState(false);

  const timerStyle = {
    backgroundColor: "#BBBBBB",
    height: "30px"
  }

  var timeUsed = 100 * timeTaken / maxTime;
  var timeUsedPercentage = timeUsed.toString() + "%";

  if (forceEnd) {
    timeUsedPercentage = "100%";
  }

  var timerBarStyle = {
    backgroundColor: "#0088B3",
    width: timeUsedPercentage,
    height: "100%"
  }

  useEffect(() => {
    setTimeout(() => {
      if (timeTaken < maxTime) {
        setTimeTaken(timeTaken + 0.5);
      } else if (!callbackCalled && !forceEnd) {
        setCallbackCalled(true);
        expiredCallback();
      }
    }, 500);
  });

  return (
    <div  className="only-connect-timer" style={timerStyle}>
      <div style={timerBarStyle}> </div>
    </div>
  );
}

export default OnlyConnectTimer;
