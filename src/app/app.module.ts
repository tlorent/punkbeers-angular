import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { FavesComponent } from './faves/faves.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// https://angular.io/guide/architecture-modules#ngmodule-metadata
@NgModule({
  // Components, directives & pipes that belong to this NgModule.
  declarations: [
    AppComponent,
    HeaderComponent,
    FavesComponent,
    SearchComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  /* Other modules whose exported classes are needed by component templates in this NgModule.
     Aka, what do the templates of the components that belong to this NgModule need to succesfully work?
     In the declarations array for example, we have templates that need the FormsModule or the BrowserModule
     to use form functionalities like ngModel or to use the routerLink directive.
   */
  imports: [
    // Eager-loaded modules.
    SharedModule,
    /*
      Exports required infrastructure for all Angular apps.
      Also re-exports CommonModule which exports basic Angular directives such as ngIf, ngFor.
    */
    BrowserModule,
    HttpClientModule,
    // Import AppRoutingModule last, because it contains the wildcard route. The order of imports here matters.
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  // The main application view, the root component. This view hosts all other app views.
  // Only the root NgModule should set the bootstrap property.
  bootstrap: [AppComponent],
})
export class AppModule {}
