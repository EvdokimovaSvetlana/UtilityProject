import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './month/month.component';
import { ComunalComponent } from './comunal/comunal.component';
import { UtilityComponent } from './utility/utility.component';
import { DeleteUtilityComponent } from './delete-utility/delete-utility.component';
import { InfoUtilityComponent } from './info-utility/info-utility.component';
import { ChangeutilityComponent } from './changeutility/changeutility.component';

const routes: Routes = [
  { path: '', component: MonthComponent },
  { path: 'comunal/:idmonth/:idyear', component: ComunalComponent },
  { path: 'add', component: UtilityComponent },
  { path: 'delete', component: DeleteUtilityComponent },
  { path: 'change', component: ChangeutilityComponent },
  { path: 'info', component: InfoUtilityComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
