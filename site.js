// Ana sayfa banner'i: 6 sn'de bir sonraki, oklar ve noktalar, fare ustundeyken durur, hareketi azalt ayarina uyar.
(function () {
  var s = document.querySelector(".slider");
  if (!s) return;
  var sl = s.querySelectorAll(".slide"), dots = s.querySelectorAll(".dots button"), i = 0, t = null;
  var az = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function git(n) {
    i = (n + sl.length) % sl.length;
    sl.forEach(function (e, k) { e.classList.toggle("on", k === i); if (k === i) e.removeAttribute("aria-hidden"); else e.setAttribute("aria-hidden", "true"); });
    dots.forEach(function (d, k) { if (k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
  }
  function basla() { if (!az) { durdur(); t = setInterval(function () { git(i + 1); }, 6000); } }
  function durdur() { if (t) clearInterval(t); t = null; }
  dots.forEach(function (d, k) { d.addEventListener("click", function () { git(k); basla(); }); });
  s.querySelector(".prev").addEventListener("click", function () { git(i - 1); basla(); });
  s.querySelector(".next").addEventListener("click", function () { git(i + 1); basla(); });
  s.addEventListener("mouseenter", durdur);
  s.addEventListener("mouseleave", basla);
  var x0 = null;
  s.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  s.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { git(i + (dx < 0 ? 1 : -1)); basla(); }
    x0 = null;
  });
  basla();
})();
