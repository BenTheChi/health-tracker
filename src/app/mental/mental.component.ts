import { Component, DoCheck } from '@angular/core';
import { Activity } from '../activity.model';
import { ActivityService } from '../activity.service'


@Component({
  selector: 'app-mental',
  templateUrl: './mental.component.html',
  styleUrls: ['./mental.component.css']
})
export class MentalComponent implements DoCheck  {
  alphabeticalActivities: Activity[];
  valueActivities: Activity[];
  completedActivities: Activity[];

  constructor(private activityService: ActivityService) {
  }

  ngDoCheck(){
    this.alphabeticalActivities = this.activityService.mentalActivities.alphabetical
    this.valueActivities = this.activityService.mentalActivities.value
    this.completedActivities = this.activityService.mentalActivities.completed
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
