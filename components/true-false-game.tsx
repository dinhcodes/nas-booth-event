'use client'

import { useEffect, useState } from 'react'
import { Confetti } from '@/components/confetti'
import { TRIVIA, TRIVIA_PASS_SCORE, TRIVIA_TIME_LIMIT } from '@/lib/games-data'

type Phase = 'question' | 'answer' | 'done'
type AnswerResult = 'correct' | 'incorrect' | 'timeout'

export function TrueFalseGame({
  onComplete,
  onBack,
}: {
  onComplete: (passed: boolean) => void
  onBack: () => void
}) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('question')
  const [score, setScore] = useState(0)
  const [lastResult, setLastResult] = useState<AnswerResult>('incorrect')
  const [timeLeft, setTimeLeft] = useState(TRIVIA_TIME_LIMIT)

  const current = TRIVIA[index]
  const passed = score >= TRIVIA_PASS_SCORE

  // Per-question countdown
  useEffect(() => {
    if (phase !== 'question') return
    if (timeLeft <= 0) {
      reveal(null)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft])

  function reveal(choice: boolean | null) {
    const correct = choice === current.answer
    if (correct) setScore((s) => s + 1)
    setLastResult(choice === null ? 'timeout' : correct ? 'correct' : 'incorrect')
    setPhase('answer')
  }

  function next() {
    if (index + 1 >= TRIVIA.length) {
      setPhase('done')
      return
    }
    const nextIndex = index + 1
    setIndex(nextIndex)
    setTimeLeft(TRIVIA_TIME_LIMIT)
    setPhase('question')
  }

  // ---- DONE SCREEN ----
  if (phase === 'done') {
    return (
      <div className="min-h-screen bg-hero px-6 py-10">
        {passed && <Confetti />}
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 pt-10 text-center">
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-venus">
            Challenge 1 Complete
          </span>
          <h2 className="font-heading text-4xl text-matterhorn">
            {passed ? 'Myths busted!' : 'Nice try!'}
          </h2>
          <div className="animate-pop-in rounded-3xl bg-card px-10 py-8 shadow-sm">
            <p className="font-heading text-6xl text-venus">
              {score}
              <span className="text-2xl text-muted-foreground">
                /{TRIVIA.length}
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {passed
                ? 'You passed - this challenge is now marked complete.'
                : `You need ${TRIVIA_PASS_SCORE} correct to pass. Give it another go!`}
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
                  setIndex(0)
                  setScore(0)
                  setTimeLeft(TRIVIA_TIME_LIMIT)
                  setPhase('question')
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

  // ---- ANSWER SCREEN ----
  if (phase === 'answer') {
    return (
      <div className="min-h-screen bg-hero px-6 py-10">
        <div className="mx-auto flex max-w-md flex-col gap-6 pt-6">
          <Progress index={index} total={TRIVIA.length} />
          <div className="animate-pop-in rounded-3xl bg-card p-7 shadow-sm">
            <span
              className={`font-heading text-sm uppercase tracking-[0.25em] ${
                lastResult === 'correct' ? 'text-venus' : 'text-matterhorn/60'
              }`}
            >
              {lastResult === 'timeout'
                ? "Time's up"
                : lastResult === 'correct'
                  ? 'Correct!'
                  : 'Not quite'}
            </span>
            <p className="mt-3 font-heading text-3xl leading-snug text-matterhorn">
              The answer is {current.answer ? 'True' : 'False'}.
            </p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {current.explanation}
            </p>
            {current.answerImage && (
              <>
                <div className="mt-5 flex h-64 items-center justify-center rounded-2xl bg-muted p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.answerImage || '/placeholder.svg'}
                    alt={current.question}
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>
                {current.answerImageCredit && (
                  <a
                    href={current.answerImageCredit.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {current.answerImageCredit.label}
                  </a>
                )}
              </>
            )}
          </div>
          <button
            onClick={next}
            className="w-full rounded-full bg-btn px-6 py-4 font-bold text-warm-ivory shadow-md transition active:scale-95"
          >
            {index + 1 >= TRIVIA.length ? 'See Results' : 'Next Question'}
          </button>
        </div>
      </div>
    )
  }

  // ---- QUESTION SCREEN ----
  const lowTime = timeLeft <= 3
  return (
    <div className="min-h-screen bg-hero px-6 py-10">
      <div className="mx-auto flex max-w-md flex-col gap-6 pt-6">
        <div className="flex items-center justify-between">
          <Progress index={index} total={TRIVIA.length} />
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full font-heading text-xl font-bold shadow-sm transition ${
              lowTime
                ? 'bg-matterhorn text-warm-ivory'
                : 'bg-card text-venus'
            }`}
            aria-label={`${timeLeft} seconds left`}
          >
            {timeLeft}
          </div>
        </div>

        <div className="flex min-h-[180px] items-center justify-center rounded-3xl bg-card p-8 text-center shadow-sm">
          <p className="text-balance font-heading text-3xl leading-snug text-matterhorn">
            {current.question}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => reveal(true)}
            className="rounded-2xl bg-card py-8 font-heading text-2xl font-bold text-venus shadow-sm transition active:scale-95"
          >
            True
          </button>
          <button
            onClick={() => reveal(false)}
            className="rounded-2xl bg-matterhorn py-8 font-heading text-2xl font-bold text-warm-ivory shadow-sm transition active:scale-95"
          >
            False
          </button>
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

function Progress({ index, total }: { index: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-6 rounded-full ${
            i <= index ? 'bg-venus' : 'bg-bison-hide/40'
          }`}
        />
      ))}
    </div>
  )
}
