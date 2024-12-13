import React, { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import EventList from "./components/EventList";
import EventModal from "./components/EventModal";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useLocalStorage("calendarEvents", {});
  const [showModal, setShowModal] = useState(false);

  const handleAddEvent = (date, event) => {
    const dateKey = date.toDateString();
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), event],
    }));
  };

  const handleDeleteEvent = (date, eventIndex) => {
    const dateKey = date.toDateString();
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((_, idx) => idx !== eventIndex),
    }));
  };

 
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };


  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const currentMonthDisplay = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="app">
      <h1>
        Dynamic Event Calendar{" "}
        <span className="date-display">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </h1>
      <div className="month-navigation">
        <button onClick={goToPreviousMonth}>Previous</button>
        <span className="current-month">{currentMonthDisplay}</span>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={events}
      />
      <EventList
        date={selectedDate}
        events={events[selectedDate.toDateString()] || []}
        onDeleteEvent={handleDeleteEvent}
      />
      {showModal && (
        <EventModal
          date={selectedDate}
          onClose={() => setShowModal(false)}
          onAddEvent={(event) => handleAddEvent(selectedDate, event)}
        />
      )}
      <button onClick={() => setShowModal(true)}>Add Event</button>
    </div>
  );
};

export default App;
