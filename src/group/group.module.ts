import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupModule]
})
export class GroupModule {}