﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

cr.plugins_.IdiomProgressTrackingPlugin = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.IdiomProgressTrackingPlugin.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		this.idiomsProgressTracker = new IdiomsProgressTracker();
        this.idiomsProgressTracker.onIdiomGuessed(function() {
            this.runtime.trigger(pluginProto.cnds.guessedIdiomsChanged);
        }.bind(this));
        this.currIdiomIx = 0;
	};
	
	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				
				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

    instanceProto.doForEachIdiomTrigger = function(curEvent) {
        this.runtime.pushCopySol(current_event.solModifiers);
        current_event.retrigger();
        this.runtime.popSol(current_event.solModifiers)
    };

    Cnds.prototype.forEachIdiom = function() {
        var currentEvent = this.runtime.getCurrentEventStack().current_event;
        this.currIdiomIx = 0;
        for (;currIdiomIx < this.idiomsProgressTracker.getAllIdioms().length; ++currIdiomIx) {
            this.doForEachTrigger(currentEvent);
        }
        return false;
    };

    Cnds.prototype.guessedIdiomsChanged = function() {
        return true; //cf_trigger was signaled explicitly
    };

	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	//this is instance in expressions
	Exps.prototype.getCurrentIdiomTitle = function(ret)
	{
		ret.set_string(
            this.idiomsProgressTracker.getAllIdioms()[currIdiomIx].getTitle()
        );
	};

	Exps.prototype.getCurrentIdiomShortMeaning = function(ret)
	{
		ret.set_string(
            this.idiomsProgressTracker.getAllIdioms()[currIdiomIx].getMeaning()
        );
	};

	Exps.prototype.getCurrentIdiomLongExplanation = function(ret)
	{
		ret.set_string(
            this.idiomsProgressTracker.getAllIdioms()[currIdiomIx].getExplanation()
        );
	};

	Exps.prototype.getCurrentIdiomStatus = function(ret)
	{
		ret.set_string(
            this.idiomsProgressTracker.getAllIdioms()[currIdiomIx].getStatus()
        );
	};

	Exps.prototype.getLevelIdiomsCount = function(ret) {
		ret.set_int(
            this.idiomsProgressTracker.getAllIdioms().length
        );
	};

	Exps.prototype.getLevelGuessedIdiomsCount = function(ret) {
		ret.set_int(
            this.idiomsProgressTracker.getGuessedIdiomsCount()
        );
	};

	pluginProto.exps = new Exps();

}());