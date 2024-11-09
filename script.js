// Definir los archivos de música
const musica = [
    { nombre: "Canción 1", archivo: "cancion1.mp3" },
    { nombre: "Canción 2", archivo: "ÚLTIMA CENA.mp3" },
    { nombre: "Canción 3", archivo: "cancion3.mp3" },
    { nombre: "Canción 4", archivo: "cancion4.mp3" },
    { nombre: "Canción 5", archivo: "cancion5.mp3" },
    { nombre: "Canción 6", archivo: "cancion6.mp3" },
    // Agrega más canciones aquí
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
    audio.src = `https://raw.githubusercontent.com/tu-usuario/tu-repositorio/main/musica/${cancion.archivo}`;
    
    // Crear el enlace para descargar la canción
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = `https://raw.githubusercontent.com/tu-usuario/tu-repositorio/main/musica/${cancion.archivo}`;
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
