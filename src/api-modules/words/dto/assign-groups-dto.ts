import { Group } from "@prisma/client";
import { IsArray, IsNumber } from "class-validator";

export class AssignGroupsDto {
    @IsArray()
    @IsNumber({}, { each: true })
    groups: number[]
}
