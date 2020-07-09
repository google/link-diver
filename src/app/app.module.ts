import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkListComponent } from './link-list/link-list.component';
import { RegexInputComponent } from './regex-input/regex-input.component';
import { FilterByRegexPipe } from './filter-by-regex.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LinkListComponent,
    RegexInputComponent,
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
