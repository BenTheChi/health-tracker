import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhysicalComponent } from './physical/physical.component';
import { MentalComponent } from './mental/mental.component';
import { EmotionalComponent } from './emotional/emotional.component';
import { SpiritualComponent } from './spiritual/spiritual.component';
import { SocialComponent } from './social/social.component';
import { Routes, RouterModule } from '@angular/router';
import { ActivityMenuComponent } from './activity-menu/activity-menu.component';
import { HomeComponent } from './home/home.component';
import { AddActivityComponent } from './add-activity/add-activity.component';


const appRoutes: Routes = [
  { path:'', component: HomeComponent },
  { path:'mental', component: MentalComponent },
  { path:'emotional', component: EmotionalComponent },
  { path:'spiritual', component: SpiritualComponent },
  { path:'social', component: SocialComponent },
  { path:'physical', component: PhysicalComponent },
  { path: 'add-activity', component: AddActivityComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PhysicalComponent,
    MentalComponent,
    EmotionalComponent,
    SpiritualComponent,
    SocialComponent,
    ActivityMenuComponent,
    HomeComponent,
    AddActivityComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
