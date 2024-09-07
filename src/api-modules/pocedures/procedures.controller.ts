import { Controller, Post } from "@nestjs/common";
import { ProceduresService } from "./procedures.service";

@Controller("procs")
export class ProceduresController {
    constructor(
        private readonly service: ProceduresService
    ) { }

    @Post("audit/words")
    async auditWords() {
        return await this.service.auditWords();
    }
}