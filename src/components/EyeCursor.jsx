import { useEffect, useState, useRef } from 'react';
import { useEyeTracking } from '../context/EyeTrackingContext';

const EyeCursor = () => {
    const { isEnabled, isCalibrated, gazePosition, webgazer } = useEyeTracking();
    const [smoothedPosition, setSmoothedPosition] = useState({ x: 0, y: 0 });
    const [isSmiling, setIsSmiling] = useState(false);
    const lastClickTimeRef = useRef(0);

    const SMOOTHING_FACTOR = 0.15; // Lower = smoother but slower (0.1-0.5 range)
    const CLICK_COOLDOWN = 1000; // 1 second between clicks

    // Smooth cursor movement
    useEffect(() => {
        if (!isEnabled || !isCalibrated) return;

        const { x, y } = gazePosition;

        // Exponential smoothing for cursor position
        setSmoothedPosition(prev => ({
            x: prev.x + (x - prev.x) * SMOOTHING_FACTOR,
            y: prev.y + (y - prev.y) * SMOOTHING_FACTOR,
        }));
    }, [gazePosition, isEnabled, isCalibrated]);

    // Smile detection and click
    useEffect(() => {
        if (!isEnabled || !isCalibrated || !webgazer) return;

        const checkSmile = () => {
            try {
                // Get face mesh predictions from WebGazer
                const tracker = webgazer.getTracker();
                if (!tracker || !tracker.predictionReady) return;

                const predictions = tracker.getPositions();
                if (!predictions || predictions.length === 0) return;

                // Get mouth landmarks (simplified smile detection)
                const landmarks = predictions[0];

                if (landmarks && landmarks.length >= 68) {
                    const leftMouth = landmarks[48];
                    const rightMouth = landmarks[54];
                    const topMouth = landmarks[51];
                    const bottomMouth = landmarks[57];

                    if (leftMouth && rightMouth && topMouth && bottomMouth) {
                        // Calculate mouth width and height
                        const mouthWidth = Math.abs(rightMouth.x - leftMouth.x);
                        const mouthHeight = Math.abs(bottomMouth.y - topMouth.y);

                        // Smile ratio: wider mouth relative to height
                        const smileRatio = mouthWidth / (mouthHeight + 1);

                        // Detect smile (threshold can be adjusted)
                        const smiling = smileRatio > 3.5;

                        if (smiling && !isSmiling) {
                            // Smile started - trigger click
                            const now = Date.now();
                            if (now - lastClickTimeRef.current > CLICK_COOLDOWN) {
                                const { x, y } = smoothedPosition;
                                const elementAtPoint = document.elementFromPoint(x, y);

                                if (elementAtPoint && (
                                    elementAtPoint.tagName === 'BUTTON' ||
                                    elementAtPoint.tagName === 'A' ||
                                    elementAtPoint.onclick ||
                                    elementAtPoint.closest('button, a, input[type="submit"]')
                                )) {
                                    const clickableElement = elementAtPoint.closest('button, a, input[type="submit"]') || elementAtPoint;
                                    clickableElement.click();
                                    lastClickTimeRef.current = now;
                                }
                            }
                        }

                        setIsSmiling(smiling);
                    }
                }
            } catch (error) {
                // Silently handle errors
            }
        };

        // Check for smile every 100ms
        const interval = setInterval(checkSmile, 100);

        return () => clearInterval(interval);
    }, [isEnabled, isCalibrated, webgazer, smoothedPosition, isSmiling]);

    if (!isEnabled || !isCalibrated) {
        return null;
    }

    return (
        <div
            className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
            style={{
                left: `${smoothedPosition.x}px`,
                top: `${smoothedPosition.y}px`,
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* Outer ring - changes color when smiling */}
            <div className="relative w-10 h-10">
                <div className={`absolute inset-0 rounded-full border-3 ${isSmiling
                        ? 'border-green-500 bg-green-500/30 scale-125'
                        : 'border-blue-500 bg-blue-500/20'
                    } transition-all duration-200`} />

                {/* Inner dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${isSmiling ? 'bg-green-500' : 'bg-blue-500'
                        } transition-colors duration-200`} />
                </div>

                {/* Smile indicator */}
                {isSmiling && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-green-500 px-2 py-1 rounded whitespace-nowrap">
                        😊 Click!
                    </div>
                )}
            </div>
        </div>
    );
};

export default EyeCursor;
