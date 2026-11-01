"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IBM_Plex_Mono } from "next/font/google";
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  BUDGETS,
  PROJECT_TYPES,
  SOURCES,
  TIMELINES,
  labelFor,
  type ProjectBrief,
} from "@/utils/projectBrief";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

type Answers = Partial<ProjectBrief>;
type Option = { readonly value: string; readonly label: string };
type InputKind = "choice" | "text" | "email" | "textarea" | "review";

interface Step {
  id: string;
  field?: keyof ProjectBrief;
  input: InputKind;
  prompt: (answers: Answers) => string[];
  options?: readonly Option[];
  optional?: boolean;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
  react?: (value: string, answers: Answers) => string | null;
  showIf?: (answers: Answers) => boolean;
}

interface Message {
  id: number;
  role: "assistant" | "user" | "summary";
  text: string;
  typed: boolean;
}

interface Snapshot {
  messages: Message[];
  answers: Answers;
  stepIndex: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const firstName = (name = "") => name.trim().split(/\s+/)[0] ?? "";

const STEPS: Step[] = [
  {
    id: "project",
    field: "projectType",
    input: "choice",
    options: PROJECT_TYPES,
    prompt: () => [
      "Hey, welcome to Halley Cinema.",
      "I’ll ask you a few quick questions so Alejandro can come back with something concrete instead of a generic quote. It takes about a minute.",
      "First things first: what are we making?",
    ],
    react: (value) =>
      ({
        commercial: "A brand film. Those live or die on the idea, so let’s get it right.",
        "music-video": "Music videos are where we get to play the most. Nice.",
        documentary: "Real stories. Those deserve time and care.",
        social: "Short-form, high rhythm. Got it.",
        post: "Got it, you have footage and need it shaped.",
      })[value] ?? null,
  },
  {
    id: "project-other",
    field: "projectOther",
    input: "text",
    showIf: (answers) => answers.projectType === "other",
    placeholder: "A short description",
    prompt: () => ["Tell me in a few words what you have in mind."],
    react: () => "Interesting. Let’s keep going.",
  },
  {
    id: "budget",
    field: "budget",
    input: "choice",
    options: BUDGETS,
    hint: "A range is fine. It helps me propose something realistic.",
    prompt: () => ["What budget are you working with?"],
    react: (value) =>
      value === "unsure"
        ? "No problem. We can shape the scope together."
        : value === "under-2k"
          ? "Thanks for being upfront, that helps me suggest what’s realistic."
          : "Perfect, that gives me a clear frame.",
  },
  {
    id: "timeline",
    field: "timeline",
    input: "choice",
    options: TIMELINES,
    prompt: () => ["And when do you need it?"],
    react: (value) =>
      value === "under-1m"
        ? "Tight, but noted. I’ll flag it as urgent."
        : value === "flexible"
          ? "No fixed date means more room to get it right."
          : "Good, that’s a comfortable window.",
  },
  {
    id: "idea",
    field: "idea",
    input: "textarea",
    hint: "Rough notes are perfect.",
    placeholder: "Write freely…",
    prompt: () => [
      "Tell me about the idea: the brand, the goal, where it will be seen. Whatever you have so far.",
    ],
    react: () => "Thanks, that’s really useful.",
  },
  {
    id: "name",
    field: "name",
    input: "text",
    placeholder: "Your name",
    autoComplete: "name",
    prompt: () => ["What’s your name?"],
    react: (value) => `Nice to meet you, ${firstName(value)}.`,
  },
  {
    id: "email",
    field: "email",
    input: "email",
    placeholder: "you@email.com",
    autoComplete: "email",
    prompt: () => ["Where should I send my reply?"],
  },
  {
    id: "company",
    field: "company",
    input: "text",
    optional: true,
    placeholder: "Website, Instagram, past work…",
    prompt: () => ["Is there a brand, company or link I should look at before we talk?"],
  },
  {
    id: "source",
    field: "source",
    input: "choice",
    options: SOURCES,
    optional: true,
    prompt: () => ["Last one: how did you find Halley?"],
  },
  {
    id: "review",
    input: "review",
    prompt: (answers) => [`That’s everything, ${firstName(answers.name)}. Here’s the brief I’ll send:`],
  },
];

const REVIEW_INDEX = STEPS.length - 1;
const isVisible = (step: Step, answers: Answers) => !step.showIf || step.showIf(answers);

function nextStepIndex(from: number, answers: Answers) {
  let index = from + 1;
  while (index < REVIEW_INDEX && !isVisible(STEPS[index], answers)) index += 1;
  return index;
}

let messageId = 0;
const assistant = (text: string): Message => ({ id: ++messageId, role: "assistant", text, typed: false });
const user = (text: string): Message => ({ id: ++messageId, role: "user", text, typed: true });

function promptMessages(step: Step, answers: Answers): Message[] {
  const lines = step.prompt(answers).map(assistant);
  if (step.input === "review") lines.push({ id: ++messageId, role: "summary", text: "", typed: false });
  return lines;
}

/* ───────────────────────────── Pieces ───────────────────────────── */

const TypingDots = () => (
  <span className="inline-flex h-[27px] items-center gap-[5px]" aria-hidden>
    {[0, 1, 2].map((dot) => (
      <motion.span
        key={dot}
        className="block h-[6px] w-[6px] rounded-full bg-white/70"
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: dot * 0.16, ease: "easeInOut" }}
      />
    ))}
  </span>
);

