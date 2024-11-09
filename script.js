// Definir los archivos de música
const musica = [
    { nombre: "Canción 1", archivo: "ÚLTIMA CENA.mp3" },
    { nombre: "Canción 2", archivo: "cancion2.mp3" },
    { nombre: "Canción 3", archivo: "cancion3.mp3" },
    // Agrega más canciones aquí si es necesario
];

// Obtener el contenedor donde se mostrarán los archivos
const musicList = document.getElementById('music-list');

// Función para generar el reproductor de música y el enlace de descarga
function crearCancion(cancion) {
    const divTrack = document.createElement('div');
    divTrack.classList.add('track');
    
    // Crear el reproductor de audio
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = cancion.archivo; // Ruta relativa a la misma carpeta del index.html
    
    // Crear el enlace para descargar la canción
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = cancion.archivo;
    enlaceDescarga.download = cancion.nombre;
    enlaceDescarga.textContent = 'Descargar';
    
    // Agregar el nombre de la canción, el reproductor y el enlace de descarga
    divTrack.appendChild(audio);
    divTrack.appendChild(enlaceDescarga);
    
    // Añadir la canción al listado de canciones
    musicList.appendChild(divTrack);
}

// Crear el reproductor para cada canción
musica.forEach(cancion => {
    crearCancion(cancion);
});
