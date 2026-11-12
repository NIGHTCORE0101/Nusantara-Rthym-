import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaPlay, 
  FaMapMarkedAlt, 
  FaQuestionCircle, 
  FaMusic, 
  FaGraduationCap,
  FaAward,
  FaInfoCircle
} from 'react-icons/fa'

export default function GameTitleScreen({ onSelectMode, playSFX }) {
  const [hasStarted, setHasStarted] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)

  const handleStart = () => {
    playSFX('click')
    setHasStarted(true)
  }

  const handleChooseMode = (mode) => {
    playSFX('click')
    onSelectMode(mode)
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Decorative Traditional Clouds / Ornaments */}
      <div className="absolute top-4 left-6 text-6xl opacity-20 pointer-events-none select-none animate-bounce-soft">
        ☁️
      </div>
      <div className="absolute top-12 right-10 text-5xl opacity-20 pointer-events-none select-none animate-bounce-soft delay-1000">
        ☁️
      </div>
      <div className="absolute bottom-6 left-10 text-6xl opacity-25 pointer-events-none select-none">
        🌿
      </div>
      <div className="absolute bottom-6 right-10 text-6xl opacity-25 pointer-events-none select-none">
        🌺
      </div>

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          /* Marbel Style Intro Screen */
          <motion.div
            key="splash"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -30 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-xl w-full z-10"
          >
            {/* Mascot Banner / Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="relative mb-4"
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-2 shadow-2xl flex items-center justify-center border-4 border-amber-800">
                <div className="w-full h-full rounded-full bg-amber-900/90 flex flex-col items-center justify-center text-5xl sm:text-6xl border-2 border-yellow-300">
                  🥁
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 text-3xl sm:text-4xl filter drop-shadow">
                🇮🇩
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-black text-amber-900 tracking-wider drop-shadow-sm leading-tight">
              NUSANTARA<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700">
                RHYTHM
              </span>
            </h1>

            <p className="mt-2 text-sm sm:text-base font-semibold text-amber-800 max-w-md bg-amber-200/80 px-4 py-1.5 rounded-full border border-amber-400 shadow-sm">
              🎵 Game Edukasi Musik Nusantara & PWA Interaktif
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-amber-900">
              <span className="px-3 py-1 bg-white/80 rounded-full shadow-sm border border-amber-300">
                🎯 Siswa SMA Kelas 10
              </span>
              <span className="px-3 py-1 bg-white/80 rounded-full shadow-sm border border-amber-300">
                38 Provinsi
              </span>
              <span className="px-3 py-1 bg-white/80 rounded-full shadow-sm border border-amber-300">
                5 Rumpun
              </span>
            </div>

            {/* Big Pulsing Start Button (Marbel Style) */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 8px 0 #92400e, 0 10px 20px rgba(180, 83, 9, 0.4)",
                  "0 8px 0 #92400e, 0 14px 28px rgba(180, 83, 9, 0.7)",
                  "0 8px 0 #92400e, 0 10px 20px rgba(180, 83, 9, 0.4)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              onClick={handleStart}
              className="mt-8 px-8 py-4 sm:px-12 sm:py-5 rounded-3xl btn-game-gold text-stone-900 font-extrabold text-xl sm:text-2xl tracking-wider flex items-center gap-3 border-4 border-yellow-200 cursor-pointer"
            >
              <FaPlay className="text-xl sm:text-2xl text-stone-900" />
              <span>MULAI BELAJAR</span>
            </motion.button>

            {/* Credit Info */}
            <button
              onClick={() => {
                playSFX('click')
                setShowInfoModal(true)
              }}
              className="mt-6 flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
            >
              <FaInfoCircle /> Tentang Aplikasi & Petunjuk Belajar
            </button>
          </motion.div>
        ) : (
          /* Mode Selection Screen (3 Main Cards) */
          <motion.div
            key="modes"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-4xl z-10 flex flex-col items-center"
          >
            <div className="text-center mb-6">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-800 bg-amber-200/90 px-4 py-1 rounded-full border border-amber-300">
                Pilih Mode Permainan
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-amber-950 mt-1">
                Eksplorasi Budaya Nusantara
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              {/* Card 1: Jelajah Budaya Nusantara */}
              <motion.div
                whileHover={{ scale: 1.04, translateY: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleChooseMode('provinces')}
                className="wood-panel bg-gradient-to-b from-amber-50 to-amber-100 p-5 rounded-3xl cursor-pointer flex flex-col items-center text-center relative group overflow-hidden border-4 border-amber-600 hover:border-amber-500 transition-all"
              >
                <div className="absolute top-2 right-3 text-2xl opacity-20 group-hover:opacity-40 transition">
                  🏛️
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-4xl shadow-md border-2 border-amber-700 mb-3 group-hover:rotate-6 transition-transform">
                  🗺️
                </div>
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-900 mb-1">
                  Materi Interaktif
                </span>
                <h3 className="text-xl font-black text-stone-900 leading-tight">
                  Jelajah Budaya Nusantara
                </h3>
                <p className="mt-2 text-xs text-stone-700 leading-relaxed">
                  Kenali alat musik tradisional 38 provinsi, pelajari 5 rumpun sumber bunyi, dan dengarkan sampel suara langsung!
                </p>
                <button className="mt-4 w-full py-2.5 rounded-xl btn-game-gold text-stone-900 font-extrabold text-sm flex items-center justify-center gap-2">
                  <FaMapMarkedAlt /> Buka Peta Materi
                </button>
              </motion.div>

              {/* Card 2: Tantangan Kuis Audio (Quizizz Style) */}
              <motion.div
                whileHover={{ scale: 1.04, translateY: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleChooseMode('quiz')}
                className="wood-panel bg-gradient-to-b from-rose-50 to-rose-100 p-5 rounded-3xl cursor-pointer flex flex-col items-center text-center relative group overflow-hidden border-4 border-rose-600 hover:border-rose-500 transition-all"
              >
                <div className="absolute top-2 right-3 text-2xl opacity-20 group-hover:opacity-40 transition">
                  ⚡
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-400 flex items-center justify-center text-4xl shadow-md border-2 border-rose-800 mb-3 group-hover:rotate-6 transition-transform">
                  🎯
                </div>
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-rose-500 text-white mb-1">
                  10 Soal Acak
                </span>
                <h3 className="text-xl font-black text-stone-900 leading-tight">
                  Tantangan Kuis Audio
                </h3>
                <p className="mt-2 text-xs text-stone-700 leading-relaxed">
                  Tebak bunyi instrumen, identifikasi rumpun bunyi, dan sambung lirik lagu daerah dengan timer 15 detik!
                </p>
                <button className="mt-4 w-full py-2.5 rounded-xl btn-game-maroon text-white font-extrabold text-sm flex items-center justify-center gap-2">
                  <FaQuestionCircle /> Mulai Kuis
                </button>
              </motion.div>

              {/* Card 3: Galeri 20 Lagu Wajib Nasional */}
              <motion.div
                whileHover={{ scale: 1.04, translateY: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleChooseMode('national')}
                className="wood-panel bg-gradient-to-b from-emerald-50 to-emerald-100 p-5 rounded-3xl cursor-pointer flex flex-col items-center text-center relative group overflow-hidden border-4 border-emerald-600 hover:border-emerald-500 transition-all"
              >
                <div className="absolute top-2 right-3 text-2xl opacity-20 group-hover:opacity-40 transition">
                  🇮🇩
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center text-4xl shadow-md border-2 border-emerald-800 mb-3 group-hover:rotate-6 transition-transform">
                  🎵
                </div>
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-600 text-white mb-1">
                  20 Lagu Nasional
                </span>
                <h3 className="text-xl font-black text-stone-900 leading-tight">
                  Galeri Lagu Wajib
                </h3>
                <p className="mt-2 text-xs text-stone-700 leading-relaxed">
                  Daftar lengkap 20 lagu kebangsaan & nasional beserta nama pencipta dan pemutar audio interaktif!
                </p>
                <button className="mt-4 w-full py-2.5 rounded-xl btn-game-emerald text-white font-extrabold text-sm flex items-center justify-center gap-2">
                  <FaMusic /> Buka Katalog
                </button>
              </motion.div>
            </div>

            {/* Back Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                playSFX('click')
                setHasStarted(false)
              }}
              className="mt-6 px-6 py-2 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-sm border-2 border-stone-400 shadow-sm"
            >
              ⬅ Kembali ke Halaman Depan
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="wood-panel bg-amber-50 p-6 max-w-md w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3">
                <h3 className="text-xl font-black text-amber-950 flex items-center gap-2">
                  <FaGraduationCap className="text-amber-600" /> Tentang NusantaraRhythm
                </h3>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 text-stone-900 font-black flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 text-xs sm:text-sm text-stone-800 space-y-3 leading-relaxed">
                <p>
                  <strong>NusantaraRhythm</strong> adalah aplikasi game edukasi musik tradisional Indonesia berbasis Progressive Web App (PWA) yang ditujukan untuk siswa SMA Kelas 10.
                </p>
                <div className="p-3 bg-amber-100 rounded-xl border border-amber-300">
                  <h4 className="font-bold text-amber-950 mb-1">Fitur Utama:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Visual & interaksi 2D Marbel Budaya Nusantara.</li>
                    <li>Sistem audio berlapis (BGM gamelan lembut + SFX taktil).</li>
                    <li>Audio ducking otomatis saat suara instrumen diputar.</li>
                    <li>Tap-to-Play dengan efek getar instrumen (Framer Motion).</li>
                    <li>Kuis ala Quizizz 10 soal acak dengan timer 15 detik.</li>
                    <li>Katalog 20 Lagu Wajib Nasional beserta penciptanya.</li>
                    <li>Dukungan PWA offline & Add to Home Screen.</li>
                  </ul>
                </div>
                <p className="text-[11px] text-stone-500 italic text-center">
                  Dirancang untuk pembelajaran seni musik yang menyenangkan dan interaktif.
                </p>
              </div>

              <button
                onClick={() => setShowInfoModal(false)}
                className="mt-5 w-full py-2.5 rounded-xl btn-game-gold text-stone-900 font-black text-sm"
              >
                Tutup Petunjuk
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
