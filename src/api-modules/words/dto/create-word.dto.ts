import { IsBoolean, IsString } from "class-validator";

export class CreateWordDto {
    @IsString()
    text: string;

    @IsBoolean()
    explicit: boolean
}
