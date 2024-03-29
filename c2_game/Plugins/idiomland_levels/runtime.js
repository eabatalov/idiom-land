﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

cr.plugins_.IdiomlandLevelsPlugin = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.IdiomlandLevelsPlugin.prototype;

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
        this.curLevelIx = 0;
        this.curLevel = null;
        this.curIdiom = null;
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

    instanceProto._setCurrentLevel = function(level, levelIx) {
        this.curLevelIx = levelIx;
        this.curLevel = level;
        this.curLevel.forEachIdiom(function(idiomId, idiom) {
            this.curIdiom = idiom;
            return false;
        }.bind(this));
    };

    instanceProto._setCurrentIdiom = function(idiom) {
        this.curIdiom = idiom;
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

	pluginProto.cnds = new Cnds();

    instanceProto.doForEachLoopTrigger = function(curEvent) {
        this.runtime.pushCopySol(curEvent.solModifiers);
        curEvent.retrigger();
        this.runtime.popSol(curEvent.solModifiers)
    };

    Cnds.prototype.forEachLevel = function() {
        var curEvent = this.runtime.getCurrentEventStack().current_event;
        var curLevelIx = 0;
        var curLevel = null;
        
        IdiomLandGame.instance.getLevelsProgressManager().
            forEachOrderedLevel(function(level) {
                this._setCurrentLevel(level, curLevelIx);
                this.doForEachLoopTrigger(curEvent);
                ++curLevelIx;
            }.bind(this));
        return false;
    };

    Cnds.prototype.forEachIdiomOnCurrentLevel = function() {
        var curEvent = this.runtime.getCurrentEventStack().current_event;
        var curIdiomIx = 0;
        var curIdiom = null;

        this.curLevel.forEachIdiom(function(idiomId, idiom) {
            this._setCurrentIdiom(idiom);
            this.doForEachLoopTrigger(curEvent);
            ++curIdiomIx;
        }.bind(this));
        return false;
    };

	//////////////////////////////////////
	// Actions
	function Acts() {};

    Acts.prototype.setCurrentLevelByName = function(levelName) {
        this._setCurrentLevel(
            IdiomLandGame.instance.getLevelRepo().getLevelByName(levelName)
        );
    };

	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};
    //Current level
	Exps.prototype.getLevelIndex = function(ret) {
        ret.set_int(
            this.curLevelIx
        );
    };

	Exps.prototype.getCurrentLevelName = function(ret) {
        ret.set_string(
            this.curLevel.getName()
        );
    };

	Exps.prototype.getCurrentLevelStatus = function(ret) {
        switch(this.curLevel.getStatus()) {
            case IdiomLandLevel.STATUS.UNDEFINED:
            case IdiomLandLevel.STATUS.UNAVALIABLE:
            case IdiomLandLevel.STATUS.LOCKED:
                ret.set_string('LOCKED');
            break;
            case IdiomLandLevel.STATUS.IN_PROGRESS:
                ret.set_string('IN_PROGRESS');
            break;
            case IdiomLandLevel.STATUS.COMPLETED:
                ret.set_string('COMPLETED');
            break;
        }
    };
    //Current idiom
	Exps.prototype.getCurrentIdiomId = function(ret) {
        ret.set_string(
            this.curIdiom.getId()
        );
    };

	Exps.prototype.getCurrentIdiomTitle = function(ret) {
        ret.set_string(
            this.curIdiom.getTitle()
        );
    };

	Exps.prototype.getCurrentIdiomShortMeaning = function(ret) {
        ret.set_string(
            this.curIdiom.getMeaning()
        );
    };

	Exps.prototype.getCurrentIdiomLongExplanation = function(ret) {
        ret.set_string(
            this.curIdiom.getExplanation()
        );
    };

	Exps.prototype.getCurrentIdiomHint = function(ret) {
        ret.set_string(
            this.curIdiom.getHint()
        );
    };

	Exps.prototype.getCurrentIdiomStatus = function(ret) {
        ret.set_string(
            this.curIdiom.getStatus()
        );
    }

    pluginProto.exps = new Exps();
}());
