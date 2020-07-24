import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkListComponent } from './link-list/link-list.component';
import { HighlightMatchPipe } from './highlight-match.pipe';
import { InputBarComponent } from './input-bar/input-bar.component';
import { FilterByRegexPipe } from './filter-by-regex.pipe';
import { IndivLinkComponent } from './indiv-link/indiv-link.component';
import { InputPanelComponent } from './input-panel/input-panel.component';
import { ParentLinkComponent } from './parent-link/parent-link.component';
import { ExpandCollapseAllComponent } from './expand-collapse-all/expand-collapse-all.component';
import { GroupByPipe } from './group-by.pipe';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupHeaderComponent } from './group-header/group-header.component';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LinkListComponent,
    HighlightMatchPipe,
    InputBarComponent,
    FilterByRegexPipe,
    IndivLinkComponent,
    InputPanelComponent,
    ParentLinkComponent,
    ExpandCollapseAllComponent,
    GroupByPipe,
    GroupListComponent,
    GroupHeaderComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
