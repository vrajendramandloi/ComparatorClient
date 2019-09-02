import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './component/app.component';
import { NavbarComponent } from './component/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './component/home.component';
import { ErrorComponent } from './component/error.component';
import { CompTabMetaDataComponent } from './component/comp-table-metadata.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'tableMetaData', component: CompTabMetaDataComponent },
      { path: '**', component: ErrorComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
