import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaCheck, FaTimes, FaClock, FaTrophy, FaRedo } from 'react-icons/fa'

export default function QuizEngine({ quizData, playSample, stopAudio, playSFX, isPlayingVoice, currentPlayingTitle }) {
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [isFinished, setIsFinished] = useState(false)
  const [results, setResults] = useState([])

  // Shuffle & pick 10 questions from all provinces
  useEffect(() => {
    const all = quizData.flatMap(prov =>
      (prov.kuis || []).map(q => ({ ...q, _provinsi: prov.nama }))
    )
    const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, 10)
    setQuestions(shuffled)
    setCurrentIdx(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setIsFinished(false)
    setResults([])
    setTimeLeft(15)
  }, [quizData])

  const currentQ = questions[currentIdx]

  // Timer
  useEffect(() => {
    if (isAnswered || isFinished || !currentQ) return
    if (timeLeft <= 0) {
      handleAnswer(-1) // time out = wrong
      return
    }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, isAnswered, isFinished, currentQ])

  // Auto-play audio for each question
  useEffect(() => {
    if (currentQ?.audio_soal) {
      playSample(currentQ.audio_soal, currentQ.soal, 'melody')
    }
    setTimeLeft(15)
    setSelectedAnswer(null)
    setIsAnswered(false)
    return () => stopAudio()
  }, [currentIdx, currentQ])

  const handleAnswer = useCallback((idx) => {
    if (isAnswered) return
    setIsAnswered(true)
    setSelectedAnswer(idx)
    stopAudio()

    const isCorrect = idx === currentQ?.jawaban_benar
    if (isCorrect) {
      playSFX('correct')
      setScore(prev => prev + 10)
    } else {
      playSFX('wrong')
    }
    setResults(prev => [...prev, {
      soal: currentQ?.soal,
      pilihan: currentQ?.pilihan,
      jawaban_benar: currentQ?.jawaban_benar,
      pilihan_user: idx,
      benar: isCorrect,
      provinsi: currentQ?._provinsi
    }])
  }, [isAnswered, currentQ, playSFX, stopAudio])

  const handleNext = () => {
    playSFX('click')
    if (currentIdx + 1 >= questions.length) {
      setIsFinished(true)
      stopAudio()
    } else {
      setCurrentIdx(prev => prev + 1)
    }
  }

  if (!currentQ && !isFinished) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-amber-800 font-bold text-lg animate-pulse">Mempersiapkan Kuis...</div>
      </div>
    )
  }

  if (isFinished) {
    const totalQ = results.length
    const benar = results.filter(r => r.benar).length
    const percent = Math.round((benar / totalQ) * 100)
    let badge = '🥉'
    let pesan = 'Terus berlatih ya!'
    if (percent >= 80) { badge = '🥇'; pesan = 'Luar biasa! Kamu juara!' }
    else if (percent >= 60) { badge = '🥈'; pesan = 'Bagus! Sedikit lagi sempurna.' }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto px-4 py-8"
      >
        <div className="wood-panel bg-amber-50 p-6 rounded-3xl text-center shadow-2xl border-4 border-amber-500">
          <div className="text-6xl mb-2">{badge}</div>
          <h2 className="text-3xl font-black text-amber-950 mb-1">Kuis Selesai!</h2>
          <p className="text-sm text-amber-800 mb-4">{pesan}</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-emerald-100 rounded-2xl p-3 border-2 border-emerald-300">
              <div className="text-2xl font-black text-emerald-800">{benar}</div>
              <div className="text-xs font-bold text-emerald-700">Benar</div>
            </div>
            <div className="bg-rose-100 rounded-2xl p-3 border-2 border-rose-300">
              <div className="text-2xl font-black text-rose-800">{totalQ - benar}</div>
              <div className="text-xs font-bold text-rose-700">Salah</div>
            </div>
            <div className="bg-amber-100 rounded-2xl p-3 border-2 border-amber-400">
              <div className="text-2xl font-black text-amber-800">{score}</div>
              <div className="text-xs font-bold text-amber-700">Skor</div>
            </div>
          </div>

          {/* Results Review */}
          <div className="text-left space-y-2 max-h-60 overflow-y-auto pr-1 mb-5">
            {results.map((r, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border-2 text-xs ${
                  r.benar ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-base">{r.benar ? '✅' : '❌'}</span>
                  <div>
                    <p className="font-bold text-stone-800 mb-1">{r.soal}</p>
                    <p className="text-stone-600">
                      Jawaban benar: <span className="font-bold text-emerald-700">{r.pilihan?.[r.jawaban_benar]}</span>
                      {!r.benar && r.pilihan_user >= 0 && (
                        <> · Pilihanmu: <span className="font-bold text-rose-700">{r.pilihan?.[r.pilihan_user] || 'Waktu Habis'}</span></>
                      )}
                      {r.pilihan_user === -1 && <span className="font-bold text-orange-600"> · ⏱️ Waktu Habis</span>}
                    </p>
                    <p className="text-stone-400 mt-0.5">📍 {r.provinsi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              playSFX('click')
              // Re-shuffle
              const all = quizData.flatMap(prov =>
                (prov.kuis || []).map(q => ({ ...q, _provinsi: prov.nama }))
              )
              const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, 10)
              setQuestions(shuffled)
              setCurrentIdx(0)
              setScore(0)
              setSelectedAnswer(null)
              setIsAnswered(false)
              setIsFinished(false)
              setResults([])
              setTimeLeft(15)
            }}
            className="w-full py-3 rounded-2xl btn-game-gold text-stone-900 font-black text-base flex items-center justify-center gap-2"
          >
            <FaRedo /> Ulangi Kuis
          </button>
        </div>
      </motion.div>
    )
  }

  const timerPercent = (timeLeft / 15) * 100
  const timerColor = timeLeft > 8 ? 'bg-emerald-500' : timeLeft > 4 ? 'bg-amber-500' : 'bg-rose-600'

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header: soal ke- dan timer */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-amber-800 bg-amber-200 px-3 py-1 rounded-full border border-amber-400">
          Soal {currentIdx + 1} / {questions.length}
        </span>
        <div className="flex items-center gap-2">
          <FaClock className={`text-sm ${timeLeft <= 5 ? 'text-rose-600 animate-pulse' : 'text-amber-700'}`} />
          <span className={`text-lg font-black w-7 text-center ${timeLeft <= 5 ? 'text-rose-600' : 'text-amber-900'}`}>
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full bg-amber-100 rounded-full h-2 mb-4 border border-amber-300">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${timerColor}`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>

      {/* Soal Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="wood-panel bg-amber-50 p-5 rounded-3xl mb-4 shadow-lg border-2 border-amber-400"
        >
          {/* Tipe soal badge */}
          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-900 uppercase mb-2 inline-block">
            {currentQ.tipe === 'tebak_bunyi' ? '🔊 Tebak Bunyi'
              : currentQ.tipe === 'tebak_rumpun' ? '🎸 Tebak Rumpun'
              : '🎵 Sambung Lirik'}
          </span>
          <p className="text-sm sm:text-base font-semibold text-stone-800 leading-relaxed mt-1">
            {currentQ.soal}
          </p>

          {/* Audio play button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSFX('click')
              playSample(currentQ.audio_soal, currentQ.soal, 'melody')
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs flex items-center gap-2 border-2 border-amber-700"
          >
            <FaPlay className="text-xs" />
            {isPlayingVoice && currentPlayingTitle === currentQ.soal ? 'Sedang Diputar...' : 'Putar Audio Soal'}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Pilihan Jawaban */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQ.pilihan?.map((p, idx) => {
          const isCorrect = idx === currentQ.jawaban_benar
          const isSelected = idx === selectedAnswer
          let btnClass = 'bg-white/95 hover:bg-amber-50 border-2 border-amber-300 text-stone-800'
          if (isAnswered) {
            if (isCorrect) btnClass = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-900 font-black'
            else if (isSelected && !isCorrect) btnClass = 'bg-rose-100 border-2 border-rose-400 text-rose-800'
            else btnClass = 'bg-white/50 border-2 border-stone-200 text-stone-400'
          }

          return (
            <motion.button
              key={idx}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.97 } : {}}
              onClick={() => {
                if (!isAnswered) {
                  playSFX('click')
                  handleAnswer(idx)
                }
              }}
              className={`wood-panel p-3.5 rounded-2xl text-sm font-bold text-left transition-all flex items-center gap-2 cursor-pointer ${btnClass}`}
            >
              <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black bg-amber-200 text-amber-900 flex-shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-tight">{p}</span>
              {isAnswered && isCorrect && <FaCheck className="text-emerald-600 text-sm flex-shrink-0" />}
              {isAnswered && isSelected && !isCorrect && <FaTimes className="text-rose-500 text-sm flex-shrink-0" />}
            </motion.button>
          )
        })}
      </div>

      {/* Next button (after answer) */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <div className={`p-3 rounded-2xl mb-3 text-sm font-bold text-center ${
              selectedAnswer === currentQ?.jawaban_benar
                ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                : 'bg-rose-100 text-rose-800 border-2 border-rose-300'
            }`}>
              {selectedAnswer === currentQ?.jawaban_benar
                ? '🎉 Benar! +10 poin'
                : selectedAnswer === -1
                  ? `⏱️ Waktu habis! Jawaban: ${currentQ?.pilihan?.[currentQ?.jawaban_benar]}`
                  : `❌ Kurang tepat. Jawaban: ${currentQ?.pilihan?.[currentQ?.jawaban_benar]}`}
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-2xl btn-game-gold text-stone-900 font-black text-sm"
            >
              {currentIdx + 1 >= questions.length ? '🏆 Lihat Hasil' : 'Soal Berikutnya →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
