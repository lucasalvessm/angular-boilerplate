import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from './bootstrap.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, BootstrapModule],
  exports: [CommonModule, ReactiveFormsModule, BootstrapModule],
})
export class SharedModule {}
