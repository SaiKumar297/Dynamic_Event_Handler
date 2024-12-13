import React from "react";

const CalendarGrid = ({ currentMonth, selectedDate, setSelectedDate, events }) => {
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay(); 
  const totalDays = endOfMonth.getDate();
  const daysInGrid = [];

  for (let i = 0; i < startDay; i++) {
    daysInGrid.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    daysInGrid.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  }

  return (
    <div className="calendar-grid">
      {daysInGrid.map((day, index) => (
        <div
          key={index}
          className={`day ${
            day && day.toDateString() === selectedDate.toDateString() ? "selected" : ""
          }`}
          onClick={() => day && setSelectedDate(day)}
        >
          {day ? day.getDate() : ""}
          {day && events[day.toDateString()] && <div className="event-indicator"></div>}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
