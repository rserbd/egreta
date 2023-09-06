import React from "react";

const TimePicker = ({
  selectedHour,
  selectedMinutes,
  onHourChange,
  onMinutesChange,
}) => {
  const handleHourChange = (e) => {
    const newHour = parseInt(e.target.value);
    if (newHour >= 8 && newHour <= 20) {
      onHourChange(newHour);
    }
  };

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value);
    if (newMinutes === 0 || newMinutes === 30) {
      onMinutesChange(newMinutes);
    }
  };

  return (
    <div>
      <select id="hour" value={selectedHour} onChange={handleHourChange}>
        {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>

      <select
        id="minute"
        value={selectedMinutes}
        onChange={handleMinutesChange}
      >
        <option value={0}>00</option>
        <option value={30}>30</option>
      </select>
    </div>
  );
};

export default TimePicker;
