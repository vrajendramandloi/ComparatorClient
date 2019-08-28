import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './component/app.component';
import { NavbarComponent } from './component/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './component/home.component';
import { ErrorComponent } from './component/error.component';
import { CompTabMetaDataComponent } from './component/comp-table-metadata.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompTabMetaDataComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'tableMetaData', component: CompTabMetaDataComponent},
      {path: '**', component: ErrorComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
