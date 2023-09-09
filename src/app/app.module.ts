import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ContainerComponent } from './views/container/container.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { CsvComponent } from './views/features/csv/csv.component';
import { Linki2Component } from './views/features/linki2/linki2.component';
import { DaqComponent } from './views/features/daq/daq.component';
import { ModelComponent } from './views/features/model/model.component';
import { ImageComponent } from './views/features/image/image.component';
import { H5Component } from './views/features/h5/h5.component';
import { MoldComponent } from './views/features/mold/mold.component';
import { MachineComponent } from './views/features/machine/machine.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContainerComponent,
    HeaderComponent,
    CsvComponent,
    Linki2Component,
    DaqComponent,
    ModelComponent,
    ImageComponent,
    H5Component,
    MoldComponent,
    MachineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
