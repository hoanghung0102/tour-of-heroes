import { Component, OnInit } from '@angular/core';
import { EntityStore } from '../../stores/entity.store';
import { DO_EXERCISE, DO_WORKING, WAKE_UP } from '../activity-blocks.token';

@Component({
  selector: 'app-full-activity',
  templateUrl: './full-activity.component.pug',
  styleUrls: ['./full-activity.component.scss']
})

export class FullActivityComponent implements OnInit {
  activityBlocks = [DO_EXERCISE, DO_WORKING, WAKE_UP];
  entity: EntityStore<Object>;

  ngOnInit(): void {
    this.entity.state$.subscribe((dataChange) => this.entity.setState(dataChange));
  }
}
