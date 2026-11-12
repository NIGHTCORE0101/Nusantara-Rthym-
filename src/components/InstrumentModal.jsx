import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaVolumeUp, 
  FaChevronLeft, 
  FaChevronRight, 
  FaTimes, 
  FaQuestionCircle, 
  FaPlay, 
  FaStop,
  FaHandPointUp,
  FaMusic
} from 'react-icons/fa'

export default function InstrumentModal({
  provinsi,
  onClose,
  onStartQuiz,
  playSample,
  stopAudio,
  playSFX,
  isPlayingVoice,
  currentPlayingTitle,
  getInstrumentCategory
}) {
  const [activeTab, setActiveTab] = useState('instruments') // 'instruments' | 'songs'
  const [currentInstIndex, setCurrentInstIndex] = useState(0)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isWobbling, setIsWobbling] = useState(false)

  const instruments = provinsi?.alat_musik || []
  const songs = provinsi?.lagu_daerah || []
  const currentInstrument = instruments[currentInstIndex] || null
  const currentSong = songs[currentSongIndex] || null

  // Auto-play audio when modal opens or current instrument/song changes
  useEffect(() => {
    // Batalkan audio sebelumnya dulu, baru mainkan yang baru
    stopAudio()

    // Delay kecil supaya stopAudio selesai sebelum play dimulai
    const timer = setTimeout(() => {
      if (activeTab === 'instruments' && currentInstrument) {
        triggerInstrumentPlay(currentInstrument)
      } else if (activeTab === 'songs' && currentSong) {
        triggerSongPlay(currentSong)
      }
    }, 50)

    return () => {
      clearTimeout(timer)
      stopAudio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInstIndex, currentSongIndex, activeTab])

  // Play instrument sample with wobble shake animation
  const triggerInstrumentPlay = (inst) => {
    if (!inst) return
    setIsWobbling(true)
    const category = getInstrumentCategory(inst.nama, inst.rumpun)
    playSample(inst.audio, inst.nama, category)

    setTimeout(() => {
      setIsWobbling(false)
    }, 1800)
  }

  // Play song sample
  const triggerSongPlay = (song) => {
    if (!song) return
    playSample(song.audio, song.judul, 'melody')
  }

  // Next / Prev navigation
  const handlePrev = () => {
    playSFX('click')
    if (activeTab === 'instruments') {
      setCurrentInstIndex(prev => (prev > 0 ? prev - 1 : instruments.length - 1))
    } else {
      setCurrentSongIndex(prev => (prev > 0 ? prev - 1 : songs.length - 1))
    }
  }

  const handleNext = () => {
    playSFX('click')
    if (activeTab === 'instruments') {
      setCurrentInstIndex(prev => (prev < instruments.length - 1 ? prev + 1 : 0))
    } else {
      setCurrentSongIndex(prev => (prev < songs.length - 1 ? prev + 1 : 0))
    }
  }

  // Visual SVG illustrations for instruments when local images are placeholders
  const renderInstrumentIllustration = (inst) => {
    const name = inst.nama.toLowerCase()
    let icon = '🎸'
    let bgGradient = 'from-amber-400 to-amber-600'

    if (name.includes('kendang') || name.includes('tifa') || name.includes('bedug') || name.includes('dol') || name.includes('terbang')) {
      icon = '🥁'
      bgGradient = 'from-rose-500 to-amber-700'
    } else if (name.includes('suling') || name.includes('saluang') || name.includes('bangsing') || name.includes('serunai') || name.includes('fu') || name.includes('tahuri') || name.includes('toleat') || name.includes('terompet')) {
      icon = '🎺'
      bgGradient = 'from-emerald-400 to-teal-700'
    } else if (name.includes('karinding')) {
      icon = '🪕'
      bgGradient = 'from-amber-600 to-yellow-800'
    } else if (name.includes('sasando')) {
      icon = '🪗'
      bgGradient = 'from-cyan-500 to-blue-700'
    }

    return (
      <div className={`w-44 h-44 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr ${bgGradient} p-4 flex flex-col items-center justify-center shadow-2xl border-4 border-amber-200 relative overflow-hidden`}>
        {/* Batik pattern overlay circle */}
        <div className="absolute inset-2 border-2 border-dashed border-white/40 rounded-2xl pointer-events-none" />
        <span className="text-7xl sm:text-8xl filter drop-shadow-lg select-none">
          {icon}
        </span>
        <span className="mt-2 text-xs font-black text-white/90 uppercase tracking-widest bg-black/20 px-3 py-0.5 rounded-full">
          {inst.rumpun}
        </span>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="wood-panel bg-amber-50 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden relative shadow-2xl my-auto"
      >
        {/* Top Header of Modal */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white flex items-center justify-between border-b-4 border-amber-800 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl filter drop-shadow">
              {provinsi.badge || '🏛️'}
            </span>
            <div>
              <h2 className="text-lg sm:text-2xl font-black tracking-wide leading-tight">
                {provinsi.nama}
              </h2>
              <span className="text-[11px] sm:text-xs text-amber-200 font-bold">
                Ibu Kota: {provinsi.ibukota || 'Nusantara'}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSFX('click')
              stopAudio()
              onClose()
            }}
            className="w-9 h-9 rounded-full bg-amber-900/80 hover:bg-amber-950 text-white font-black flex items-center justify-center border-2 border-amber-300 shadow-md cursor-pointer"
            title="Tutup Stage"
          >
            <FaTimes className="text-base" />
          </motion.button>
        </div>

        {/* Tab Switcher: Alat Musik vs Lagu Daerah */}
        <div className="flex border-b-2 border-amber-300 bg-amber-200/60 p-1.5 gap-2">
          <button
            onClick={() => {
              playSFX('click')
              setActiveTab('instruments')
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'instruments'
                ? 'bg-amber-500 text-stone-900 shadow-game border-2 border-amber-600'
                : 'text-stone-700 hover:bg-amber-300/60'
            }`}
          >
            <span>Alat Musik Tradisional ({instruments.length})</span>
          </button>

          {songs.length > 0 && (
            <button
              onClick={() => {
                playSFX('click')
                setActiveTab('songs')
              }}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'songs'
                  ? 'bg-amber-500 text-stone-900 shadow-game border-2 border-amber-600'
                  : 'text-stone-700 hover:bg-amber-300/60'
              }`}
            >
              <span>Lagu Daerah ({songs.length})</span>
            </button>
          )}
        </div>

        {/* Modal Main Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center">
          {activeTab === 'instruments' ? (
            /* Instrument View with Slide Navigation */
            currentInstrument ? (
              <div className="w-full flex flex-col items-center text-center">
                {/* Navigation Carousel Arrows & Interactive Instrument Stage */}
                <div className="w-full flex items-center justify-between gap-2 sm:gap-4 my-2">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={handlePrev}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full btn-game-gold text-stone-900 font-black flex items-center justify-center text-lg shadow-md border-2 border-amber-300 flex-shrink-0 cursor-pointer"
                    title="Sebelumnya"
                  >
                    <FaChevronLeft />
                  </motion.button>

                  {/* Instrument Illustration Stage with Tap-to-Play & Framer Motion Wobble */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={isWobbling ? {
                        rotate: [-6, 6, -5, 5, -2, 2, 0],
                        scale: [1, 1.08, 0.98, 1.05, 1],
                        transition: { duration: 0.8, repeat: 1 }
                      } : {
                        scale: [1, 1.02, 1],
                        transition: { duration: 3, repeat: Infinity }
                      }}
                      onClick={() => {
                        playSFX('click')
                        triggerInstrumentPlay(currentInstrument)
                      }}
                      className="cursor-pointer relative group"
                      title="Klik untuk bunyikan alat musik!"
                    >
                      {renderInstrumentIllustration(currentInstrument)}

                      {/* Tap to Play badge badge */}
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-900 text-amber-200 rounded-full text-[11px] font-black border border-yellow-300 shadow-md flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <FaHandPointUp className="text-yellow-400 animate-pulse" />
                        <span>Ketuk Bunyikan!</span>
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={handleNext}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full btn-game-gold text-stone-900 font-black flex items-center justify-center text-lg shadow-md border-2 border-amber-300 flex-shrink-0 cursor-pointer"
                    title="Berikutnya"
                  >
                    <FaChevronRight />
                  </motion.button>
                </div>

                {/* Instrument Metadata Details */}
                <div className="mt-6 w-full max-w-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-200 text-amber-900 border border-amber-400">
                      Rumpun: {currentInstrument.rumpun}
                    </span>
                    <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-400">
                      Cara Main: {currentInstrument.cara_main}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">
                    {currentInstrument.nama}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed bg-amber-100/70 p-3 rounded-2xl border border-amber-300">
                    {currentInstrument.deskripsi}
                  </p>

                  {currentInstrument.suara_karakter && (
                    <p className="mt-2 text-[11px] text-amber-900 font-semibold italic">
                      🔊 Karakter Suara: "{currentInstrument.suara_karakter}"
                    </p>
                  )}

                  {/* Play Sound Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playSFX('click')
                      triggerInstrumentPlay(currentInstrument)
                    }}
                    className="mt-4 px-6 py-2.5 rounded-2xl btn-game-emerald text-white font-black text-sm flex items-center justify-center gap-2 mx-auto shadow-md"
                  >
                    <FaVolumeUp />
                    <span>Dengarkan Bunyi Instrumen</span>
                  </motion.button>

                  {/* Slider dots pagination */}
                  {instruments.length > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {instruments.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            playSFX('click')
                            setCurrentInstIndex(idx)
                          }}
                          className={`w-3 h-3 rounded-full transition-all ${
                            idx === currentInstIndex
                              ? 'bg-amber-600 w-6'
                              : 'bg-amber-300 hover:bg-amber-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-stone-500 py-8">Belum ada data alat musik untuk provinsi ini.</p>
            )
          ) : (
            /* Song View */
            currentSong ? (
              <div className="w-full flex flex-col items-center text-center max-w-lg">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-6xl text-white shadow-xl border-4 border-amber-300 mb-4">
                  🎵
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-amber-950">
                  {currentSong.judul}
                </h3>
                {currentSong.pencipta_lagu && (
                  <p className="text-xs font-bold text-amber-800 mt-1">
                    Pencipta: {currentSong.pencipta_lagu}
                  </p>
                )}

                {currentSong.lirik_potongan && (
                  <div className="mt-4 p-4 bg-amber-100 rounded-2xl border-2 border-amber-300 w-full text-xs sm:text-sm font-medium text-stone-800 italic leading-relaxed">
                    "{currentSong.lirik_potongan}"
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSFX('click')
                    triggerSongPlay(currentSong)
                  }}
                  className="mt-5 px-6 py-3 rounded-2xl btn-game-gold text-stone-900 font-black text-sm flex items-center gap-2 shadow-md"
                >
                  <FaPlay /> Putar Cuplikan Lagu Daerah
                </motion.button>

                {/* Song pagination */}
                {songs.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-5">
                    {songs.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playSFX('click')
                          setCurrentSongIndex(idx)
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          idx === currentSongIndex
                            ? 'bg-amber-600 text-white'
                            : 'bg-amber-200 text-stone-800'
                        }`}
                      >
                        {s.judul}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-stone-500 py-8">Belum ada lagu daerah tercatat.</p>
            )
          )}
        </div>

        {/* Bottom Footer: Direct Quiz Button */}
        <div className="p-3 sm:p-4 bg-amber-200/90 border-t-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left text-xs text-amber-900 font-bold hidden sm:block">
            💡 Sudah memahami materi provinsi ini?
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playSFX('click')
              stopAudio()
              onStartQuiz(provinsi)
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl btn-game-maroon text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-game border-2 border-rose-300 cursor-pointer"
          >
            <FaQuestionCircle className="text-base" />
            <span>Uji Pemahaman (Kuis Materi Ini)</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
