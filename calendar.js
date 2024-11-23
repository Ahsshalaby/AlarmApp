// let calendar;

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        // Initialize the FullCalendar instance
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: []
        });

        // Load tasks from localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            calendar.addEvent({
                title: task.title,
                start: task.date,
                allDay: true
            });
        });

        calendar.render();
    } else {
        console.error("Calendar element not found.");
    }
});
