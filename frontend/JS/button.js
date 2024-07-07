document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('pagesNav').classList.toggle('show');
    document.getElementById('menu-toggle').style.display = 'none';
    document.getElementById('menu-close').style.display = 'block';
});

document.getElementById('menu-close').addEventListener('click', function() {
    document.getElementById('pagesNav').classList.toggle('show');
    document.getElementById('menu-close').style.display = 'none';
    document.getElementById('menu-toggle').style.display = 'block';
});
