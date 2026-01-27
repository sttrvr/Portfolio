import { useRef, useEffect, useState } from "react";
import "./Squares.css";

const Squares = ({
    direction = "right",
    speed = 1,
    borderColor = "#333",
    squareSize = 40,
}) => {
    const canvasRef = useRef(null);
    const gridOffset = useRef({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (canvasRef.current) observer.observe(canvasRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isVisible) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let rafId;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const drawGrid = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const startX = Math.floor(gridOffset.current.x % squareSize);
            const startY = Math.floor(gridOffset.current.y % squareSize);

            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 0.5;

            ctx.beginPath();
            for (let x = startX; x < canvas.width; x += squareSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for (let y = startY; y < canvas.height; y += squareSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();

            if (direction === "right") gridOffset.current.x += speed;
            else if (direction === "left") gridOffset.current.x -= speed;
            else if (direction === "down") gridOffset.current.y += speed;
            else if (direction === "up") gridOffset.current.y -= speed;

            rafId = requestAnimationFrame(drawGrid);
        };

        rafId = requestAnimationFrame(drawGrid);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(rafId);
        };
    }, [direction, speed, borderColor, squareSize, isVisible]);

    return <canvas ref={canvasRef} className="squares-canvas w-full h-full" />;
};

export default Squares;