function Typewriter({ text, delay, onDone }: { text: string; delay: number; onDone: () => void }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState<number | null>(null);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduced) {
      setShown(text.length);
      const timeout = window.setTimeout(() => doneRef.current(), 0);
      return () => window.clearTimeout(timeout);
    }

    let interval: number | undefined;
    let finish: number | undefined;
    const perTick = Math.max(1, Math.ceil(text.length / 55));
    const timeout = window.setTimeout(() => {
      let count = 0;
      setShown(0);
      interval = window.setInterval(() => {
        count = Math.min(text.length, count + perTick);
        setShown(count);
        if (count >= text.length) {
          window.clearInterval(interval);
          finish = window.setTimeout(() => doneRef.current(), 160);
        }
      }, 18);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
      window.clearTimeout(finish);
    };
  }, [text, delay, reduced]);

  return (
    <>
      <span className="sr-only">{text}</span>
      {shown === null ? (
        <TypingDots />
      ) : (
        <span aria-hidden>
          {text.slice(0, shown)}
          {shown < text.length && (
            <span className="ml-[2px] inline-block h-[1.05em] w-[7px] translate-y-[3px] bg-[#00FF7F]" />
          )}
        </span>
      )}
    </>
  );
}

const Avatar = ({ hidden }: { hidden: boolean }) => (
  <div
    className={`mt-[1px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] ${
      hidden ? "invisible" : ""
    }`}
    aria-hidden
  >
    <Image src="/logo_green_solo.svg" alt="" width={16} height={16} className="h-4 w-4" />
  </div>
);

function Summary({ answers }: { answers: Answers }) {
  const project =
    answers.projectType === "other" && answers.projectOther
      ? answers.projectOther
      : labelFor(PROJECT_TYPES, answers.projectType);

  const rows: [string, string | undefined][] = [
    ["Project", project],
    ["Budget", labelFor(BUDGETS, answers.budget)],
    ["Timeline", labelFor(TIMELINES, answers.timeline)],
    ["Name", answers.name],
    ["Email", answers.email],
    ["Brand / link", answers.company || undefined],
    ["Found via", labelFor(SOURCES, answers.source)],
  ];

  return (
    <div className="w-full max-w-[560px] rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <dl className="grid grid-cols-[96px_1fr] gap-x-4 gap-y-3 sm:grid-cols-[120px_1fr]">
        {rows
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label} className="contents">
              <dt className={`${mono.className} pt-[3px] text-[11px] uppercase tracking-[0.08em] text-white/40`}>
                {label}
              </dt>
              <dd className="min-w-0 break-words text-[15px] text-white/90">{value}</dd>
            </div>
          ))}
      </dl>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className={`${mono.className} text-[11px] uppercase tracking-[0.08em] text-white/40`}>The idea</p>
        <p className="mt-2 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-white/80">
          {answers.idea}
        </p>
      </div>
    </div>
  );
}

const chipBase =
  "group inline-flex min-h-11 items-center gap-3 rounded-full border border-white/15 bg-white/[0.02] py-2 pr-5 text-left text-[15px] text-white/90 transition-[background-color,border-color,transform] duration-200 hover:border-white/40 hover:bg-white/[0.06] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FF7F]";

