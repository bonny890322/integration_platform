import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './container.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CsvComponent } from '../csv/csv.component';
import { Linki2Component } from '../linki2/linki2.component';
import { DaqComponent } from '../daq/daq.component';
import { ModelComponent } from '../model/model.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard], // 會去呼叫canActivate()，回傳true就能進去路經
    component: ContainerComponent,
    children: [
      {
        path: 'dashboard',
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
