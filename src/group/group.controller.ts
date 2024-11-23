// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { GroupService } from './group.service';
// import { CreateGroupDto } from './dto/create-group.dto';
// import { UpdateGroupDto } from './dto/update-group.dto';

import { Controller } from "@nestjs/common";
import { GroupService } from "./group.service";

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}


}
