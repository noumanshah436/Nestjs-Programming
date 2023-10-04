import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    ParseEnumPipe,
    ParseArrayPipe,
    ParseIntPipe,
    Put,
    Query,
    UsePipes,
  } from "@nestjs/common";
import { JobsService } from "../services/jobs.service";
import { JobType } from "../constants/jobs.constants";
import { HttpStatus } from '@nestjs/common';
  
  @Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // ParseUUIDPipe (for all versions)
  @Get("ref/:refId")
  findJobByRefId(@Param("refId", ParseUUIDPipe) id: string) {
    return this.jobsService.findByRefId(id);
  }

  // ParseUUIDPipe - UUID version 3
  @Get("ref-v3/:refId")
  findJobByUUID3RefId(
    @Param("refId", new ParseUUIDPipe({ version: "3" })) id: string
  ) {
    return this.jobsService.findByRefId(id);
  }

  // ParseUUIDPipe - UUID version 4
  @Get("ref-v4/:refId")
  findJobByUUID4RefId(
    @Param(
      "refId",
      new ParseUUIDPipe({
        version: "4",
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      })
    )
    id: string
  ) {
    return this.jobsService.findByRefId(id);
  }

  // ParseEnumPipe
  @Put("type/:id")
  toggleJobType(
    @Param("id", ParseIntPipe) id: number,
    @Body("type", new ParseEnumPipe(JobType)) type: JobType
  ) {
    // we want that type param should be in one of JobType(FULL_TIME, PART_TIME)
    return this.jobsService.toggleJobType(id, type);
  }

  // ParseArrayPipe
  // NOTE: we need to install the class-validator & class-transformer packages to use the `ParseArrayPipe`
  @Get("search")
  findJobsByIds(
    @Query("id", new ParseArrayPipe({ items: Number, separator: "," })) ids: number[]
  ) {
    return this.jobsService.findByIds(ids);
  }
}

  // Not good to use pipe on controller level (will apply on all the arguments)
  // @Controller("jobs")
  // @UsePipes(ParseIntPipe)
  // export class JobsController {
  //   constructor(private readonly jobsService: JobsService) {}
  
  //   @Get(":id")
  //   findJobById(@Param("id") id: number) {
  //     return this.jobsService.findById(id);
  //   }
  
  //   @Put("exp/:id")
  //   setUpdateJobExp(@Param("id") id: number, @Query("exp") exp: number) {
  //     return this.jobsService.setJobExp(id, exp);
  //   }
  
  //   // Order of execution = (Controller Level) ParseIntPipe -> (Method Arg Level `Body`) ParseEnumPipe
  //   @Put("type/:id")
  //   toggleJobType(
  //     @Param("id") id: number,
  //     @Body("type", new ParseEnumPipe(JobType)) type: JobType
  //   ) {
  //     return this.jobsService.toggleJobType(id, type);
  //   }
  // }
  