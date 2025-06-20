import { Component } from '@angular/core'
import { CalendarOptions, EventInput } from '@fullcalendar/core'
import { FullCalendarModule } from '@fullcalendar/angular'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import { calendarEventData } from '../../data'

@Component({
  selector: 'yoga-studio-schedule',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent {
  calendarEvents: EventInput[] = calendarEventData

  calendarOptions: CalendarOptions = {
    plugins: [listGridPlugin, dayGridPlugin, timeGridPlugin, bootstrapPlugin],
    initialDate: '2022-08-01',
    initialView: 'dayGridMonth',
    headerToolbar: {
      right: 'dayGridMonth,timeGridWeek,listWeek',
      center: 'title',
      left: 'prev,next today',
    },
    themeSystem: 'bootstrap',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
  }
}
