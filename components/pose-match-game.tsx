'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Confetti } from '@/components/confetti'
import { assetPath } from '@/lib/asset-path'
import { POSES, POSE_GAME_TIME, POSE_PASS_SCORE } from '@/lib/games-data'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Phase = 'playing' | 'done'

export function PoseMatchGame({
  onComplete,
  onBack,
}: {
  onComplete: (passed: boolean) => void
  onBack: () => void
}) {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<Phase>('playing')
  const [timeLeft, setTimeLeft] = useState(POSE_GAME_TIME)
  const [selected, setSelected] = useState<string | null>(null)

  const current = POSES[round]
  const passed = score >= POSE_PASS_SCORE

  // Build 3 name options for the current pose
  const options = useMemo(() => {
    const others = shuffle(POSES.filter((p) => p.name !== current.name))
      .slice(0, 2)
      .map((p) => p.name)
    return shuffle([current.name, ...others])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  const advanceRound = useCallback(() => {
    setSelected(null)
    if (round + 1 >= POSES.length) {
      setPhase('done')
    } else {
      setRound((r) => r + 1)
      setTimeLeft(POSE_GAME_TIME)
    }
  }, [round])

  // Per-pose countdown
  useEffect(() => {
    if (phase !== 'playing' || selected) return
    if (timeLeft <= 0) {
      advanceRound()
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [advanceRound, phase, selected, timeLeft])

  function choose(name: string) {
    if (selected) return
    setSelected(name)
    const correct = name === current.name
    if (correct) setScore((s) => s + 1)
    setTimeout(advanceRound, 700)
  }

  // ---- DONE SCREEN ----
  if (phase === 'done') {
    return (
      <div className="min-h-screen bg-hero px-6 py-10">
        {passed && <Confetti />}
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 pt-10 text-center">
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-venus">
            Challenge 2 Complete
          </span>
          <h2 className="font-heading text-4xl text-matterhorn">
            {passed ? 'Pose names matched!' : 'So close!'}
          </h2>
          <div className="animate-pop-in rounded-3xl bg-card px-10 py-8 shadow-sm">
            <p className="font-heading text-6xl text-venus">
              {score}
              <span className="text-2xl text-muted-foreground">
                /{POSES.length}
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {passed
                ? 'You passed - this challenge is now marked complete.'
                : `You need ${POSE_PASS_SCORE} correct to pass. Try once more!`}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            {passed ? (
              <button
                onClick={() => onComplete(true)}
                className="w-full rounded-full bg-btn px-6 py-4 font-bold text-warm-ivory shadow-md transition active:scale-95"
              >
                Back to Hub
              </button>
            ) : (
              <button
                onClick={() => {
                  setRound(0)
                  setScore(0)
                  setTimeLeft(POSE_GAME_TIME)
                  setSelected(null)
                  setPhase('playing')
                }}
                className="w-full rounded-full bg-btn px-6 py-4 font-bold text-warm-ivory shadow-md transition active:scale-95"
              >
                Try Again
              </button>
            )}
            <button
              onClick={onBack}
              className="w-full rounded-full px-6 py-3 text-sm font-bold text-matterhorn/70 transition active:scale-95"
            >
              Return to Hub
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---- PLAYING SCREEN ----
  const lowTime = timeLeft <= 5
  return (
    <div className="min-h-screen bg-hero px-6 py-10">
      <div className="mx-auto flex max-w-md flex-col gap-5 pt-6">
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg text-matterhorn">
            Pose {round + 1}
            <span className="text-muted-foreground">/{POSES.length}</span>
          </span>
          <div
            className={`flex h-12 items-center justify-center rounded-full px-4 font-heading text-xl font-bold shadow-sm transition ${
              lowTime ? 'bg-matterhorn text-warm-ivory' : 'bg-card text-venus'
            }`}
            aria-label={`${timeLeft} seconds left`}
          >
            {timeLeft}s
          </div>
        </div>

        <p className="text-center font-body text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Match this pose to its name.
        </p>

        <div className="flex h-72 items-center justify-center rounded-3xl bg-muted p-2 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath(current.image || '/placeholder.svg')}
            alt="Aerial pose to identify"
            className="h-full w-auto max-w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-3">
          {options.map((name) => {
            const isPicked = selected === name
            const isAnswer = name === current.name
            let cls = 'bg-card text-matterhorn'
            if (selected) {
              if (isAnswer) cls = 'bg-venus text-warm-ivory'
              else if (isPicked) cls = 'bg-matterhorn text-warm-ivory'
              else cls = 'bg-card/60 text-matterhorn/50'
            }
            return (
              <button
                key={name}
                onClick={() => choose(name)}
                disabled={!!selected}
                className={`rounded-2xl py-5 font-heading text-2xl font-bold shadow-sm transition active:scale-95 ${cls}`}
              >
                {name}
              </button>
            )
          })}
        </div>

        <button
          onClick={onBack}
          className="mx-auto text-sm font-bold text-matterhorn/60 transition active:scale-95"
        >
          Quit to Hub
        </button>
      </div>
    </div>
  )
}
