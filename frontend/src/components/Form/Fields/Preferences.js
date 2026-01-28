// Preferences.js

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onPreferenceChange(currentPreferences);
  }, [currentPreferences, onPreferenceChange]);

  const handlePreferenceChange = useCallback((preference) => {
    setCurrentPreferences(prev =>
      prev.includes(preference)
        ? prev.filter((pref) => pref !== preference)
        : [...prev, preference]
    );
  }, []);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Preferências:</h2>
      <ul>
        {preferences.map((preference, index) => (
          <li key={index} className="mb-2">
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-blue-500"
            >
              {preference}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Preferences;
