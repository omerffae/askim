import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const thankYouMessageRef = useRef(null);
  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);
  const ctxRef = useRef(null);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    ctxRef.current = canvas.getContext("2d");
    console.log("Sana aşığım gözde");
    localStorage.setItem("Aşkım", "Gözde");

    const handleMouseOver = () => {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      const yesButtonRect = yesButtonRef.current.getBoundingClientRect();

      const maxX = containerRect.width - buttonRect.width;
      const maxY = containerRect.height - buttonRect.height;

      let randomX, randomY;
      let isOverlapping;

      do {
        randomX = Math.random() * maxX;
        randomY = Math.random() * maxY;

        isOverlapping =
          randomX < yesButtonRect.right &&
          randomX + buttonRect.width > yesButtonRect.left &&
          randomY < yesButtonRect.bottom &&
          randomY + buttonRect.height > yesButtonRect.top;
      } while (isOverlapping);

      noButtonRef.current.style.position = "absolute";
      noButtonRef.current.style.left = `${randomX}px`;
      noButtonRef.current.style.top = `${randomY}px`;
    };

    noButtonRef.current.addEventListener("mouseover", handleMouseOver);

    return () => {
      noButtonRef.current?.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const createConfetti = () => {
    const colors = ["#ff0", "#0f0", "#00f", "#f0f", "#f00", "#0ff"];
    const particles = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvasRef.current.width,
        y: Math.random() * canvasRef.current.height,
        radius: Math.random() * 5 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 1,
        direction: Math.random() * 2 * Math.PI,
      });
    }

    const draw = () => {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      for (const particle of particles) {
        ctxRef.current.beginPath();
        ctxRef.current.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );
        ctxRef.current.fillStyle = particle.color;
        ctxRef.current.fill();
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        particle.y += 1;
      }
      requestAnimationFrame(draw);
    };
    draw();
  };

  const handleYesClick = () => {
    createConfetti();
    setIsAccepted(true);
  };

  return (
    <div>
      <h1 className="question">BENİMLE EVLENİR MİSİN ASKİMMMM</h1>
      <div className="container" ref={containerRef} style={{ position: "relative", width: "500px", height: "500px" }}>
        {!isAccepted && (
          <>
            <button className="yes-button" ref={yesButtonRef} onClick={handleYesClick}>
              EVET
            </button>
            <button className="no-button" ref={noButtonRef}>
              HAYIR
            </button>
          </>
        )}
        <canvas id="confettiCanvas" ref={canvasRef}></canvas>
        {isAccepted && (
          <div className="thank-you-message">
            <p>TEŞEKKÜRLER SEVGİLİM!</p>
            <img src="ring.png" alt="Yüzük" className="ring-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
