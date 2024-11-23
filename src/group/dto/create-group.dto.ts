import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
