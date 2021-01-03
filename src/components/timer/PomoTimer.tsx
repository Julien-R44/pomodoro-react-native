import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import PomoTimerInner from './PomoTimerInner'
import { PomoStatus } from './PomoStatus'
import { LinearGradient } from 'expo-linear-gradient'
import { useStateValue } from 'store/store'

const WORK_SESSION_DURATION = 25

export default function PomoTimer() {
  const [pomoStatus, setPomoStatus] = useState(PomoStatus.NOT_RUNNING)
  const [timeLeft, setTimeLeft] = useState(WORK_SESSION_DURATION)
  const [gaugeFill, setGaugeFill] = useState(0)
  const { state } = useStateValue()
  let timerInterval: NodeJS.Timeout

  useEffect(() => {
    return () => {
      clearInterval(timerInterval)
    }
  }, [])

  const getPercentageOfWorkSessionCompletion = (timeLeft: number) => {
    return (
      ((WORK_SESSION_DURATION - timeLeft + 1) / WORK_SESSION_DURATION) * 100
    )
  }

  const countdown = () => {
    if (pomoStatus === PomoStatus.PAUSED) return

    setTimeLeft((prevTimeLeft) => {
      let newTimeLeft = prevTimeLeft - 1
      if (newTimeLeft <= 0) {
        newTimeLeft = 0
        clearInterval(timerInterval)
        setPomoStatus(PomoStatus.NOT_RUNNING)
        setGaugeFill(0)
        return WORK_SESSION_DURATION
      }
      setGaugeFill(getPercentageOfWorkSessionCompletion(prevTimeLeft))
      return newTimeLeft
    })
  }

  const onPressTimer = () => {
    if (pomoStatus === PomoStatus.NOT_RUNNING) {
      setPomoStatus(PomoStatus.RUNNING)
      timerInterval = setInterval(() => {
        countdown()
      }, 1000)
      return
    }

    if (pomoStatus === PomoStatus.RUNNING) {
      return setPomoStatus(PomoStatus.PAUSED)
    }

    if (pomoStatus === PomoStatus.PAUSED) {
      return setPomoStatus(PomoStatus.RUNNING)
    }
  }

  return (
    <View style={styles.gaugeContainer}>
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent']}
        start={{ x: 0.8, y: 0.5 }}
        style={styles.gaugeInnerContainer}
      >
        <TouchableOpacity onPress={onPressTimer}>
          <AnimatedCircularProgress
            size={270}
            width={10}
            backgroundWidth={5}
            fill={gaugeFill}
            tintColor={state.theme.mainColor}
            // tintColorSecondary="#00ff00"
            rotation={180}
            backgroundColor="#3d5875"
          >
            {() => (
              <PomoTimerInner timeLeft={timeLeft} pomoStatus={pomoStatus} />
            )}
          </AnimatedCircularProgress>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  gaugeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  gaugeInnerContainer: {
    backgroundColor: '#161A33',
    borderRadius: 500,
    padding: 10
  }
})
