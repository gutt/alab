/////////////////////////////////////////////
/// PROGRAM PARSING
/////////////////////////////////////////////

var evParser = require('./ev_parser.js');
var events = require('events');

//var program = '{\x22blocks\x22: [{\x22pos_x\x22: 9, \x22pos_y\x22: 8, \x22type\x22: \x22stop\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 5, \x22pos_y\x22: 6, \x22type\x22: \x22up_down\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 5, \x22pos_y\x22: 10, \x22type\x22: \x22right_up\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 8, \x22pos_y\x22: 9, \x22type\x22: \x22left_up\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 7, \x22pos_y\x22: 9, \x22type\x22: \x22left_right\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 6, \x22pos_y\x22: 9, \x22type\x22: \x22cross_left\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 6, \x22pos_y\x22: 10, \x22type\x22: \x22left_up\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 6, \x22pos_y\x22: 7, \x22type\x22: \x22right_down\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 7, \x22pos_y\x22: 6, \x22type\x22: \x22right_down\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 8, \x22pos_y\x22: 8, \x22type\x22: \x22operations\x22, \x22value\x22: \x22b=b-a\x22}, {\x22pos_x\x22: 8, \x22pos_y\x22: 7, \x22type\x22: \x22left_down\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 9, \x22pos_y\x22: 7, \x22type\x22: \x22out\x22, \x22value\x22: \x22a\x22}, {\x22pos_x\x22: 9, \x22pos_y\x22: 6, \x22type\x22: \x22left_down\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 7, \x22pos_y\x22: 7, \x22type\x22: \x22if\x22, \x22value\x22: \x22a>b\x22}, {\x22pos_x\x22: 7, \x22pos_y\x22: 5, \x22type\x22: \x22left_right\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 5, \x22pos_y\x22: 5, \x22type\x22: \x22right_down\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 8, \x22pos_y\x22: 5, \x22type\x22: \x22cross_right\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 8, \x22pos_y\x22: 6, \x22type\x22: \x22if\x22, \x22value\x22: \x22a != b\x22}, {\x22pos_x\x22: 8, \x22pos_y\x22: 2, \x22type\x22: \x22msg\x22, \x22value\x22: \x22Algorytm euklidesa.\n\nPodaj dwie liczby.\x22}, {\x22pos_x\x22: 8, \x22pos_y\x22: 1, \x22type\x22: \x22start\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 8, \x22pos_y\x22: 4, \x22type\x22: \x22in\x22, \x22value\x22: \x22b\x22}, {\x22pos_x\x22: 8, \x22pos_y\x22: 3, \x22type\x22: \x22in\x22, \x22value\x22: \x22a\x22}, {\x22pos_x\x22: 6, \x22pos_y\x22: 8, \x22type\x22: \x22operations\x22, \x22value\x22: \x22a=a-b\x22}, {\x22pos_x\x22: 6, \x22pos_y\x22: 5, \x22type\x22: \x22left_right\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 5, \x22pos_y\x22: 9, \x22type\x22: \x22up_down\x22, \x22value\x22: \x22\x22}, {\x22pos_x\x22: 5, \x22pos_y\x22: 7, \x22type\x22: \x22log\x22, \x22value\x22: \x22b\x22}, {\x22pos_x\x22: 5, \x22pos_y\x22: 8, \x22type\x22: \x22log\x22, \x22value\x22: \x22a\x22}]}';
//var prog = {"blocks": [{"pos_x": 9, "pos_y": 8, "type": "stop", "value": ""}, {"pos_x": 5, "pos_y": 6, "type": "up_down", "value": ""}, {"pos_x": 5, "pos_y": 10, "type": "right_up", "value": ""}, {"pos_x": 8, "pos_y": 9, "type": "left_up", "value": ""}, {"pos_x": 7, "pos_y": 9, "type": "left_right", "value": ""}, {"pos_x": 6, "pos_y": 9, "type": "cross_left", "value": ""}, {"pos_x": 6, "pos_y": 10, "type": "left_up", "value": ""}, {"pos_x": 6, "pos_y": 7, "type": "right_down", "value": ""}, {"pos_x": 7, "pos_y": 6, "type": "right_down", "value": ""}, {"pos_x": 8, "pos_y": 8, "type": "operations", "value": "b=b-a"}, {"pos_x": 8, "pos_y": 7, "type": "left_down", "value": ""}, {"pos_x": 9, "pos_y": 7, "type": "out", "value": "a"}, {"pos_x": 9, "pos_y": 6, "type": "left_down", "value": ""}, {"pos_x": 7, "pos_y": 7, "type": "if", "value": "a>b"}, {"pos_x": 7, "pos_y": 5, "type": "left_right", "value": ""}, {"pos_x": 5, "pos_y": 5, "type": "right_down", "value": ""}, {"pos_x": 8, "pos_y": 5, "type": "cross_right", "value": ""}, {"pos_x": 8, "pos_y": 6, "type": "if", "value": "a != b"}, {"pos_x": 8, "pos_y": 2, "type": "msg", "value": "Algorytm euklidesa.\n\nPodaj dwie liczby."}, {"pos_x": 8, "pos_y": 1, "type": "start", "value": ""}, {"pos_x": 8, "pos_y": 4, "type": "in", "value": "b"}, {"pos_x": 8, "pos_y": 3, "type": "in", "value": "a"}, {"pos_x": 6, "pos_y": 8, "type": "operations", "value": "a=a-b"}, {"pos_x": 6, "pos_y": 5, "type": "left_right", "value": ""}, {"pos_x": 5, "pos_y": 9, "type": "up_down", "value": ""}, {"pos_x": 5, "pos_y": 7, "type": "log", "value": "b"}, {"pos_x": 5, "pos_y": 8, "type": "log", "value": "a"}]};

