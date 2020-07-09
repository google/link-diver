import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkListComponent } from './link-list/link-list.component';
import { InputComponent } from './input/input.component';
import { FilterByRegexPipe } from './filter-by-regex.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LinkListComponent,
    InputComponent,
    FilterByRegexPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
