import { ApiProperty } from '@nestjs/swagger';

export class CreateShiftDto {
  @ApiProperty({ type: 'string', format: 'time', required: true })
  startTime: string;

  @ApiProperty({ type: 'string', format: 'time', required: true })
  endTime: string;

  @ApiProperty({ type: 'integer', minimum: 1, required: true })
  quantityNeeded: number;

  @ApiProperty({ type: 'string', maxLength: 100, required: true })
  staffingManagerName: string;

  @ApiProperty({
    type: 'string',
    format: 'phone',
    example: '123-456-7890',
    required: true,
  })
  staffingManagerPhoneNumber: string;

  @ApiProperty({ required: true })
  staffingManagerEmail: string;

  @ApiProperty({ required: false })
  jobRequirements: string;

  @ApiProperty({ required: false })
  otherInfo?: string;

  @ApiProperty({ type: 'string', required: true })
  voluntaryRoleId: string;

  @ApiProperty({ type: 'string', required: false })
  id?: string;

  @ApiProperty({ type: 'string', required: true })
  organizationEventId: string;
}
