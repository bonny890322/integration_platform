import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from './primeng/primeng.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
