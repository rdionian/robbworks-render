export const technicalLogData = [
{
  id: 1,
  created_at: "2025-11-02 00:12:10.092477+00",

  development_progress: `The core gameplay loop is now fully online. The world is ~60% built, with foundational systems in place: quest progression, inventory management, combat, and basic enemy AI. Current focus is on refining and linking these systems into a cohesive player experience.`,

  game_mechanics: `Inventory System – Items can be collected and displayed in a grid-based UI. Back-end systems are ready for expansion.

Combat System – Supports both melee attacks and spell casting. Attacks are currently triggered through animation notifies. Player has a working mana system.

Enemy AI – Two basic enemy types implemented: melee and ranged. Currently using UE5 mannequin placeholders. The ranged enemy throws projectiles. AI includes simple chase, strafe, and attack behaviors`,

  art_design: `Most of the main world layout is now in place, including the village area, farmland, river, bridge, surrounding cliffs, and the waterfall that feeds into the main stream running through town. The terrain sculpting and foliage pass are done for this section of the map, and the overall look and color palette are starting to come together.

All major paths are built and connected, and the layout now has a clear flow between key areas — the village, fields, riverside, and the higher cliff zones. The goal was to make it feel explorable without being confusing, and so far it’s working well while walking through the level in-game.

Next step is adding more world detail and points of interest (props, small structures, environmental storytelling, etc.) so areas feel more lived in, but the core environment is now solid enough to build gameplay on top of.`,

  audio: `There’s no audio implemented yet, but that’s the next step on the list. The plan is to start adding environmental sounds (waterfalls, wind, ambient forest sounds, etc.) along with character audio like footsteps and interaction sounds. This work is scheduled to begin tomorrow, starting with the ambient effects throughout the current world.`
},

{
  id: 2,
  created_at: "2025-11-04 21:39:24.979608+00",

  development_progress: `I spent some time refactoring parts of the spell system and the quest rewards logic after getting back home. Spells can now be rewarded just like items, and the player’s magic component keeps track of learned spells using a lookup system instead of hard-coded references. I also added a few helper functions for checking whether the player has an active spell and whether they have enough mana to cast it. Still early, but the structure feels a lot cleaner and should scale once more spells are added.`,

  game_mechanics: `
You can now unlock spells through quests and immediately use them in combat. The first test spell is a simple fireball, and casting works through the magic component instead of directly spawning the projectile in the attack code. The system supports multiple spells, but so far only one is hooked up. Mana cost checks are in place, cooldowns and casting animations will come later.`,

  art_design: `Added a temporary character model just to get rid of the default mannequin while testing. No new animations or spell VFX yet — still using placeholders until the spell list and combat flow are more final. Next step will probably be switching over to a proper rigged model and adding animations for movement, casting, and hit reactions.`,

  audio: `Footstep sounds are now working — right now it only plays a grass/soft dirt step sound, but the system is set up so I can later swap sounds based on physical material. I also added a basic looping ambient track for the forest area with distance-based attenuation so it fades out when you leave the zone. Still planning to add cue-based audio for weather, monsters, etc.`

},

{
  id: 3,
  created_at: "2025-11-06 17:13:32.538116+00",

  development_progress: `Fully blocked out the last major areas of the world for the demo, including the first boss arena, the mountain path/overlook, and the temple + courtyard region. The world is now structurally complete and playable from start to finish. From here on, most updates will shift from environment building to gameplay, combat, and polish work.`,

  game_mechanics: `No major gameplay changes in this update, but now that the map layout is locked in, the next phase will focus on improving combat feel and enemy behavior.
Next step: re-add test enemies into the new areas and start iterating on attack reactions, combos, and overall combat pacing.`,

  art_design: `Completed the full visual blockout and first art pass for the new world areas — including terrain sculpting, foliage layout, and modular architecture assembly for the temple and courtyard. The spaces are now visually cohesive and playable, and only need later polishing passes such as final lighting, props, and environmental FX.
Next step: add final visual details like props, lighting polish, and small environmental touches once gameplay is locked in.`,

  audio: `No new audio implemented this update.
Next step: start ambient sound and music placement once combat and world interactions are ready for testing.`
},

{
  id: 4,
  created_at: "2025-11-18 13:11:27.439041+00",

  development_progress: `I started building out the game’s first actual quest: retrieving the player’s staff. This serves as the introduction to the quest system and confirms that multi-stage progression works in a real gameplay scenario instead of just a prototype example. The quest activates when the player speaks to the NPC, updates when the staff is collected, and completes once the final stage triggers. The flow feels smooth and stable, and it’s a solid first step toward establishing the early game’s structure and giving players a clear objective right from the start.`,

  game_mechanics: `The quest system now supports the full flow for the “Retrieve the Staff” quest, including activation, multi-stage objective updates, and automatic UI syncing. The NPC interaction triggers the quest start, and picking up the staff advances the internal quest state without any manual overrides. This confirms that the quest manager, delegates, and state transitions all work the way they’re supposed to in a real scenario. Additional quests can now follow the same pattern with minimal setup.`,

  art_design: `The quest UI is still using placeholder visuals. The layout updates correctly, but the final artwork, styling, and thematic elements haven’t been created yet. I’ll be designing a proper quest panel and visual identity to match the rest of the game’s UI once more systems are in place.`,

  audio: `I plan to add voice audio to the quest-giving NPC to give the interaction more character and make the introduction to the quest feel more alive. This will likely start with simple VO lines for the initial conversation and later expand as more quests are added.`
}

];