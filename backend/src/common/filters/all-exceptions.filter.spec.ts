import { ArgumentsHost, HttpStatus, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AllExceptionsFilter } from './all-exceptions.filter';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;
  let mockHost: ArgumentsHost;

  beforeEach(() => {
    filter = new AllExceptionsFilter();
    mockJson = jest.fn().mockReturnThis();
    mockStatus = jest.fn().mockImplementation(() => ({
      json: mockJson,
    }));

    const mockResponse = {
      status: mockStatus,
      json: mockJson,
    };

    const mockRequest = {
      method: 'PUT',
      url: '/api/custom-pages/sample-slug',
    };

    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;
  });

  it('should return 409 Conflict when Prisma throws P2002 duplicate error', () => {
    const p2002Error = new Prisma.PrismaClientKnownRequestError('Duplicate key', {
      code: 'P2002',
      clientVersion: '5.17.0',
      meta: { target: ['slug'] },
    });

    filter.catch(p2002Error, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: expect.stringContaining('slug'),
        data: expect.objectContaining({
          statusCode: HttpStatus.CONFLICT,
          path: '/api/custom-pages/sample-slug',
        }),
      }),
    );
  });

  it('should return 404 Not Found when Prisma throws P2025 record not found error (Bug Fix #1)', () => {
    const p2025Error = new Prisma.PrismaClientKnownRequestError('Record to update not found', {
      code: 'P2025',
      clientVersion: '5.17.0',
    });

    filter.catch(p2025Error, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Không tìm thấy dữ liệu cần cập nhật.',
        data: expect.objectContaining({
          statusCode: HttpStatus.NOT_FOUND,
          path: '/api/custom-pages/sample-slug',
        }),
      }),
    );
  });

  it('should preserve status code when a standard HttpException is thrown', () => {
    const notFoundException = new NotFoundException('Resource with id 123 was not found');

    filter.catch(notFoundException, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Resource with id 123 was not found',
        data: expect.objectContaining({
          statusCode: HttpStatus.NOT_FOUND,
          path: '/api/custom-pages/sample-slug',
        }),
      }),
    );
  });
});
