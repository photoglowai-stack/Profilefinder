"use client";

type TrustService = "dating" | "following" | "facetrace" | "fidelity";

interface TrustPanelProps {
  service: TrustService;
  step?: number;
  className?: string;
}

const datingStepProof: Record<number, { type: "rating" | "stat" | "quote"; top: string; bottom?: string }> = {
  1: {
    type: "rating",
    top: "4.7/5 for name-based dating searches",
    bottom: "\"The first name search was enough to start.\" - M.",
  },
  2: {
    type: "stat",
    top: "Age filters narrow matches in 120+ countries",
    bottom: "Most searches complete in under 2 minutes.",
  },
  3: {
    type: "stat",
    top: "City scans help catch hidden travel profiles",
    bottom: "Paris, London and NYC are checked thousands of times weekly.",
  },
  4: {
    type: "quote",
    top: "\"The photo step made the match obvious.\" - A.",
    bottom: "Optional, private, never reused.",
  },
  5: {
    type: "stat",
    top: "Scanning dating signals across public profile patterns",
    bottom: "Private report generation in progress.",
  },
  6: {
    type: "stat",
    top: "140,000+ users worldwide started a dating-app check",
    bottom: "4.5/5 based on 1,572 reviews.",
  },
};

export function TrustPanel({ service, step, className = "" }: TrustPanelProps) {
  if (service === "dating") {
    const proof = datingStepProof[step ?? 0] ?? {
      type: "rating",
      top: "4.5/5 based on 1,572 reviews",
      bottom: "140,000+ people worldwide used dating-app checks to get clarity.",
    };

    return (
      <div className={`mt-3 px-2 text-center ${className}`}>
        {proof.type === "rating" ? (
          <p className="mx-auto max-w-[330px] text-sm font-bold leading-5 text-slate-900">
            <span className="text-amber-400">★★★★★</span>{" "}
            <span className="text-rose-500">{proof.top.split(" ")[0]}</span>{" "}
            {proof.top.split(" ").slice(1).join(" ")}
          </p>
        ) : proof.type === "quote" ? (
          <p className="mx-auto max-w-[330px] text-sm font-bold italic leading-5 text-slate-900">
            {proof.top}
          </p>
        ) : (
          <p className="mx-auto max-w-[330px] text-sm font-bold leading-5 text-slate-900">
            <span className="text-rose-500">{proof.top.split(" ")[0]}</span>{" "}
            {proof.top.split(" ").slice(1).join(" ")}
          </p>
        )}
        {proof.bottom ? (
          <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{proof.bottom}</p>
        ) : null}
      </div>
    );
  }

  if (service === "following") {
    return (
      <div className={`mt-3 px-2 text-center ${className}`}>
        <p className="mx-auto max-w-[330px] text-sm font-bold leading-6 text-slate-900">
          <span className="text-rose-500">88,000+</span> social activity checks started this month.
        </p>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          Most users check new follows before asking difficult questions.
        </p>
      </div>
    );
  }

  if (service === "facetrace") {
    return (
      <div className={`mt-3 px-2 text-center ${className}`}>
        <p className="mx-auto max-w-[330px] text-sm font-bold italic leading-6 text-slate-900">
          "The photo check helped me verify the profile before meeting." - A.
        </p>
        <p className="mt-1 text-xs font-semibold text-rose-500">
          95,000+ private face scans worldwide
        </p>
      </div>
    );
  }

  return (
    <div className={`mt-3 px-2 text-center ${className}`}>
      <p className="mx-auto max-w-[330px] text-sm font-bold leading-5 text-slate-900">
        <span className="text-amber-400">★★★★★</span>{" "}
        <span className="text-rose-500">4.6/5</span> based on 1,184 chat reviews
      </p>
      <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
        <span className="text-rose-500">58</span> private fidelity checks launched today
      </p>
    </div>
  );
}
