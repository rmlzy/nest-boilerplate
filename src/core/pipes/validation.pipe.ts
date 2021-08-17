import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const firstError = errors[0];

      // TODO: 最佳方案是根据注解顺序, 仅抛出第一条报错
      // https://github.com/typestack/class-validator/issues/178
      const isNotEmptyMsg = firstError.constraints.isNotEmpty;
      if (isNotEmptyMsg) {
        throw new BadRequestException(isNotEmptyMsg);
      }

      const values = Object.values(firstError.constraints)[0];
      throw new BadRequestException(values);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
