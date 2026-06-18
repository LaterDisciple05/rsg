"use client";

import { CheckCircle2, FileText, MailCheck, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function ContactSubmitState() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div
          role="status"
          aria-live="polite"
          className="rsg-enquiry-wait relative overflow-hidden rounded-md border border-rsg-orange/25 bg-white p-4 shadow-sm"
        >
          <div className="relative z-10 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="rsg-enquiry-flow" aria-hidden="true">
              <div className="rsg-enquiry-step rsg-enquiry-step-start">
                <FileText size={18} strokeWidth={2.3} />
              </div>
              <div className="rsg-enquiry-rail">
                <span className="rsg-enquiry-packet">
                  <Send size={13} strokeWidth={2.5} />
                </span>
                <span className="rsg-enquiry-spark rsg-enquiry-spark-a" />
                <span className="rsg-enquiry-spark rsg-enquiry-spark-b" />
              </div>
              <div className="rsg-enquiry-step rsg-enquiry-step-end">
                <MailCheck size={18} strokeWidth={2.3} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="text-rsg-orange-dark"
                  size={17}
                  aria-hidden="true"
                />
                <p className="text-sm font-black text-rsg-ink">
                  Submitting your enquiry
                </p>
              </div>
              <p className="mt-1.5 text-xs font-semibold leading-5 text-rsg-muted">
                Saving your details and sending the alert to the team.
              </p>
              <div className="mt-3 flex gap-1.5" aria-hidden="true">
                <span className="rsg-enquiry-dot" />
                <span className="rsg-enquiry-dot" />
                <span className="rsg-enquiry-dot" />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-md bg-rsg-orange px-5 py-3 text-sm font-black text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-rsg-orange-dark disabled:cursor-wait disabled:bg-rsg-navy disabled:hover:translate-y-0"
      >
        {pending ? <span className="rsg-submit-button-sheen" /> : null}
        <span className="relative z-10 inline-flex items-center gap-2">
          <Send
            className={pending ? "rsg-submit-send-icon" : undefined}
            size={17}
            aria-hidden="true"
          />
          <span>{pending ? "Sending..." : "Send Enquiry"}</span>
        </span>
      </button>
    </>
  );
}
