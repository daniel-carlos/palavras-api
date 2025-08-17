import { Group } from "@prisma/client";
import { IsArray, IsNumber, IsPositive } from "class-validator";
import { AutoAssignOutputType } from "src/types";

export class AssignGroupsManyDto {
    @IsArray()
    assigns: AutoAssignOutputType;
}
