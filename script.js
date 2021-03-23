(function init() {
    const burger = document.getElementById('burger'),
        header = document.getElementById('header'),
        galleryBtns = document.querySelectorAll('#gallery'),
        nav = document.getElementById('nav'),
        logo = document.getElementById('logo'),
        inners = document.querySelectorAll('#inner'),
        links = document.querySelectorAll('#link'),
        main = document.getElementById('main'),
        sections = document.querySelectorAll('section'),
        bubble = document.querySelector('.bubble')



    const mediaQuery = window.matchMedia('(max-width: 1024px)')
    mediaQuery.addEventListener('change', () => {
        burger.addEventListener('click', () => {
            toggleActive()
            checkNav()
        })
        links.forEach(link => {
            link.addEventListener('click', () => {
                toggleActive()
                checkNav()
                nav.classList.remove('--active')
            })
        })
    })

    console.log(window.innerWidth)
    //navigation
    function checkNav() {
        if (nav.classList.contains('--active')) {
            document.body.style.overflow = 'hidden'
            logo.style.color = "#000"
            inners.forEach(inner => {
                inner.style.backgroundColor = "#000"
            })
        } else {
            document.body.style.overflow = 'auto'
            logo.style.color = ""
            burger.style.backgroundColor = ''
            inners.forEach(inner => {
                inner.style.backgroundColor = ""
            })
        }
    }

    //togglers
    function toggleActive() {
        nav.classList.toggle('--active')
        burger.classList.toggle('--active')
    }

    //header change
    const headerObserverOptions = {
        threshold: '.95'
    }

    const headerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                header.classList.add('--white')
                bubble.style.opacity = ""
            } else {
                header.classList.remove('--white')
                bubble.style.opacity = "0"
            }
        })
    }, headerObserverOptions)

    headerObserver.observe(main)

    //nav bubble

    const sectionsObserverOptions = {
            threshold: .7,
        },
        sectionsForObserver = [sections[0], sections[1], sections[2], sections[3]]

    const sectionsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const activeSection = entry.target.id
            const activeLink = document.querySelector(`[data-link=${activeSection}]`)
            const coords = activeLink.getBoundingClientRect()
            const directions = {
                width: coords.width,
                left: coords.left,
            }
            if (entry.isIntersecting) {
                bubble.style.left = `${directions.left}px`
                bubble.style.width = `${directions.width}px`
            }
        })
    }, sectionsObserverOptions)

    sectionsForObserver.forEach(section => {
        sectionsObserver.observe(section)
    })

    // //masonry grid
    // const masonry = new Macy({
    //     container: '.gallery',
    //     mobileFirst: true,
    // })

})()