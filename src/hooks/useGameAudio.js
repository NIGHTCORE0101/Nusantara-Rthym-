import { useState, useRef, useCallback } from 'react'

// Import semua file MP3 sebagai URL — Vite akan resolve path dan hash file saat build
// File di src/assets/ bisa di-import, berbeda dengan public/ yang tidak bisa
import kacapiUrl          from '../assets/audio/instruments/kacapi.mp3?url'
import kendangUrl         from '../assets/audio/instruments/kendang.mp3?url'
import karidingUrl        from '../assets/audio/instruments/karinding.mp3?url'
import toleatUrl          from '../assets/audio/instruments/toleat.mp3?url'
import sulingUrl          from '../assets/audio/instruments/suling.mp3?url'
import sampekUrl          from '../assets/audio/instruments/sampek.mp3?url'
import kesoKesoUrl        from '../assets/audio/instruments/keso_keso.mp3?url'
import tifaUrl            from '../assets/audio/instruments/tifa.mp3?url'
import saluangUrl         from '../assets/audio/instruments/saluang.mp3?url'
import terbangUrl         from '../assets/audio/instruments/terbang.mp3?url'
import sasandoUrl         from '../assets/audio/instruments/sasando.mp3?url'
import bedugUrl           from '../assets/audio/instruments/bedug.mp3?url'
import dolUrl             from '../assets/audio/instruments/dol.mp3?url'
import fuUrl              from '../assets/audio/instruments/fu.mp3?url'
import kendangBeleqUrl    from '../assets/audio/instruments/kendang_beleq.mp3?url'
import manukDadaliUrl     from '../assets/audio/songs/manuk_dadali.mp3?url'
import gundulPaculUrl     from '../assets/audio/songs/gundul_pacul.mp3?url'
import amparAmparUrl      from '../assets/audio/songs/ampar_ampar_pisang.mp3?url'
import anginMamiriUrl     from '../assets/audio/songs/angin_mamiri.mp3?url'
import apuseUrl           from '../assets/audio/songs/apuse.mp3?url'
import rasaSayangeUrl     from '../assets/audio/songs/rasa_sayange.mp3?url'
import bungongJeumpaUrl   from '../assets/audio/songs/bungong_jeumpa.mp3?url'
import butetUrl           from '../assets/audio/songs/butet.mp3?url'
import kicirKicirUrl      from '../assets/audio/songs/kicir_kicir.mp3?url'
import meyongMeyongUrl    from '../assets/audio/songs/meyong_meyong.mp3?url'
import garudaPancasilaUrl from '../assets/audio/songs/garuda_pancasila.mp3?url'
import rayuanPulauUrl     from '../assets/audio/songs/rayuan_pulau_kelapa.mp3?url'
import majuTakGentarUrl   from '../assets/audio/songs/maju_tak_gentar.mp3?url'
import ibuKartiniUrl      from '../assets/audio/songs/ibu_kita_kartini.mp3?url'
import bagimuNegeriUrl    from '../assets/audio/songs/bagimu_negeri.mp3?url'
import hariMerdekaUrl     from '../assets/audio/songs/hari_merdeka.mp3?url'
import gugurBungaUrl      from '../assets/audio/songs/gugur_bunga.mp3?url'
import tanahAirkuUrl      from '../assets/audio/songs/tanah_airku.mp3?url'
import bangunPemudiUrl    from '../assets/audio/songs/bangun_pemudi_pemuda.mp3?url'
import bubuyBulanUrl      from '../assets/audio/songs/bubuy_bulan.mp3?url'
import gambangSulingUrl   from '../assets/audio/songs/gambang_suling.mp3?url'
import yamkoRambeUrl      from '../assets/audio/songs/yamko_rambe_yamko.mp3?url'
import sinanggarTuloUrl   from '../assets/audio/songs/sinanggar_tulo.mp3?url'
import jaliJaliUrl        from '../assets/audio/songs/jali_jali.mp3?url'
import anakKambingUrl     from '../assets/audio/songs/anak_kambing_saya.mp3?url'
import tongSarakahUrl     from '../assets/audio/songs/tong_sarakah.mp3?url'
import lalanBelekUrl      from '../assets/audio/songs/lalan_belek.mp3?url'
import ayoMamaUrl         from '../assets/audio/songs/ayo_mama.mp3?url'
import indonesiaRayaUrl   from '../assets/audio/songs/indonesia_raya.mp3?url'
import haloBandungUrl     from '../assets/audio/songs/halo_halo_bandung.mp3?url'
import berkibarUrl        from '../assets/audio/songs/berkibarlah_benderaku.mp3?url'
import dariSabangUrl      from '../assets/audio/songs/dari_sabang_sampai_merauke.mp3?url'
import syukurUrl          from '../assets/audio/songs/syukur.mp3?url'
import satuNusaUrl        from '../assets/audio/songs/satu_nusa_satu_bangsa.mp3?url'
import mengheningkanUrl   from '../assets/audio/songs/mengheningkan_cipta.mp3?url'
import desakuUrl          from '../assets/audio/songs/desaku.mp3?url'
import indonesiaPusakaUrl from '../assets/audio/songs/indonesia_pusaka.mp3?url'
import nyiurHijauUrl      from '../assets/audio/songs/nyiur_hijau.mp3?url'
import hymneGuruUrl       from '../assets/audio/songs/hymne_guru.mp3?url'

