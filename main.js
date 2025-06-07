document.addEventListener('DOMContentLoaded', function() {
    // Typewriter Effect
    const typed = new Typed('.multiple-text', {
        strings: ['Web Developer', 'Frontend Developer', 'Tech Enthusiast'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 0);
        }
    });

    // Hamburger Menu Functionality
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    }

    // Close menu when a nav link is clicked
    if (navLinks && navbar && menuIcon) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    menuIcon.classList.remove('bx-x');
                    menuIcon.classList.add('bx-menu'); // Ensure it's back to hamburger
                }
            });
        });
    }

    // Close menu if clicked outside of it (optional)
    // window.onscroll = () => { // Also close on scroll
    //     if (navbar.classList.contains('active')) {
    //         navbar.classList.remove('active');
    //         menuIcon.classList.remove('bx-x');
    //         menuIcon.classList.add('bx-menu');
    //     }
    // };

    // Contact Form EmailJS functionality
    // Initialize EmailJS with your User ID (Public Key)
    // IMPORTANT: Replace 'YOUR_USER_ID' with your actual EmailJS User ID (Public Key)
    emailjs.init('TzM0YFgsSNWHylCvi'); // Get this from your EmailJS account (Account -> API Keys)

    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        const submitButton = contactForm.querySelector('button.send'); // Define submitButton here if contactForm exists

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form values
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Change button text to indicate sending
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Prepare template parameters
            // These keys (from_name, from_email, etc.) MUST match the variables in your EmailJS template
            const templateParams = {
                from_name: name,
                from_email: email,
                to_name: 'Inupama', // Or your name, as configured in your template
                message: message,
                reply_to: email // Optional: helps if you reply directly from your email client
            };

            // Send email using EmailJS
            // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs from EmailJS
            emailjs.send('service_pwgce1l', 'template_d3pj4de', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Message sent successfully!');
                    contactForm.reset(); // Clear the form
                }, function (error) {
                    console.error('FAILED...', error);
                    // Provide more user-friendly error information if possible
                    let errorMessage = 'Failed to send message. Please try again later.';
                    if (error && error.text) {
                        errorMessage += ` (Details: ${error.text})`;
                    } else if (error && typeof error === 'string') {
                         errorMessage += ` (Details: ${error})`;
                    } else if (error) {
                        errorMessage += ` (Details: ${JSON.stringify(error)})`;
                    }
                    alert(errorMessage);
                })
                .finally(function() {
                    // Restore button text and state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }

     class NetworkAnimation {
            constructor(canvasId) {
                this.canvas = document.getElementById(canvasId);
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.mouse = { x: null, y: null };
                
                this.init();
                this.bindEvents();
                this.animate();
            }

            init() {
                this.resizeCanvas();
                this.createParticles();
            }

            resizeCanvas() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            createParticles() {
                const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
                this.particles = [];
                
                for (let i = 0; i < particleCount; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        size: Math.random() * 2 + 1
                    });
                }
            }

            bindEvents() {
                window.addEventListener('resize', () => {
                    this.resizeCanvas();
                    this.createParticles();
                });

                this.canvas.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.clientX;
                    this.mouse.y = e.clientY;
                });

                this.canvas.addEventListener('mouseleave', () => {
                    this.mouse.x = null;
                    this.mouse.y = null;
                });
            }

            drawParticle(particle) {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = '#00f5ff';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#00f5ff';
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }

            drawLine(particle1, particle2, opacity) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle1.x, particle1.y);
                this.ctx.lineTo(particle2.x, particle2.y);
                this.ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
            }

            updateParticle(particle) {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > this.canvas.width) {
                    particle.vx *= -1;
                }
                if (particle.y < 0 || particle.y > this.canvas.height) {
                    particle.vy *= -1;
                }

                // Keep particles within bounds
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }

            animate() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                // Update and draw particles
                this.particles.forEach(particle => {
                    this.updateParticle(particle);
                    this.drawParticle(particle);
                });

                // Draw connections between nearby particles
                for (let i = 0; i < this.particles.length; i++) {
                    for (let j = i + 1; j < this.particles.length; j++) {
                        const dx = this.particles[i].x - this.particles[j].x;
                        const dy = this.particles[i].y - this.particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const maxDistance = 120;

                        if (distance < maxDistance) {
                            const opacity = (1 - distance / maxDistance) * 0.5;
                            this.drawLine(this.particles[i], this.particles[j], opacity);
                        }
                    }
                }

                // Draw connections to mouse
                if (this.mouse.x !== null && this.mouse.y !== null) {
                    this.particles.forEach(particle => {
                        const dx = particle.x - this.mouse.x;
                        const dy = particle.y - this.mouse.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const maxDistance = 150;

                        if (distance < maxDistance) {
                            const opacity = (1 - distance / maxDistance) * 0.8;
                            this.drawLine(particle, this.mouse, opacity);
                        }
                    });

                    // Draw mouse point
                    this.ctx.beginPath();
                    this.ctx.arc(this.mouse.x, this.mouse.y, 3, 0, Math.PI * 2);
                    this.ctx.fillStyle = '#bf00ff';
                    this.ctx.shadowBlur = 15;
                    this.ctx.shadowColor = '#bf00ff';
                    this.ctx.fill();
                    this.ctx.shadowBlur = 0;
                }

                requestAnimationFrame(() => this.animate());
            }
        }

        // Initialize the animation when the page loads
        window.addEventListener('load', () => {
            new NetworkAnimation('networkCanvas');
        });
});