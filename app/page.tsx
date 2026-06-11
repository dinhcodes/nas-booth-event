'use client'

import { useState } from 'react'
import { Hub } from '@/components/hub'
import { PoseMatchGame } from '@/components/pose-match-game'
import { TrueFalseGame } from '@/components/true-false-game'

type Screen = 'hub' | 'game1' | 'game2'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('hub')
  const [game1, setGame1] = useState(false)
  const [game2, setGame2] = useState(false)
  const [followedIg, setFollowedIg] = useState(false)
  const [joinedTelegram, setJoinedTelegram] = useState(false)

  if (screen === 'game1') {
    return (
      <TrueFalseGame
        onBack={() => setScreen('hub')}
        onComplete={(passed) => {
          if (passed) setGame1(true)
          setScreen('hub')
        }}
      />
    )
  }

  if (screen === 'game2') {
    return (
      <PoseMatchGame
        onBack={() => setScreen('hub')}
        onComplete={(passed) => {
          if (passed) setGame2(true)
          setScreen('hub')
        }}
      />
    )
  }

  return (
    <Hub
      status={{ game1, game2, followedIg, joinedTelegram }}
      onPlayGame1={() => setScreen('game1')}
      onPlayGame2={() => setScreen('game2')}
      onToggleIg={() => setFollowedIg((v) => !v)}
      onToggleTelegram={() => setJoinedTelegram((v) => !v)}
    />
  )
}
