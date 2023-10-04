import {
    Body,
    Controller,
    Post,
    Query,
    Get,
    ValidationPipe,
    Param,
    Req,
    Put,
  } from "@nestjs/common";
  import { CreateJobDTO } from "../dto/create-job.dto";
  import { Paginable } from "../dto/paginable.dto";
  import { JobsService } from "../services/jobs.service";
  
  @Controller("jobs")
  export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    // @Post()
    // @UsePipes(ValidationPipe)                           // apply for all arguments (valid syntax in this case)
    // createJob(@Body() createJobDto: CreateJobDTO) {
    //   return this.jobsService.createJob(createJobDto);
    // }

    // or 

    // @Post()
    // createJob(@Body(ValidationPipe) createJobDto: CreateJobDTO) {    // now it will only apply on body
    //   return this.jobsService.createJob(createJobDto);
    // }
  
    // we have made ValidationPipe as global, and now no need to pass here  
    @Post()
    createJob(@Body() createJobDto: CreateJobDTO) {       
      return this.jobsService.createJob(createJobDto);
    }

    @Get()
    findJobs(@Query() query: Paginable) {
      console.log(query);
      return { success: true };
    }
   

    // `ValidationPipe` option to transform the value into proper data type
    // `ValidationPipe` options
    // 1. transform
    // 2. dismissDefaultMessages,
    // 3. disableErrorMessages,
    // 4. whitelist,
    // 5. skipMissingProperties,
    // 6. stopAtFirstError

    // 1) transform
    // @Get("search/:id")
    // findJob(@Param("id", new ValidationPipe({ transform: true })) jobId: number) {
    //   console.log(typeof jobId); // number (transformed from string type)
    //   return { success: true, jobId };
    // }

    // 2) dismissDefaultMessages
    // @Get("with-tags")
    // findJobByTags(
    //   @Query(new ValidationPipe({ dismissDefaultMessages: true })) // we need to add our custom messages on dto
    //   query: Paginable
    // ) {
    //   return { success: true, query };
    // }

    // 3) disableErrorMessages (no meessage to show on error)
    // @Get("with-tags2")
    // findJobByTags2(
    //   @Query(new ValidationPipe({ disableErrorMessages: true }))
    //   query: Paginable
    // ) {
    //   return { success: true, query };
    // }

    // 4) whitelist      
    // @Get("with-names")
    // findJobByNames(
    //   @Req() req: Request,
    //   @Query(new ValidationPipe({ whitelist: true }))
    //   query: Paginable
    // ) {
    //   const queryFields = Object.keys(req.query);
    //   const paginableFields = Object.keys(query);

    //   const whitelist = queryFields.filter(
    //     (field) => !paginableFields.includes(field)
    //   );

    //   return { success: true, query, whitelist };
    // }

    // 5) skipMissingProperties 
    // @Get("with-city")
    // findJobByCity(
    //   @Query(new ValidationPipe({ skipMissingProperties: true })) // (no validation check if property is missing)
    //   query: Paginable
    // ) {
    //   const queryFields = Object.keys(query);
    //   const paginableFields = ["limit", "page"];

    //   const missingProps = paginableFields.filter(
    //     (field) => !queryFields.includes(field)
    //   );

    //   return { success: true, query, missingProps };
    // }

    // 6) stopAtFirstError
    // @Get("with-country")
    // findJobByCountry(
    //   @Query(new ValidationPipe({ stopAtFirstError: true }))
    //   query: Paginable
    // ) {
    //   return { success: true, query };
    // }
  }
  