import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomModuleDirective } from './directives/custom-module.directive';



@NgModule({
  declarations: [
    CustomModuleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomModuleDirective,
  ]
})
export class SharedModule { }
