'use client'

import type { ComponentType, SVGProps } from 'react'
import { assetPath } from '@/lib/asset-path'

type TaskStatus = {
  game1: boolean
  game2: boolean
  followedIg: boolean
  joinedTelegram: boolean
}

// Placeholder links — swap these for the real ones later.
const INSTAGRAM_URL = 'https://www.instagram.com/NUS.AERIALSPORTS/'
const TELEGRAM_URL = '#'

export function Hub({
  status,
  onPlayGame1,
  onPlayGame2,
  onToggleIg,
  onToggleTelegram,
}: {
  status: TaskStatus
  onPlayGame1: () => void
  onPlayGame2: () => void
  onToggleIg: () => void
  onToggleTelegram: () => void
}) {
  const challengesDone = [status.game1, status.game2].filter(Boolean).length

  return (
    <main className="min-h-screen bg-hero">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-6 pb-16 pt-10">
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
            <br/>
            <p className="mt-1 text-md text-muted-foreground">
              Thank you for visiting our booth!<br/><br/>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              To redeem a prize, complete 2 of the 3 challenges below, follow us on Instagram, and join our Telegram group. <br/><br/>Show this screen to our members.
            </p>
          </div>
        </header>

        {/* Progress summary */}
        <section className="rounded-3xl bg-card/70 px-6 py-5 text-center shadow-sm backdrop-blur-sm">
          <p className="font-heading text-lg text-matterhorn">
            {challengesDone}/3 challenges passed
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Finish at least 2 challenges, then tap to confirm you followed us.
          </p>
        </section>

        {/* Challenge 1 */}
        <GameCard
          step="Challenge 1"
          title="Aerial Sports Myth Busters"
          description="Answer 10 true-or-false myths. You have 5 seconds each and need 7 correct to pass."
          complete={status.game1}
          onClick={onPlayGame1}
        />

        {/* Challenge 2 */}
        <GameCard
          step="Challenge 2"
          title="Match Pose to Name"
          description="Match 5 aerial tricks to their correct names. Get 3 out of 5 correct to pass."
          complete={status.game2}
          onClick={onPlayGame2}
        />

        {/* Challenge 3 */}
        <StaticChallengeCard
          step="Challenge 3"
          title="Physical Challenge"
          description="Learn some fun facts or watch a demo from NAS members. This step is verified by at the booth."
          status="At Booth"
        />

        {/* Social toggles */}
        <ToggleCard
          title="Follow us on Instagram"
          description="Tap once you've followed @nusaerialsports."
          href={INSTAGRAM_URL}
          linkLabel="Open Instagram"
          icon={InstagramLogo}
          checked={status.followedIg}
          onToggle={onToggleIg}
        />

        <ToggleCard
          title="Join our Telegram group [WARNING: THIS GROUP CHAT IS NOT MADE YET]"
          description="Learn how to join us. Btw, we're giving 10 free trial classes. Details will be shared in here!"
          href={TELEGRAM_URL}
          linkLabel="Open Telegram"
          icon={TelegramLogo}
          checked={status.joinedTelegram}
          onToggle={onToggleTelegram}
        />

        <p className="px-2 text-center text-xs leading-relaxed text-muted-foreground">
          Redeem your prize by completing 2 of 3 challenges, following us on
          Instagram, and joining our Telegram group. Show this screen to our
          staff.
        </p>
      </div>
    </main>
  )
}

function GameCard({
  step,
  title,
  description,
  complete,
  onClick,
}: {
  step: string
  title: string
  description: string
  complete: boolean
  onClick: () => void
}) {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-heading text-xs uppercase tracking-[0.25em] text-venus">
            {step}
          </span>
          <h2 className="mt-1 font-heading text-2xl text-matterhorn">{title}</h2>
        </div>
        <StatusPill complete={complete} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <button
        onClick={onClick}
        className="mt-4 w-full rounded-full bg-btn px-6 py-3.5 font-bold text-warm-ivory shadow-md transition active:scale-95"
      >
        {complete ? 'Try Again' : 'Start Challenge'}
      </button>
    </section>
  )
}

function StaticChallengeCard({
  step,
  title,
  description,
  status,
}: {
  step: string
  title: string
  description: string
  status: string
}) {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-heading text-xs uppercase tracking-[0.25em] text-venus">
            {step}
          </span>
          <h2 className="mt-1 font-heading text-2xl text-matterhorn">{title}</h2>
        </div>
        <span className="shrink-0 rounded-full bg-bison-hide/30 px-3 py-1 text-xs font-bold text-matterhorn/60">
          {status}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </section>
  )
}

function ToggleCard({
  title,
  description,
  href,
  linkLabel,
  icon: Icon,
  checked,
  onToggle,
}: {
  title: string
  description: string
  href: string
  linkLabel: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  checked: boolean
  onToggle: () => void
}) {
  return (
    <section className="rounded-3xl bg-celestial p-6 text-warm-ivory shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl text-warm-ivory">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-warm-ivory/75">
            {description}
          </p>
        </div>
        <StatusPill complete={checked} dark />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-warm-ivory/30 bg-warm-ivory px-4 py-3 text-center text-sm font-bold text-venus transition active:scale-95"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {linkLabel}
        </a>
        <button
          onClick={onToggle}
          aria-pressed={checked}
          className={`flex-1 rounded-full px-4 py-3 text-sm font-bold shadow-sm transition active:scale-95 ${
            checked
              ? 'bg-venus text-warm-ivory'
              : 'bg-warm-ivory/15 text-warm-ivory ring-1 ring-warm-ivory/20'
          }`}
        >
          {checked ? 'Done ✓' : 'I did this'}
        </button>
      </div>
    </section>
  )
}

function StatusPill({
  complete,
  dark,
}: {
  complete: boolean
  dark?: boolean
}) {
  const className = dark
    ? complete
      ? 'bg-venus text-warm-ivory'
      : 'bg-warm-ivory/15 text-warm-ivory/75'
    : complete
      ? 'bg-venus text-warm-ivory'
      : 'bg-bison-hide/30 text-matterhorn/60'

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {complete ? 'Complete' : 'To do'}
    </span>
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
