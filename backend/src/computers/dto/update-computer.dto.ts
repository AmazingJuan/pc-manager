// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { CreateComputerDto } from '@computers/dto/create-computer.dto';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { PartialType } from '@nestjs/mapped-types';

export class UpdateComputerDto extends PartialType(CreateComputerDto) {}
