export const getCalendarDays = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
    const days = [];
    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
  
    for (let i = 0; i < startDay; i++) {
      days.push({ date: new Date(firstDayOfMonth - (startDay - i) * 86400000), isCurrentMonth: false });
    }
  
    for (let i = 1; i <= totalDays; i++) {
      days.push({ date: new Date(date.getFullYear(), date.getMonth(), i), isCurrentMonth: true });
    }
  
    return days;
  };
  