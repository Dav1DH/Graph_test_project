import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GraphChartDataComponent } from './graph-chart-data/graph-chart-data.component';
import {DataService} from './data.service';
import { ChartComponent } from './chart/chart.component';
const appRoutes: Routes = [
  { path: '', component: ChartComponent },
  { path: 'creat-or-update-data', component: GraphChartDataComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    GraphChartDataComponent,
    ChartComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MatSidenavModule,
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
