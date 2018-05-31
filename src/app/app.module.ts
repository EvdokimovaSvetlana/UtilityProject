import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MonthComponent } from './month/month.component';
import { ComunalComponent } from './comunal/comunal.component';
import { UtilityComponent } from './utility/utility.component';
import { DeleteUtilityComponent } from './delete-utility/delete-utility.component';
import { ChangeutilityComponent } from './changeutility/changeutility.component';
import { InfoUtilityComponent } from './info-utility/info-utility.component'

import { MonthService } from './month.service';
import { UtilityService } from './utility.service';
import { ComunalService } from './comunal.service';
import { AppRoutingModule } from './/app-routing.module';
import { MonthPipe } from './forMonth.pipe'

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { StorageServiceModule } from 'angular-webstorage-service';


@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    ComunalComponent,
    MonthPipe,
    UtilityComponent,
    DeleteUtilityComponent,
    ChangeutilityComponent,
    InfoUtilityComponent
    //    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    StorageServiceModule
  ],
  providers: [
    MonthService,
    ComunalService,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
