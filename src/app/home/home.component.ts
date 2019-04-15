import { Component, OnInit, DoCheck } from '@angular/core';
import { Activity } from '../activity.model';
import { ActivityService } from '../activity.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck {
  overall: number
  physical: number
  mental: number
  emotional: number
  spiritual: number
  social: number

  message: string
  summary: string
  activity: Activity

  physicalBtn: boolean
  mentalBtn: boolean
  emotionalBtn: boolean
  spiritualBtn: boolean
  socialBtn: boolean
  randomBtn: boolean

  activitiesAvailable: boolean

  constructor(private activityService: ActivityService) { 
    this.newActivity('random');
  }

  ngDoCheck(){
    let totals = this.activityService.getTotals();

    let physicalCompleted = totals.physical.completed;
    let physicalIncompleted = totals.physical.incompleted;
    let mentalCompleted = totals.mental.completed;
    let mentalIncompleted = totals.mental.incompleted;
    let emotionalCompleted = totals.emotional.completed;
    let emotionalIncompleted = totals.emotional.incompleted;
    let spiritualCompleted = totals.spiritual.completed;
    let spiritualIncompleted = totals.spiritual.incompleted;
    let socialCompleted = totals.social.completed;
    let socialIncompleted = totals.social.incompleted;

    this.physical = Math.floor(physicalCompleted/(physicalCompleted + physicalIncompleted)*100);
    this.mental = Math.floor(mentalCompleted/(mentalCompleted + mentalIncompleted)*100);
    this.emotional = Math.floor(emotionalCompleted/(emotionalCompleted + emotionalIncompleted)*100);
    this.spiritual = Math.floor(spiritualCompleted/(spiritualCompleted + spiritualIncompleted)*100);
    this.social = Math.floor(socialCompleted/(socialCompleted + socialIncompleted)*100);
    this.overall = (physicalCompleted + mentalCompleted + emotionalCompleted + spiritualCompleted + socialCompleted);
    this.overall = Math.floor(this.overall / (this.overall + physicalIncompleted + mentalIncompleted + emotionalIncompleted + spiritualIncompleted + socialIncompleted )*100);

    if(isNaN(this.physical))
      this.physical = 0;
    
    if(isNaN(this.mental))
      this.mental = 0;
    
    if(isNaN(this.emotional))
      this.emotional = 0;
    
    if(isNaN(this.spiritual))
      this.spiritual = 0;
    
    if(isNaN(this.social))
      this.social = 0;
    
    if(isNaN(this.overall))
      this.overall = 0;


    
    if(this.overall <= 25){
      this.summary = "Very Unhealthy"
      this.message = "Your health journey has just begun.  The hardest part of getting healthy is starting.  When you're just beginning consistency is more important than quality.  Try to complete at least one easy health activity a day!"
    }
    else if(this.overall <= 50){
      this.summary = "Unhealthy"
      this.message = "You've made a good start but you have a ways to go.  Remember that consistency is key.  One foot in front of the other.  Take on some harder challenges and keep working at your goal!  You can do it!"
    }
    else if(this.overall <= 75){
      this.summary = "Healthy"
      this.message = "You are living a great lifestyle and you are in decent shape.  It may be tempting to stop here and be satisfied with your progress, but keep going.  Why be good enough when you can be great!"
    }
    else if(this.overall <= 99){
      this.summary = "Very Healthy"
      this.message = "You are in peek shape.  I bet you have abs, can study for hours at a time, have tons of friends, and are usually very happy.  Be proud of everything you've accomplished.  Yet... have you really fulfilled your full potential?"
    }
    else{
      this.summary = "Living God"
      this.message = "People want to be you.  You are the living embodiement of a perfect human.  You should write books, go on tour, and achieve world peace.  Or are you still aiming too low? Happiness lies in the process, not the goal.  Add new activities to keep challenging yourself."
    }

    if(this.getAvailableTypes().length == 0){
      this.randomBtn = true;
      this.activitiesAvailable = false;
    }
    else
      this.activitiesAvailable = true;
  }

  activityDeleted(activity:Activity, completed: boolean){

    this.activityService.deleteActivity(activity, completed);

    this.newActivity('random');
  }

  activityCompleted(activity:Activity){
    this.activityService.completeActivity(activity);

    this.newActivity('random');
  }

  newActivity(type:string){
    //Get the new activity based on type
    if(type == "random"){
      let availableTypes:string[] = this.getAvailableTypes();

      if(availableTypes.length == 0)
        this.activity = null;
      
      else
        this.activity = this.getActivity(availableTypes[Math.floor(Math.random()*availableTypes.length)]);
    }
    else
      this.activity = this.getActivity(type);
  }

  getAvailableTypes(){
    var availableTypes:string[] = []

    if(this.activityService.spiritualActivities.value.length != 0){
      availableTypes.push("spiritual");
      this.spiritualBtn = false;
    }

    else
      this.spiritualBtn = true;

    if(this.activityService.socialActivities.value.length != 0){
      availableTypes.push("social")
      this.socialBtn = false;
    }

    else
      this.socialBtn = true;

    if(this.activityService.emotionalActivities.value.length != 0){
      availableTypes.push("emotional")
      this.emotionalBtn = false;
    }

    else
      this.emotionalBtn = true;

    if(this.activityService.mentalActivities.value.length != 0){
      availableTypes.push("mental")
      this.mentalBtn = false;
    }

    else
      this.mentalBtn = true;

    if(this.activityService.physicalActivities.value.length != 0){
      availableTypes.push("physical")
      this.physicalBtn = false;
    }

    else
      this.physicalBtn = true;

    return availableTypes;
  }

  getActivity(type:string){
    var activityList: Activity[];

    switch(type){
      case "spiritual":
        activityList = this.activityService.spiritualActivities.value;
        if(activityList.length == 0)
          return null;
        else
          return activityList[Math.floor(Math.random()*activityList.length)];
      case "social":
        activityList = this.activityService.socialActivities.value;
        if(activityList.length == 0)
          return null;
        else
          return activityList[Math.floor(Math.random()*activityList.length)];
      case "emotional":
        activityList = this.activityService.emotionalActivities.value;
        if(activityList.length == 0)
          return null;
        else
          return activityList[Math.floor(Math.random()*activityList.length)];
      case "mental":
        activityList = this.activityService.mentalActivities.value;
        if(activityList.length == 0)
          return null;
        else
          return activityList[Math.floor(Math.random()*activityList.length)];
      case "physical":
        activityList = this.activityService.physicalActivities.value;
        if(activityList.length == 0)
          return null;
        else
          return activityList[Math.floor(Math.random()*activityList.length)];
      default:
        return null;
    }
    
  }
}
