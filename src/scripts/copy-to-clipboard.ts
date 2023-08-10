import ClipboardJS from "clipboard"
import button from "@chainlink/design-system/button.module.css"

const clipboard = new ClipboardJS(".copy-iconbutton")

clipboard.on("success", function (e) {
  const oldLabel = e.trigger.innerHTML
  e.trigger.innerHTML = `<img src="/assets/icons/checkCircleIconGrey.svg" />`
  window.setTimeout(function () {
    e.trigger.innerHTML = oldLabel
  }, 2000)
  e.clearSelection()
})

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const codeBlock = entry.target
        entry.target.classList.add("copy-code-button-placeholder-hidden")

        const container = document.createElement("div")
        container.className = "copy-code-button-wrapper"

        const copyButton = document.createElement("button")
        copyButton.className = button.secondary
        copyButton.classList.add(...["copy-iconbutton"])
        copyButton.type = "button"
        const s = (codeBlock as HTMLElement).innerText
        copyButton.setAttribute("data-clipboard-text", s)
        copyButton.innerHTML = `<img src="/assets/icons/copyIcon.svg" alt="copy to clipboard" style="width:16px; height: 16px">`
        copyButton.ariaLabel = "copy to clipboard"

        container.appendChild(copyButton)

        codeBlock.insertAdjacentElement("beforebegin", container)
        observer.unobserve(codeBlock)
      }
    })
  })
  document.querySelectorAll("pre").forEach((codeBlock) => {
    observer.observe(codeBlock)
  })
})
