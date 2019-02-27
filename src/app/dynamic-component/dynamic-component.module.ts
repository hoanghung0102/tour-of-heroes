import { NgModule } from '@angular/core';
import { DO_EXERCISE, DO_WORKING, WAKE_UP } from './activity-blocks.token';
import { DynamicComponentFactoryModule } from './dynamic-component-factory.module';
import { DoExerciseComponent } from './full-activity/do-exersice/do-exercise.component';
import { DoWorkingComponent } from './full-activity/do-working/do-working.component';
import { FullActivityComponent } from './full-activity/full-activity.component';
import { WakeUpComponent } from './full-activity/wake-up/wake-up.component';

@NgModule({
  declarations: [
    FullActivityComponent,
    DoExerciseComponent,
    DoWorkingComponent,
    WakeUpComponent,
    DynamicComponentFactoryModule
  ],
  imports: [],
  exports: [FullActivityComponent],
  entryComponents: [
    DoExerciseComponent,
    DoWorkingComponent,
    WakeUpComponent
  ],
  providers: [
    {provide: DO_EXERCISE, useValue: DoExerciseComponent},
    {provide: DO_WORKING, useValue: DoWorkingComponent},
    {provide: WAKE_UP, useValue: WakeUpComponent}
  ]
})

export class DynamicComponentModule {}
