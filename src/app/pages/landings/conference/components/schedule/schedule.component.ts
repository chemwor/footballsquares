import { Component } from '@angular/core'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { day_two_schedule, scheduleData, ScheduleType } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'conference-schedule',
  standalone: true,
  imports: [NgbNavModule, CommonModule],
  templateUrl: './schedule.component.html',
  styles: ``,
})
export class ScheduleComponent {
  allScheduleData: ScheduleType[] = scheduleData
  dayTwoSchedule: ScheduleType[] = day_two_schedule
}
