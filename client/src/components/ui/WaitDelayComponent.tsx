/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAutomationStore } from '@/store/useAutomationStore';
import { useAuth } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';

interface DelayState {
  finalTime: string;
  delayDate: string;
  delayTime: string;
}

const formatTimeWithAMPm = (time: string) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const twelveHour = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${twelveHour}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const WaitDelayComponent = () => {
  const [localData, setLocalData] = useState<DelayState>({
    finalTime: '',
    delayDate: '',
    delayTime: '',
  });

  const handleChange = (field: keyof DelayState, value: string) => {
    setLocalData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const { userId } = useAuth()
  const { setDelay, finalData, clerkId, setClerkId } = useAutomationStore()
  // useEffect(() => {
  //   // just console log the finalData when it changes
  //   console.log('Final Data:', finalData);
  //   console.log('Clerk ID:', clerkId);
  //   console.log('User ID:', userId);
  // }, []);

  const handleSave = () => {
    const formattedTime = formatTimeWithAMPm(localData.delayTime);
    // console.log('Saved data:', {
    //   ...localData,
    //   formattedTimeWithPeriod: formattedTime,
    // });
    const timePeriod = formattedTime.slice(-2) as 'AM' | 'PM';
    // console.log('Time period:', timePeriod);
    setDelay(localData.delayDate, localData.delayTime, timePeriod);
    setClerkId(userId ?? '')
    setLocalData({
      finalTime: '',
      delayDate: '',
      delayTime: '',
    });
  };

  const renderPreview = () => {
    const hasDelay = localData.delayDate && localData.delayTime;
    const formattedTime = formatTimeWithAMPm(localData.delayTime);
    const formattedDateTime = hasDelay
      ? `${localData.delayDate} at ${formattedTime}`
      : null;

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
        <div className="text-sm text-gray-600">
          <p>Final Time: {localData.finalTime || 'Not set'}</p>
          {formattedDateTime && (
            <p>Wait Until: {formattedDateTime}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-base font-medium text-gray-700">Wait/Delay</h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Your Final Time
        </label>
        <input
          type="text"
          value={localData.finalTime}
          onChange={(e) => handleChange('finalTime', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Set final time"
          style={{ color: 'black' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Delay Date
        </label>
        <input
          type="date"
          value={localData.delayDate}
          onChange={(e) => handleChange('delayDate', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ color: 'black' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Delay Time
        </label>
        <input
          type="time"
          value={localData.delayTime}
          onChange={(e) => handleChange('delayTime', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ color: 'black' }}
        />
      </div>

      <div className="pt-4">
        <button
          onClick={handleSave}
          className="w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Save
        </button>
      </div>

      {renderPreview()}
    </div>
  );
};

export default WaitDelayComponent;