import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
import { GroupListComponent } from './group-list/group-list.component';
import { GroupHeaderComponent } from './group-header/group-header.component';
import { GroupSort } from './group-sort.pipe';

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
    GroupListComponent,
    GroupHeaderComponent,
    GroupSort
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
