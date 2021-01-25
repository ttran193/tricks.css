//Side-Nav click handler
//Save ref to current section?
//set current section height animation to 0%
//set next section height animation to 100
const resetSelectedAttribute = (e) => {
  const btns = document.getElementsByClassName("circle-btn")
  const pages = document.getElementsByClassName("scroll-page")
  let selected;

  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    const page = pages[i];
    if (page.attributes["selected"].value) {
      selected = page
      if (e && 
        (e.deltaY > 0 && parseInt(page.dataset.showPage) === pages.length ||
        e.deltaY < 0 && parseInt(page.dataset.showPage) === 1 )) return selected
        
      if (btn.attributes["selected"].value) btn.setAttribute("selected", "")
      page.setAttribute("selected", "")
    }
  }

  return selected;
}

//Event handler
const handlePages = e => {
  e.preventDefault();
  const { selected, href } = e.currentTarget.attributes
  if (Boolean(selected.value)) return

  const prevPageNumber = parseInt(resetSelectedAttribute().dataset.showPage)
  const page = document.getElementById(href.value)
  page.setAttribute("selected", true)
  if (prevPageNumber > parseInt(page.dataset.showPage)) {
    page.animate({ bottom: ["100%", 0] }, 600)
    selected.value = true
    return;
  } else {
    page.animate({
      top: ["100%", 0],
      height: [0, "100%"]
    }, 600)
    selected.value = true
    return
  }
}

const handleScroll = e => {
  const prevPageNumber = parseInt(resetSelectedAttribute(e).dataset.showPage);
  let nextPage,
      sideNavBtn;
  if (e.deltaY > 0 && prevPageNumber < 3) {
    nextPage = document.querySelector(`[data-show-page="${prevPageNumber + 1 }"]`);
    sideNavBtn = document.querySelector(`[href="${nextPage.attributes.id.value}"`)
    debugger
    sideNavBtn.setAttribute("selected", true)
    nextPage.setAttribute("selected", true)
    nextPage.animate({
      top: ["100%", 0],
      height: [0, "100%"]
    }, 600)
    
    
  } else if (e.deltaY < 0 && prevPageNumber > 1) {
    nextPage = document.querySelector(`[data-show-page="${prevPageNumber - 1}"`);
    sideNavBtn = document.querySelector(`[href="${nextPage.attributes.id.value}"`)
    debugger
    sideNavBtn.setAttribute("selected", true)
    nextPage.setAttribute("selected", true)
    nextPage.animate({ bottom: ["100%", 0] }, 600)
  }
}

// Add event listener to each <div> tag
const scrollLinks = document.getElementById("side-nav").querySelectorAll("div")
for (let i = 0; i < scrollLinks.length; i++) {
  const element = scrollLinks[i];
  element.addEventListener("click", handlePages)
}

// Add event listner to scroll
document.addEventListener("wheel", handleScroll)