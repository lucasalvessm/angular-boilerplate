import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from './bootstrap.module';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, ReactiveFormsModule, BootstrapModule],
  exports: [CommonModule, ReactiveFormsModule, BootstrapModule, AlertComponent],
})
export class SharedModule {}
