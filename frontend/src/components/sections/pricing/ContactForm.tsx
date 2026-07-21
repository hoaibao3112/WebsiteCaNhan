'use client';

import { useState } from 'react';
import { contactSchema, type ContactInput } from '@/schemas/contact.schema';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const SERVICES_OPTIONS = [
  'Landing Page',
  'Website Doanh Nghiệp',
  'E-commerce / Shop',
  'Web App / Hệ thống',
  'Tối ưu & Bảo trì',
];

const BUDGET_OPTIONS = [
  { label: 'Dưới 5 triệu', value: 3000000 },
  { label: '5 - 10 triệu', value: 7500000 },
  { label: '10 - 20 triệu', value: 15000000 },
  { label: 'Trên 20 triệu', value: 30000000 },
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [selectedServices, setSelectedServices] = useState<string[]>(['Website Doanh Nghiệp']);
  const [selectedBudget, setSelectedBudget] = useState<number>(7500000); // 5 - 10 triệu default
  const [fullName, setFullName] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectDescription: '',
  });

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);

    // Split name into first and last name for Zod and API compatibility
    const parts = value.trim().split(/\s+/);
    let first = '';
    let last = '';

    if (parts.length > 1) {
      last = parts.pop() || '';
      first = parts.join(' ');
    } else {
      first = value.trim();
      last = value.trim();
    }

    setFormData((prev) => ({
      ...prev,
      firstName: first,
      lastName: last,
    }));

    if (errors.firstName || errors.lastName) {
      setErrors((prev) => ({ ...prev, firstName: undefined, lastName: undefined }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    setErrors({});

    // Prefix description with selected services
    const servicesPrefix = selectedServices.length > 0 
      ? `[Dịch vụ quan tâm: ${selectedServices.join(', ')}] ` 
      : '';
    const fullDescription = servicesPrefix + formData.projectDescription;

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      budget: selectedBudget,
      projectDescription: fullDescription,
    };

    // Client-side validation
    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactInput;
        // Map projectDescription validation message directly to avoid confusing user
        if (field === 'projectDescription') {
          fieldErrors[field] = 'Vui lòng nhập mô tả chi tiết dự án (tối thiểu 10 ký tự)';
        } else {
          fieldErrors[field] = issue.message;
        }
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
      <div className="text-center py-12 px-6 flex flex-col items-center">
        <div className="size-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <svg className="size-8 text-primary" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#191c1d] mb-2">Yêu cầu đã gửi thành công!</h3>
        <p className="text-[#3d494b] text-sm max-w-sm mx-auto leading-relaxed">
          Chúng tôi đã ghi nhận yêu cầu của bạn và sẽ phản hồi trong vòng <strong>24 giờ làm việc</strong>. Cảm ơn bạn đã tin tưởng Kabo Agency!
        </p>
        <button
          onClick={() => {
            setFullName('');
            setFormData({ firstName: '', lastName: '', email: '', projectDescription: '' });
            setSelectedServices(['Website Doanh Nghiệp']);
            setSelectedBudget(7500000);
            setState('idle');
          }}
          className="mt-6 text-xs text-primary font-bold underline underline-offset-2 hover:text-[#004d56]"
        >
          Gửi thêm yêu cầu mới
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5" noValidate>
      {/* Name field */}
      <div className="flex flex-col">
        <label htmlFor="fullName" className="block font-medium text-xs text-[#191c1d] mb-1.5">
          Họ và tên *
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Nguyễn Văn A"
          value={fullName}
          onChange={handleFullNameChange}
          className={`w-full bg-[#f8fafb] border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b5f00] focus:border-transparent transition-shadow ${
            errors.firstName || errors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-[#bcc9cb]'
          }`}
          aria-invalid={!!(errors.firstName || errors.lastName)}
          aria-describedby={(errors.firstName || errors.lastName) ? 'name-error' : undefined}
        />
        {(errors.firstName || errors.lastName) && (
          <p id="name-error" className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <span>⚠</span> Vui lòng nhập đầy đủ họ và tên
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="block font-medium text-xs text-[#191c1d] mb-1.5">
          Email công việc *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="ten@company.com"
          value={formData.email}
          onChange={handleChange}
          className={`w-full bg-[#f8fafb] border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b5f00] focus:border-transparent transition-shadow ${
            errors.email ? 'border-red-500 focus:ring-red-200' : 'border-[#bcc9cb]'
          }`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <span>⚠</span> {errors.email}
          </p>
        )}
      </div>

      {/* Services checkbox tag grid */}
      <div>
        <label className="block font-medium text-xs text-[#191c1d] mb-2">
          Dịch vụ quan tâm
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SERVICES_OPTIONS.map((service) => {
            const isChecked = selectedServices.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => handleServiceChange(service)}
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 ${
                  isChecked
                    ? 'bg-[#006672]/15 border-[#006672] text-[#006672]'
                    : 'border-[#bcc9cb] text-[#3d494b] bg-white hover:border-[#006672] hover:text-[#006672]'
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Selector */}
      <div>
        <label className="block font-medium text-xs text-[#191c1d] mb-2">
          Ngân sách dự kiến
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {BUDGET_OPTIONS.map((opt) => {
            const isSelected = selectedBudget === opt.value;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedBudget(opt.value)}
                className={`py-2 rounded-lg border text-xs font-semibold transition-all duration-200 text-center ${
                  isSelected
                    ? 'bg-[#006672] border-[#006672] text-white shadow-sm'
                    : 'border-[#bcc9cb] text-[#3d494b] bg-white hover:border-[#006672]/50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Description */}
      <div className="flex flex-col">
        <label htmlFor="projectDescription" className="block font-medium text-xs text-[#191c1d] mb-1.5">
          Chi tiết dự án *
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows={3}
          placeholder="Mô tả ngắn mục tiêu, tính năng cần thiết, deadline dự kiến..."
          value={formData.projectDescription}
          onChange={handleChange}
          className={`w-full bg-[#f8fafb] border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b5f00] focus:border-transparent transition-shadow resize-none leading-relaxed ${
            errors.projectDescription ? 'border-red-500 focus:ring-red-200' : 'border-[#bcc9cb]'
          }`}
          aria-invalid={!!errors.projectDescription}
          aria-describedby={errors.projectDescription ? 'projectDescription-error' : undefined}
        />
        {errors.projectDescription && (
          <p id="projectDescription-error" className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <span>⚠</span> {errors.projectDescription}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-[#004d56] transition-all shadow-md flex justify-center items-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {state === 'submitting' ? (
          <>
            <span className="animate-spin size-4 border-2 border-white/30 border-t-white rounded-full" />
            Đang gửi...
          </>
        ) : (
          <>
            Gửi yêu cầu tư vấn
            <svg
              className="size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>

      {state === 'error' && (
        <p className="text-xs text-center text-red-500 bg-red-50 border border-red-100 rounded-lg py-2.5 px-4">
          ⚠ Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại sau hoặc liên hệ trực tiếp.
        </p>
      )}

      {/* Direct Contact Buttons (Zalo / Facebook) */}
      <div className="pt-3 border-t border-[#e2ecec] mt-2 flex flex-col sm:flex-row gap-3">
        <a
          href="https://zalo.me/0374170367"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#0068ff] hover:bg-[#0052cc] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <span>Chat Zalo (0374 170 367)</span>
        </a>
        <a
          href="https://www.facebook.com/tran.bao.28897"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#1877f2] hover:bg-[#165ebc] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <span>Facebook Cá Nhân</span>
        </a>
      </div>

      <p className="text-center text-xs text-[#3d494b] opacity-70">
        Thông tin của bạn được bảo mật tuyệt đối và chỉ dùng để liên lạc tư vấn.
      </p>
    </form>
  );
}
