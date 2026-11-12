import React, { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useGameAudio } from './hooks/useGameAudio'
import gameData from './data/data.json'

import SplashScreen from './components/SplashScreen'
import TopHUD from './components/TopHUD'
import GameTitleScreen from './components/GameTitleScreen'
import ProvinceStage from './components/ProvinceStage'
import InstrumentModal from './components/InstrumentModal'
import QuizEngine from './components/QuizEngine'
import NationalSongStage from './components/NationalSongStage'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentScreen, setCurrentScreen] = useState('title') // title | provinces | quiz | national
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const audio = useGameAudio()

  const { provinsi, rumpun, lagu_nasional } = gameData

  /* ─── Navigation ─────────────────────────────── */
  const handleSelectMode = useCallback((mode) => {
    audio.playSFX('click')
    setCurrentScreen(mode)
  }, [audio])

  const handleGoHome = useCallback(() => {
    audio.playSFX('click')
    audio.stopAudio()
    setShowModal(false)
    setSelectedProvince(null)
    setCurrentScreen('title')
  }, [audio])

  const handleGoScreen = useCallback((screen) => {
    audio.playSFX('click')
    audio.stopAudio()
    setShowModal(false)
    setSelectedProvince(null)
    setCurrentScreen(screen)
  }, [audio])

  /* ─── Province / Modal ────────────────────────── */
  const handleSelectProvince = useCallback((prov) => {
    setSelectedProvince(prov)
    setShowModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    audio.stopAudio()
    setShowModal(false)
    setSelectedProvince(null)
  }, [audio])

  const handleStartQuiz = useCallback(() => {
    audio.stopAudio()
    setShowModal(false)
    setSelectedProvince(null)
    setCurrentScreen('quiz')
  }, [audio])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200">

      {/* Splash Screen — tampil di atas segalanya */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
      {/* Top Navigation HUD */}
      <TopHUD
        currentScreen={currentScreen}
        onGoHome={handleGoHome}
        onGoScreen={handleGoScreen}
        bgmEnabled={audio.bgmEnabled}
        onToggleBGM={audio.toggleBGM}
        isPlayingVoice={audio.isPlayingVoice}
        currentPlayingTitle={audio.currentPlayingTitle}
        playSFX={audio.playSFX}
      />

      {/* Main Content */}
      <main className="pb-10">
        <AnimatePresence mode="wait">
          {currentScreen === 'title' && (
            <GameTitleScreen
              key="title"
              onSelectMode={handleSelectMode}
              playSFX={audio.playSFX}
            />
          )}

          {currentScreen === 'provinces' && (
            <ProvinceStage
              key="provinces"
              provinsiList={provinsi}
              rumpunList={rumpun}
              onSelectProvince={handleSelectProvince}
              playSFX={audio.playSFX}
            />
          )}

          {currentScreen === 'quiz' && (
            <QuizEngine
              key="quiz"
              quizData={provinsi}
              playSample={audio.playSample}
              stopAudio={audio.stopAudio}
              playSFX={audio.playSFX}
              isPlayingVoice={audio.isPlayingVoice}
              currentPlayingTitle={audio.currentPlayingTitle}
            />
          )}

          {currentScreen === 'national' && (
            <NationalSongStage
              key="national"
              songs={lagu_nasional}
              playSample={audio.playSample}
              stopAudio={audio.stopAudio}
              playSFX={audio.playSFX}
              isPlayingVoice={audio.isPlayingVoice}
              currentPlayingTitle={audio.currentPlayingTitle}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Instrument / Song Modal */}
      <AnimatePresence>
        {showModal && selectedProvince && (
          <InstrumentModal
            key="modal"
            provinsi={selectedProvince}
            onClose={handleCloseModal}
            onStartQuiz={handleStartQuiz}
            playSample={audio.playSample}
            stopAudio={audio.stopAudio}
            playSFX={audio.playSFX}
            isPlayingVoice={audio.isPlayingVoice}
            currentPlayingTitle={audio.currentPlayingTitle}
            getInstrumentCategory={audio.getInstrumentCategory}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
