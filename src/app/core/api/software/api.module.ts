import { NgModule } from '@angular/core';
import { BoardsService } from '@core/api/software/api/boards.service';
import { SprintsService } from '@core/api/software/api/sprints.service';

@NgModule({
  providers: [BoardsService, SprintsService]
})
export class ApiModule {}
