import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './src/Components/Home'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaProvider >
      <Home/>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})