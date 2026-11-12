import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoSMA from '../assets/images/logo-sma-budi-mulia.jpg'

/**
 * SplashScreen — dua tahap:
 *   Tahap 1: Logo + nama sekolah SMA Budi Mulia (3 detik)
 *   Tahap 2: Nama guru + mata pelajaran (3 detik)
 *   → masuk ke aplikasi
 */
export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(1) // 1 | 2 | 'done'

  useEffect(() => {
    // Tahap 1 → 2 setelah 3.5 detik
    const t1 = setTimeout(() => setPhase(2), 3500)
    // Tahap 2 → done setelah 3.5 + 3.5 = 7 detik
    const t2 = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 7000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)' }}
      onClick={() => {
        // Klik untuk skip ke fase berikutnya
        if (phase === 1) setPhase(2)
        else if (phase === 2) { setPhase('done'); onComplete() }
      }}
    >
      {/* Dekorasi lingkaran background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #e63946, transparent)' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #457b9d, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 border-2 border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 border border-white" />
      </div>

      <AnimatePresence mode="wait">

        {/* ═══════════════════════════════════════
            FASE 1 — LOGO + NAMA SEKOLAH
        ═══════════════════════════════════════ */}
        {phase === 1 && (
          <motion.div
            key="phase1"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center text-center px-6 select-none"
          >
            {/* Logo sekolah */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="relative mb-6"
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
                style={{ boxShadow: '0 0 40px rgba(230, 57, 70, 0.4), 0 0 80px rgba(230, 57, 70, 0.1)' }}
              >
                <img
                  src={logoSMA}
                  alt="Logo SMA Budi Mulia"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Lingkaran cahaya */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
                style={{ margin: '-8px' }}
              />
            </motion.div>

            {/* Nama sekolah */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-white/60 mb-1">
                Selamat Datang di
              </p>
              <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow-lg leading-tight">
                SMA
              </h1>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight"
                style={{ color: '#e63946', textShadow: '0 0 20px rgba(230,57,70,0.5)' }}
              >
                BUDI MULIA
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-4 text-xs sm:text-sm text-white/50 font-medium tracking-wider"
            >
              🏫 Mencetak Generasi Berprestasi
            </motion.p>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex gap-2"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  className="w-2 h-2 rounded-full bg-white/60"
                />
              ))}
            </motion.div>

            {/* Skip hint */}
            <p className="absolute bottom-6 text-xs text-white/25">Ketuk untuk lanjut</p>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════
            FASE 2 — NAMA GURU + MATA PELAJARAN
        ═══════════════════════════════════════ */}
        {phase === 2 && (
          <motion.div
            key="phase2"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center text-center px-6 select-none max-w-md"
          >
            {/* Ikon guru + logo kecil */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 180, damping: 12 }}
              className="relative mb-6"
            >
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-5xl sm:text-6xl border-2 border-white/20"
                style={{
                  background: 'linear-gradient(135deg, #e63946, #c1121f)',
                  boxShadow: '0 0 30px rgba(230, 57, 70, 0.4)'
                }}
              >
                🎓
              </div>
              {/* Logo kecil di sudut */}
              <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full overflow-hidden border-2 border-white/40 shadow-lg">
                <img src={logoSMA} alt="Logo SMA" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-3"
            >
              Dipersembahkan oleh
            </motion.p>

            {/* Nama guru */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-2xl sm:text-4xl font-black text-white drop-shadow-lg"
            >
              Ade Suarsa, S.Sn
            </motion.h2>

            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="h-px bg-white/20 my-4"
            />

            {/* Mata pelajaran */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-2"
            >
              {['🎵 Seni Musik Sunda', '📖 Bahasa Sunda'].map((mp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.15 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-bold"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.9)'
                  }}
                >
                  {mp}
                </motion.div>
              ))}
            </motion.div>

            {/* Pesan masuk ke app */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-8 px-6 py-3 rounded-2xl font-black text-sm text-stone-900 flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #ffd60a, #e9c46a)' }}
            >
              <span>🎵</span>
              <span>Memasuki NusantaraRhythm...</span>
            </motion.div>

            {/* Loading bar */}
            <div className="mt-4 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #e63946, #ffd60a)' }}
              />
            </div>

            {/* Skip hint */}
            <p className="absolute bottom-6 text-xs text-white/25">Ketuk untuk masuk</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}


