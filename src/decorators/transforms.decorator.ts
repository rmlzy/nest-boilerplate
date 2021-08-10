import { Transform } from 'class-transformer';

/**
 * convert string or number to integer
 */
export function ToInt(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;
      return Number.parseInt(value, 10);
    },
    { toClassOnly: true },
  );
}