const quietButtonClass = `${mono.className} inline-flex min-h-11 items-center rounded-full px-3 text-xs uppercase tracking-[0.08em] text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#00FF7F]`;

/* ───────────────────────────── Chat ───────────────────────────── */

type Status = "idle" | "sending" | "sent" | "error";

export function ProjectChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement & HTMLInputElement>(null);
  const pinned = useRef(true);

  const step = STEPS[stepIndex];
  const firstPending = messages.findIndex((message) => !message.typed);
  const ready = firstPending === -1 && messages.length > 0 && status !== "sending";
  const visibleMessages = firstPending === -1 ? messages : messages.slice(0, firstPending + 1);
  const lastUser = messages.findLastIndex((message) => message.role === "user");

  const totalSteps = STEPS.slice(0, REVIEW_INDEX).filter((s) => isVisible(s, answers)).length;
  const position = Math.min(history.length + 1, totalSteps);
  const progress = stepIndex === REVIEW_INDEX ? 1 : history.length / totalSteps;

  const start = useCallback(() => {
    startedAt.current = Date.now();
    setAnswers({});
    setStepIndex(0);
    setHistory([]);
    setDraft("");
    setError(null);
    setStatus("idle");
    setMessages(promptMessages(STEPS[0], {}));
  }, []);

  useEffect(start, [start]);

  // Keep the newest line in view while it types, unless the reader scrolled up.
  useLayoutEffect(() => {
    const el = scroller.current;
    const inner = content.current;
    if (!el || !inner) return;

    // Judge "near the bottom" against the layout before this change, so growth itself never unpins.
    let lastScrollHeight = el.scrollHeight;
    let lastClientHeight = el.clientHeight;
    const observer = new ResizeObserver(() => {
      const gap = lastScrollHeight - el.scrollTop - lastClientHeight;
      if (pinned.current || gap < 120) el.scrollTop = el.scrollHeight;
      pinned.current = false;
      lastScrollHeight = el.scrollHeight;
      lastClientHeight = el.clientHeight;
    });

    observer.observe(inner);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const markTyped = useCallback((id: number) => {
    setMessages((current) =>
      current.map((message) => (message.id === id ? { ...message, typed: true } : message))
    );
  }, []);

  const isTextStep = ready && ["text", "email", "textarea"].includes(step.input) && status === "idle";

  useEffect(() => {
    if (isTextStep) field.current?.focus({ preventScroll: true });
  }, [isTextStep, stepIndex]);

  const answer = useCallback(
    (value: string, display: string) => {
      if (!step.field) return;

      pinned.current = true;
      const nextAnswers = { ...answers, [step.field]: value };
      const nextIndex = nextStepIndex(stepIndex, nextAnswers);
      const reaction = value ? step.react?.(value, nextAnswers) : null;

      setHistory((current) => [...current, { messages, answers, stepIndex }]);
      setAnswers(nextAnswers);
      setStepIndex(nextIndex);
      setDraft("");
      setError(null);
      setMessages([
        ...messages,
        user(display),
        ...(reaction ? [assistant(reaction)] : []),
        ...promptMessages(STEPS[nextIndex], nextAnswers),
      ]);
    },
    [answers, messages, step, stepIndex]
  );

  const back = () => {
    const previous = history.at(-1);
    if (!previous) return;
    setHistory((current) => current.slice(0, -1));
    setMessages(previous.messages);
    setAnswers(previous.answers);
    setStepIndex(previous.stepIndex);
    const previousField = STEPS[previous.stepIndex].field;
    setDraft((previousField && answers[previousField]) || "");
    setError(null);
  };

  const submitText = () => {
    const value = draft.trim();
    if (!value) {
      if (step.optional) answer("", "Skip");
      return;
    }
    if (step.input === "email" && !EMAIL_PATTERN.test(value)) {
      setError("That email doesn’t look right. Mind checking it?");
      return;
    }
    answer(value, value);
  };

  const send = async () => {
    pinned.current = true;
    setStatus("sending");
    setMessages((current) => [...current, user("Send it")]);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          website: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - startedAt.current,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(typeof body?.detail === "string" ? body.detail : "");
      }

      setStatus("sent");
      setMessages((current) => [
        ...current,
        assistant(`Sent. Your brief is in Alejandro’s inbox, and the reply will go to ${answers.email}.`),
        assistant("In the meantime, have a look at some of the work."),
      ]);
    } catch (err) {
      const detail = err instanceof Error && err.message ? ` (${err.message})` : "";
      setStatus("error");
      setMessages((current) => [
        ...current,
        assistant(`Hmm, that didn’t go through${detail}. Your answers are still here, so you can try again.`),
      ]);
    }
  };

  // Number keys pick an option, like a terminal menu.
  useEffect(() => {
    if (!ready || step.input !== "choice" || status !== "idle") return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea") || event.metaKey || event.ctrlKey || event.altKey) return;
      const option = step.options?.[Number(event.key) - 1];
      if (option) answer(option.value, option.label);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer, ready, status, step]);

  const onFieldKeyDown = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (step.input === "textarea" && coarse) return;
    event.preventDefault();
    submitText();
  };

  const autosize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  return (
    <section
      aria-label="Start a project"
      className="relative flex h-[100dvh] min-h-[560px] flex-col overflow-hidden bg-[#0A0A0A] pt-20 text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(0,255,127,0.07),transparent_70%)]"
      />

      {/* Status bar */}
      <div className="relative z-10 mx-auto w-full max-w-[760px] px-4 pt-6 sm:px-6">
        <div className={`${mono.className} flex items-center justify-between text-[11px] uppercase tracking-[0.1em]`}>
          <span className="flex items-center gap-2 text-white/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FF7F] opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FF7F]" />
            </span>
            Halley / New project
          </span>
          <span className="tabular-nums text-white/40" aria-live="off">
            {status === "sent"
              ? "Sent"
              : stepIndex === REVIEW_INDEX
                ? "Review"
                : `${String(position).padStart(2, "0")} / ${String(totalSteps).padStart(2, "0")}`}
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-white/10">
          <motion.div
            className="h-px bg-[#00FF7F]"
            initial={false}
            animate={{ width: `${(status === "sent" ? 1 : progress) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Conversation */}
      <div
        ref={scroller}
        className="relative flex-1 overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent,black_40px,black_calc(100%_-_24px),transparent)]"
      >
        <div
          ref={content}
          role="log"
          aria-live="polite"
          aria-label="Conversation"
          className="mx-auto flex max-w-[760px] flex-col gap-5 px-4 pt-10 pb-8 sm:px-6"
        >
          {visibleMessages.map((message, index) => {
            const dim = index < lastUser ? "opacity-45" : "opacity-100";
            const groupStart = index === 0 || visibleMessages[index - 1].role === "user";

            if (message.role === "user") {
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={`flex justify-end transition-opacity duration-500 ${dim}`}
                >
                  <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-3xl bg-white/[0.09] px-4 py-2.5 text-[16px] leading-relaxed text-white sm:max-w-[70%]">
                    <span className="sr-only">You: </span>
                    {message.text}
                  </p>
                </motion.div>
              );
            }

            return (
              <div key={message.id} className={`flex gap-3 transition-opacity duration-500 sm:gap-4 ${dim}`}>
                <Avatar hidden={!groupStart} />
                <div className="min-w-0 flex-1 pt-[2px] text-[16px] leading-[1.65] text-white/90 sm:text-[17px]">
                  {message.role === "summary" ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
                      onAnimationComplete={() => markTyped(message.id)}
                    >
                      <Summary answers={answers} />
                    </motion.div>
                  ) : message.typed ? (
                    message.text
                  ) : (
                    <Typewriter
                      text={message.text}
                      delay={groupStart ? 650 : 260 + Math.min(message.text.length * 4, 400)}
                      onDone={() => markTyped(message.id)}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {status === "sending" && (
            <div className="flex gap-3 sm:gap-4">
              <Avatar hidden={false} />
              <TypingDots />
              <span className="sr-only">Sending…</span>
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="relative z-10 mx-auto w-full max-w-[760px] px-4 pt-2 pb-[max(16px,env(safe-area-inset-bottom))] sm:px-6">
        <input
          ref={honeypot}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <div className="flex min-h-[132px] flex-col justify-end">
          <AnimatePresence mode="wait">
            {ready && (
              <motion.div
                key={`${stepIndex}-${status}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6, transition: { duration: 0.12 } }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-3 flex min-h-11 items-center justify-between gap-3">
                  <p className={`${mono.className} text-[11px] uppercase tracking-[0.08em] text-white/45`}>
                    {status === "sent"
                      ? "Brief sent"
                      : status === "error"
                        ? "Not sent"
                        : step.input === "review"
                          ? "Ready when you are"
                          : step.hint ??
                            (step.input === "choice" ? "Pick one, or press its number" : step.optional ? "Optional" : "")}
                  </p>
                  <div className="flex items-center">
                    {status === "idle" && step.optional && (
                      <button type="button" className={quietButtonClass} onClick={() => answer("", "Skip")}>
                        Skip
                      </button>
                    )}
                    {status === "idle" && history.length > 0 && (
                      <button type="button" className={quietButtonClass} onClick={back}>
                        ← Back
                      </button>
                    )}
                  </div>
                </div>

                {status === "sent" ? (
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/portfolio"
                      className="inline-flex min-h-12 items-center rounded-full bg-white px-6 text-[15px] font-bold text-black transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FF7F]"
                    >
                      See the portfolio ↗
                    </Link>
                    <Link href="/" className={`${chipBase} pl-5`}>
                      Back to home
                    </Link>
                  </div>
                ) : step.input === "review" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={send}
                      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#00FF7F] px-6 text-[15px] font-bold text-black transition-[background-color,transform] hover:bg-[#3bff9c] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {status === "error" ? "Try again" : "Send my brief"} <span aria-hidden>↗</span>
                    </button>
                    <button type="button" onClick={start} className={`${chipBase} pl-5`}>
                      Start over
                    </button>
                  </div>
                ) : step.input === "choice" ? (
                  <div className="flex flex-wrap gap-2" role="group" aria-label={step.prompt(answers).at(-1)}>
                    {step.options?.map((option, i) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`${chipBase} pl-2.5`}
                        onClick={() => answer(option.value, option.label)}
                      >
                        <span
                          aria-hidden
                          className={`${mono.className} flex h-6 w-6 items-center justify-center rounded-full border border-white/15 text-[11px] text-white/50 transition-colors group-hover:border-[#00FF7F]/60 group-hover:text-[#00FF7F]`}
                        >
                          {i + 1}
                        </span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      submitText();
                    }}
                    className={`flex items-end gap-2 rounded-[28px] border bg-[#161616] py-2 pr-2 pl-5 transition-colors focus-within:border-white/30 ${
                      error ? "border-red-400/60" : "border-white/10"
                    }`}
                  >
                    <label htmlFor="chat-field" className="sr-only">
                      {step.prompt(answers).at(-1)}
                    </label>
                    {step.input === "textarea" ? (
                      <textarea
                        id="chat-field"
                        ref={field}
                        rows={1}
                        value={draft}
                        maxLength={4000}
                        placeholder={step.placeholder}
                        onChange={(event) => {
                          setDraft(event.target.value);
                          autosize(event.target);
                        }}
                        onKeyDown={onFieldKeyDown}
                        className="max-h-[200px] min-h-[40px] flex-1 resize-none bg-transparent py-2 text-[16px] leading-[1.5] text-white outline-none placeholder:text-white/35"
                      />
                    ) : (
                      <input
                        id="chat-field"
                        ref={field}
                        type={step.input === "email" ? "email" : "text"}
                        inputMode={step.input === "email" ? "email" : "text"}
                        autoComplete={step.autoComplete ?? "off"}
                        value={draft}
                        maxLength={300}
                        placeholder={step.placeholder}
                        aria-invalid={!!error}
                        aria-describedby={error ? "chat-error" : undefined}
                        onChange={(event) => {
                          setDraft(event.target.value);
                          setError(null);
                        }}
                        onKeyDown={onFieldKeyDown}
                        className="h-10 min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/35"
                      />
                    )}
                    <button
                      type="submit"
                      aria-label="Send answer"
                      disabled={!draft.trim() && !step.optional}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-[background-color,opacity,transform] hover:bg-[#00FF7F] active:scale-95 disabled:bg-white/15 disabled:text-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FF7F]"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </form>
                )}

                {error && (
                  <p id="chat-error" role="alert" className="mt-2 pl-5 text-sm text-red-300">
                    {error}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className={`${mono.className} mt-3 text-center text-[10.5px] uppercase tracking-[0.08em] text-white/30`}>
          Your answers go straight to Alejandro’s inbox
        </p>
      </div>
    </section>
  );
}
