
// components/logbook-data.js
export const logbookData = [
  {
    id: 1,
    title: "Current Development Snapshot",
    date: "2025-11-01",
    text: `This week, I made solid progress across several core gameplay systems while continuing to flesh out the world. Combat now supports both melee and spell casting attacks, with melee and ranged enemies working as expected. While they're still using UE5 mannequins in this build, their behaviors are fully implemented and feel smooth in playtesting.
The inventory system is also up and running. It allows you to collect and store items. With more features planned.
On the world-building side, a large portion of the game world is now built and explorable. The current environment includes forest pathways, waterfalls, ruins, and multi-layered terrain that create a sense of discovery. I’ve included a screenshot below of the current state of the world to show its atmosphere and layout.
There isn’t any audio in the build yet, but that’s next on the list. I’ll start adding environmental sounds, character effects like footsteps, and early combat audio tomorrow to bring more life into the world.`,
    images: [
      "/EotG/01_1.png",
      "/EotG/01_2.png",
      "/EotG/01_3.png",
      "/EotG/01_4.png",
      "/EotG/01_5.png",
      "/EotG/01_6.png",
      "/EotG/01_7.png",
    ],
    media: [],
  },
  {
    id: 2,
    title: "Quest Rewards",
    date: "2025-11-04",
    text: `Spell Rewards and Quest System

Refactored the quest reward system to allow quests to grant spells, not just inventory items.

Added a new Spell Reward type to the quest data structure.

Updated the core spell system to store spell classes as UObject references for clean access and easier extension.

Created a base spell class and started using an interface to access common spell variables such as name, icon, and behavior, without needing to cast each time.

Implemented a flow where completing a quest adds the associated spell to the spellbook, ready to be cast.

Character and Animation Updates

Switched to a new player character using the UE5 mannequin skeleton.

Resolved weapon animation issues caused by an added bone by realigning and zeroing it instead of deleting.

Fixed a landing animation bug where the character fell through the map due to incorrect additive settings.

Set up an animation slot for attack montages so attacks play correctly while the player can still move.

Cleaned up attack logic to avoid spamming and unnecessary blueprints, using more structure and fewer casts.

Audio Work

Implemented basic footstep sounds using animation notifies (currently only grass footsteps).

Planning to add additional sounds based on physical material (e.g. wood, stone, dirt).

Added basic ambient forest audio using attenuation for positional effects. No sound cue setup yet.

Project and Workflow Cleanup

Reduced project clutter by deciding what to migrate into a cleaner project (maps, essential blueprints).

Continued improving core systems like combat, spells, animation, and quest rewards.`,
    images: [
    ],
    media: [ {type: "video", src: "https://www.youtube.com/watch?v=hjFqJq9_Alc"}]
  },
  {
    id: 3,
    title: "World Blockout Finished",
    date: "2025-11-06",
    text: `The main world areas for the demo are now fully blocked out and playable from start to finish. This update was focused almost entirely on environment building and establishing the final layout of the major locations the player will explore early in the game.

What’s Done

• First boss arena
The arena space is now fully shaped and enclosed, with a corrupted/nature-twisted theme. The terrain, foliage, and sightlines are all in place so combat can now be tested here.

• Mountain path & upper overlook
The path leading up the mountain is fully sculpted and decorated with basic foliage. This area is now structurally complete and ready for future polish passes like lighting, props, and ambient effects.

• Goddess Temple / “Cathedral” area
This was the biggest part of the update. The temple is now built using modular pieces and has its main exterior, interior hall, and courtyard in place. It’s still unpolished, but structurally complete enough to implement gameplay, lore, and future puzzles.

🏁 Why This Matters

With the world layout locked in, I can now move on from level design and start improving gameplay systems — mainly combat, enemy behavior, and progression elements. Future updates will focus more on mechanics instead of map building.

Next Steps

Add enemies back into the world for testing

Improve melee combat (combo system, hit reactions)

Begin world state change system (ex: frozen → restored)

Early sound & lighting passes once gameplay is stable

Screenshots below show the first pass of these new areas before polishing.`,
    images: [
      "/EotG/06_1.png",
      "/EotG/06_2.png",
      "/EotG/06_3.png",
      "/EotG/06_4.png",
      "/EotG/06_5.png",
      "/EotG/06_6.png",
      "/EotG/06_7.png",
      "/EotG/06_8.png",
      "/EotG/06_9.png",
    ],
  },
    {
    id: 4,
    title: "Combat Update: Staff Combo, Lock-On, and Weapon Trail VFX",
    date: "2025-11-09",
    text: `This update introduces the first real pass at melee combat and targeting. I built a 4-hit staff combo using separate animation montages, chained together with animation notifies to allow fluid input-based progression. The final hit resets the combo if no input is received during the combo window. I also added a simple lock-on system that orients the player toward a selected enemy and supports strafing movement while locked. I fixed an issue where the lock-on input was firing multiple times by switching from a continuous “Triggered” event to a single “Started” event.

A weapon trail VFX is now active during melee attacks using a Niagara ribbon system, attached through sockets on the player’s skeleton. It’s not perfect—with some slight separation during fast movement—but it looks solid enough for now. I also added an impact sound when hitting enemies, which adds a lot of needed weight to the hits.

Next up: adding more hit VFX, continuing to refine combo timing, and improving enemy reactions.`,
    images: [
    ],
    media: [ {type: "video", src: "https://www.youtube.com/watch?v=C_Ibh4vSV48&t=2s"}]
  },
  {
    id: 5,
    title: "Weather events and world state triggers",
    date: "2025-11-14",
    text: `Today was a big systems day for the project. I finally got the landscape snow mask working the way I’ve wanted from the start, and the whole thing is now driven by a scalar in a Material Parameter Collection instead of wrestling with dynamic material instances. The landscape material reads a SnowScalar value from the MPC, so when that value goes from 0 to 1, the ground smoothly transitions from dry to fully covered in snow, and then melts back down when it goes the other way. On top of that, I wired this into a simple weather system: collision volumes in the world define different “weather zones,” each with a world state enum I can set per volume. When the player walks through one of these, it triggers a delegate that tells a World State Manager which state we’re in, and the manager updates things like the snow amount accordingly.

I also laid the groundwork for the “good world” transition after the boss is defeated. There’s no real boss fight yet, but I created a placeholder boss blueprint that fires a world state change on its “death.” When that happens, the world state switches to a more positive phase where the snow stops, the landscape starts to melt, and the world begins to feel calmer and more restored. It’s all pretty rough under the hood still, but the core loop is there: weather and world state are now connected, and the boss will eventually act as the turning point that flips the world from harsh/snowy to recovered. Even in this placeholder form, it’s really satisfying to walk around, trigger the snow, then “kill” the dummy boss and watch the world react.`,
    images: [
    ],
    media: [ {type: "video", src: "https://www.youtube.com/watch?v=rlvgcCpwGt4"}]
  },
    {
    id: 6,
    title: "Guiding NPC",
    date: "2025-11-15",
    text: `This week I added several new elements to the game. The magic staff is now a physical item placed in the world that the player must find before they can use any magic, which creates a clearer progression step at the start of the game. I also swapped out the placeholder ocean and river for new, more polished versions that better define the edges of the map and the flow of the landscape. To help guide the player, I created an NPC who leads you along a path. He moves to each point and beckons you to follow him, and I plan to give him a voice line that calls out to the player. Altogether, these features help shape the opening experience and make exploration feel more directed.`,
    images: [
      "/EotG/15_1.png",
      "/EotG/15_2.png",
    ],
  },
  {
    id: 7,
    title: "Quest System Update",
    date: "2025-11-18",
    text: `I spent today working on the quest system and getting it into a functional, flexible state that fits the game’s structure. The framework now supports multi-stage quests and multiple objectives, with the Quest Manager handling activation, progression, and completion behind the scenes. Everything is data-driven, so adding new quests or expanding existing ones is as simple as defining their stages and objectives rather than rebuilding logic each time.

The system ties neatly into the UI as well: when a quest updates, the active quest display refreshes automatically to show the current stage and objective. It’s still early visually, but the core functionality is solid and reliable. Overall, this gives me a clean progression pipeline to build on as gameplay develops and sets the foundation for the narrative flow and world interactions moving forward.`,
    images: [
      "/EotG/18_1.png",
      "/EotG/18_2.png",
      "/EotG/18_3.png",
    ],
  },
    {
    id: 8,
    title: "Boss Fight",
    date: "2025-11-24",
    text: `I’ve made solid progress on the boss fight, and the encounter is now starting to feel like a fully realized battle. At this stage, the boss has six different attacks implemented, giving the fight a strong mix of close-range pressure and long-range threats. There are two melee attacks—a quick, close-range swipe and a heavier, longer-reaching strike that creates a larger punish window. The boss also uses a slow-moving homing projectile that tracks the player and eventually explodes, forcing consistent movement. To keep players from staying at a distance for too long, there’s a dedicated ranged attack, and for sudden bursts of aggression, the boss can perform a fast charge attack that closes space quickly.

With the core Phase 1 attack set in place, I’m now planning out the second phase of the fight. Phase 2 will introduce a much more dramatic attack sequence where massive ice spikes fall from the sky, turning the arena into a hazardous space the player must weave through. This phase will begin with a short cinematic-style transition that adds a narrative twist and shifts the dynamics of the encounter, tying into a key character in the story. The next steps will focus on building the Phase 2 mechanics, implementing the transition sequence, and refining the pacing so the fight escalates naturally from start to finish.`,
    images: [
    ],
    
  },
  {
    id: 9,
    title: "Boss Moves",
    date: "2025-12-02",
    text: `Over the past week I’ve been putting together the core moveset for this boss, and it’s finally starting to feel like a real encounter. I spent most of my time blocking out attack patterns, tuning timings, and making sure each move has a clear telegraph so players can read what’s coming. There’s still plenty of polish left to do—effects passes, animation cleanup, camera tweaks—but the foundation is solid enough now that I can share a quick preview of the fight in action. The video below shows a few of the current attacks and how they flow together. As always, this is still a work in progress, so any feedback or impressions are welcome while I continue refining the encounter.`,
    images: [
    ],
    media: [ {type: "video", src: "https://www.youtube.com/watch?v=E7wXXSfIswA"}]
  },
    {
    id: 10,
    title: "Sound Manager",
    date: "2025-12-11",
    text: `Implemented a full in-game audio settings system, including support for Master, Music, SFX, and Ambient audio categories. These settings are accessible through the redesigned pause menu and can be adjusted in real time through UI sliders. Work included creating a custom audio manager subsystem, a hierarchical sound class structure, and a multi-panel pause menu with a dedicated audio settings panel.

Purpose of Each Class
Master — Global multiplier for all audio.
Music — Game soundtrack and musical cues.
SFX — Gameplay sounds (footsteps, combat effects, UI clicks).
Ambient — Environmental loops (forest ambience, wind, birds, etc.).`,
    images: [

    ],
  },
  {
    id: 11,
    title: "World Update",
    date: "2025-01-14",
    text: `Just some pictures of the world in its current state.`,
    images: [
      "/EotG/14_1.png",
      "/EotG/14_2.png",
      "/EotG/14_3.png",
      "/EotG/14_4.png",
    ],
  },
    {
    id: 12,
    title: "Update Quest Menu UI",
    date: "2025-01-18",
    text: `New quest menus are in, with updated UI art designed to feel like part of the world.

This pass focused on cleaner layouts, better readability, and visuals that match the game’s tone`,
    images: [
      "/EotG/01-18_1.png",
      "/EotG/01-18_2.png",
      "/EotG/01-18_3.png",
    ],
  },
  {
    id: 13,
    title: "Gameflow Restructure & Performance Pass",
    date: "2025-01-24",
    text: `Over the past stretch of development, I focused almost entirely on restructuring the game’s core flow and loading logic.

The main goal was to eliminate the brief freezes and hitches that were happening during startup and early gameplay. Rather than masking them, I reworked how and when different parts of the world are loaded, separating the intro experience from the main environment and ensuring everything streams in smoothly.

As a result, the game now transitions cleanly from the main menu into gameplay with no noticeable freezes. The intro sequence runs independently, and the world loads in the background in a way that feels natural and uninterrupted.

With this foundation in place, I’m shifting focus back to design work:

Environmental polish

World layout and pacing

Enemy placement and encounters

Visual and atmospheric details

This was one of those necessary “under-the-hood” passes that doesn’t change how the game looks at a glance, but makes everything feel more solid and responsive. Having the game flow locked down makes it much easier to iterate on design going forward.

Next updates will be more visibly focused on the world itself.`,
    images: [

    ],
  },
    {
    id: 14,
    title: "Development Update – Loading Screens, Forest Redesign, and Save Flow Improvements",
    date: "2025-01-27",
    text: `This update was mostly about smoothing out the player’s experience from the very start of the game.

I’ve added a proper loading screen and reworked how the game handles loading levels and save data. Previously, starting a new game versus continuing an existing one could feel inconsistent behind the scenes. That flow is now much more reliable, with the game correctly determining whether it’s a fresh start or a continuation and initializing everything accordingly before gameplay begins.

Alongside that, I spent a good amount of time redesigning the forest path leading into town. The goal was to make the transition feel more natural — tighter and more enclosed within the forest, then gradually opening up as you approach civilization. The path now feels less like a straight gameplay corridor and more like a place that grew organically over time.

A lot of this work was focused on things players might not consciously notice, but should feel: smoother transitions, clearer direction, and fewer technical hiccups during startup. With these foundations in a better place, I can move forward more confidently on gameplay and content.

More updates soon.`,
    images: [
      "/EotG/27_1.png",
      "/EotG/27_2.png",
      "/EotG/27_3.png",
    ],
    media: [ {type: "video", src: "https://www.youtube.com/watch?v=WIDq16CLDCU&t=28s"}]
  },
  {
    id: 15,
    title: "Latest Gameplay Demo",
    date: "2025-02-10",
    text: `most up to date build video.`,
    images: [
    ],
    media: [ {type: "video", src: "https://www.youtube.com/watch?v=sNEngMDWZVI&list=PLK4vTgZ3mxLQubCSzKlvCpbHb9ysrUaZP&index=1"}]
  },
];

