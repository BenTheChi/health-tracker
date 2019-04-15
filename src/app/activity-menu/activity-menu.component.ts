import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../activity.model';

@Component({
  selector: 'app-activity-menu',
  templateUrl: './activity-menu.component.html',
  styleUrls: ['./activity-menu.component.css']
})

export class ActivityMenuComponent implements OnInit {
  @Input() alphabeticalActivities: Activity[];
  @Input() valueActivities: Activity[];
  @Input() completedActivities: Activity[];
  @Output() onActivityDeleted = new EventEmitter<{activity:Activity, completed: boolean}>();
  @Output() onActivityCompleted = new EventEmitter<Activity>();
  @Output() onActivityIncompleted = new EventEmitter<Activity>();
  openTab: number = 0;
 
  constructor() { }

  ngOnInit() {
  }

  onTabSelect(tab: number){
    this.openTab = tab;
  }

  activityDeleted(activity:Activity, completed: boolean){
    this.onActivityDeleted.emit({activity, completed})
  }

  activityCompleted(activity: Activity){
    this.onActivityCompleted.emit(activity)
  }

  activityIncompleted(activity: Activity){
    this.onActivityIncompleted.emit(activity)
  }
}
