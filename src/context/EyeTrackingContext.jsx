import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const EyeTrackingContext = createContext();

export const useEyeTracking = () => {
    const context = useContext(EyeTrackingContext);
    if (!context) {
        throw new Error('useEyeTracking must be used within EyeTrackingProvider');
    }
    return context;
};

export const EyeTrackingProvider = ({ children }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isCalibrated, setIsCalibrated] = useState(false);
    const [showCalibration, setShowCalibration] = useState(false);
    const [gazePosition, setGazePosition] = useState({ x: 0, y: 0 });
    const [webgazer, setWebgazer] = useState(null);

    // Initialize WebGazer
    useEffect(() => {
        const initWebGazer = async () => {
            try {
                const webgazerModule = await import('webgazer');
                const wg = webgazerModule.default;

                // Configure WebGazer
                wg.params.showVideoPreview = false;
                wg.params.showFaceOverlay = false;
                wg.params.showFaceFeedbackBox = false;

                setWebgazer(wg);
            } catch (error) {
                console.error('Failed to load WebGazer:', error);
            }
        };

        initWebGazer();
    }, []);

    // Start eye tracking
    const startTracking = useCallback(async () => {
        if (!webgazer) return;

        try {
            await webgazer
                .setRegression('ridge')
                .setTracker('TFFacemesh')
                .begin();

            webgazer.showPredictionPoints(false);

            // Set up gaze listener
            webgazer.setGazeListener((data, timestamp) => {
                if (data) {
                    setGazePosition({ x: data.x, y: data.y });
                }
            });

            setIsEnabled(true);
            setIsCalibrated(true); // Skip calibration - ready immediately
            setShowCalibration(false); // Don't show calibration overlay
        } catch (error) {
            console.error('Failed to start eye tracking:', error);
            alert('Failed to access camera. Please ensure camera permissions are granted.');
        }
    }, [webgazer]);

    // Stop eye tracking
    const stopTracking = useCallback(() => {
        if (webgazer) {
            webgazer.end();
            setIsEnabled(false);
            setIsCalibrated(false);
            setShowCalibration(false);
        }
    }, [webgazer]);

    // Toggle eye tracking
    const toggleTracking = useCallback(() => {
        if (isEnabled) {
            stopTracking();
        } else {
            startTracking();
        }
    }, [isEnabled, startTracking, stopTracking]);

    // Complete calibration (not used anymore but kept for compatibility)
    const completeCalibration = useCallback(() => {
        setIsCalibrated(true);
        setShowCalibration(false);
    }, []);

    return (
        <EyeTrackingContext.Provider
            value={{
                isEnabled,
                isCalibrated,
                showCalibration,
                gazePosition,
                toggleTracking,
                completeCalibration,
                webgazer,
            }}
        >
            {children}
        </EyeTrackingContext.Provider>
    );
};
