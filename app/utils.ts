export function getCurrentWeekDayNumbers() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Monday start
  
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
  
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date.getDate().toString().padStart(2, "0"); // Format as "04", "05", etc.
    });
  
    return weekDays;
  }