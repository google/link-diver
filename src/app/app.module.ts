import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkListComponent } from './link-list/link-list.component';
import { HighlightMatchPipe } from './highlight-match.pipe';
import { RegexInputComponent } from './regex-input/regex-input.component';
import { FilterByRegexPipe } from './filter-by-regex.pipe';
import { IndivLinkComponent } from './indiv-link/indiv-link.component';
import { InputPanelComponent } from './input-panel/input-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkListComponent,
    HighlightMatchPipe,
    RegexInputComponent,
    FilterByRegexPipe,
    IndivLinkComponent,
    InputPanelComponent
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
