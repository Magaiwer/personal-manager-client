import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { ElectricityService } from './electricity.service';
import { SmartTableService } from './smart-table.service';
import { UserActivityService } from './user-activity.service';
import { ProfitChartService } from './profit-chart.service';
import { PeriodsService } from './periods.service';
import { ProfitBarAnimationChartService } from './profit-bar-animation-chart.service';
import { StatsBarService } from './stats-bar.service';
import { StatsProgressBarService } from './stats-progress-bar.service';
import { VisitorsAnalyticsService } from './visitors-analytics.service';

const SERVICES = [
  UserService,
  ElectricityService,
  SmartTableService,
  UserActivityService,
  ProfitChartService,
  PeriodsService,
  ProfitBarAnimationChartService,
  StatsBarService,
  StatsProgressBarService,
  VisitorsAnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
