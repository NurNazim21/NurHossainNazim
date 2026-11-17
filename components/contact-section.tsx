'use client';

import React, { useState } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { profile } from '@/data/profile';
import { RevealSection, MagneticWrapper } from '@/components/motion-primitives';
import { Button } from '@/components/ui/button';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormState>('idle');
  const [feedback, setFeedback] = useState('');
  const [copied, setCopied] = useState(false);

  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('error');
      setFeedback('All three fields (--name, --email, --message) are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    if (!web3formsKey) {
      // Graceful mailto fallback when NEXT_PUBLIC_WEB3FORMS_KEY is not yet configured
      const subject = encodeURIComponent(`Portfolio Inquiry from ${trimmedName}`);
      const body = encodeURIComponent(
        `From: ${trimmedName} (${trimmedEmail})\n\n${trimmedMessage}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setFeedback(
        'Opened your default mail client with a pre-filled draft. Configure NEXT_PUBLIC_WEB3FORMS_KEY for silent in-page delivery.'
      );
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          subject: `Portfolio Message from ${trimmedName}`,
          from_name: 'Nur Hossain Nazim Portfolio',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFeedback('200 OK — Message transmitted. I will respond shortly.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setFeedback(data.message || 'Submission failed. Please email me directly.');
      }
    } catch {
      setStatus('error');
      setFeedback('Network error while contacting Web3Forms. Please email me directly.');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28"
    >
      <RevealSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-muted-foreground mb-3">
              06. Contact
            </p>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance"
            >
              Start a <span className="font-editorial-italic text-accent">conversation</span>.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Looking for AI, Machine Learning, or Data Science internship and entry-level
              opportunities, as well as collaborative research or engineering projects.
            </p>

            <div className="mt-8 space-y-3 border-t border-border pt-6 font-mono text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Direct Email</span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  <span>{profile.email}</span>
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Phone</span>
                <span className="tabular-nums text-foreground">{profile.phone}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Base</span>
                <span className="text-foreground">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Terminal-Styled Contact Form (message.sh) */}
          <div className="lg:col-span-7 rounded-lg border border-border bg-surface overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-surface-subtle/60 px-4 py-3 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-accent/80" aria-hidden="true" />
                <span className="text-foreground">message.sh</span>
              </div>
              <span>bash · Web3Forms</span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="p-6 md:p-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs text-muted-foreground mb-2"
                  >
                    $ --name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full h-11 rounded-md border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs text-muted-foreground mb-2"
                  >
                    $ --email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full h-11 rounded-md border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs text-muted-foreground mb-2"
                >
                  $ --message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share role details, research topic, or project inquiry..."
                  className="w-full rounded-md border border-border bg-background px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors resize-y"
                />
              </div>

              {feedback && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className={`rounded-md border px-4 py-3 font-mono text-xs ${
                    status === 'success'
                      ? 'border-border-strong bg-background text-foreground'
                      : 'border-accent bg-accent-soft text-foreground'
                  }`}
                >
                  {feedback}
                </motion.div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Open mail app instead</span>
                </a>

                <MagneticWrapper>
                  <Button type="submit" variant="accent" size="lg" disabled={status === 'submitting'}>
                    <Send className="h-3.5 w-3.5" />
                    <span>{status === 'submitting' ? 'Sending...' : 'Run message.sh'}</span>
                  </Button>
                </MagneticWrapper>
              </div>
            </form>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
