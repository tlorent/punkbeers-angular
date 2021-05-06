import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { BeerComponent } from './beer/beer.component';
import { BeersComponent } from './beers/beers.component';
import { FavesComponent } from './faves/faves.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { NavigationService } from './navigation.service';
import { BackButtonDirective } from './directives/back-button.directive';
import { BeerFormComponent } from './beer-form/beer-form.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ContainerComponent } from './container/container.component';
import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { ReversePipe } from './pipes/reverse.pipe';
import { SortPipe } from './pipes/sort.pipe';

// https://angular.io/guide/architecture-modules#ngmodule-metadata
@NgModule({
  // Components, directives & pipes that belong to this NgModule.
  declarations: [
    AppComponent,
    HeaderComponent,
    BeersComponent,
    FavesComponent,
    BeerComponent,
    ListComponent,
    SearchComponent,
    BeerDetailComponent,
    NotFoundComponent,
    HomeComponent,
    BackButtonDirective,
    BeerFormComponent,
    ContainerComponent,
    HighlightDirective,
    UnlessDirective,
    ReversePipe,
    SortPipe,
  ],
  /* Other modules whose exported classes are needed by component templates in this NgModule.
     Aka, what do the templates of the components that belong to this NgModule need to succesfully work?
     In the declarations array for example, we have templates that need the FormsModule or the BrowserModule
     to use form functionalities like ngModel or to use the routerLink directive.
   */
  imports: [
    /*
      Exports required infrastructure for all Angular apps.
      Also re-exports CommonModule which exports basic Angular directives such as ngIf, ngFor.
    */
    BrowserModule,
    // Imports our routing module so we can use navigation throughout the app.
    AppRoutingModule,
    HttpClientModule,
    // Exports providers and directives needed for template-driven forms.
    FormsModule,
    // Registers the global providers needed to access the Store throughout the application.
    StoreModule.forRoot({}, {}),
  ],
  /* Make services accessible/available.
     For example, the directive BackButtonDirective needs the NavigationService to work
     and we need to be able to inject it into the class.
     Note: if the service uses @Injectable decorator and the providedIn property with a value of
     'root', importing it here in the module is not necessary.
  */
  providers: [NavigationService],
  // The main application view, the root component. This view hosts all other app views.
  // Only the root NgModule should set the bootstrap property.
  bootstrap: [AppComponent],
})
export class AppModule {}
