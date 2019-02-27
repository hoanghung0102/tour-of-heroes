import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullActivityComponent } from './full-activity/full-activity.component';

const routes: Routes = [
  {path: '', component: FullActivityComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DynamicComponentRoutingModule {}
