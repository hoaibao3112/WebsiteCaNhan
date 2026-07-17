import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Vui lòng nhập họ')
    .max(50, 'Họ không quá 50 ký tự')
    .trim(),
  lastName: z
    .string()
    .min(1, 'Vui lòng nhập tên')
    .max(50, 'Tên không quá 50 ký tự')
    .trim(),
  email: z.string().email('Email không hợp lệ').trim(),
  budget: z
    .coerce.number({ message: 'Ngân sách phải là số' })
    .min(2000000, 'Tối thiểu 2.000.000 ₫')
    .max(20000000, 'Tối đa 20.000.000 ₫'),
  projectDescription: z
    .string()
    .min(10, 'Mô tả ít nhất 10 ký tự')
    .max(2000, 'Không quá 2000 ký tự')
    .trim(),
});

export type ContactInput = z.infer<typeof contactSchema>;
