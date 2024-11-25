// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    databaseURL: "TU_DATABASE_URL",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  };
  
  // Inicializa Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  // Variables globales
  const playerId = Math.random().toString(36).substring(2, 15);
  let gameId = null;
  let moves = {};
  
  // Crear o unirse a una partida
  function joinGame() {
    const gamesRef = db.ref("games");
    gamesRef.once("value", (snapshot) => {
      const games = snapshot.val();
      const openGame = Object.entries(games || {}).find(
        ([, game]) => game.player2 === null
      );
  
      if (openGame) {
        gameId = openGame[0];
        gamesRef.child(gameId).update({ player2: playerId });
      } else {
        const newGame = gamesRef.push({
          player1: playerId,
          player2: null,
          moves: {}
        });
        gameId = newGame.key;
      }
  
      listenForUpdates();
    });
  }
  
  // Escucha cambios en el juego
  function listenForUpdates() {
    db.ref(`games/${gameId}`).on("value", (snapshot) => {
      const gameData = snapshot.val();
      moves = gameData.moves || {};
  
      if (moves.player1 && moves.player2) {
        determineWinner();
      }
    });
  }
  
  // Registrar movimiento
  function makeMove(move) {
    const playerKey = moves.player1 === undefined ? "player1" : "player2";
    db.ref(`games/${gameId}/moves`).update({ [playerKey]: move });
  }
  
  // Determinar ganador
  function determineWinner() {
    const { player1, player2 } = moves;
    const outcomes = {
      rock: { rock: "Empate", paper: "Pierdes", scissors: "Ganas" },
      paper: { rock: "Ganas", paper: "Empate", scissors: "Pierdes" },
      scissors: { rock: "Pierdes", paper: "Ganas", scissors: "Empate" }
    };
  
    const result = outcomes[player1][player2];
    document.getElementById("result-text").innerText = `Resultado: ${result}`;
  }
  
  // Eventos de botones
  document.querySelectorAll(".move").forEach((button) => {
    button.addEventListener("click", () => {
      makeMove(button.dataset.move);
    });
  });
  
  // Iniciar juego
  joinGame();
  