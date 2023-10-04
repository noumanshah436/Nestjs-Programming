import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Optional,
} from '@nestjs/common';

export class ParseDateOptions {
  fromTimestamp: boolean;
  errorMsg?: string;
  dataKey?: string;
}

@Injectable()
export class ParseDatePipe implements PipeTransform {
  private fromTimestamp: boolean;
  private errorMsg: string;
  private dataKey: string;

  constructor(@Optional() options: ParseDateOptions) {
    this.fromTimestamp = options?.fromTimestamp !== undefined ? options.fromTimestamp : true;
    this.errorMsg = options?.errorMsg || 'Invalid date';
    this.dataKey = options?.dataKey || 'timestamp';
  }

  transform(value: string | number, metadata: ArgumentMetadata) {

    // metadata;
    // { metatype: [Function: Date], type: 'body', data: 'timestamp' }
    // 

    // extract data(key or attribute in metadata) and store its value in isKeyGiven
    const { data: isKeyGiven } = metadata;

    if (!isKeyGiven) {
      value = value[this.dataKey];
    }

    const date = this.fromTimestamp
      ? this.convertTimestamp(value)
      : new Date(value);

    if (!date || isNaN(+date)) {
      const errorMsg = isKeyGiven ? `${isKeyGiven} is invalid` : this.errorMsg;

      throw new BadRequestException(errorMsg);
    }

    // extract metatype (given data type)
    const { metatype } = metadata;

    switch (metatype) {
      case String:
        return date.toUTCString();

      case Date:
        return date;

      case Number:
        return date.getTime();

      default:
        return date.toISOString();
    }
  }

  convertTimestamp(timestamp: string | number) {
    timestamp = +timestamp;

    const isSecond = !(timestamp > (Date.now() + 24 * 60 * 60 * 1000) / 1000);

    return isSecond ? new Date(timestamp * 1000) : new Date(timestamp);
  }
}


// In NestJS, the @Optional() decorator is used in combination with dependency injection to indicate that a particular dependency is optional. 
// This means that if the dependency is not provided, the application will not throw an error, and the value of the dependency will be undefined instead.

// In this constructor, options is a parameter that represents an object of type ParseDateOptions. 
// By adding @Optional() before it, you are telling NestJS that it's not required to provide a value for options when creating an instance of ParseDatePipe.
// If options is not provided during dependency injection, it will default to undefined

// ***********************

// check syntax in browser inspect tool:

// metadata = { metatype: "", type: 'body', data: 'timestamp' }
// const { data: isKeyGiven } = metadata;

// isKeyGiven will store 'timestamp'