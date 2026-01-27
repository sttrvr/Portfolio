import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WavesContent = ({
    lineColor = 'rgba(99, 102, 241, 0.3)',
    waveSpeedX = 0.0125,
    waveSpeedY = 0.005,
    waveAmpX = 2,
    waveAmpY = 0.5,
    friction = 0.9,
    tension = 0.01,
    xPoints = 20,
    yPoints = 15,
}) => {
    const mouse = useRef({ x: 0, y: 0 });

    const grid = useMemo(() => {
        const temp = [];
        for (let i = 0; i < xPoints; i++) {
            for (let j = 0; j < yPoints; j++) {
                temp.push({
                    x: (i / (xPoints - 1)) * 40 - 20,
                    y: (j / (yPoints - 1)) * 30 - 15,
                    z: 0,
                    vz: 0,
                });
            }
        }
        return temp;
    }, [xPoints, yPoints]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const pointer = state.pointer || state.mouse || { x: 0, y: 0 };

        mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x * 20, 0.1);
        mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y * 15, 0.1);

        grid.forEach((p) => {
            const waveX = Math.sin(time * waveSpeedX + p.x * 0.2) * waveAmpX;
            const waveY = Math.cos(time * waveSpeedY + p.y * 0.2) * waveAmpY;
            const targetZ = waveX + waveY;

            const dx = p.x - mouse.current.x;
            const dy = p.y - mouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 5) {
                p.vz += (5 - dist) * 0.05;
            }

            p.vz += (targetZ - p.z) * tension;
            p.vz *= friction;
            p.z += p.vz;
        });
    });

    return (
        <group>
            {Array.from({ length: xPoints }).map((_, i) => (
                <Line
                    key={`x-${i}`}
                    points={grid.filter((_, idx) => Math.floor(idx / yPoints) === i)}
                    color={lineColor}
                />
            ))}
            {Array.from({ length: yPoints }).map((_, j) => (
                <Line
                    key={`y-${j}`}
                    points={grid.filter((_, idx) => idx % yPoints === j)}
                    color={lineColor}
                />
            ))}
        </group>
    );
};

const Line = ({ points, color }) => {
    const lineRef = useRef();

    useFrame(() => {
        if (!lineRef.current) return;
        const pos = lineRef.current.geometry.attributes.position;
        if (!pos) return;
        points.forEach((p, i) => {
            pos.setXYZ(i, p.x, p.y, p.z);
        });
        pos.needsUpdate = true;
    });

    const geometry = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const vertices = new Float32Array(points.length * 3);
        g.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        return g;
    }, [points.length]);

    return (
        <line ref={lineRef} geometry={geometry}>
            <lineBasicMaterial color={color} transparent opacity={0.4} />
        </line>
    );
};

export default function Waves(props) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
            {isVisible && (
                <Suspense fallback={null}>
                    <Canvas
                        camera={{ position: [0, 0, 25], fov: 45 }}
                        dpr={[1, 1.5]} // Limit DPR 
                        performance={{ min: 0.5 }}
                    >
                        <WavesContent {...props} />
                    </Canvas>
                </Suspense>
            )}
        </div>
    );
}
