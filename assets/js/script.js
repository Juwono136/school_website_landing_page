const navContainer = document.querySelector('.navbar-container')
const navMenu = document.querySelector('.nav-list')
const navToggle = document.querySelector('.menu-toggle')
const navClose = document.querySelector('.menu-close')

// ===== Humberger Menu =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.style.top = '-360px';
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.style.top = '';
    })
}


// ===== Changing Navmenu when scrolling =====
function scrollNavMenu() {
    if (this.scrollY >= 200) {
        navContainer.style.width = '100%';
        navContainer.style.marginTop = '0px';
        navContainer.style.borderRadius = '0px';
    } else {
        navContainer.style.width = '90%';
        navContainer.style.marginTop = '20px';
        navContainer.style.borderRadius = '10px';
    }
}

window.addEventListener('scroll', scrollNavMenu)

// ===== Active Navmenu =====
const sections = document.querySelectorAll('section')
const navLinks = document.querySelectorAll("header nav.nav-list ul li a")
const heroBtns = document.getElementById('info_btn')
const infoSection = document.getElementById('info_section')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY
        let offset = sec.offsetTop
        let height = sec.offsetHeight
        let id = sec.getAttribute('id')

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('nav-active')
                document.querySelector('header nav.nav-list ul li a[href*=' + id + ']').classList.add('nav-active')
            })
        }
    })
}

heroBtns.addEventListener('click', () => {
    infoSection.scrollIntoView({ behavior: 'smooth' })
})


// ===== Image slider - Sarpras Section =====
let slides = document.querySelectorAll('.sarpras-img img')
let btns = document.querySelectorAll('.sarpras-btn')
let slidesInfo = document.querySelectorAll('.sarpras-info')
let currentSlide = 1

// manual slider
let manualNav = function (manual) {
    const elementRemoveClass = [...slides, ...slidesInfo, ...btns]

    elementRemoveClass.forEach((e) => {
        e.classList.remove('active')
    })

    slides[manual].classList.add('active');
    btns[manual].classList.add('active');
    slidesInfo[manual].classList.add('active');
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        manualNav(i)
        currentSlide = i
    })
})

// autoplay slider
let repeatSlider = function () {
    let active = document.getElementsByClassName('active')
    let i = 1

    let repeater = () => {
        setTimeout(function () {
            [...active].forEach((activeSlide) => {
                activeSlide.classList.remove('active')
            })

            slides[i].classList.add('active')
            btns[i].classList.add('active')
            slidesInfo[i].classList.add('active')
            i++

            if (slides.length == i) {
                i = 0
            }

            if (i >= slides.length) {
                return
            }

            repeater()
        }, 20000)
    }
    repeater()
}

repeatSlider()


// ===== Carousel - Ekstra Section =====
const ekstraSlides = document.querySelectorAll('.ekstra-slide')
const ekstraSlider = document.querySelector('.ekstra-slider')
let ekstraIndex = 0
let ekstraPauseBtn = false

function moveRightBtnEkstra() {
    ekstraSlides[ekstraIndex].className = "ekstra-slide"
    ekstraIndex = (ekstraIndex + 1) % ekstraSlides.length
    ekstraSlides[ekstraIndex].className = "ekstra-slide ekstra-active"
    let Xvalue = -320 * ekstraIndex

    // mobile responsive
    if (window.innerWidth <= 576) {
        Xvalue = -120 * ekstraIndex;
    }

    ekstraSlider.style.transform = `translateX(${Xvalue}px)`
}

function moveLeftBtnEkstra() {
    ekstraSlides[ekstraIndex].className = "ekstra-slide"
    ekstraIndex = (ekstraIndex - 1 + ekstraSlides.length) % ekstraSlides.length
    ekstraSlides[ekstraIndex].className = "ekstra-slide ekstra-active"
    let Xvalue = -320 * ekstraIndex

    // mobile responsive
    if (window.innerWidth <= 576) {
        Xvalue = -120 * ekstraIndex;
    }

    ekstraSlider.style.transform = `translateX(${Xvalue}px)`
}

const ekstraInterval = setInterval(() => {
    if (!ekstraPauseBtn) {
        moveRightBtnEkstra()
    }
}, 3000)

function ekstraPlayPause() {
    let ekstraIcon = document.querySelector(".ekstra-icon")

    if (ekstraIcon.classList.contains('bx-pause')) {
        ekstraIcon.classList.remove('bx-pause')
        ekstraIcon.classList.add('bx-play')
        ekstraPauseBtn = true
    } else {
        ekstraIcon.classList.remove('bx-play')
        ekstraIcon.classList.add('bx-pause')
        ekstraPauseBtn = false
    }
}

// ===== Popup Image Gallery - Gallery Section =====
const galleryImages = document.querySelectorAll('.gallery-img')
const galleryPopup = document.querySelector('.gallery-popup')
const galleryCloseBtn = document.querySelector('.gallery-close-btn')
const galleryImageName = document.querySelector('.gallery-image-name')
const galleryLargeImage = document.querySelector('.gallery-large-img')
const galleryImageIndex = document.querySelector('.gallery-index')
const galleryLeftArrow = document.querySelector('.left-arrow')
const galleryRightArrow = document.querySelector('.right-arrow')
const galleryBtnMore = document.querySelector('.gallery-btn-more')

const galleryInfoImage = [
    "Para Staf dan Guru SMPS Fioretti",
    "Kegiatan Apel Pagi di Hari Jumat",
    "Pelaksanaan ANBK SMPS Fioretti",
    "Graduation/Perpisahan Kelas 9",
    "Praktikum di Lab IPA",
    "Penampilan Musik dari Kelas 9 di SD Fioretti"
];

let galleryIndex = 0

const updateImageGallery = (i) => {
    let galleryPath = `/assets/img/gallery-section/gallery${i + 1}.jpg`
    galleryLargeImage.src = galleryPath
    galleryImageName.innerHTML = galleryInfoImage[i]
    galleryImageIndex.innerHTML = `0${i + 1}`
    galleryIndex = i
    toggleArrowsVisibility()
}

const toggleArrowsVisibility = () => {
    galleryLeftArrow.style.visibility = galleryIndex > 0 ? 'visible' : 'hidden';
    galleryRightArrow.style.visibility = galleryIndex < galleryImages.length - 1 ? 'visible' : 'hidden';
}

galleryImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        updateImageGallery(i)
        galleryPopup.classList.toggle('gallery-active')
    })
})

galleryBtnMore.addEventListener('click', () => {
    updateImageGallery(4);
    galleryPopup.classList.add('gallery-active');
});

galleryCloseBtn.addEventListener('click', () => {
    galleryPopup.classList.toggle('gallery-active')
})

galleryLeftArrow.addEventListener('click', () => {
    if (galleryIndex > 0) {
        updateImageGallery(galleryIndex - 1)
    }
})

galleryRightArrow.addEventListener('click', () => {
    if (galleryIndex < galleryImages.length - 1) {
        updateImageGallery(galleryIndex + 1)
    }
})

// ===== Scroll up button =====
function scrollUp() {
    const scrollUp = document.getElementById('scroll_up');
    if (this.scrollY >= 450) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollUp);