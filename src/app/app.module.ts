import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { CsvlistComponent } from './components/modules/csvlist/csvlist.component';
import { CsvFormComponent } from './components/modules/csv-form/csv-form.component';
import { MaterialModule } from './components/common/material.module';
import { CsvModalComponent } from './components/modules/csv-modal/csv-modal.component';
import { FormsModule } from '@angular/forms';
import { DragdropDirective } from './components/common/dragdrop.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    CsvlistComponent,
    CsvFormComponent,
    CsvModalComponent,
    DragdropDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[CsvModalComponent]
})
export class AppModule { }
