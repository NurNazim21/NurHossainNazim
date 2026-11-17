'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ProjectItem } from '@/data/profile';

function RagPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Query', 'BM25 + Vector', 'VLM Parse', 'Answer'];

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(id);
  }, [shouldReduceMotion, steps.length]);

  return (
    <div className="h-full w-full flex flex-col justify-between p-4 bg-surface-subtle/60 rounded-md border border-border">
      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>hybrid_retrieval.py</span>
        <span>top_k=8</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 my-3">
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          return (
            <div
              key={step}
              className={`rounded border px-2 py-2 text-center font-mono text-[10px] transition-colors duration-200 ${
                isActive
                  ? 'border-accent bg-accent-soft text-foreground font-medium'
                  : 'border-border bg-background/60 text-muted-foreground'
              }`}
            >
              {step}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground border-t border-border pt-2">
        <span>Lexical + Dense + Vision</span>
        <span className="text-foreground">Grounded</span>
      </div>
    </div>
  );
}

function CnnPreview() {
  const shouldReduceMotion = useReducedMotion();
  const classes = [
    { label: 'Tomato Early Blight', pct: 97 },
    { label: 'Healthy Leaf', pct: 2 },
    { label: 'Septoria Leaf Spot', pct: 1 },
  ];

  return (
    <div className="h-full w-full flex flex-col justify-between p-4 bg-surface-subtle/60 rounded-md border border-border">
      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>leaf_cnn_eval.ipynb</span>
        <span className="tabular-nums text-foreground">38 classes · 87,867 imgs</span>
      </div>

      <div className="flex items-center gap-4 my-2">
        <div className="h-14 w-14 shrink-0 rounded border border-border bg-background/70 flex items-center justify-center">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M19 4C12 4 6 8.5 5 16C5 16 8.5 19 13 18C17.5 17 20 11 19 4Z"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M5 19L13 11"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex-1 space-y-2">
          {classes.map((c, idx) => (
            <div key={c.label} className="space-y-1">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-muted-foreground truncate">{c.label}</span>
                <span className="tabular-nums text-foreground">{c.pct}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-background overflow-hidden">
                <motion.div
                  initial={shouldReduceMotion ? { scaleX: c.pct / 100 } : { scaleX: 0 }}
                  whileInView={{ scaleX: c.pct / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: '0% 50%' }}
                  className={`h-full w-full ${idx === 0 ? 'bg-accent' : 'bg-muted-foreground/45'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="font-mono text-[11px] text-muted-foreground border-t border-border pt-2 flex justify-between">
        <span>TensorFlow Conv2D</span>
        <span className="text-foreground tabular-nums">97.0% Acc</span>
      </div>
    </div>
  );
}

function TankPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="h-full w-full flex flex-col justify-between p-4 bg-surface-subtle/60 rounded-md border border-border">
      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>STOMP / SockJS Arena</span>
        <span className="text-foreground">60Hz sync</span>
      </div>

      <div className="relative h-24 w-full my-2 rounded border border-border bg-background/80 overflow-hidden">
        {/* Subtle 2D tactical grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--border-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--border-strong) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Tank A */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [18, 92, 64, 18], y: [24, 18, 52, 24] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 h-5 w-6 rounded-sm border border-accent bg-accent-soft flex items-center justify-center"
        >
          <span className="h-1 w-3 bg-accent translate-x-2 rounded-full" />
        </motion.div>

        {/* Projectile pulse */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{ x: [42, 220], y: [32, 56], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-accent"
          />
        )}

        {/* Tank B */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [220, 175, 210, 220], y: [50, 58, 28, 50] }
          }
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 h-5 w-6 rounded-sm border border-foreground/60 bg-surface flex items-center justify-center"
        >
          <span className="h-1 w-3 bg-foreground/80 -translate-x-2 rounded-full" />
        </motion.div>
      </div>

      <div className="font-mono text-[11px] text-muted-foreground border-t border-border pt-2 flex justify-between">
        <span>Spring Boot · Phaser 3</span>
        <span>WebSocket</span>
      </div>
    </div>
  );
}

function EshopPreview() {
  const roles = ['Buyer', 'Vendor', 'Courier', 'Admin'];
  return (
    <div className="h-full w-full flex flex-col justify-between p-4 bg-surface-subtle/60 rounded-md border border-border">
      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>rbac_marketplace.php</span>
        <span>4 user roles</span>
      </div>

      <div className="grid grid-cols-2 gap-2 my-3">
        {roles.map((role, idx) => (
          <div
            key={role}
            className="flex items-center justify-between rounded border border-border bg-background/60 px-2.5 py-1.5 font-mono text-[10px]"
          >
            <span className="text-foreground">{role}</span>
            <span className={idx === 1 ? 'text-accent' : 'text-muted-foreground'}>
              RBAC
            </span>
          </div>
        ))}
      </div>

      <div className="font-mono text-[11px] text-muted-foreground border-t border-border pt-2 flex justify-between">
        <span>PHP · MySQL · LLM API</span>
        <span className="text-foreground">Courier Sync</span>
      </div>
    </div>
  );
}

function CampusPreview() {
  return (
    <div className="h-full w-full flex flex-col justify-between p-4 bg-surface-subtle/60 rounded-md border border-border">
      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>schema.prisma</span>
        <span>PostgreSQL</span>
      </div>

      <div className="space-y-1.5 my-3">
        <div className="flex items-center justify-between rounded border border-border bg-background/60 px-2.5 py-1.5 font-mono text-[10px]">
          <span className="text-foreground">Senior Mentorship</span>
          <span className="text-accent">Academic Help</span>
        </div>
        <div className="flex items-center justify-between rounded border border-border bg-background/60 px-2.5 py-1.5 font-mono text-[10px]">
          <span className="text-foreground">Campus Directory</span>
          <span className="text-muted-foreground">Resources</span>
        </div>
      </div>

      <div className="font-mono text-[11px] text-muted-foreground border-t border-border pt-2 flex justify-between">
        <span>Next.js · TypeScript</span>
        <span className="text-foreground">UIU Peer Network</span>
      </div>
    </div>
  );
}

export function ProjectConceptPreview({ kind }: { kind: ProjectItem['previewKind'] }) {
  switch (kind) {
    case 'rag':
      return <RagPreview />;
    case 'cnn':
      return <CnnPreview />;
    case 'tank':
      return <TankPreview />;
    case 'eshop':
      return <EshopPreview />;
    case 'campus':
      return <CampusPreview />;
  }
}
