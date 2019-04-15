import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivityService } from '../activity.service';
import { Activity } from '../activity.model';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  value: string;
  valueVisible: boolean;
  successScreenVisible: boolean;
  currentName: string;
  currentType: string;
  hasName: boolean;
  hasDescription: boolean;

  @ViewChild('valueInput') valueInput: ElementRef;

  constructor(private activityService:ActivityService) {
    this.valueVisible = false;
    this.hasName = true;
    this.hasDescription = true;
  }

  ngOnInit() {
  }

  addActivity(name: HTMLInputElement, value: HTMLInputElement, type: HTMLSelectElement, description: HTMLTextAreaElement){
    if(name.value == "")
      this.hasName = false;
    else
      this.hasName = true;

    if(description.value == "")
      this.hasDescription = false;
    else
      this.hasDescription = true;

    if(this.hasDescription == false || this.hasName == false)
      return

    this.activityService.addActivity(new Activity(name.value, Number(value.value), type.value, description.value));
    this.currentName = name.value;
    this.currentType = type.value;
    this.successScreenVisible = true;
  }

  onInput(){
    this.value = this.valueInput.nativeElement.value;
    this.valueVisible = true;
  }

  onMouseUp(){
    this.valueVisible = false;
  }

  addActivityScreen(){
    this.successScreenVisible = !this.successScreenVisible;
  }

  checkValidInput(element){
      if(element.srcElement.id == "name"){
        if(element.srcElement.value == "")
          this.hasName = false;
        
        else
          this.hasName = true;
      }

      if(element.srcElement.id == "description"){
        if(element.srcElement.value == "")
          this.hasDescription = false;

        else
          this.hasDescription = true;
      }
  }
}
