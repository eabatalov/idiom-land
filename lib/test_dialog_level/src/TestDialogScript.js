function TestDialogScript(name, situations) {
    this.name = name;
    this.situations = situations;
}

TestDialogScript.prototype.getName = function() {
    return this.name;
};

TestDialogScript.prototype.getSituations = function() {
    return this.situations;
};

TestDialogScript.prototype.save = function() {
    var name = this.name;
    var situations = jQuery.map(this.situations,
        function(situation) {
            return situation.save();
        }
    );
    var savedData = {
        "name" : name,
        "situations" : situations
    };
    return savedData;
};

TestDialogScript.load = function(savedData) {
    var name = savedData["name"];
    var situations = jQuery.map(savedData["situations"],
        function(situationSaved) {
            return TestDialogSituation.load(situationSaved);
        }
    );
    return new TestDialogScript(name, situations);
};
