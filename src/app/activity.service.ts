import { Injectable, EventEmitter } from '@angular/core';
import { Activity } from './activity.model';

@Injectable({
  providedIn: 'root'
})

//Stores all the activities and their totals.  Provides methods to add, delete, complete, incomplete, and retrieve totals.  
export class ActivityService {
    spiritualActivities = {
      "alphabetical": [
        new Activity("Philosophy", 10, "spiritual", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quia voluptatibus expedita corrupti alias temporibus quod eos sapiente velit ex, omnis eligendi incidunt perferendis. Repellendus aperiam ratione est impedit id, eius nobis obcaecati delectus error qui deserunt illum voluptatum omnis."),
        new Activity("Pray", 90, "spiritual", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quia voluptatibus expedita corrupti alias temporibus quod eos sapiente velit ex, omnis eligendi incidunt perferendis. Repellendus aperiam ratione est impedit id, eius nobis obcaecati delectus error qui deserunt illum voluptatum omnis.")],
      "value": [
        new Activity("Pray", 90, "spiritual", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quia voluptatibus expedita corrupti alias temporibus quod eos sapiente velit ex, omnis eligendi incidunt perferendis. Repellendus aperiam ratione est impedit id, eius nobis obcaecati delectus error qui deserunt illum voluptatum omnis."),
        new Activity("Philosophy", 10, "spiritual", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quia voluptatibus expedita corrupti alias temporibus quod eos sapiente velit ex, omnis eligendi incidunt perferendis. Repellendus aperiam ratione est impedit id, eius nobis obcaecati delectus error qui deserunt illum voluptatum omnis.")],
      "completed": [
        new Activity("Mind Altering Substance", 40, "spiritual", "Dude... I get it now")]
    }

    socialActivities = {
      "alphabetical": [
        new Activity("Flirting", 20, "social", "Expressed myself to someone I'm attracted to"),
        new Activity("Made new friend", 55, "social", "Made a new friend today")],
      "value": [
        new Activity("Made new friend", 55, "social", "Made a new friend today"),
        new Activity("Flirting", 20, "social", "Expressed myself to someone I'm attracted to")],
      "completed": [
        new Activity("Talked to old friend", 40, "social", "Contacted a friend I haven't talked to in a while")]
    }
    
    emotionalActivities = {
      "alphabetical": [
        new Activity("Empathy", 50, "emotional", "Pay attention to how others feel"),
        new Activity("Mindfulness", 80, "emotional", "Pay attention to how you feel")],
      "value": [
        new Activity("Mindfulness", 80, "emotional", "Pay attention to how you feel"),
        new Activity("Empathy", 50, "emotional", "Pay attention to how others feel")],
      "completed": [
        new Activity("Expression", 40, "emotional", "Let your emotions out")]
    }

    mentalActivities = {
      "alphabetical": [
        new Activity("Meditate", 10, "mental", "Focus on yourself for a long period of time"), 
        new Activity("Study", 90, "mental", "Increase your technical skill")],
      "value": [
        new Activity("Study", 90, "mental", "Increase your technical skill"), 
        new Activity("Meditate", 10, "mental", "Focus on yourself for a long period of time")],
      "completed": [
        new Activity("Willpower", 40, "mental", "Take action with intention")]
    }
    
    physicalActivities = {
      "alphabetical": [
        new Activity("Pushups", 20, "physical", "A push in an upward direction"), 
        new Activity("Situps", 50, "physical", "A sit in an upward direction (but not really...)")],
      "value": [
        new Activity("Situps", 50, "physical", "A sit in an upward direction (but not really...)"), 
        new Activity("Pushups", 20, "physical", "A push in an upward direction")],
      "completed": [
        new Activity("Squats", 40, "physical", "A sit in an downward direction")]
    }
  
  physicalTotal = 0
  physicalCompleted = 0
  emotionalTotal = 0
  emotionalCompleted = 0
  mentalTotal = 0
  mentalCompleted = 0
  socialTotal = 0
  socialCompleted = 0
  spiritualTotal = 0
  spiritualCompleted = 0

  activityAdded = new EventEmitter<Activity>();

  constructor() { }
  
  addActivity(newActivity: Activity){
    let listLength: Number;
    let alphabetAdded: Boolean;
    let valueAdded: Boolean;
    let genericActivities: {alphabetical: Activity[], value: Activity[], completed: Activity[]}

    switch (newActivity.type) {
      case "physical":
        genericActivities = this.physicalActivities;
      break;
      
      case "emotional":
        genericActivities = this.emotionalActivities;
      break;

      case "mental":
        genericActivities = this.mentalActivities;
      break;
      
      case "social":
        genericActivities = this.socialActivities;
      break;
      
      case "spiritual":
        genericActivities = this.spiritualActivities;
      break;
        
      default:
        console.log("Type does not exist");
      break;
    }

    listLength = genericActivities.alphabetical.length;
    alphabetAdded = false;
    valueAdded = false;

    for (let i = 0; i < listLength; i++){
      if(newActivity.name.toLowerCase < genericActivities.alphabetical[i].name.toLowerCase){
        genericActivities.alphabetical.splice(i,0,newActivity);
        alphabetAdded = true;
        break
      }
    }

    for (let i = 0; i < listLength; i++){
      if(newActivity.value < genericActivities.value[i].value){
        genericActivities.value.splice(i,0,newActivity);
        valueAdded = true;
        break
      }
    }

    if(!alphabetAdded)
      genericActivities.alphabetical.push(newActivity);
    if(!valueAdded)
      genericActivities.value.push(newActivity);
  }

  deleteActivity(activity: Activity, complete: Boolean){
    let genericActivities: {alphabetical: Activity[], value: Activity[], completed: Activity[]};

    switch (activity.type) {
      case "physical":
        genericActivities = this.physicalActivities;
      break;
      
      case "emotional":
        genericActivities = this.emotionalActivities;
      break;

      case "mental":
        genericActivities = this.mentalActivities;
      break;
      
      case "social":
        genericActivities = this.socialActivities;
      break;
      
      case "spiritual":
        genericActivities = this.spiritualActivities;
      break;
        
      default:
        console.log("Type does not exist");
      break;
    }

    //Removes from the completed list
    if(complete){
      for (let i = 0; i < genericActivities.completed.length; i++){
        if(genericActivities.completed[i].name == activity.name){
          genericActivities.completed.splice(i,1);
          break
        }
      }
    }

    //Removes from the value and alphabetical lists
    else{
      for (let i = 0; i < genericActivities.alphabetical.length; i++){
        if(genericActivities.alphabetical[i].name == activity.name){
          genericActivities.alphabetical.splice(i,1);
          break
        }
      }
  
      for (let i = 0; i < genericActivities.value.length; i++){
        if(genericActivities.value[i].name == activity.name){
          genericActivities.value.splice(i,1);
        }
      }
    }
  }

  incompleteActivity(activity: Activity){
    let genericActivities: {alphabetical: Activity[], value: Activity[], completed: Activity[]};

    switch (activity.type) {
      case "physical":
        genericActivities = this.physicalActivities;
      break;
      
      case "emotional":
        genericActivities = this.emotionalActivities;
      break;

      case "mental":
        genericActivities = this.mentalActivities;
      break;
      
      case "social":
        genericActivities = this.socialActivities;
      break;
      
      case "spiritual":
        genericActivities = this.spiritualActivities;
      break;
        
      default:
        console.log("Type does not exist");
      break;
    }

    for (let i = 0; i < genericActivities.completed.length; i++){
      if(genericActivities.completed[i].name == activity.name){
        this.addActivity(genericActivities.completed[i])
        genericActivities.completed.splice(i,1);
        break
      }
    }
    
  }

  completeActivity(activity: Activity){
    let genericActivities: {alphabetical: Activity[], value: Activity[], completed: Activity[]};

    switch (activity.type) {
      case "physical":
        genericActivities = this.physicalActivities;
      break;
      
      case "emotional":
        genericActivities = this.emotionalActivities;
      break;

      case "mental":
        genericActivities = this.mentalActivities;
      break;
      
      case "social":
        genericActivities = this.socialActivities;
      break;
      
      case "spiritual":
        genericActivities = this.spiritualActivities;
      break;
        
      default:
        console.log("Type does not exist");
      break;
    }

    for (let i = 0; i < genericActivities.alphabetical.length; i++){
      if(genericActivities.alphabetical[i].name == activity.name){

        genericActivities.completed.push(genericActivities.alphabetical[i]);

        //This is set to false because we do not want to remove it from the completed list that we just pushed it onto
        this.deleteActivity(activity, false);
        break
      }
    }
  }

  //Gets totals from all categories
  getTotals(){
    var totals = {
      physical: {
        completed: 0,
        incompleted: 0
      },
      mental: {
        completed: 0,
        incompleted: 0
      },
      emotional: {
        completed: 0,
        incompleted: 0
      },
      spiritual: {
        completed: 0,
        incompleted: 0
      },
      social: {
        completed: 0,
        incompleted: 0
      }
    }

    totals.physical.incompleted = this.getTotal(this.physicalActivities.value)
    totals.physical.completed = this.getTotal(this.physicalActivities.completed)

    totals.mental.incompleted = this.getTotal(this.mentalActivities.value)
    totals.mental.completed = this.getTotal(this.mentalActivities.completed)

    totals.emotional.incompleted = this.getTotal(this.emotionalActivities.value)
    totals.emotional.completed = this.getTotal(this.emotionalActivities.completed)

    totals.spiritual.incompleted = this.getTotal(this.spiritualActivities.value)
    totals.spiritual.completed = this.getTotal(this.spiritualActivities.completed)

    totals.social.incompleted = this.getTotal(this.socialActivities.value)
    totals.social.completed = this.getTotal(this.socialActivities.completed)

    return totals;
  }

  //Helper method that gets the total values of an individual category
  getTotal(activities:Activity[]){
    let total = 0;

    for(let activity of activities){
      total += activity.value;
    }

    return total;
  }
}

