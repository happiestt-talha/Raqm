"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-sm text-paper/60">RAQM</p>
        <h1 className="mt-2 text-2xl font-display uppercase text-paper">Admin login</h1>

        <form action={formAction} className="mt-8 flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="label-mono text-paper/50">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full border-0 border-b border-paper/20 bg-transparent py-2 text-sm text-paper focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="label-mono text-paper/50">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 w-full border-0 border-b border-paper/20 bg-transparent py-2 text-sm text-paper focus:border-accent focus:outline-none"
            />
          </div>

          {state.error && (
            <p className="text-sm text-accent" role="alert">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="label-mono mt-2 border border-paper bg-paper px-6 py-3 text-ink transition-colors hover:bg-accent hover:border-accent hover:text-paper disabled:opacity-50"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}