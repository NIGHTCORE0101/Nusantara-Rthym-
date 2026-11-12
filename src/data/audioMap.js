/**
 * audioMap.js
 * Import semua file MP3 dari src/assets/audio/ sebagai URL.
 * Vite akan memproses dan meng-hash file ini saat build,
 * dan men-serve langsung dari src/ saat development.
 */

// ── Instrumen ─────────────────────────────────────────────────
import kacapiUrl      from '../assets/audio/instruments/kacapi.mp3?url'
import kendangUrl     from '../assets/audio/instruments/kendang.mp3?url'
import karidingUrl    from '../assets/audio/instruments/karinding.mp3?url'
import toleatUrl      from '../assets/audio/instruments/toleat.mp3?url'
import sulingUrl      from '../assets/audio/instruments/suling.mp3?url'
import sampekUrl      from '../assets/audio/instruments/sampek.mp3?url'
import kesoKesoUrl    from '../assets/audio/instruments/keso_keso.mp3?url'
import tifaUrl        from '../assets/audio/instruments/tifa.mp3?url'
import saluangUrl     from '../assets/audio/instruments/saluang.mp3?url'
import terbangUrl     from '../assets/audio/instruments/terbang.mp3?url'
import sasandoUrl     from '../assets/audio/instruments/sasando.mp3?url'
import bedugUrl       from '../assets/audio/instruments/bedug.mp3?url'
import dolUrl         from '../assets/audio/instruments/dol.mp3?url'
import fuUrl          from '../assets/audio/instruments/fu.mp3?url'
import kendangBeleqUrl from '../assets/audio/instruments/kendang_beleq.mp3?url'

// ── Lagu Daerah ───────────────────────────────────────────────
import manukDadaliUrl    from '../assets/audio/songs/manuk_dadali.mp3?url'
import gundulPaculUrl    from '../assets/audio/songs/gundul_pacul.mp3?url'
import amparAmparUrl     from '../assets/audio/songs/ampar_ampar_pisang.mp3?url'
import anginMamiriUrl    from '../assets/audio/songs/angin_mamiri.mp3?url'
import apuseUrl          from '../assets/audio/songs/apuse.mp3?url'
import rasaSayangeUrl    from '../assets/audio/songs/rasa_sayange.mp3?url'
import bungongJeumpaUrl  from '../assets/audio/songs/bungong_jeumpa.mp3?url'
import butetUrl          from '../assets/audio/songs/butet.mp3?url'
import kicirKicirUrl     from '../assets/audio/songs/kicir_kicir.mp3?url'
import meyongMeyongUrl   from '../assets/audio/songs/meyong_meyong.mp3?url'

// ── Lagu Nasional ─────────────────────────────────────────────
import garudaPancasilaUrl  from '../assets/audio/songs/garuda_pancasila.mp3?url'
import rayuanPulauUrl      from '../assets/audio/songs/rayuan_pulau_kelapa.mp3?url'
import majuTakGentarUrl    from '../assets/audio/songs/maju_tak_gentar.mp3?url'
import ibuKitaKartiniUrl   from '../assets/audio/songs/ibu_kita_kartini.mp3?url'
import bagimuNegeriUrl     from '../assets/audio/songs/bagimu_negeri.mp3?url'
import hariMerdekaUrl      from '../assets/audio/songs/hari_merdeka.mp3?url'
import gugurBungaUrl       from '../assets/audio/songs/gugur_bunga.mp3?url'
import tanahAirkuUrl       from '../assets/audio/songs/tanah_airku.mp3?url'
import bangunPemudiUrl     from '../assets/audio/songs/bangun_pemudi_pemuda.mp3?url'

// ── Map: path dari data.json → URL yang di-resolve Vite ───────
const audioUrlMap = {
  // Instrumen
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

  // Lagu Daerah
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

  // Lagu Nasional
  '/audio/songs/garuda_pancasila.mp3':    garudaPancasilaUrl,
  '/audio/songs/rayuan_pulau_kelapa.mp3': rayuanPulauUrl,
  '/audio/songs/maju_tak_gentar.mp3':     majuTakGentarUrl,
  '/audio/songs/ibu_kita_kartini.mp3':    ibuKitaKartiniUrl,
  '/audio/songs/bagimu_negeri.mp3':       bagimuNegeriUrl,
  '/audio/songs/hari_merdeka.mp3':        hariMerdekaUrl,
  '/audio/songs/gugur_bunga.mp3':         gugurBungaUrl,
  '/audio/songs/tanah_airku.mp3':         tanahAirkuUrl,
  '/audio/songs/bangun_pemudi_pemuda.mp3': bangunPemudiUrl,
}

/**
 * Konversi path dari data.json ke URL yang bisa di-fetch oleh browser.
 * Kalau path tidak ada di map, kembalikan path aslinya sebagai fallback.
 */
export function getAudioUrl(path) {
  return audioUrlMap[path] ?? path
}

export default audioUrlMap
