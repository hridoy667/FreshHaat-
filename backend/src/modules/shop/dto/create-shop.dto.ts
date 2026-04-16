import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsLatitude, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateShopDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    districtName: string;

    @IsNotEmpty()
    @IsArray()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            // This line removes [ ] and " characters before splitting
            const cleanedValue = value.replace(/[\[\]"]/g, '');
            return cleanedValue.split(',').map((id) => Number(id.trim()));
        }
        if (Array.isArray(value)) {
            return value.map((id) => Number(id));
        }
        return value;
    })
    @IsInt({ each: true })
    categoryIds: number[];

    @IsOptional()
    @IsString()
    logo?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    photos?: string[];

    @IsOptional()
    @Transform(({ value }) => parseFloat(value)) // Convert string "23.8" to number 23.8
    @IsNumber() // Use IsNumber instead of IsString
    latitude?: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    longitude?: number;
}
