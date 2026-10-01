import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateShowtimeDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    movie_id?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        example: 'Audi 1'
    })
    audi?: string;

    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        example: '2026-09-30'
    })
    show_date?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({ 
        example: '14:00'
    })
    start_time?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @ApiPropertyOptional({
        example: '35000'
    })
    price?: number;
}
