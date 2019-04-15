import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Activity } from '../activity.model';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-spiritual',
  templateUrl: './spiritual.component.html',
  styleUrls: ['./spiritual.component.css']
})
export class SpiritualComponent implements DoCheck  {
  alphabeticalActivities: Activity[];
  valueActivities: Activity[];
  completedActivities: Activity[];

  constructor(private activityService: ActivityService) {
  }

  ngDoCheck(){
    this.alphabeticalActivities = this.activityService.spiritualActivities.alphabetical
    this.valueActivities = this.activityService.spiritualActivities.value
    this.completedActivities = this.activityService.spiritualActivities.completed
  }

  onActivityDeleted(activityData: {activity:Activity, completed: boolean}){
    this.activityService.deleteActivity(activityData.activity, activityData.completed);
  }

  onActivityCompleted(activity:Activity){
    this.activityService.completeActivity(activity);
  }

  onActivityIncompleted(activity:Activity){
    this.activityService.incompleteActivity(activity);
  }

  addActivity(newActivity: Activity){
    this.activityService.addActivity(newActivity);
  }
}
