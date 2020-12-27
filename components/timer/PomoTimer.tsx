import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import PomoTimerInner from './PomoTimerInner'
import { PomoStatus } from './PomoStatus'

interface AppState {
  pomoStatus: PomoStatus
  workSessionDuration: number
  timeLeft: number
  timerInterval: number | undefined
  gaugeFill: number
}

const WORK_SESSION_DURATION = 12

export default class PomoTimer extends Component {
  state: Readonly<AppState> = {
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

    if (this.state.pomoStatus === PomoStatus.RUNNING) {
      return this.setState({ pomoStatus: PomoStatus.PAUSED })
    }

    if (this.state.pomoStatus === PomoStatus.PAUSED) {
      return this.setState({ pomoStatus: PomoStatus.RUNNING })
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
      return this.setState({
        pomoStatus: PomoStatus.NOT_RUNNING,
        timeLeft: WORK_SESSION_DURATION,
        gaugeFill: 0
      })
    }

    this.setState({ timeLeft, gaugeFill })
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
              <PomoTimerInner
                timeLeft={this.state.timeLeft}
                pomoStatus={this.state.pomoStatus}
              />
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
  }
})
