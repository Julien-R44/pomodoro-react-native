import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import PomoTimerInner from './PomoTimerInner'
import { PomoStatus } from './PomoStatus'
import { LinearGradient } from 'expo-linear-gradient'
import { useStateValue } from 'store/store'

export default function PomoTimer() {
  const { state } = useStateValue()
  const { pomodoroDuration } = state
  const [timeLeft, setTimeLeft] = useState(pomodoroDuration * 60)
  const [pomoStatus, setPomoStatus] = useState(PomoStatus.NOT_RUNNING)
  const [gaugeFill, setGaugeFill] = useState(0)
  let timerInterval: NodeJS.Timeout

  useEffect(() => {
    setTimeLeft(pomodoroDuration * 60)
  }, [pomodoroDuration])

  useEffect(() => {
    return () => {
      clearInterval(timerInterval)
    }
  }, [])

  const getPercentageOfWorkSessionCompletion = (timeLeft: number) => {
    return (
      ((pomodoroDuration * 60 - timeLeft + 1) / (pomodoroDuration * 60)) * 100
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
        return pomodoroDuration
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
