let t=null;const e={start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")};e.start.addEventListener("click",(()=>{t=setInterval((()=>{var t;t=`#${Math.floor(16777215*Math.random()).toString(16)}`,document.body.style.backgroundColor=`${t}`}),1e3),e.start.setAttribute("disabled","")})),e.stop.addEventListener("click",(()=>{e.start.removeAttribute("disabled"),clearInterval(t)}));
//# sourceMappingURL=01-color-switcher.8e3243d0.js.map
