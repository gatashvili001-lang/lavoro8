import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

const CLIENT_TOKEN = import.meta.env.VITE_PADDLE_CLIENT_TOKEN ?? "";
const ENV = (import.meta.env.VITE_PADDLE_ENV ?? "production") as "sandbox" | "production";

let _paddle: Paddle | null = null;
const listeners: Array<(p: Paddle) => void> = [];

// Singleton — initialize once across the app
if (CLIENT_TOKEN) {
  initializePaddle({
    token: CLIENT_TOKEN,
    environment: ENV,
    eventCallback(event) {
      if (event.name === "checkout.error") {
        console.error("[Paddle] checkout.error:", event);
      } else {
        console.log("[Paddle] event:", event.name, event);
      }
    },
  }).then((p) => {
    if (p) {
      console.log("[Paddle] initialized OK, env:", ENV, "token:", CLIENT_TOKEN.slice(0, 12) + "...");
      _paddle = p;
      listeners.forEach((fn) => fn(p));
      listeners.length = 0;
    } else {
      console.error("[Paddle] initializePaddle returned null — check token/env");
    }
  }).catch((err) => {
    console.error("[Paddle] init error:", err);
  });
} else {
  console.warn("[Paddle] VITE_PADDLE_CLIENT_TOKEN is not set");
}

export function usePaddle(): Paddle | null {
  const [paddle, setPaddle] = useState<Paddle | null>(_paddle);
  useEffect(() => {
    if (_paddle) { setPaddle(_paddle); return; }
    listeners.push(setPaddle);
    return () => { const i = listeners.indexOf(setPaddle); if (i > -1) listeners.splice(i, 1); };
  }, []);
  return paddle;
}

interface OpenCheckoutOptions {
  priceId: string;
  email?: string;
  successUrl?: string;
}

export function openPaddleCheckout(paddle: Paddle, opts: OpenCheckoutOptions) {
  paddle.Checkout.open({
    items: [{ priceId: opts.priceId, quantity: 1 }],
    settings: {
      variant: "one-page",
      successUrl: opts.successUrl ?? `${window.location.origin}/premium/success`,
    },
    ...(opts.email ? { customer: { email: opts.email } } : {}),
  });
}
