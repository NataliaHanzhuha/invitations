import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from './ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,

  ],
})
export class SharedModule {}
