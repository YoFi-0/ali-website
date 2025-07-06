document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // e.preventDefault(); // Removed to allow default anchor behavior for history
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Smooth scroll can also be purely CSS via `scroll-behavior: smooth;` on <html>
                // For more control or older browser support, JS is an option:
                // window.scrollTo({
                // top: targetSection.offsetTop - 70, // Adjust for fixed header
                // behavior: 'smooth'
                // });

                // Highlight active link
                navLinks.forEach(nav => nav.classList.remove('active-link'));
                this.classList.add('active-link');
            }
        });
    });

    // Intersection Observer for fade-in animations on scroll
    const sections = document.querySelectorAll('section');
    const options = {
        root: null, // viewport
        threshold: 0.1, // 10% of the section is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // observer.unobserve(entry.target); // Optional: stop observing after animation
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust for fixed header height if necessary
            if (pageYOffset >= (sectionTop - sectionHeight / 3 - 70)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active-link');
            }
        });
        // Special case for the top of the page or hero section
        if (pageYOffset < sections[0].offsetTop - 70 ) { // Assuming sections[0] is the first content section after hero
             navLinks.forEach(link => link.classList.remove('active-link'));
             // Optionally highlight a "Home" or the first link if desired
        }
    });

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('header nav ul');

    if (mobileNavToggle && primaryNav) {
        mobileNavToggle.addEventListener('click', () => {
            primaryNav.classList.toggle('nav-active');
            mobileNavToggle.classList.toggle('toggle-animate'); // Animates burger to X

            // Optional: Prevent body scroll when mobile nav is open
            // document.body.classList.toggle('no-scroll');
        });

        // Close mobile nav when a link is clicked
        primaryNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNav.classList.contains('nav-active')) {
                    primaryNav.classList.remove('nav-active');
                    mobileNavToggle.classList.remove('toggle-animate');
                    // document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // Header scroll effect (Removed as header is now always opaque)
    // const header = document.querySelector('header');
    // if(header) {
    //     window.addEventListener('scroll', () => {
    //         if (window.scrollY > 50) {
    //             header.classList.add('scrolled');
    //         } else {
    //             header.classList.remove('scrolled');
    //         }
    //     });
    // }


    // Simple Parallax effect for Hero (optional, can be performance intensive)
    // window.addEventListener('scroll', function() {
    //     const heroSection = document.getElementById('hero');
    //     if (heroSection) {
    //         let offset = window.pageYOffset;
    //         heroSection.style.backgroundPositionY = offset * 0.5 + 'px';
    //     }
    // });

    // Initial active link check on page load
    // Trigger scroll event to set initial active link based on URL hash or scroll position
    // This ensures the correct link is highlighted if the page loads scrolled or with a hash
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);


    // canvas 
    

});
