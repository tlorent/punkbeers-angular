import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BeerDetailComponent } from '../beers/beer-detail/beer-detail.component';
import { BeerFormComponent } from '../beers/beer-form/beer-form.component';
import { AlertComponent } from './alert/alert.component';
import { ContainerComponent } from './container/container.component';
import { BackButtonDirective } from './directives/back-button.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { ListComponent } from './list/list.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    ContainerComponent,
    ListComponent,
    BeerDetailComponent,
    BeerFormComponent,
    AlertComponent,
    ReversePipe,
    SortPipe,
    BackButtonDirective,
    HighlightDirective,
    UnlessDirective,
  ],
  imports: [
    // Exports providers and directives needed for template-driven forms.
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  exports: [
    FormsModule,
    CommonModule,
    ContainerComponent,
    BeerDetailComponent,
    BeerFormComponent,
    ListComponent,
    AlertComponent,
    ReversePipe,
    SortPipe,
    BackButtonDirective,
    HighlightDirective,
    UnlessDirective,
  ],
})
export class SharedModule {}
