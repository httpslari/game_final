// VARIABLES //
let player = document.querySelector(".player");
let gegner1 = document.querySelector(".eiszapfen");

let spielfeld = document.querySelector("body");

let point = document.querySelector(".blume");

let backgroundPosition = 0;

let timer = new Timer(75);
let timer2 = new Timer(90);
let punkteAnzeige = document.querySelector(".punkte");
let score = 0;

let explosion = new Audio("audio/ice.wav");
let blume = new Audio("audio/shimmer.wav");

// PLAYER STYLE //

player.style.left = "250px";
player.style.top = "400px";

// LOOP //

function loop() {

  // MOVE BACKGROUND //
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;




  // ENEMIES & COLLISION //
  let gegner = document.querySelectorAll(".eiszapfen");
  // Sobald der Spieler mit einem Eiszapfen kollidiert, endet das Spiel
  if (anyCollision(player, gegner)) {
    explosion.play();
    window.location = "../index.html";
    // Man landet auf der "Verloren"-Seite
    window.location.replace("../../verloren.html");
    return;
  }

  // Die Gegner werden zufällig platziert//
  if (timer.ready()) {
    let h = document.createElement("img");
    h.setAttribute("src", "img/eiszapfen.png");
    h.style.position = "absolute";
    h.classList.add("eiszapfen");
    h.style.top = Math.random() * 100 + "%";
    h.style.right = "200vw";
    spielfeld.appendChild(h);
  }

  for (let gegner1 of gegner) {
    gegner1.style.right = parseInt(gegner1.style.right) + 10 + "px";
    if (parseInt(gegner1.style.right) > 2000) {
      gegner1.parentNode.removeChild(gegner1);
    }
    //Sobald 15 Punkte erreicht wurden gelangt man auf die "Gewonnen"-Seite//
    if (score == 15) {
      window.location.replace("../../gewonnen.html")
    }

  }

  // POINTS //

  let points = document.querySelectorAll(".blume");
  // Sobald der Spieler mit .blume (In diesem Fall Wasser/Prisma) kollidiert, werden sie gelöscht
  let collisions = allCollisions(player, points);
  // Wir gehen durch alle Kollisionsobjekte durch und löschen sie falls nötig
  for (let collision of collisions) {
    collision.parentNode.removeChild(collision);
    score = score + 1;
    punkteAnzeige.textContent = score;
    blume.play();
  }

  // Sonnen (Punkte) werden zufallig platziert
  if (timer2.ready()) {
    let p = document.createElement("img");
    p.setAttribute("src", "img/layla_wasser.png");
    p.style.position = "absolute";
    p.classList.add("blume");
    p.style.top = Math.random() * 100 + "%";
    p.style.right = "100vw";
    spielfeld.appendChild(p);
  }

  for (let point of points) {
    point.style.right = parseInt(point.style.right) + 5 + "px";
    if (parseInt(point.style.right) > 2000) {
      point.parentNode.removeChild(point);
    }
  }

  // CONTROLS //

  if (keyboard(83) && parseInt(player.style.top) < 595) {
    player.style.top = parseInt(player.style.top) + 5 + "px";
  }
  if (keyboard(87) && parseInt(player.style.top) > 0) {
    player.style.top = parseInt(player.style.top) - 5 + "px";
  }



  window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);
