import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiOkResp = (model) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { type: 'number', default: 200 },
              message: { type: 'message', default: 'OK' },
            },
          },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};

export const ApiEmptyResp = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          statusCode: { type: 'number', default: 200 },
          message: { type: 'message', default: 'OK' },
          data: { type: 'null', default: null },
        },
      },
    }),
  );
};

export const ApiPageResp = (model) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          statusCode: { type: 'number', default: 200 },
          message: { type: 'message', default: 'OK' },
          data: {
            properties: {
              total: { type: 'number' },
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        },
      },
    }),
  );
};
