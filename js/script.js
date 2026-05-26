/* Sve kopiraj odavde: */
function toggleFolder(folderElement) {
    if (folderElement.classList.contains('open')) {
        folderElement.classList.remove('open');
        folderElement.style.borderColor = 'rgba(255, 255, 255, 0.03)';
    } else {
        document.querySelectorAll('.folder-box').forEach(box => {
            box.classList.remove('open');
            box.style.borderColor = 'rgba(255, 255, 255, 0.03)';
        });
        folderElement.classList.add('open');
        folderElement.style.borderColor = '#4caf50';
    }
}
/* ... ostatak tvog JS koda ... */
/* ... do samog kraja tvog originalnog JS-a ... */
