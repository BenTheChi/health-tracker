import { Component, DoCheck } from '@angular/core';
import { Activity } from '../activity.model';
import { ActivityService } from '../activity.service'


@Component({
  selector: 'app-emotional',
  templateUrl: './emotional.component.html',
  styleUrls: ['./emotional.component.css']
})
export class EmotionalComponent implements DoCheck  {
  alphabeticalActivities: Activity[];
  valueActivities: Activity[];
  completedActivities: Activity[];

  constructor(private activityService: ActivityService) {
  }

  ngDoCheck(){
    this.alphabeticalActivities = this.activityService.emotionalActivities.alphabetical
    this.valueActivities = this.activityService.emotionalActivities.value
    this.completedActivities = this.activityService.emotionalActivities.completed
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
