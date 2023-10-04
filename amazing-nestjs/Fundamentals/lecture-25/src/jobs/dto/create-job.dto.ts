import { JobType } from "../constants/jobs.constants";

import {
  IsString,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsBoolean,
  IsOptional,
  ArrayMinSize,
  IsNotEmpty,
  ValidateNested,
  IsObject,
} from "class-validator";

import { Type } from "class-transformer";

export class LocationDTO {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class CreateJobDTO {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEmail()
  email: string;

  @IsIn(Object.keys(JobType)) 
  @IsOptional()
  type?: JobType;

  @IsInt()
  @IsNotEmpty()
  experience: number;

  @IsNumber()
  salary: number;

  @IsString({ each: true }) // check for array of type string
  @ArrayMinSize(1)
  tags: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ValidateNested()
  @IsObject()               // check if it is an object
  @Type(() => LocationDTO) // convert object in LocationDTO type and then validate it
  location: LocationDTO;

  // if we want array of LocationDTO objects
  // @ValidateNested({ each: true })
  // @IsArray()         
  // @Type(() => LocationDTO) 
  // location: LocationDTO[];
}


// class-validator only works with classes, not with interfaces