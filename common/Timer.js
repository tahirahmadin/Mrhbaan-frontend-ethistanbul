import React, { useEffect, useState } from "react";

function Timer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(endTime) - +new Date();

    let timeLeft = {};
    let timeString = "";
    let hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let mins = Math.floor((difference / 1000 / 60) % 60);
    let secs = Math.floor((difference / 1000) % 60);
    if (difference > 0) {
      timeLeft = {
        HOURS: hrs < 10 ? `0${hrs}` : hrs,
        MINS: mins < 10 ? `0${mins}` : mins,
        SECONDS: secs < 10 ? `0${secs}` : secs,
      };
      timeString = `${timeLeft.HOURS}:${timeLeft.MINS}:${timeLeft.SECONDS}`;
    }
    // console.log(timeLeft);
    setTimeLeft(timeString);
    return timeString;
  };

  useEffect(() => {
    // setTimeout(() => {
    //   setTimeLeft(calculateTimeLeft());
    // }, 500);

    const timer = setInterval(() => {
      // setTime(prevTime => calculateTimeLeft());
      calculateTimeLeft();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  const timerComponents = [];

  // Object.keys(timeLeft).forEach((interval) => {
  //   timerComponents.push(
  //     <div style={{ paddingRight: "0.6vw" }}>
  //       <div>
  //         <div
  //           style={{
  //             padding: "0.6vw",
  //             borderRadius: 7,

  //             minWidth: 45,
  //             backgroundColor: "transparent",
  //             color: "#f9f9f9",
  //             fontSize: "1.5vw",
  //             fontWeight: "bold",
  //             border: "0.2vw solid #f9f9f9",
  //           }}
  //         >
  //           {timeLeft[interval]}
  //         </div>
  //       </div>
  //       <div
  //         className="text-center"
  //         style={{ fontSize: "0.7vw", color: "white", marginTop: "0.9vw" }}
  //       >
  //         {interval}
  //       </div>
  //     </div>
  //   );
  // });
  return (
    <div>
      {timeLeft != "" && (
        <div
          style={{
            width: "120px",
            height: "44px",
            background: "#007373",
            border: "1px solid #FFFFFF",
            boxShadow:
              "inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            fontSize: "24px",
            textAlign: "center",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* {timeLeft === null ? "..." : timeLeft} */}
          {timeLeft === null ? "..." : timeLeft}
        </div>
      )}
      {timeLeft === "" && (
        <div
          style={{
            width: "120px",
            height: "44px",
            background: "#007373",
            border: "1px solid #FFFFFF",
            boxShadow:
              "inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            fontSize: "24px",
            textAlign: "center",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          MINTING...
        </div>
      )}
    </div>
  );
}

export default Timer;
