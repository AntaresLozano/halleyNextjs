'use client';

import { useState, FormEvent } from 'react';

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

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

  return (
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

        {submitStatus === 'success' && (
          <div className="w-full lg:w-[85%] mb-4 p-4 bg-green-100 text-green-700 rounded">
            {`Message sent successfully! We'll get back to you soon.`}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="w-full lg:w-[85%] mb-4 p-4 bg-red-100 text-red-700 rounded">
            Failed to send message. Please try again later.
          </div>
        )}

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
  );
};
