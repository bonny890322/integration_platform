import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { SharedModule } from './shared/shared.module';
import { ContainerComponent } from './views/container/container.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { CsvComponent } from './views/features/csv/csv.component';
import { Linki2Component } from './views/features/linki2/linki2.component';
import { DaqComponent } from './views/features/daq/daq.component';
import { ModelComponent } from './views/model/model.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContainerComponent,
    HeaderComponent,
    CsvComponent,
    Linki2Component,
    DaqComponent,
    ModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