var ALab = function ()
{
    this.global_vars = new Array();
    this.active_from = null;
    this.active_x;
    this.active_y;
    this.program_pause;
    this.stop = false;
    this.program = {};
    this.last_item = null;
    this.interval = null;
    console.log("ALAB constructed");
};

ALab.prototype = new events.EventEmitter;



ALab.prototype.getPosition = function (from)
{
    var pos = []
    pos[0] = from["pos_x"]
    pos[1] = from["pos_y"]
    return pos
}

ALab.prototype.getBlockAtPosition = function (x ,y)
{
    this.last_item = null;
    for (i=0; i< this.program["blocks"].length;i++)
	if(this.program["blocks"][i]["pos_x"] == x && this.program["blocks"][i]["pos_y"] == y)
    	    this.last_item = this.program["blocks"][i];
}

ALab.prototype.setActive = function (from, x, y)
{
    this.active_from = from;
    this.active_x = x;
    this.active_y = y;
    return 1;
}



ALab.prototype.run_start = function (el)
{
    console.log('running..');
    var pos = this.getPosition(el);
    this.getBlockAtPosition(pos[0], pos[1]);
    
    if(this.last_item == null)
        return 0;
    
    this.last_item ["active"] = 1;
    this.setActive('top', pos[0], pos[1]+1);
}

ALab.prototype.run_stop = function (from, el)
{
    clearInterval(this.interval);
    return 1;
}

ALab.prototype.run_up_down = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "top")
        return this.setActive('top', pos[0], pos[1]+1);
    else
    if(from == "bottom")
        return this.setActive('bottom', pos[0], pos[1]-1);
    else
        return 0;
    return 1;
}

ALab.prototype.run_left_right = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "left")
        return this.setActive('left', pos[0]+1, pos[1]);
    else
    if(from == "right")
        return this.setActive('right', pos[0]-1, pos[1]);
    else
        return 0;
    return 1;
}

ALab.prototype.run_up_right = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "top")
        return this.setActive('left', pos[0]+1, pos[1]);
    else
    if(from == "right")
        return this.setActive('bottom', pos[0], pos[1]-1);
    else
        return 0;
    return 1;
}

