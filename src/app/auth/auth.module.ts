import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
  exports: [AuthComponent, RouterModule],
})
export class AuthModule {}
