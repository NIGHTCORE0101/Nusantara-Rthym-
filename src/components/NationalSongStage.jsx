import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaStop, FaMusic } from 'react-icons/fa'

const KATEGORI_COLOR = {
  'Lagu Kebangsaan': 'bg-red-100 text-red-800 border-red-300',
  'Lagu Perjuangan': 'bg-orange-100 text-orange-800 border-orange-300',
  'Lagu Cinta Tanah Air': 'bg-sky-100 text-sky-800 border-sky-300',
  'Lagu Kemerdekaan': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Lagu Penghormatan Tokoh': 'bg-purple-100 text-purple-800 border-purple-300',
  'Lagu Ikrar Kesetiaan': 'bg-indigo-100 text-indigo-800 border-indigo-300',
  'Lagu Mengenang Pahlawan': 'bg-stone-100 text-stone-700 border-stone-300',
  'Lagu Kerinduan Ibu Pertiwi': 'bg-teal-100 text-teal-800 border-teal-300',
  'Lagu Semangat Generasi Bangsa': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'Lagu Peristiwa Sejarah': 'bg-amber-100 text-amber-800 border-amber-300',
  'Lagu Kesatuan Nusantara': 'bg-lime-100 text-lime-800 border-lime-300',
  'Lagu Renungan & Doa': 'bg-rose-100 text-rose-800 border-rose-300',
  'Lagu Sumpah Pemuda': 'bg-blue-100 text-blue-800 border-blue-300',
  'Lagu Upacara Bendera': 'bg-cyan-100 text-cyan-800 border-cyan-300',
  'Lagu Keindahan Alam Nusantara': 'bg-green-100 text-green-800 border-green-300',
  'Lagu Keagungan Tanah Air': 'bg-amber-100 text-amber-900 border-amber-400',
  'Lagu Harmoni Alam Indonesia': 'bg-teal-100 text-teal-900 border-teal-400',
  'Lagu Apresiasi Pendidik Bangsa': 'bg-pink-100 text-pink-800 border-pink-300',
  'Lagu Penghormatan Sang Merah Putih': 'bg-red-50 text-red-700 border-red-200',
}

export default function NationalSongStage({ songs, playSample, stopAudio, playSFX, isPlayingVoice, currentPlayingTitle }) {
  const [activeSong, setActiveSong] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = songs.filter(s =>
    s.judul.toLowerCase().includes(search.toLowerCase()) ||
    s.pencipta.toLowerCase().includes(search.toLowerCase()) ||
    s.kategori.toLowerCase().includes(search.toLowerCase())
  )

  const handlePlay = (song) => {
    if (isPlayingVoice && currentPlayingTitle === song.judul) {
      stopAudio()
      setActiveSong(null)
    } else {
      playSFX('click')
      setActiveSong(song.id)
      playSample(song.audio, song.judul, 'melody')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-200 border border-emerald-400 text-emerald-900 text-xs font-extrabold uppercase mb-2">
          <FaMusic /> Galeri Lagu Wajib Nasional
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-amber-950">
          20 Lagu Nasional Indonesia
        </h2>
        <p className="text-xs sm:text-sm text-amber-800 mt-1 max-w-xl mx-auto">
          Pelajari lirik potongan dan dengarkan audio setiap lagu nasional kebanggaan Indonesia.
        </p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari judul lagu, pencipta, atau kategori..."
          className="w-full px-4 py-3 rounded-2xl bg-white/90 border-2 border-amber-300 focus:border-amber-600 focus:outline-none text-stone-800 placeholder-amber-900/40 text-sm font-semibold shadow-inner"
        />
      </div>

      {/* Song List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((song, i) => {
          const isPlaying = isPlayingVoice && currentPlayingTitle === song.judul
          const catClass = KATEGORI_COLOR[song.kategori] || 'bg-amber-100 text-amber-800 border-amber-300'

          return (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="wood-panel bg-white/95 rounded-2xl p-4 border-2 border-amber-300 hover:border-amber-500 transition-all shadow-sm flex flex-col"
            >
              <div className="flex items-start gap-3">
                {/* Nomor */}
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-stone-900 font-black text-sm flex-shrink-0 border-2 border-amber-700">
                  {song.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black text-amber-950 leading-tight">
                    {song.judul}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium mt-0.5">
                    🎼 {song.pencipta}
                  </p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    ♩ {song.tempo}
                  </p>
                </div>
              </div>

              {/* Kategori badge */}
              <span className={`mt-2 self-start text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${catClass}`}>
                {song.kategori}
              </span>

              {/* Lirik potongan */}
              {song.lirik_utama && (
                <div className="mt-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs italic text-stone-700 leading-relaxed">
                  "{song.lirik_utama}"
                </div>
              )}

              {/* Play button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePlay(song)}
                className={`mt-3 w-full py-2 rounded-xl font-black text-sm flex items-center justify-center gap-2 border-2 transition ${
                  isPlaying
                    ? 'bg-rose-500 hover:bg-rose-400 text-white border-rose-700'
                    : 'btn-game-emerald text-white border-emerald-700'
                }`}
              >
                {isPlaying ? (
                  <><FaStop className="text-xs" /> Hentikan</>
                ) : (
                  <><FaPlay className="text-xs" /> Putar Lagu</>
                )}
              </motion.button>
            </motion.div>
          )
        })}

        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-10 text-amber-800 font-bold">
            Lagu tidak ditemukan. Coba kata kunci lain.
          </div>
        )}
      </div>
    </div>
  )
}
