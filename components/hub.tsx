'use client'

import type { ComponentType, ReactNode, SVGProps } from 'react'
import { assetPath } from '@/lib/asset-path'
import {
  TRIVIA_PASS_SCORE,
  TRIVIA_QUESTION_COUNT,
  TRIVIA_TIME_LIMIT,
  POSE_PASS_SCORE,
} from '@/lib/games-data'

type TaskStatus = {
  game1: boolean
  game2: boolean
  followedIg: boolean
  joinedTelegram: boolean
  storyPosted: boolean
  trickTickets: number
}

// Placeholder links — swap these for the real ones later.
const INSTAGRAM_URL = 'https://www.instagram.com/NUS.AERIALSPORTS/'
const TELEGRAM_URL = 'https://t.me/nus_aerial_sports'

const MAX_REDEEMABLE = 3

export function Hub({
  status,
  onPlayGame1,
  onPlayGame2,
  onToggleIg,
  onToggleTelegram,
  onToggleStory,
  onSetTrickTickets,
}: {
  status: TaskStatus
  onPlayGame1: () => void
  onPlayGame2: () => void
  onToggleIg: () => void
  onToggleTelegram: () => void
  onToggleStory: () => void
  onSetTrickTickets: (n: number) => void
}) {
  const followTicket = status.followedIg && status.joinedTelegram ? 1 : 0
  const tickets =
    followTicket +
    (status.storyPosted ? 1 : 0) +
    status.trickTickets
  const earnedCapped = Math.min(tickets, MAX_REDEEMABLE)

  return (
    <main className="min-h-screen bg-hero">
      <div className="mx-auto flex max-w-md flex-col gap-5 px-6 pb-16 pt-10">
        {/* Logo + title */}
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-warm-ivory shadow-md ring-1 ring-bison-hide/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath('/assets/logo.png')}
              alt="NUS Aerial Sports logo"
              className="h-24 w-24 rounded-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-heading text-4xl leading-tight text-matterhorn">
              NUS Aerial Sports
            </h1>
            <p className="mt-3 text-md text-muted-foreground">
              Thank you for visiting our booth!
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Collect tickets for our lucky draw. Tap a task to expand it. You
              can redeem up to {MAX_REDEEMABLE} tickets. Talk to NAS members if you need help.
            </p>
          </div>
        </header>

        {/* Ticket counter — stays visible while scrolling */}
        <section className="sticky top-4 z-10 rounded-3xl bg-card/90 px-6 py-4 text-center shadow-md backdrop-blur">
          <p className="font-heading text-3xl text-matterhorn">
            🎫 {earnedCapped}
            <span className="text-xl text-matterhorn/50">
              {' '}
              / {MAX_REDEEMABLE} tickets
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {tickets > MAX_REDEEMABLE
              ? `You earned ${tickets} — ${MAX_REDEEMABLE} is the max you can redeem.`
              : 'Redeemable at the booth.'}
          </p>
        </section>

        {/* 1. Follow IG + Telegram → 1 ticket */}
        <TicketCard
          title="Follow us on IG + Telegram"
          ticketText="1 ticket"
          earned={followTicket}
          max={1}
          required
          defaultOpen
        >
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Follow @nus.aerialsports on Instagram <em>and</em> join our Telegram
            channel to claim 1 ticket.
          </p>
          <LinkToggleRow
            icon={InstagramLogo}
            label="Open Instagram"
            href={INSTAGRAM_URL}
            checked={status.followedIg}
            onToggle={onToggleIg}
          />
          <LinkToggleRow
            className="mt-3"
            icon={TelegramLogo}
            label="Open Telegram"
            href={TELEGRAM_URL}
            checked={status.joinedTelegram}
            onToggle={onToggleTelegram}
          />
        </TicketCard>

        {/* 2. Pole Tricks Menu → up to 2 tickets */}
        <TicketCard
          title="Try a pole trick!"
          ticketText="Up to 2 tickets"
          earned={status.trickTickets}
          max={2}
          recommended
        >
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Complete a trick from our Pole Tricks Menu to claim up to 2 tickets.
            Set by our members at the booth.
          </p>
          <Stepper
            value={status.trickTickets}
            max={2}
            onChange={onSetTrickTickets}
          />
        </TicketCard>

        {/* 3. IG Story → 1 ticket */}
        <TicketCard
          title="Post an IG Story"
          ticketText="1 ticket"
          earned={status.storyPosted ? 1 : 0}
          max={1}
        >
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Post an Instagram Story tagging <strong>@nus.aerialsports</strong>{' '}
            and <strong>@nusstudentlife</strong> to claim 1 ticket.
          </p>
          <LinkToggleRow
            icon={InstagramLogo}
            label="Open Instagram"
            href={INSTAGRAM_URL}
            checked={status.storyPosted}
            onToggle={onToggleStory}
          />
        </TicketCard>

        {/* 4. Myth Busters game → just for fun, no tickets */}
        <TicketCard
          title="Aerial Sports Myth Busters"
          ticketText="Just for fun"
          earned={0}
          max={0}
        >
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Answer {TRIVIA_QUESTION_COUNT} true-or-false myths. You have{' '}
            {TRIVIA_TIME_LIMIT} seconds each and need {TRIVIA_PASS_SCORE} correct
            to claim your ticket.
          </p>
          <PlayButton complete={status.game1} onClick={onPlayGame1} />
        </TicketCard>

        {/* 5. Match Pose to Name game → just for fun, no tickets */}
        <TicketCard
          title="Match Pose to Name"
          ticketText="Just for fun"
          earned={0}
          max={0}
        >
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Match 5 aerial tricks to their correct names. Get {POSE_PASS_SCORE}{' '}
            out of 5 correct to claim your ticket.
          </p>
          <PlayButton complete={status.game2} onClick={onPlayGame2} />
        </TicketCard>
      </div>
    </main>
  )
}

