import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PomoStatus } from './PomoStatus'
import BaseText from '@components/BaseText'

export default class PomoTimmerInner extends React.Component<{
  timeLeft: number
  pomoStatus: PomoStatus
}> {
  padTime(time: number): string {
    return (time < 10 ? '0' : '') + time
  }

  minutesLeft(): string {
    const minutes = Math.floor(this.props.timeLeft / 60)
    return this.padTime(minutes)
  }

  secondsLeft(): string {
    const seconds = this.props.timeLeft - +this.minutesLeft() * 60
    return this.padTime(seconds)
  }

  getInnerContent() {
    return {
      [PomoStatus.NOT_RUNNING]: 'Work !',
      [PomoStatus.RUNNING]: 'Pause',
      [PomoStatus.PAUSED]: 'Continue'
    }[this.props.pomoStatus]
  }

  render() {
    return (
      <View style={styles.gaugeInnerContainer}>
        <BaseText weight="bold" style={styles.gaugeTimeLeft}>
          {`${this.minutesLeft()} : ${this.secondsLeft()}`}
        </BaseText>
        <BaseText weight="light" style={styles.gaugePause}>
          {this.getInnerContent()}
        </BaseText>
      </View>
    )
  }
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