// Map: path dari data.json → URL hasil resolusi Vite
const AUDIO_MAP = {
  '/audio/instruments/kacapi.mp3':        kacapiUrl,
  '/audio/instruments/kendang.mp3':       kendangUrl,
  '/audio/instruments/karinding.mp3':     karidingUrl,
  '/audio/instruments/toleat.mp3':        toleatUrl,
  '/audio/instruments/suling.mp3':        sulingUrl,
  '/audio/instruments/sampek.mp3':        sampekUrl,
  '/audio/instruments/keso_keso.mp3':     kesoKesoUrl,
  '/audio/instruments/tifa.mp3':          tifaUrl,
  '/audio/instruments/saluang.mp3':       saluangUrl,
  '/audio/instruments/terbang.mp3':       terbangUrl,
  '/audio/instruments/sasando.mp3':       sasandoUrl,
  '/audio/instruments/bedug.mp3':         bedugUrl,
  '/audio/instruments/dol.mp3':           dolUrl,
  '/audio/instruments/fu.mp3':            fuUrl,
  '/audio/instruments/kendang_beleq.mp3': kendangBeleqUrl,
  '/audio/songs/manuk_dadali.mp3':        manukDadaliUrl,
  '/audio/songs/gundul_pacul.mp3':        gundulPaculUrl,
  '/audio/songs/ampar_ampar_pisang.mp3':  amparAmparUrl,
  '/audio/songs/angin_mamiri.mp3':        anginMamiriUrl,
  '/audio/songs/apuse.mp3':              apuseUrl,
  '/audio/songs/rasa_sayange.mp3':        rasaSayangeUrl,
  '/audio/songs/bungong_jeumpa.mp3':      bungongJeumpaUrl,
  '/audio/songs/butet.mp3':              butetUrl,
  '/audio/songs/kicir_kicir.mp3':        kicirKicirUrl,
  '/audio/songs/meyong_meyong.mp3':      meyongMeyongUrl,
  '/audio/songs/garuda_pancasila.mp3':    garudaPancasilaUrl,
  '/audio/songs/rayuan_pulau_kelapa.mp3': rayuanPulauUrl,
  '/audio/songs/maju_tak_gentar.mp3':     majuTakGentarUrl,
  '/audio/songs/ibu_kita_kartini.mp3':    ibuKartiniUrl,
  '/audio/songs/bagimu_negeri.mp3':       bagimuNegeriUrl,
  '/audio/songs/hari_merdeka.mp3':        hariMerdekaUrl,
  '/audio/songs/gugur_bunga.mp3':         gugurBungaUrl,
  '/audio/songs/tanah_airku.mp3':         tanahAirkuUrl,
  '/audio/songs/bangun_pemudi_pemuda.mp3': bangunPemudiUrl,
  '/audio/songs/bubuy_bulan.mp3':          bubuyBulanUrl,
  '/audio/songs/gambang_suling.mp3':        gambangSulingUrl,
  '/audio/songs/yamko_rambe_yamko.mp3':    yamkoRambeUrl,
  '/audio/songs/sinanggar_tulo.mp3':       sinanggarTuloUrl,
  '/audio/songs/jali_jali.mp3':            jaliJaliUrl,
  '/audio/songs/anak_kambing_saya.mp3':    anakKambingUrl,
  '/audio/songs/tong_sarakah.mp3':         tongSarakahUrl,
  '/audio/songs/lalan_belek.mp3':          lalanBelekUrl,
  '/audio/songs/ayo_mama.mp3':             ayoMamaUrl,
  '/audio/songs/indonesia_raya.mp3':       indonesiaRayaUrl,
  '/audio/songs/halo_halo_bandung.mp3':    haloBandungUrl,
  '/audio/songs/berkibarlah_benderaku.mp3': berkibarUrl,
  '/audio/songs/dari_sabang_sampai_merauke.mp3': dariSabangUrl,
  '/audio/songs/syukur.mp3':               syukurUrl,
  '/audio/songs/satu_nusa_satu_bangsa.mp3': satuNusaUrl,
  '/audio/songs/mengheningkan_cipta.mp3':  mengheningkanUrl,
  '/audio/songs/desaku.mp3':               desakuUrl,
  '/audio/songs/indonesia_pusaka.mp3':     indonesiaPusakaUrl,
  '/audio/songs/nyiur_hijau.mp3':          nyiurHijauUrl,
  '/audio/songs/hymne_guru.mp3':           hymneGuruUrl,
}

