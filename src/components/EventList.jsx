import React from "react";

const EventList = ({ date, events, onDeleteEvent }) => {
  return (
    <div className="event-list">
      <h2>Events for {date.toDateString()}</h2>
      {events.length ? (
        <ul>
          {events.map((event, idx) => (
            <li key={idx}>
              <strong>{event.name}</strong> ({event.startTime} -{" "}
              {event.endTime})
              <button onClick={() => onDeleteEvent(date, idx)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this day.</p>
      )}
    </div>
  );
};

export default EventList;
