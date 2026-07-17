'use client';

import { useState } from 'react';
import { contactSchema, type ContactInput } from '@/schemas/contact.schema';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [budget, setBudget] = useState(5000000);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectDescription: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ContactInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    setErrors({});

    const payload = { ...formData, budget };

    // Client-side validation
    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactInput;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      setState('idle');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (res.ok) {
        setState('success');
      } else if (res.status === 429) {
        setErrors({ email: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 10 phút.' });
        setState('idle');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="text-xl font-black text-[#0f0f0f] mb-2">Yêu cầu đã gửi!</h3>
        <p className="text-[#6b7280] text-sm">
          Chúng tôi sẽ liên hệ lại trong vòng 24 giờ. Cảm ơn bạn đã tin tưởng KABO AGENCY!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Row: Họ + Tên */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="text-xs font-semibold text-[#374151]">
            Họ
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Nguyễn"
            value={formData.firstName}
            onChange={handleChange}
            className="input-lumina"
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="text-xs text-[#006672]">{errors.firstName}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="text-xs font-semibold text-[#374151]">
            Tên
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Văn A"
            value={formData.lastName}
            onChange={handleChange}
            className="input-lumina"
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p className="text-xs text-[#006672]">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-semibold text-[#374151]">
          Email công việc
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="ten@company.com"
          value={formData.email}
          onChange={handleChange}
          className="input-lumina"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs text-[#006672]">{errors.email}</p>
        )}
      </div>

      {/* Budget Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#374151]">
            Ngân sách dự kiến
          </label>
          <span className="text-xs font-bold text-[#006672]">
            {budget.toLocaleString('vi-VN')} ₫
          </span>
        </div>
        <input
          type="range"
          min={2000000}
          max={20000000}
          step={500000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          aria-label="Ngân sách dự kiến"
        />
        <div className="flex justify-between text-[10px] text-[#9ca3af]">
          <span>2 triệu ₫</span>
          <span>20 triệu ₫</span>
        </div>
      </div>

      {/* Project Description */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="projectDescription" className="text-xs font-semibold text-[#374151]">
          Chi tiết dự án
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows={4}
          placeholder="Mô tả ngắn gọn mục tiêu của bạn..."
          value={formData.projectDescription}
          onChange={handleChange}
          className="input-lumina resize-none"
          aria-invalid={!!errors.projectDescription}
        />
        {errors.projectDescription && (
          <p className="text-xs text-[#006672]">{errors.projectDescription}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="btn-primary justify-center py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'submitting' ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
            Đang gửi...
          </>
        ) : (
          'Gửi yêu cầu →'
        )}
      </button>

      {state === 'error' && (
        <p className="text-xs text-center text-[#006672]">
          Đã xảy ra lỗi. Vui lòng thử lại hoặc liên hệ trực tiếp.
        </p>
      )}
    </form>
  );
}