function resolveUrl(path) {
  return AUDIO_MAP[path] ?? null
}

export function useGameAudio() {
  const [bgmEnabled, setBgmEnabled] = useState(true)
  const [sfxEnabled] = useState(true)
  const [isPlayingVoice, setIsPlayingVoice] = useState(false)
  const [currentPlayingTitle, setCurrentPlayingTitle] = useState(null)

  // Satu Audio instance yang di-reuse — tidak pernah buat new Audio() baru
  const audioElRef = useRef(null)
  // Counter untuk membatalkan callback dari play sebelumnya
  const playIdRef = useRef(0)
  const audioCtxRef = useRef(null)
  const bgmIntervalRef = useRef([])
  const isBgmOnRef = useRef(false)

  // Inisialisasi satu Audio element permanen
  const getAudioEl = useCallback(() => {
    if (!audioElRef.current) {
      audioElRef.current = new Audio()
      audioElRef.current.volume = 0.9
    }
    return audioElRef.current
  }, [])

  // ── AudioContext (hanya untuk SFX & BGM sintetis) ─────────────
  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (AC) audioCtxRef.current = new AC()
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  // ── SFX Sintetis ──────────────────────────────────────────────
  const playSynthSound = useCallback((type) => {
    try {
      const ctx = getCtx()
      if (!ctx) return
      const now = ctx.currentTime

      if (type === 'click') {
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = 'sine'; o.frequency.setValueAtTime(800, now)
        o.frequency.exponentialRampToValueAtTime(120, now + 0.08)
        g.gain.setValueAtTime(0.4, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.09)
      } else if (type === 'correct') {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          const o = ctx.createOscillator(), g = ctx.createGain()
          o.type = 'triangle'; o.frequency.setValueAtTime(f, now + i * 0.08)
          g.gain.setValueAtTime(0, now + i * 0.08)
          g.gain.linearRampToValueAtTime(0.3, now + i * 0.08 + 0.02)
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35)
          o.connect(g); g.connect(ctx.destination)
          o.start(now + i * 0.08); o.stop(now + i * 0.08 + 0.36)
        })
      } else if (type === 'wrong') {
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = 'sawtooth'; o.frequency.setValueAtTime(180, now)
        o.frequency.linearRampToValueAtTime(110, now + 0.25)
        g.gain.setValueAtTime(0.3, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.29)
      } else if (type === 'pop') {
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = 'sine'; o.frequency.setValueAtTime(600, now)
        o.frequency.exponentialRampToValueAtTime(300, now + 0.06)
        g.gain.setValueAtTime(0.3, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.08)
      }
    } catch (_) {}
  }, [getCtx])

  // ── Hentikan audio yang sedang main ──────────────────────────
  const stopAudio = useCallback(() => {
    // Batalkan semua callback play yang pending
    playIdRef.current += 1

    const el = audioElRef.current
    if (el) {
      el.pause()
      el.src = ''
      // Hapus semua listener lama
      el.onended = null
      el.onerror = null
    }
    setIsPlayingVoice(false)
    setCurrentPlayingTitle(null)
  }, [])

  // ── Putar MP3 lewat satu Audio element permanen ───────────────
  const playSample = useCallback((dataPath, title = '', category = 'pluck') => {
    // Naikkan playId — semua callback dari play sebelumnya akan diabaikan
    const myPlayId = ++playIdRef.current

    // Stop audio lama dengan paksa sebelum mulai yang baru
    const el = getAudioEl()
    el.pause()
    el.onended = null
    el.onerror = null
    el.src = ''

    setIsPlayingVoice(false)
    setCurrentPlayingTitle(null)

    // Resolve path ke URL Vite
    const url = resolveUrl(dataPath)

    if (!url) {
      console.warn('[Audio] Tidak ada URL untuk:', dataPath)
      setIsPlayingVoice(true)
      setCurrentPlayingTitle(title)
      playSynthSound(category)
      setTimeout(() => {
        if (playIdRef.current === myPlayId) {
          setIsPlayingVoice(false)
          setCurrentPlayingTitle(null)
        }
      }, 2500)
      return
    }

    // Pasang listener baru — hanya aktif jika playId masih sama
    el.onended = () => {
      if (playIdRef.current === myPlayId) {
        setIsPlayingVoice(false)
        setCurrentPlayingTitle(null)
      }
    }

    el.onerror = () => {
      if (playIdRef.current === myPlayId) {
        setIsPlayingVoice(false)
        setCurrentPlayingTitle(null)
        playSynthSound(category)
      }
    }

    el.src = url
    el.load()

    // Resume AudioContext (browser policy)
    getCtx()

    const playPromise = el.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (playIdRef.current === myPlayId) {
            setIsPlayingVoice(true)
            setCurrentPlayingTitle(title)
          } else {
            // Play ini sudah dibatalkan oleh play berikutnya
            el.pause()
          }
        })
        .catch((err) => {
          if (playIdRef.current === myPlayId) {
            console.warn('[Audio] play() gagal:', err.message)
            setIsPlayingVoice(false)
            setCurrentPlayingTitle(null)
            playSynthSound(category)
          }
        })
    } else {
      if (playIdRef.current === myPlayId) {
        setIsPlayingVoice(true)
        setCurrentPlayingTitle(title)
      }
    }
  }, [getAudioEl, playSynthSound, getCtx])

  // ── SFX tactile ───────────────────────────────────────────────
  const playSFX = useCallback((name) => {
    getCtx()
    playSynthSound(name)
  }, [getCtx, playSynthSound])

  // ── BGM Gamelan Sintetis ──────────────────────────────────────
  const startSynthBGM = useCallback(() => {
    const ctx = getCtx()
    if (!ctx || isBgmOnRef.current) return
    isBgmOnRef.current = true
    let step = 0
    const scale = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25]
    const id = setInterval(() => {
      if (!isBgmOnRef.current) { clearInterval(id); return }
      try {
        const now = ctx.currentTime
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = 'triangle'
        o.frequency.setValueAtTime(scale[step % scale.length], now)
        const vol = isPlayingVoice ? 0.025 : 0.065
        g.gain.setValueAtTime(vol, now)
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)
        o.connect(g); g.connect(ctx.destination)
        o.start(now); o.stop(now + 0.85)
        step = (step + 1) % 12
      } catch (_) {}
    }, 700)
    bgmIntervalRef.current.push(id)
  }, [getCtx, isPlayingVoice])

  const stopBGM = useCallback(() => {
    isBgmOnRef.current = false
    bgmIntervalRef.current.forEach(clearInterval)
    bgmIntervalRef.current = []
  }, [])

  const toggleBGM = useCallback(() => {
    setBgmEnabled(prev => {
      if (prev) stopBGM()
      else startSynthBGM()
      return !prev
    })
  }, [startSynthBGM, stopBGM])

  // ── Kategori instrumen untuk synth fallback ───────────────────
  const getInstrumentCategory = useCallback((name = '', rumpun = '') => {
    const n = name.toLowerCase(), r = rumpun.toLowerCase()
    if (r.includes('kordofon') || n.includes('kacapi') || n.includes('siter') || n.includes('sasando') || n.includes('sampek') || n.includes('keso'))
      return n.includes('sasando') ? 'sasando' : n.includes('sampek') ? 'sampek' : 'kacapi'
    if (r.includes('membranofon') || n.includes('kendang') || n.includes('tifa') || n.includes('bedug') || n.includes('dol') || n.includes('terbang'))
      return 'drum'
    if (r.includes('aerofon') || n.includes('suling') || n.includes('saluang') || n.includes('serunai') || n.includes('bangsing') || n.includes('fu') || n.includes('tahuri') || n.includes('toleat') || n.includes('terompet'))
      return 'flute'
    return 'pluck'
  }, [])

  return {
    bgmEnabled,
    sfxEnabled,
    isPlayingVoice,
    currentPlayingTitle,
    toggleBGM,
    setSfxEnabled: () => {},
    playSFX,
    playSample,
    stopAudio,
    getInstrumentCategory,
    startSynthBGM,
    stopBGM,
    resumeAudioContext: getCtx,
  }
}
