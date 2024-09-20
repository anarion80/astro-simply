---
heroImage: https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
title: Anarion Dunedain
---

<div class="">
    I’m a
    <span id="typewriter" class="font-medium"></span>
</div>

<script src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
<script>
    function initializeTypewriter() {
        try {
            let app = document.getElementById('typewriter');

            let typewriter = new Typewriter(app, {
                strings: ['Self-hoster', 'Home-labber', 'Tinkerer', 'Developer'],
                loop: true,
                delay: 90,
                autoStart: true,
            });
        } catch (e) {
            console.error(e);
        }
    };

    initializeTypewriter();

    document.addEventListener('astro:page-load', () => {
        initializeTypewriter();
    });
</script>