function TicketCard({
  title,
  ticketText,
  earned,
  max,
  recommended,
  required,
  defaultOpen,
  children,
}: {
  title: string
  ticketText: string
  earned: number
  max: number
  recommended?: boolean
  required?: boolean
  defaultOpen?: boolean
  children: ReactNode
}) {
  const done = max > 0 && earned >= max
  const badge = done
    ? `${earned} 🎫 claimed`
    : earned > 0
      ? `${earned}/${max} 🎫`
      : ticketText
  const badgeClass = done
    ? 'bg-venus text-warm-ivory'
    : earned > 0
      ? 'bg-celestial text-warm-ivory'
      : 'bg-bison-hide/30 text-matterhorn/70'

  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-3xl bg-card shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          {required ? (
            <span className="mb-1 inline-block rounded-full bg-red-500/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-red-600 ring-1 ring-red-500/30">
              🔒 Required
            </span>
          ) : recommended ? (
            <span className="mb-1 inline-block rounded-full bg-venus/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-venus">
              ★ Recommended
            </span>
          ) : null}
          <h2 className="font-heading text-xl leading-tight text-matterhorn">
            {title}
          </h2>
          <span
            className={`mt-1.5 inline-block rounded-full px-3 py-0.5 text-xs font-bold ${badgeClass}`}
          >
            {badge}
          </span>
        </div>
        <ChevronDown className="h-5 w-5 shrink-0 text-matterhorn/50 transition group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-6">{children}</div>
    </details>
  )
}

function LinkToggleRow({
  icon: Icon,
  label,
  href,
  checked,
  onToggle,
  className = '',
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  href: string
  checked: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-celestial px-4 py-3 text-sm font-bold text-warm-ivory transition active:scale-95"
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </a>
      <button
        onClick={onToggle}
        aria-pressed={checked}
        className={`flex-1 rounded-full px-4 py-3 text-sm font-bold transition active:scale-95 ${
          checked
            ? 'bg-venus text-warm-ivory'
            : 'bg-bison-hide/30 text-matterhorn/70 ring-1 ring-bison-hide/40'
        }`}
      >
        {checked ? 'Done ✓' : 'I did this'}
      </button>
    </div>
  )
}

function Stepper({
  value,
  max,
  onChange,
}: {
  value: number
  max: number
  onChange: (n: number) => void
}) {
  return (
    <div className="flex items-center justify-center gap-5">
      <StepButton
        label="−"
        ariaLabel="Remove a ticket"
        disabled={value <= 0}
        onClick={() => onChange(Math.max(0, value - 1))}
      />
      <span className="min-w-[2.5rem] text-center font-heading text-4xl text-matterhorn">
        {value}
      </span>
      <StepButton
        label="+"
        ariaLabel="Add a ticket"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      />
    </div>
  )
}

function StepButton({
  label,
  ariaLabel,
  disabled,
  onClick,
}: {
  label: string
  ariaLabel: string
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-btn text-2xl font-bold text-warm-ivory shadow-md transition active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {label}
    </button>
  )
}

function PlayButton({
  complete,
  onClick,
}: {
  complete: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-full bg-btn px-6 py-3.5 font-bold text-warm-ivory shadow-md transition active:scale-95"
    >
      {complete ? 'Play again' : 'Start challenge'}
    </button>
  )
}

function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m6 9 6 6 6-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function InstagramLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TelegramLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.8 4.2 18.5 20c-.2 1-.8 1.2-1.6.7l-4.7-3.5-2.3 2.2c-.2.3-.5.5-1 .5l.4-4.9 8.9-8c.4-.4-.1-.6-.6-.3L6.5 13.6 1.8 12.1c-1-.3-1-1 .2-1.5L20.3 3.5c.9-.3 1.7.2 1.5.7Z" />
    </svg>
  )
}
