To make plugins avaliable in Construct2:
1. Run cmd.exe as Administrator (right click on cmd.exe file -> run as Administrator)
2. cd "C:\Program Files\Construct 2\exporters\html5\plugins"
3. mklink /D idiomland_game IDIOM_LAND_REPO\c2_game\Plugins\idiomland_game
4. mklink /D idiomland_levels IDIOM_LAND_REPO\c2_game\Plugins\idiomland_levels
5. mklink /D idiomland_level_recording IDIOM_LAND_REPO\c2_game\Plugins\idiomland_level_recording
6. mklink /D jump_level_logic IDIOM_LAND_REPO\c2_game\Plugins\jump_level_logic
7. mklink /D jump_level_playback IDIOM_LAND_REPO\c2_game\Plugins\jump_level_playback
8. mklink /D jump_level_recording IDIOM_LAND_REPO\c2_game\Plugins\jump_level_recording
9. mklink /D level_idiom_progress_tracker IDIOM_LAND_REPO\c2_game\Plugins\level_idiom_progress_tracker
10. mklink /D platformer_level_playback IDIOM_LAND_REPO\c2_game\Plugins\platformer_level_playback
11. mklink /D platformer_level_recording IDIOM_LAND_REPO\c2_game\Plugins\platformer_level_recording


Assembly project:
1. Run "C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\Tools\VsDevCmd.bat"
2. cd ~\GitHub\jsbuild
		npm install
		grunt
3. cd ~\GitHub\idiom-land\c2_game\Plugins\idiomland_game
		npm install
		grunt
4. echo node ~\GitHub\jsbuild\src\main.js -o web -m ~\GitHub\quest-engine\modules.json -m ~\GitHub\idiom-land\modules.json c2-plugin-idiomland-game > build.bat
		echo grunt >> build.bat
5. Run ~\GitHub\idiom-land\c2_game\Plugins\idiomland_game\build.bat	
