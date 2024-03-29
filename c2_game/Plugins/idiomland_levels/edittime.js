﻿function GetPluginSettings()
{
	return {
		"name":			"Idiomland levels",// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"IdiomlandLevelsPlugin",		// this is used to identify this plugin and is saved to the project; never change it
		"version":		"0.1",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Interface to idiomland levels specific functions",
		"author":		"Eugene/Learzing",
		"help url":		"Learzing.com",
		"category":		"Learzing",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				        // either "world" (appears in layout and is drawn), else ""
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
        , "dependency": ""
	};
};

AddStringParam("Level name", "Level name", "");
AddAction(0, af_none, "Set current level by name", "General", "Set current level by name to {0}",
    "Set current level by name", "setCurrentLevelByName");

AddCondition(0, cf_looping, "For each level", "General", "For each level",
    "For each level", "forEachLevel");
AddCondition(1, cf_looping, "For each idiom on current level", "General", "For each idiom on current level",
    "For each idiom on current level", "forEachIdiomOnCurrentLevel");

//Current level
AddExpression(0, ef_return_number, "Current level index", "Getters", "getLevelIndex",
    "Get index of current level");
AddExpression(1, ef_return_string, "Current level name", "Getters", "getCurrentLevelName",
    "Get name of current level");
AddExpression(100, ef_return_string, "Current level status", "Getters", "getCurrentLevelStatus",
    "Get status of current level ('UNLOCKED' | 'LOCKED' | 'UNAVALIABLE')");

//Current idiom
AddExpression(2, ef_return_string, "Current idiom id", "Getters", "getCurrentIdiomId",
	"Get id of current idiom");
AddExpression(3, ef_return_string, "Current idiom title", "Getters", "getCurrentIdiomTitle",
	"Get title of current idiom");
AddExpression(4, ef_return_string, "Current idiom short meaning", "Getters", "getCurrentIdiomShortMeaning",
	"Get short meaning of current idiom");
AddExpression(5, ef_return_string, "Current idiom long explanation", "Getters", "getCurrentIdiomLongExplanation",
	"Get long explanation of current idiom");
AddExpression(6, ef_return_string, "Current idiom hint", "Getters", "getCurrentIdiomHint",
	"Get hint of current idiom");
AddExpression(7, ef_return_string, "Current idiom status", "Getters", "getCurrentIdiomStatus",
	"Get status of current idiom");

ACESDone();

var property_list = [];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}
