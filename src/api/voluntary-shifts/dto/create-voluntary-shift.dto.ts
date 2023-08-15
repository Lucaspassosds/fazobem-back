import { ApiProperty } from '@nestjs/swagger';

export class CreateVoluntaryShiftDto {
  @ApiProperty({
    required: false,
    description:
      'never pass this; will be replaced in the backend by id from token',
  })
  voluntaryId: string;

  @ApiProperty({ required: true })
  shiftId: string;
}
