import { Component, DoCheck } from '@angular/core';
import { Activity } from '../activity.model';
import { ActivityService } from '../activity.service'


@Component({
  selector: 'app-physical',
  templateUrl: './physical.component.html',
  styleUrls: ['./physical.component.css']
})
export class PhysicalComponent implements DoCheck  {
  alphabeticalActivities: Activity[];
  valueActivities: Activity[];
  completedActivities: Activity[];

  constructor(private activityService: ActivityService) {
  }

  ngDoCheck(){
    this.alphabeticalActivities = this.activityService.physicalActivities.alphabetical
    this.valueActivities = this.activityService.physicalActivities.value
    this.completedActivities = this.activityService.physicalActivities.completed
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
