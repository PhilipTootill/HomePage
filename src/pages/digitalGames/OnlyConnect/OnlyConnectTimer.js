import React, {useState, useEffect} from 'react';

function OnlyConnectTimer({callback}) {
  const maxTime = 180;
  const [timeTaken, setTimeTaken] = useState(0);

  const timerStyle = {
    backgroundColor: "#BBBBBB",
    height: "30px"
  }

  var timeUsed = 100 * timeTaken / maxTime;
  var timeUsedPercentage = timeUsed.toString() + "%";
  var timerBarStyle = {
    backgroundColor: "#0088B3",
    width: timeUsedPercentage,
    height: "100%"
  }

  useEffect(() => {
    setTimeout(() => {
      if (timeTaken < maxTime) {
        setTimeTaken(timeTaken + 0.5);
      } else {
        callback();
      }
    }, 500);
  });

  return (
    <div style={timerStyle}>
      <div style={timerBarStyle}> </div>
    </div>
  );
}

export default OnlyConnectTimer;
