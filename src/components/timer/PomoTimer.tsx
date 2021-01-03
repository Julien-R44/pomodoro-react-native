import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, Vibration } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import PomoTimerInner from './PomoTimerInner'
import { PomoStatus } from './PomoStatus'
import { LinearGradient } from 'expo-linear-gradient'
import { useStateValue } from 'store/store'
import { Audio } from 'expo-av'
// import NotifSound from 'assets/sounds/notification.mp3'
import useInterval from 'hooks/useInterval'

interface PomoTimerProps {
  selectedTab: 'pomo' | 'short' | 'long'
}

export default function PomoTimer({ selectedTab }: PomoTimerProps) {
  const { state } = useStateValue()
  const { pomodoroDuration, shortDuration, longDuration } = state
  const [timeLeft, setTimeLeft] = useState(pomodoroDuration * 60)
  const [pomoStatus, setPomoStatus] = useState(PomoStatus.NOT_RUNNING)
  const [gaugeFill, setGaugeFill] = useState(0)
  const statusRef = useRef<PomoStatus>()
  const [timerDuration, setTimerDuration] = useState<number>(0)

  useInterval(
    () => {
      if (
        statusRef.current === PomoStatus.PAUSED ||
        statusRef.current === PomoStatus.NOT_RUNNING
      )
        return

      setTimeLeft((prevTimeLeft) => {
        let newTimeLeft = prevTimeLeft - 1
        if (newTimeLeft <= 0) {
          Audio.Sound.createAsync(
            require('../../../assets/sounds/notification.mp3')
          ).then(async (response: unknown) => {
            const { sound, status } = response

            Vibration.vibrate(10 * 100)
            sound.playAsync()
          })

          newTimeLeft = 0
          setPomoStatus(PomoStatus.NOT_RUNNING)
          setGaugeFill(0)
          return timerDuration * 60
        }
        setGaugeFill(getPercentageOfWorkSessionCompletion(prevTimeLeft))
        return newTimeLeft
      })
    },
    pomoStatus === PomoStatus.RUNNING ? 1000 : null
  )

  statusRef.current = pomoStatus

  useEffect(() => {
    const selectedTabTimerDuration = {
      pomo: pomodoroDuration,
      short: shortDuration,
      long: longDuration
    }[selectedTab]

    setTimerDuration(selectedTabTimerDuration)
    setGaugeFill(0)
    setPomoStatus(PomoStatus.NOT_RUNNING)
    setTimeLeft(timerDuration * 60)
  }, [selectedTab, pomodoroDuration, shortDuration, longDuration])

  useEffect(() => {
    setTimeLeft(timerDuration * 60)
  }, [timerDuration])

  const getPercentageOfWorkSessionCompletion = (timeLeft: number) => {
    return ((timerDuration * 60 - timeLeft + 1) / (timerDuration * 60)) * 100
  }

  const onPressTimer = () => {
    if (pomoStatus === PomoStatus.NOT_RUNNING) {
      setPomoStatus(PomoStatus.RUNNING)
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
