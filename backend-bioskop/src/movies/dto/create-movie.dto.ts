import { ApiProperty } from "@nestjs/swagger";
import { 
    IsString,
    IsNotEmpty,
    IsUrl,
} from 'class-validator';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'AGENSI RUMAH TANGGA',
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'John Doe',
    })
    director: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Jane Smith, Bob Johnson',
    })
    starring: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'A thrilling tale of adventure and discovery.',
    })
    synopsis: string;

    @IsUrl()
    @ApiProperty({
        example: 'https://example.com/poster.jpg',
    })
    poster_url: string;
}
