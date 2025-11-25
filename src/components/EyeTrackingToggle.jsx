import { Eye, EyeOff } from 'lucide-react';
import { useEyeTracking } from '../context/EyeTrackingContext';

const EyeTrackingToggle = () => {
    const { isEnabled, isCalibrated, toggleTracking } = useEyeTracking();

    return (
        <button
            onClick={toggleTracking}
            className="p-2 text-black dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors relative"
            aria-label="Toggle eye tracking"
            title={isEnabled ? 'Disable Eye Tracking' : 'Enable Eye Tracking'}
        >
            {isEnabled ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}

            {/* Status indicator */}
            {isEnabled && (
                <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${isCalibrated ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                    }`} />
            )}
        </button>
    );
};

export default EyeTrackingToggle;
