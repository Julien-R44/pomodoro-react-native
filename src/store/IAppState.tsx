export default interface AppState {
  theme: {
    name: 'pink' | 'blue' | 'red'
    mainColor: string
  }
  fontFamily: string
  pomodoroDuration: number
  shortDuration: number
  longDuration: number
  selectedTab: 'pomo' | 'short' | 'long'
}
