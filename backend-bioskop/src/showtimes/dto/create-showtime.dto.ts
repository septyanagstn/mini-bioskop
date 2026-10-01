import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateShowtimeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ 
        example: '12334353463837' 
    })
    movie_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ 
        example: 'Audi 1' 
    })
    audi: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ 
        example: '2026-09-30' 
    })
    show_date: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ 
        example: '14:00'
    })
    start_time: string;

    @IsInt()
    @Min(0)
    @ApiProperty({ 
        example: 35000 
    })
    price: number;
}
