import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

interface AppState {
  fontsLoaded: boolean
  pomoStatus: PomoStatus
  workSessionDuration: number
  timeLeft: number
  timerInterval: number | undefined
  gaugeFill: number
}

enum PomoStatus {
  RUNNING,
  PAUSED,
  NOT_RUNNING
}

const WORK_SESSION_DURATION = 12

export default class PomoTimer extends Component {
  state: Readonly<AppState> = {
    fontsLoaded: false,
    pomoStatus: PomoStatus.NOT_RUNNING,
    workSessionDuration: WORK_SESSION_DURATION,
    timeLeft: WORK_SESSION_DURATION,
    timerInterval: undefined,
    gaugeFill: 0
  }

  componentWillUnmount() {
    clearInterval(this.state.timerInterval)
  }

  getPercentageOfWorkSessionCompletion() {
    const { timeLeft, workSessionDuration } = this.state
    return ((workSessionDuration - timeLeft + 1) / workSessionDuration) * 100
  }

  onPressTimer() {
    if (this.state.pomoStatus === PomoStatus.NOT_RUNNING) {
      return this.setState(() => {
        const timerInterval = setInterval(() => this.countdown(), 1000)
        return { pomoStatus: PomoStatus.RUNNING, timerInterval }
      })
    }
  }

  onPressPause() {
    this.setState({ pomoStatus: PomoStatus.PAUSED })
  }

  countdown() {
    let timeLeft = this.state.timeLeft - 1
    const gaugeFill = this.getPercentageOfWorkSessionCompletion()

    if (this.state.pomoStatus === PomoStatus.PAUSED) return

    if (timeLeft <= 0) {
      timeLeft = 0
      clearInterval(this.state.timerInterval)
    }

    this.setState({ timeLeft, gaugeFill })
  }

  padTime(time: number): string {
    return (time < 10 ? '0' : '') + time
  }

  minutesLeft(): string {
    const minutes = Math.floor(this.state.timeLeft / 60)
    return this.padTime(minutes)
  }

  secondsLeft(): string {
    const seconds = this.state.timeLeft - +this.minutesLeft() * 60
    return this.padTime(seconds)
  }

  render() {
    return (
      <View style={styles.gaugeContainer}>
        <TouchableOpacity onPress={this.onPressTimer.bind(this)}>
          <AnimatedCircularProgress
            size={220}
            width={5}
            fill={this.state.gaugeFill}
            tintColor="#F87073"
            backgroundColor="#3d5875"
            onAnimationComplete={() => console.log('onAnimationComplete')}
          >
            {() => (
              <View style={styles.gaugeInnerContainer}>
                <Text style={styles.gaugeTimeLeft}>
                  {`${this.minutesLeft()} : ${this.secondsLeft()}`}
                </Text>
                <Text style={styles.gaugePause}></Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gaugeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gaugeInnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gaugeTimeLeft: {
    color: 'white',
    fontFamily: 'NunitoSans_700Bold',
    fontSize: 49
  },
  gaugePause: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NunitoSans_200ExtraLight',
    textTransform: 'uppercase',
    letterSpacing: 10
  }
})
