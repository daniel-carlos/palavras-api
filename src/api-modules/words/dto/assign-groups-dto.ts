import { Group } from "@prisma/client";
import { IsArray, IsNumber, IsPositive } from "class-validator";

export class AssignGroupsDto {
    @IsNumber()
    @IsPositive()
    id: number

    @IsArray()
    @IsNumber({}, { each: true })
    groups: number[]
}
