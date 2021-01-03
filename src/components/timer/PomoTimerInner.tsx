import React from 'react'
import { View, StyleSheet } from 'react-native'
import { PomoStatus } from './PomoStatus'
import BaseText from '@components/BaseText'

interface PomoTimerInnerProps {
  timeLeft: number
  pomoStatus: PomoStatus
}

export default function PomoTimmerInner({
  timeLeft,
  pomoStatus
}: PomoTimerInnerProps) {
  const padTime = (time: number): string => {
    return (time < 10 ? '0' : '') + time
  }

  const minutesLeft = (): string => {
    const minutes = Math.floor(timeLeft / 60)
    return padTime(minutes)
  }

  const secondsLeft = (): string => {
    const seconds = timeLeft - +minutesLeft() * 60
    return padTime(seconds)
  }

  const getInnerContent = () => {
    return {
      [PomoStatus.NOT_RUNNING]: 'Work !',
      [PomoStatus.RUNNING]: 'Pause',
      [PomoStatus.PAUSED]: 'Continue'
    }[pomoStatus as PomoStatus]
  }

  return (
    <View style={styles.gaugeInnerContainer}>
      <BaseText weight="bold" style={styles.gaugeTimeLeft}>
        {`${minutesLeft()} : ${secondsLeft()}`}
      </BaseText>
      <BaseText weight="light" style={styles.gaugePause}>
        {getInnerContent()}
      </BaseText>
    </View>
  )
}

const styles = StyleSheet.create({
  gaugeInnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gaugeTimeLeft: {
    color: 'white',
    fontSize: 49
  },
  gaugePause: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 10
  }
})
