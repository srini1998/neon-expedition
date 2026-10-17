# Neon Expedition

A PC first arcade dungeon and a real reinforcement learning playground. The 3D arena uses Three.js, procedural robot characters, metallic dungeon tiles, shadows, neon lighting, bloom, and animated extraction portals. A 2D canvas renderer remains available if WebGL cannot start.

## Play and train

Move with WASD or the arrow keys. Collect the yellow key and reach the green exit. Plasma ends the run. A locked gate needs the key. Fullscreen and a lighter graphics setting are available. Touch controls support smaller screens.

Train Atlas, Nova, and Echo from empty Q tables, watch a selected agent, or race all three. Training and evaluation are distinct: the training curve includes exploration, and evaluation runs 30 episodes per agent without exploration. Policies can be exported, imported, and saved in browser storage.

The state is the map cell plus key possession. Actions are four movement directions. Rewards are +5 for first key pickup, +18 for extraction, −0.1 per move, −0.65 for collisions, and a configurable hazard penalty. Q learning uses discount 0.97, a configurable learning rate, and exploration that decays to 4%. All learning runs in a browser worker; there is no model API or inference service. The agents learn navigation, not combat or general game intelligence.

## Downloaded desktop demo kit

Unzip the kit, open a terminal inside the `neon-expedition` folder, and run:

```bash
node scripts/serve.mjs
```

Open http://localhost:4320. The downloaded kit already contains built assets, so no installation or Internet connection is needed.

## Run locally from source

Requires Node.js 20 or newer.

```bash
npm install
npm run build
npm start
```

Open http://localhost:4320. After building, there are no external asset or CDN requests. Serve `dist` over HTTP; opening the HTML file directly will not support module workers.

## Verify

```bash
npm test
```

The checks compare empty and trained Q tables on all three maps, verify extraction across 30 evaluation episodes per policy, check collisions, and round trip policy storage. 3D appearance and performance still need checking on the demo laptop.

## A 90 second demo

1. Play a few moves in the 3D dungeon and show the key and exit.
2. Explain that agents start with empty Q tables.
3. Train a standard session and point to the actual success curves.
4. Run evaluation, then watch an agent or start a race.
5. Change the mission to show that a new map starts new learning.

## Attribution

Three.js is included under its MIT license in `dist/vendor/THREE-LICENSE.txt`. Dungeon geometry and the learning implementation are original project code. This repository is independent of PocketOps.

## Engineering review
See docs/review.md for corrected behavior, actual verification, scope and limitations.
