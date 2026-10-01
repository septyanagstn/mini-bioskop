import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @ApiProperty({ example: '102101438586421277' })
  user_id: string;

  @IsString()
  @ApiProperty({ example: '102101438586421258' })
  showtime_id: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ example: ['A1', 'A2'], type: [String] })
  seat_numbers: string[];
}