ALab.prototype.run_up_left = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "top")
        return this.setActive('right', pos[0]-1, pos[1]);
    else
    if(from == "left")
        return this.setActive('bottom', pos[0], pos[1]-1);
    else
        return 0;
    return 1;
}

ALab.prototype.run_down_left = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "bottom")
        return this.setActive('right', pos[0]-1, pos[1]);
    else
    if(from == "left")
        return this.setActive('top', pos[0], pos[1]+1);
    else
        return 0;
    return 1;
}

ALab.prototype.run_down_right = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "bottom")
        return this.setActive('left', pos[0]+1, pos[1]);
    else
    if(from == "right"    )
        return this.setActive('top', pos[0], pos[1]+1);
    else
        return 0;
    return 1;
}

ALab.prototype.run_cross_left = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "top")
        return this.setActive('top', pos[0], pos[1]+1);
    else
    if(from == "right")
        return this.setActive('top', pos[0], pos[1]+1);
    else
        return 0;
    return 1;
}

ALab.prototype.run_cross_right = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "top")
        return this.setActive('top', pos[0], pos[1]+1);
    else
    if(from == "left")
        return this.setActive('top', pos[0], pos[1]+1);
    else
        return 0;
    return 1;
}

ALab.prototype.run_cross_up_left_right = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "top")
        return this.setActive('top', pos[0], pos[1]+1);
    else
    if(from == "left")
        return this.setActive('top', pos[0], pos[1]+1);
    else
    if(from == "right")
        return this.setActive('top', pos[0], pos[1]+1);
	else
        return 0;
    return 1;
}

ALab.prototype.run_operations = function (from, el)
{
    var toParse = el["value"];
    if(toParse == null)
	return this.run_cross(from, el);
	
    var lines = toParse.split('\n');
    
    for (var k=0; k < lines.length; k++)
    {
        var line = lines[k];
        var eq = line.search('=');
        var key = line.substring(0,eq);
        var value = line.substring(eq+1,line.length);
        var expr = evParser.Parser.parse(value);
        this.global_vars[key] = expr.evaluate(this.global_vars);
    }
    //alert();
    return this.run_cross(from, el)
}

ALab.prototype.run_in = function (from, el)
{
    var toParse = el["value"].toString();
    console.log('run_in');
    
    this.global_vars[toParse] = Math.round(Math.random() * (1000||1));
    console.log(toParse + this.global_vars[toParse]);
/*    var rl = readline.createInterface({
   input: process.stdin,
    output: process.stdout
    });

  rl.question(toParse, function(answer) {
        global_vars[toParse] = answer;
        program_pause = false;
        rl.close();
    });*/
        return this.run_cross(from, el);
}

ALab.prototype.run_out = function (from, el)
{
    var toParse = el["value"]
    var variable = this.global_vars[toParse];
    console.log('OUT: '+variable);
    return this.run_cross(from, el);
}

ALab.prototype.run_msg = function (from, el)
{
    var toParse = el["value"];
    console.log('MSG: '+toParse);
    return this.run_cross(from, el)

}

ALab.prototype.run_log = function(from, el)
{
    var toParse = el["value"];
    var variable = this.global_vars[toParse];
    console.log(toParse+": "+variable);
    return this.run_cross(from, el)
}

ALab.prototype.run_light_on = function (from, el)
{
    this.emit('light_on');
//    console.log("Light: on");
    return this.run_cross(from, el)
}

ALab.prototype.run_light_off = function (from, el)
{
    this.emit('light_off');
//    console.log("Light: off");
    return this.run_cross(from, el)
}


ALab.prototype.run_if = function (from, el)
{        
    var pos = this.getPosition(el);
    
    if(from == "top")
    {
        var toParse = el["value"];
        var expr = evParser.Parser.parse(toParse);
    
        if(expr.evaluate(this.global_vars) == true)
        {
            return this.setActive('right', pos[0]-1, pos[1]);
        }
        else
        {
            return this.setActive('left', pos[0]+1, pos[1]);
        }
    }
    return 0;
}

