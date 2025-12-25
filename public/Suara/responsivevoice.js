(function () {
  var w = typeof window !== 'undefined' ? window : undefined;
  var synth = w && w.speechSynthesis ? w.speechSynthesis : null;
  var voices = [];
  var ready = false;
  var playing = false;
  var unlocked = false;
  var currentUtterance = null;
  var refreshTimer = null;
  var defaultVoicePref = 'id-ID';

  function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }
  function clean(t) { return String(t || '').replace(/[\u0000-\u001F\u007F]/g, '').trim(); }

  function loadVoices(cb) {
    if (!synth) { voices = []; ready = false; if (cb) cb(); return; }
    var list = synth.getVoices();
    if (list && list.length) { voices = list.slice(0); ready = true; if (cb) cb(); return; }
    if (typeof synth.onvoiceschanged !== 'undefined') {
      var fn = function () { voices = synth.getVoices() || []; ready = voices.length > 0; synth.onvoiceschanged = null; if (cb) cb(); };
      synth.onvoiceschanged = fn;
    }
    if (!refreshTimer) {
      refreshTimer = setInterval(function () {
        var v = synth.getVoices();
        if (v && v.length) { voices = v.slice(0); ready = true; clearInterval(refreshTimer); refreshTimer = null; if (cb) cb(); }
      }, 200);
    }
  }

  function matchVoice(name) {
    if (!voices.length) return null;
    var n = name ? String(name).toLowerCase() : null;
    var pref = defaultVoicePref ? String(defaultVoicePref).toLowerCase() : null;
    var g = voices.find(function (x) { var L = (x.lang || '').toLowerCase(); var Nm = (x.name || '').toLowerCase(); return /google/.test(Nm) && (L.indexOf('id') === 0 || L.indexOf('in') === 0); });
    if (g) return g;
    var m = voices.find(function (x) { var L = (x.lang || '').toLowerCase(); var Nm = (x.name || '').toLowerCase(); return /microsoft/.test(Nm) && (L.indexOf('id') === 0 || L.indexOf('in') === 0); });
    if (m) return m;
    if (pref) {
      var byPref = voices.find(function (x) { var L = (x.lang || '').toLowerCase(); var Nm = (x.name || '').toLowerCase(); return Nm === pref || L.indexOf(pref) === 0; });
      if (byPref) return byPref;
    }
    if (n) {
      var byName = voices.find(function (x) { return (x.name || '').toLowerCase() === n; });
      if (byName) return byName;
      var byNamePart = voices.find(function (x) { return (x.name || '').toLowerCase().indexOf(n) !== -1; });
      if (byNamePart) return byNamePart;
      var byLang = voices.find(function (x) { return (x.lang || '').toLowerCase().indexOf(n) === 0; });
      if (byLang) return byLang;
    }
    var id = voices.find(function (x) { var L = (x.lang || '').toLowerCase(); var Nm = (x.name || '').toLowerCase(); return L.indexOf('id') === 0 || L.indexOf('in') === 0 || Nm.indexOf('indones') !== -1 || Nm.indexOf('bahasa') !== -1; });
    if (id) return id;
    return voices[0] || null;
  }

  var ctx = null;
  function ensureCtx() {
    if (ctx) return ctx;
    var C = w && (w.AudioContext || w.webkitAudioContext);
    if (!C) return null;
    ctx = new C();
    return ctx;
  }

  function beep() {
    var c = ensureCtx();
    if (!c) return;
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = 'sine';
    o.frequency.value = 880;
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(0.2, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.25);
    o.connect(g);
    g.connect(c.destination);
    o.start();
    setTimeout(function () { try { o.stop(); } catch (_) {} }, 280);
  }

  function speak(text, voiceName, params) {
    var t = clean(text).replace(/\s*,\s*/g, '. ');
    if (!t) { cancel(); return; }
    if (!synth) { beep(); return; }
    if (!ready) { return loadVoices(function () { speak(t, voiceName, params); }); }
    if (!unlocked) {
      try { var u0 = new SpeechSynthesisUtterance(' '); u0.volume = 0; synth.speak(u0); } catch (_) {}
      unlocked = true;
      var c = ensureCtx(); if (c && c.state === 'suspended' && c.resume) { try { c.resume(); } catch (_) {} }
    }
    synth.cancel();
    var u = new SpeechSynthesisUtterance(t);
    var v = matchVoice(voiceName);
    if (v) u.voice = v;
    var p = params || {};
    if (p.rate == null) p.rate = 0.92;
    if (p.pitch == null) p.pitch = 1;
    if (p.volume == null) p.volume = 1;
    u.rate = clamp(+p.rate || 1, 0.5, 2);
    u.pitch = clamp(+p.pitch || 1, 0, 2);
    u.volume = clamp(+p.volume || 1, 0, 1);
    if (p.lang) { u.lang = p.lang; } else { u.lang = (v && v.lang) ? v.lang : 'id-ID'; }
    u.onstart = function () { playing = true; if (p.onstart) p.onstart(); };
    u.onend = function () { playing = false; currentUtterance = null; if (p.onend) p.onend(); };
    u.onerror = function () { playing = false; currentUtterance = null; if (p.onerror) p.onerror(); };
    currentUtterance = u;
    synth.speak(u);
  }

  function cancel() {
    if (synth) try { synth.cancel(); } catch (_) {}
    playing = false;
    currentUtterance = null;
  }

  function pause() { if (synth) try { synth.pause(); } catch (_) {} }
  function resume() { if (synth) try { synth.resume(); } catch (_) {} }
  function isPlaying() { return playing; }

  function allowSpeech() {
    unlocked = true;
    var c = ensureCtx();
    if (c && c.state === 'suspended' && c.resume) { try { c.resume(); } catch (_) {} }
    if (synth) { try { var u0 = new SpeechSynthesisUtterance(' '); u0.volume = 0; synth.speak(u0); } catch (_) {} }
  }

  function setDefaultVoice(pref) { defaultVoicePref = pref || null; }
  function getVoices() { return voices.slice(0); }
  function onReady(cb) { if (ready) { cb(); } else { loadVoices(cb); } }

  loadVoices();
  if (w) {
    w.responsiveVoice = {
      speak: speak,
      cancel: cancel,
      pause: pause,
      resume: resume,
      isPlaying: isPlaying,
      allowSpeech: allowSpeech,
      setDefaultVoice: setDefaultVoice,
      getVoices: getVoices,
      ready: onReady
    };
  }
})();
