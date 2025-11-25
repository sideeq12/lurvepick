import { useEffect, useState } from 'react';
import { useEyeTracking } from '../context/EyeTrackingContext';

const CalibrationOverlay = () => {
    const { completeCalibration, webgazer } = useEyeTracking();
    const [currentPoint, setCurrentPoint] = useState(0);
    const [isCalibrating, setIsCalibrating] = useState(false);

    // 9 calibration points (3x3 grid)
    const calibrationPoints = [
        { x: 10, y: 10 },   // Top-left
        { x: 50, y: 10 },   // Top-center
        { x: 90, y: 10 },   // Top-right
        { x: 10, y: 50 },   // Middle-left
        { x: 50, y: 50 },   // Center
        { x: 90, y: 50 },   // Middle-right
        { x: 10, y: 90 },   // Bottom-left
        { x: 50, y: 90 },   // Bottom-center
        { x: 90, y: 90 },   // Bottom-right
    ];

    const handlePointClick = (index) => {
        if (!webgazer || isCalibrating) return;

        setIsCalibrating(true);

        // Record calibration data
        setTimeout(() => {
            if (index < calibrationPoints.length - 1) {
                setCurrentPoint(index + 1);
                setIsCalibrating(false);
            } else {
                // Calibration complete
                setTimeout(() => {
                    completeCalibration();
                }, 500);
            }
        }, 1000);
    };

    useEffect(() => {
        // Auto-start with first point
        setCurrentPoint(0);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
            {/* Instructions */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-white space-y-2">
                <h2 className="text-3xl font-bold font-heading">Eye-Tracking Calibration</h2>
                <p className="text-lg">
                    Click each point and look at it for 1 second
                </p>
                <p className="text-sm text-gray-300">
                    Point {currentPoint + 1} of {calibrationPoints.length}
                </p>
            </div>

            {/* Calibration Points */}
            <div className="relative w-full h-full">
                {calibrationPoints.map((point, index) => (
                    <button
                        key={index}
                        onClick={() => handlePointClick(index)}
                        disabled={index !== currentPoint || isCalibrating}
                        className={`absolute w-16 h-16 rounded-full transition-all duration-300 ${index === currentPoint
                                ? 'bg-blue-500 scale-125 animate-pulse shadow-lg shadow-blue-500/50'
                                : index < currentPoint
                                    ? 'bg-green-500 scale-75'
                                    : 'bg-gray-600 scale-75 opacity-50'
                            } ${index === currentPoint && !isCalibrating
                                ? 'cursor-pointer hover:scale-150'
                                : 'cursor-not-allowed'
                            }`}
                        style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            transform: `translate(-50%, -50%)`,
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                            {index < currentPoint ? '✓' : index + 1}
                        </div>
                    </button>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-96">
                <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-blue-500 h-full transition-all duration-300"
                        style={{ width: `${((currentPoint + 1) / calibrationPoints.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalibrationOverlay;
