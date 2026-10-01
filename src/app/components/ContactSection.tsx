'use client';

import { useEffect, useState, FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SUCCESS_DISMISS_MS = 6000;

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  useEffect(() => {
    if (submitStatus !== 'success') return;

    const timeout = window.setTimeout(() => setSubmitStatus(null), SUCCESS_DISMISS_MS);
    return () => window.clearTimeout(timeout);
  }, [submitStatus]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorDetail(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      description: formData.get('description'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setErrorDetail(typeof body?.detail === 'string' ? body.detail : null);
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      e.currentTarget.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSuccess = submitStatus === 'success';

  return (
    <>
    <div className="flex flex-col lg:flex-row justify-between mt-8 lg:mt-[17rem] px-4 sm:px-6 lg:px-8 mb-20">
      <div className="flex-1 mb-8 lg:mb-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl">
          CONTACT US
        </h2>
      </div>
      <div className="flex-1 flex flex-col items-center max-w-4xl mx-auto lg:mx-0 lg:px-20">
        <p className="text-sm sm:text-base text-center lg:text-left w-full lg:w-[85%] mb-6">
          {`LET US KNOW WHAT YOU'RE LOOKING FOR ↴ AND WE'LL BE IN TOUCH.`}
        </p>

        <form onSubmit={handleSubmit} className="w-full lg:w-[85%] space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              name="firstName"
              className="flex-1 border border-gray-400 px-4 py-3 text-sm sm:text-base"
              placeholder="FIRST NAME"
              type="text"
              required
            />
            <input
              name="lastName"
              className="flex-1 border border-gray-400 px-4 py-3 text-sm sm:text-base"
              placeholder="LAST NAME"
              type="text"
              required
            />
          </div>

          <input
            name="email"
            className="w-full border border-gray-400 px-4 py-3 text-sm sm:text-base"
            placeholder="EMAIL"
            type="email"
            required
          />

          <input
            name="phone"
            className="w-full border border-gray-400 px-4 py-3 text-sm sm:text-base"
            placeholder="PHONE (OPTIONAL)"
            type="tel"
          />

          <input
            name="subject"
            className="w-full border border-gray-400 px-4 py-3 text-sm sm:text-base"
            placeholder="SUBJECT"
            type="text"
            required
          />

          <textarea
            name="description"
            className="w-full border border-gray-400 px-4 py-3 h-32 sm:h-40 text-sm sm:text-base"
            placeholder="DESCRIPTION"
            required
          ></textarea>

          <button
            className="w-full sm:w-[200px] py-2 px-6 bg-[#00FF7F] hover:bg-[#00E673] text-black font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SENDING...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>

    <AnimatePresence>
      {submitStatus && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
          <motion.div
            key={submitStatus}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`pointer-events-auto flex w-full max-w-md items-start gap-4 border bg-black/90 px-5 py-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm ${
              isSuccess ? 'border-[#00FF7F]' : 'border-red-400'
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className={`text-xs font-bold tracking-[0.18em] ${isSuccess ? 'text-[#00FF7F]' : 'text-red-300'}`}>
                {isSuccess ? 'MESSAGE SENT' : 'NOT SENT'}
              </p>
              <p className="mt-1 text-sm sm:text-base">
                {isSuccess
                  ? "We'll get back to you soon."
                  : 'Something went wrong. Please try again.'}
              </p>
              {!isSuccess && errorDetail && (
                <p className="mt-2 break-words text-xs text-white/70">{errorDetail}</p>
              )}
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setSubmitStatus(null)}
              className="shrink-0 text-lg leading-none text-white/70 transition-colors hover:text-white"
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
};
