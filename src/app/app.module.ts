import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkListComponent } from './link-list/link-list.component';
import { HighlightMatchPipe } from './highlight-match.pipe';
import { InputBarComponent } from './input-bar/input-bar.component';
import { FilterPipe } from './filter.pipe';
import { IndivLinkComponent } from './indiv-link/indiv-link.component';
import { InputPanelComponent } from './input-panel/input-panel.component';
import { OptionsComponent } from './options/options.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupSortPipe } from './group-sort.pipe';
import { GroupCountComponent } from './group-count/group-count.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkListComponent,
    HighlightMatchPipe,
    InputBarComponent,
    FilterPipe,
    IndivLinkComponent,
    InputPanelComponent,
    OptionsComponent,
    GroupListComponent,
    GroupSortPipe,
    GroupCountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
