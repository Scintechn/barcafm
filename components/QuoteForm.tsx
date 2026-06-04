"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";
import { submitQuoteRequest } from "@/app/[locale]/publicidade/actions";
import type { QuoteFormStrings } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

type Status = "idle" | "success" | "error";

export function QuoteForm({ t, locale }: { t: QuoteFormStrings; locale: Locale }) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      return;
    }
    setFieldErrors({});
    startTransition(async () => {
      try {
        const result = await submitQuoteRequest(formData);
        if (result.ok) {
          setStatus("success");
          const goal = formData.get("goal");
          track("quote_form_submit", { goal: typeof goal === "string" ? goal : "outro" });
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    });
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-200 bg-brand-50 p-8 text-center md:p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-ink-950">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-950">{t.successTitle}</h3>
        <p className="max-w-md text-sm leading-relaxed text-brand-900">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t.nameLabel} error={fieldErrors.name}>
          <input name="name" required maxLength={200} placeholder={t.namePlaceholder} className={input(!!fieldErrors.name)} />
        </Field>
        <Field label={t.businessLabel} error={fieldErrors.business}>
          <input name="business" required maxLength={200} placeholder={t.businessPlaceholder} className={input(!!fieldErrors.business)} />
        </Field>
        <Field label={t.phoneLabel} error={fieldErrors.phone}>
          <input name="phone" type="tel" maxLength={50} placeholder={t.phonePlaceholder} className={input(!!fieldErrors.phone)} />
        </Field>
        <Field label={t.emailLabel} error={fieldErrors.email}>
          <input name="email" type="email" required maxLength={200} placeholder={t.emailPlaceholder} className={input(!!fieldErrors.email)} />
        </Field>
      </div>

      <Field label={t.goalLabel} error={fieldErrors.goal}>
        <select name="goal" required defaultValue="" className={input(!!fieldErrors.goal)}>
          <option value="" disabled>{t.goalPlaceholder}</option>
          {t.goalOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </Field>

      <Field label={t.messageLabel} error={fieldErrors.message}>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder={t.messagePlaceholder}
          className={input(!!fieldErrors.message, "resize-y min-h-32")}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-700 dark:text-ink-300">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-500 dark:border-ink-600" />
        <span>
          {t.consentLabel}{" "}
          <Link href={`/${locale}/privacidade`} className="text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-900 dark:text-brand-300 dark:decoration-brand-400 dark:hover:text-brand-200">
            {t.consentLinkText}
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold">{t.errorTitle}</p>
            <p>{Object.keys(fieldErrors).length > 0 ? t.validationError : t.errorBody}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-7 font-semibold text-ink-950 transition-all hover:bg-brand-400 active:scale-[0.99] disabled:opacity-60",
          "focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 self-start"
        )}
      >
        {pending ? t.submitting : t.submit}
        {!pending && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink-800 dark:text-ink-200">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600 dark:text-red-400">{error}</span>}
    </label>
  );
}

function input(hasError: boolean, extra = "") {
  return cn(
    "h-12 rounded-xl border bg-white px-4 text-base text-ink-900 outline-none transition-colors",
    "placeholder:text-ink-400",
    "dark:bg-ink-900 dark:text-white dark:placeholder:text-ink-500",
    hasError
      ? "border-red-400 focus:border-red-500 dark:border-red-500/60"
      : "border-ink-200 focus:border-brand-500 dark:border-ink-700",
    extra
  );
}

function validate(fd: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = String(fd.get("name") || "").trim();
  const business = String(fd.get("business") || "").trim();
  const email = String(fd.get("email") || "").trim();
  const message = String(fd.get("message") || "").trim();
  const goal = String(fd.get("goal") || "").trim();
  const consent = fd.get("consent");

  if (!name) errors.name = "required";
  if (!business) errors.business = "required";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "invalid";
  if (!goal) errors.goal = "required";
  if (message.length < 10) errors.message = "too_short";
  if (!consent) errors.consent = "required";
  return errors;
}
