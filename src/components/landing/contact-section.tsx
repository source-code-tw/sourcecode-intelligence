"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Validate individual field
  const validateField = useCallback((name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return '請輸入您的名字';
        if (value.trim().length < 2) return '名字至少需要 2 個字元';
        return undefined;
      case 'email':
        if (!value.trim()) return '請輸入您的 Email';
        if (!EMAIL_REGEX.test(value)) return '請輸入有效的 Email 格式';
        return undefined;
      case 'message':
        if (!value.trim()) return '請輸入您的訊息';
        if (value.trim().length < 10) return '訊息至少需要 10 個字元';
        return undefined;
      default:
        return undefined;
    }
  }, []);

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (touched[name] && errors[name as keyof FormErrors]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur (validate on blur)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          message: formData.message.trim(),
          honeypot: '', // Empty honeypot field
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setServerMessage(data.message || '感謝您的來信！我們會盡快回覆您。');
        // Reset form on success
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
      } else {
        setStatus('error');
        setServerMessage(data.error || '發送失敗，請稍後再試');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setServerMessage('網路錯誤，請檢查您的連線後再試');
    }
  };

  // Reset form status after delay
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        if (status === 'success') {
          setStatus('idle');
          setServerMessage('');
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Obfuscated email to prevent scraping
  const email = ['dev', 'mnemox', 'ai'].join('@').replace('@ai', '.ai');

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative py-24 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" aria-hidden="true" />
            聯絡我們
          </span>
          <h2
            id="contact-heading"
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            有產品想法？
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            不管是一個模糊的概念，還是完整的需求文件，我們都能幫你實現。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Success Message */}
            {status === 'success' && (
              <div 
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3"
                role="alert"
                aria-live="polite"
              >
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-green-400">{serverMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <div 
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-400">{serverMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot field - hidden from users, catches bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="honeypot">Leave this field empty</label>
                <input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  名字 <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'loading'}
                  aria-required="true"
                  aria-invalid={touched.name && !!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 bg-transparent border transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20 ${
                    touched.name && errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-foreground/20 focus:border-foreground/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="你的名字"
                  maxLength={100}
                />
                {touched.name && errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'loading'}
                  aria-required="true"
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 bg-transparent border transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20 ${
                    touched.email && errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-foreground/20 focus:border-foreground/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="your@email.com"
                  maxLength={254}
                />
                {touched.email && errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  簡述你的需求 <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'loading'}
                  rows={5}
                  aria-required="true"
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                  className={`w-full px-4 py-3 bg-transparent border transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none ${
                    touched.message && errors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-foreground/20 focus:border-foreground/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="告訴我們你想做什麼..."
                  maxLength={2000}
                />
                {touched.message && errors.message ? (
                  <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.message}
                  </p>
                ) : (
                  <p id="message-hint" className="mt-1 text-xs text-muted-foreground">
                    {formData.message.length}/2000 字元
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === 'loading'}
                className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    傳送中...
                  </>
                ) : (
                  <>
                    送出
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-mono text-muted-foreground mb-2">Email</h3>
                <a 
                  href={`mailto:${email}`}
                  className="text-xl hover:text-muted-foreground transition-colors inline-flex items-center gap-2"
                >
                  {email}
                </a>
              </div>
              <div>
                <h3 className="text-sm font-mono text-muted-foreground mb-2">GitHub</h3>
                <a 
                  href="https://github.com/zychenpeng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl hover:text-muted-foreground transition-colors"
                >
                  github.com/zychenpeng
                </a>
              </div>
              <div>
                <h3 className="text-sm font-mono text-muted-foreground mb-2">地點</h3>
                <p className="text-xl">106 臺北市大安區市民大道三段198號</p>
              </div>
              
              {/* Response time */}
              <div className="pt-8 border-t border-foreground/10">
                <p className="text-sm text-muted-foreground">
                  通常會在 24 小時內回覆您的訊息。
                  <br />
                  如需緊急聯繫，請直接發送 Email。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
