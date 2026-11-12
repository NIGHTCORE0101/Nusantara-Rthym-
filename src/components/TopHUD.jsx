import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaHome, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaMusic, 
  FaQuestionCircle,
  FaMapMarkedAlt,
  FaGraduationCap
} from 'react-icons/fa'

export default function TopHUD({ 
  currentScreen, 
  onGoHome, 
  onGoScreen,
  bgmEnabled, 
  onToggleBGM, 
  isPlayingVoice,
  currentPlayingTitle,
  playSFX
}) {
  return (
    <header className="sticky top-0 z-40 w-full px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-b from-amber-900/90 via-amber-800/80 to-transparent backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Home Button and Screen Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentScreen !== 'title' && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                playSFX('click')
                onGoHome()
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold shadow-game border-2 border-amber-300 text-xs sm:text-sm"
              title="Kembali ke Menu Utama"
            >
              <FaHome className="text-base sm:text-lg" />
              <span className="hidden sm:inline">Menu</span>
            </motion.button>
          )}

          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl filter drop-shadow">🥁</span>
            <div>
              <h1 className="text-base sm:text-xl font-extrabold text-amber-200 tracking-wide drop-shadow-md leading-none">
                Nusantara<span className="text-yellow-400">Rhythm</span>
              </h1>
              <span className="text-[10px] sm:text-xs font-medium text-amber-300/90 tracking-wider uppercase">
                {currentScreen === 'title' && 'Game Edukasi Musik Nusantara'}
                {currentScreen === 'provinces' && 'Jelajah 38 Provinsi & 5 Rumpun'}
                {currentScreen === 'quiz' && 'Tantangan Kuis Audio'}
                {currentScreen === 'national' && '20 Lagu Wajib Nasional'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Sound Indicator (Audio Wave) */}
        {isPlayingVoice && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-950/70 border border-amber-400/50 rounded-full shadow-inner"
          >
            <div className="flex items-end gap-1 h-4">
              <span className="w-1 bg-yellow-400 rounded-full animate-bounce h-3"></span>
              <span className="w-1 bg-yellow-300 rounded-full animate-bounce h-4 delay-100"></span>
              <span className="w-1 bg-amber-400 rounded-full animate-bounce h-2 delay-150"></span>
              <span className="w-1 bg-yellow-500 rounded-full animate-bounce h-3.5 delay-75"></span>
            </div>
            <span className="text-xs text-amber-200 font-semibold truncate max-w-[150px]">
              {currentPlayingTitle || 'Memutar Audio...'}
            </span>
          </motion.div>
        )}

        {/* Right: Mode Shortcuts and Sound Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {currentScreen !== 'title' && (
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSFX('click')
                  onGoScreen('provinces')
                }}
                className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                  currentScreen === 'provinces'
                    ? 'bg-amber-400 text-stone-900 shadow-md'
                    : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-700/50'
                }`}
                title="Jelajah Budaya"
              >
                <FaMapMarkedAlt />
                <span className="hidden lg:inline">Jelajah</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSFX('click')
                  onGoScreen('quiz')
                }}
                className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                  currentScreen === 'quiz'
                    ? 'bg-amber-400 text-stone-900 shadow-md'
                    : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-700/50'
                }`}
                title="Tantangan Kuis"
              >
                <FaQuestionCircle />
                <span className="hidden lg:inline">Kuis</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSFX('click')
                  onGoScreen('national')
                }}
                className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                  currentScreen === 'national'
                    ? 'bg-amber-400 text-stone-900 shadow-md'
                    : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/80 border border-amber-700/50'
                }`}
                title="Lagu Nasional"
              >
                <FaMusic />
                <span className="hidden lg:inline">Lagu Nasional</span>
              </motion.button>
            </div>
          )}

          {/* BGM Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSFX('click')
              onToggleBGM()
            }}
            className={`p-2 sm:p-2.5 rounded-2xl font-bold flex items-center justify-center transition border-2 ${
              bgmEnabled
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-300 shadow-game'
                : 'bg-stone-700 hover:bg-stone-600 text-stone-300 border-stone-500 shadow-game'
            }`}
            title={bgmEnabled ? 'Matikan BGM' : 'Nyalakan BGM'}
          >
            {bgmEnabled ? (
              <FaVolumeUp className="text-base sm:text-lg" />
            ) : (
              <FaVolumeMute className="text-base sm:text-lg" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  )
}