ALab.prototype.run_cross = function (from, el)
{
    var pos = this.getPosition(el);
    if(from == "top")
        return this.setActive('top', pos[0], pos[1]+1);
    else
    if(from == "bottom")
        return this.setActive('bottom', pos[0], pos[1]-1);
    else
    if(from == "left")
        return this.setActive('left', pos[0]+1, pos[1]);
    else
    if(from == "right")
        return this.setActive('right', pos[0]-1, pos[1]);
    else
        return 0;
    return 1;
}


ALab.prototype.runBlockAtPosition = function (from, x,y)
{
    if(this.program_pause == true)
	return;

    this.getBlockAtPosition(x,y)

    if(this.last_item == null)
        return 0;
    
    this.last_item["active"] = 1;
//    console.log(this.last_item["type"]+ " " + this.last_item["pos_x"] + " " + this.last_item["pos_y"] );
    
	if(this.last_item["type"] == 'up_down')
            return this.run_up_down (from, this.last_item);
        else
        if(this.last_item["type"] ==  ('left_right'))
            return this.run_left_right (from,this.last_item);
        else
        if(this.last_item["type"] ==  ('right_up'))
            return this.run_up_right (from,this.last_item);
        else
        if(this.last_item["type"] ==  ('left_up'))
            return this.run_up_left (from,this.last_item);
        else
        if(this.last_item["type"] == ('left_down'))
            return this.run_down_left (from,this.last_item);
        else
        if(this.last_item["type"] == ('right_down'))
            return this.run_down_right (from,this.last_item);
        else
        if(this.last_item["type"] == ('cross_left'))
            return this.run_cross_left (from,this.last_item);
        else
        if(this.last_item["type"] == ('cross_right'))
            return this.run_cross_right (from,this.last_item);
        else
	if(this.last_item["type"] == ('cross_up_left_right'))
            return this.run_cross_up_left_right (from,this.last_item);
        else
        if(this.last_item["type"] == ('cross'))
            return this.run_cross (from,this.last_item);
        else
        if(this.last_item["type"] == ('stop'))
            return this.run_stop (from,this.last_item);
        else
        if(this.last_item["type"] == ('operations'))
            return this.run_operations (from,this.last_item);
        else
        if(this.last_item["type"] == ('if'))
            return this.run_if (from,this.last_item);
        else
        if(this.last_item["type"] == ('in'))
            return this.run_in (from,this.last_item);
        else
        if(this.last_item["type"] == ('out'))
            return this.run_out (from,this.last_item);
	else
        if(this.last_item["type"] == ('log'))
            return this.run_log (from, this.last_item);
	else
        if(this.last_item["type"] == ('msg'))
            return this.run_msg (from,this.last_item);
        else
        if(this.last_item["type"] == ('light_on'))
            return this.run_light_on (from, this.last_item);
	else
        if(this.last_item["type"] == ('light_off'))
            return this.run_light_off (from,this.last_item);
        else
            return 0;
}

ALab.prototype.load = function (program)
{
    this.program = program;
    
    for (i=0; i<this.program["blocks"].length;i++)
    {
	if(this.program["blocks"][i]["type"] == "start")
	{
	    x = this.program["blocks"][i]["pos_x"];
	    y = this.program["blocks"][i]["pos_y"];
	    this.run_start(this.program["blocks"][i]);
	}
    }
}

ALab.prototype.run = function ()
{
    console.log('run.');
    var lab = this;
    this.interval = setInterval(function() {
    	lab.runBlockAtPosition(lab.active_from, lab.active_x, lab.active_y);
    }, 0.1 );
}


//alab = new ALab();
//alab.load(prog);
//alab.run();

/*
scope.ALab = ALab;
return ALab;

}) (typeof exports === 'undefined' ? {} : exports);
*/

module.exports = ALab
