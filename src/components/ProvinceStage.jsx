import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaSearch, 
  FaFilter, 
  FaMusic, 
  FaMapMarkerAlt, 
  FaChevronRight,
  FaCheckCircle,
  FaTimes
} from 'react-icons/fa'

export default function ProvinceStage({ 
  provinsiList, 
  rumpunList, 
  onSelectProvince, 
  playSFX 
}) {
  const [selectedRumpun, setSelectedRumpun] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter provinces based on selected rumpun and search query
  const filteredProvinces = useMemo(() => {
    return provinsiList.filter(prov => {
      // Search matching
      const matchesSearch = 
        prov.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prov.ibukota?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prov.alat_musik?.some(a => a.nama.toLowerCase().includes(searchQuery.toLowerCase()))

      if (!matchesSearch) return false

      // Rumpun filter matching
      if (selectedRumpun === 'Semua') return true

      return prov.alat_musik?.some(a => 
        a.rumpun.toLowerCase() === selectedRumpun.toLowerCase()
      )
    })
  }, [provinsiList, selectedRumpun, searchQuery])

  // Get count of instruments for the selected rumpun
  const getInstrumentCount = (prov) => {
    if (selectedRumpun === 'Semua') {
      return prov.alat_musik?.length || 0
    }
    return prov.alat_musik?.filter(a => 
      a.rumpun.toLowerCase() === selectedRumpun.toLowerCase()
    ).length || 0
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-200 border border-amber-400 text-amber-900 text-xs font-extrabold uppercase mb-2 shadow-sm"
        >
          <span>🗺️ Ensiklopedia 2D Interaktif</span>
        </motion.div>
        <h2 className="text-2xl sm:text-4xl font-black text-amber-950">
          Jelajah Musik Nusantara
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-amber-800 max-w-xl mx-auto">
          Pilih provinsi atau saring berdasarkan 5 rumpun sumber bunyi untuk mendengarkan sampel instrumen tradisional.
        </p>
      </div>

      {/* Rumpun Filter Tabs (5 Rumpun Sumber Bunyi) */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-950 uppercase tracking-wider">
            <FaFilter className="text-amber-600" /> Filter Berdasarkan Rumpun Bunyi:
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
            {filteredProvinces.length} Provinsi Ditemukan
          </span>
        </div>

        {/* Horizontal scrollable rumpun chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {rumpunList.map((r) => {
            const isSelected = selectedRumpun.toLowerCase() === r.id.toLowerCase() || 
                               (r.id === 'Semua' && selectedRumpun === 'Semua')
            return (
              <motion.button
                key={r.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSFX('click')
                  setSelectedRumpun(r.id)
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all border-2 shadow-sm cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-stone-900 border-amber-600 shadow-game'
                    : 'bg-white/80 hover:bg-white text-stone-700 border-amber-300 hover:border-amber-400'
                }`}
              >
                <span className="text-base">{r.icon}</span>
                <span>{r.nama}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Rumpun Description Callout */}
        {selectedRumpun !== 'Semua' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 p-3 bg-amber-100/90 rounded-2xl border-2 border-amber-300 text-xs text-amber-900 flex items-start gap-2 shadow-inner"
          >
            <span className="text-xl">
              {rumpunList.find(r => r.id === selectedRumpun)?.icon || '💡'}
            </span>
            <div>
              <strong className="font-extrabold text-amber-950">
                Rumpun {selectedRumpun}:
              </strong>{' '}
              {rumpunList.find(r => r.id === selectedRumpun)?.deskripsi}
            </div>
          </motion.div>
        )}
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-6">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 text-sm" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama provinsi, kota, atau alat musik (contoh: Kacapi, Tifa, Angklung)..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/90 border-2 border-amber-300 focus:border-amber-600 focus:outline-none text-stone-800 placeholder-amber-900/40 text-xs sm:text-sm font-semibold shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 flex items-center justify-center text-xs font-bold"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Province Cards Grid */}
      {filteredProvinces.length === 0 ? (
        <div className="text-center py-12 wood-panel bg-amber-50">
          <span className="text-5xl">🔍</span>
          <h3 className="text-lg font-bold text-amber-950 mt-2">
            Provinsi atau Alat Musik Tidak Ditemukan
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Coba ubah kata kunci pencarian atau pilih rumpun 'Semua Rumpun'.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedRumpun('Semua')
            }}
            className="mt-4 px-4 py-2 rounded-xl btn-game-gold text-stone-900 font-bold text-xs"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredProvinces.map((prov) => {
              const instrumentCount = getInstrumentCount(prov)
              return (
                <motion.div
                  layout
                  key={prov.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.03, translateY: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playSFX('click')
                    onSelectProvince(prov)
                  }}
                  className="wood-panel bg-white/95 rounded-2xl p-4 cursor-pointer relative overflow-hidden border-3 border-amber-500 hover:border-amber-600 transition-all flex flex-col justify-between group"
                >
                  {/* Top Badge & Province Name */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-2xl filter drop-shadow">
                        {prov.badge || '🏛️'}
                      </span>
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        {prov.alat_musik?.length || 0} Instrumen
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-amber-950 group-hover:text-amber-700 transition leading-tight">
                      {prov.nama}
                    </h3>
                    {prov.ibukota && (
                      <p className="text-[11px] text-stone-500 flex items-center gap-1 font-medium mt-0.5">
                        <FaMapMarkerAlt className="text-amber-500 text-[10px]" /> {prov.ibukota}
                      </p>
                    )}
                  </div>

                  {/* Instrument Previews / Chips */}
                  <div className="mt-3 pt-3 border-t border-amber-100">
                    <div className="text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1">
                      <FaMusic className="text-amber-500 text-[10px]" /> Alat Musik Utama:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {prov.alat_musik?.slice(0, 3).map((inst, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200"
                        >
                          {inst.nama}
                        </span>
                      ))}
                      {prov.alat_musik?.length > 3 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-lg bg-amber-200 text-amber-900">
                          +{prov.alat_musik.length - 3} lagi
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Open Stage Action */}
                  <div className="mt-3 pt-2 flex items-center justify-between text-xs font-extrabold text-amber-700 group-hover:text-amber-900 transition">
                    <span>Buka Stage Musik</span>
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
