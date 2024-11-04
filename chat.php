<?php
session_start();
header('Content-Type: application/json');

$messagesFile = 'messages.json';
$imageDir = 'uploads/'; // Carpeta donde se almacenarán las imágenes

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar si se envían datos
    $user = isset($_POST['user']) ? htmlspecialchars(trim($_POST['user'])) : ($_SESSION['username'] ?? 'Anónimo');
    $_SESSION['username'] = $user; // Asignar el nombre del usuario

    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // Manejo de imágenes
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imageName = basename($_FILES['image']['name']);
        $targetFilePath = $imageDir . uniqid() . '_' . $imageName;

        // Crear la carpeta si no existe
        if (!is_dir($imageDir)) {
            mkdir($imageDir, 0777, true);
        }

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            $message = "<img src='$targetFilePath' alt='Imagen' style='max-width: 100%;'>";
        } else {
            echo json_encode(['error' => 'Error al subir la imagen.']);
            exit;
        }
    }

    $messages = json_decode(file_get_contents($messagesFile), true) ?: [];
    
    $data = ['user' => $user, 'message' => $message];
    $messages[] = $data;
    file_put_contents($messagesFile, json_encode($messages));
    echo json_encode($data);
} else {
    // Devolver mensajes
    if (file_exists($messagesFile)) {
        echo file_get_contents($messagesFile);
    } else {
        echo json_encode([]);
    }
}
?>
