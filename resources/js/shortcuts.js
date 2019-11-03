// Toggle Menu
function openMenu() {
  $(".menu").removeClass("lowerIndex");
  $(".menu").removeClass("hidden");
  d("shortcutLink").setAttribute('placeholder', 'https://example.com')
  d("shortcutName").setAttribute('placeholder', 'Example Website')
}
function closeMenu() {
  if (!d("addShortcutMenu").classList.contains("hidden")) {
    setTimeout(function () {
      $(".menu").addClass("lowerIndex");
    }, 500)
    $(".menu").addClass("hidden");
  }
}

var ls = localStorage
var shortcutsData = ls.getItem("shortcuts")
if (shortcutsData) {
  var data = JSON.parse(shortcutsData)
  data.forEach(d=>{
    createShortcut(d)
  })
}

function createShortcut(shortcutObj) {
  var shortcutName = d("shortcutName").value
  var shortcutLink = d("shortcutLink").value
  if (shortcutObj) {
    shortcutName = shortcutObj.name
    shortcutLink = shortcutObj.link
  }
  if (shortcutName && shortcutLink) {
    var data = []
    var shortcutData = ls.getItem("shortcuts")
    if (shortcutData) {
      data = JSON.parse(shortcutsData)
    }
    if (!shortcutObj) {
      data.push({
        name: shortcutName,
        link: shortcutLink
      })
    }
    var obj = JSON.stringify(data)
    ls.setItem("shortcuts", obj)
    var shortcut = $("<a>",{href:shortcutLink,target:'_blank'});
    var shortcutDiv = $('<div>',{class:"shortcutImgBox"});
    var shortcutImage = $("<img>",{src:'/resources/img/shortcut.png',class:'shortcutImg',alt:""});
    var shortcutText = c("p")
    shortcutText.innerHTML = shortcutName // Can't use jquery (I think)
    shortcutText.className = "shortcutText"
    $("#shortcuts").append(shortcut);
    $(shortcut).append(shortcutDiv);
    $(shortcutDiv).append(shortcutImage, shortcutText);
    $(".inputMenu").val('')
    closeMenu();
  }
  else {
    $(".inputMenu").attr('placeholder', 'Je moet hier iets invullen!')
  }
}

var shortcutsA = Array.from(d("shortcuts").querySelectorAll("div"))
shortcutsA.forEach(short=>{
  short.addEventListener("contextmenu", removeShortcut)
})
function removeShortcut(e) {
  e.preventDefault()
  this.outerHTML = ""
}
