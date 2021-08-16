import { PartialType } from '@nestjs/swagger';
import { CreateAccessDto } from './create-access.dto';

export class UpdateAccessDto extends PartialType(CreateAccessDto) {}
