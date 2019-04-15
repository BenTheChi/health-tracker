import { Component, DoCheck } from '@angular/core';
import { Activity } from '../activity.model';
import { ActivityService } from '../activity.service'

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements DoCheck  {
  alphabeticalActivities: Activity[];
  valueActivities: Activity[];
  completedActivities: Activity[];

  constructor(private activityService: ActivityService) {
  }

  ngDoCheck(){
    this.alphabeticalActivities = this.activityService.socialActivities.alphabetical
    this.valueActivities = this.activityService.socialActivities.value
    this.completedActivities = this.activityService.socialActivities.completed
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
