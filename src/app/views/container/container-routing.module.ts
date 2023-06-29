import { ImageComponent } from './../features/image/image.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './container.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CsvComponent } from '../features/csv/csv.component';
import { Linki2Component } from '../features/linki2/linki2.component';
import { DaqComponent } from '../features/daq/daq.component';
import { ModelComponent } from '../features/model/model.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard], // 會去呼叫canActivate()，回傳true就能進去路經
    component: ContainerComponent,
    children: [
      {
        path: '',
        // loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule),
        component: DashboardComponent,
        data: { breadcrumb: '首頁' }
      },
      {
        path: 'linki2',
        component: Linki2Component,
        data: { breadcrumb: 'Linki2' }
      },
      {
        path: 'daq',
        component: DaqComponent,
        data: { breadcrumb: 'DAQ' }
      },
      {
        path: 'csv',
        component: CsvComponent,
        data: { breadcrumb: 'CSV' }
      },
      {
        path: 'image',
        component: ImageComponent,
        data: { breadcrumb: 'Image' }
      },
      {
        path: 'model',
        component: ModelComponent,
        data: { breadcrumb: 'Model Management' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
