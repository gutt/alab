
/////////////////////////////////////////////
/// PROGRAM PARSING
/////////////////////////////////////////////


var global_vars = new Array();
var active_from = null;
var active_x;
var active_y;
var program_pause;

function setActive(from, x ,y)
{
    active_from = from;
    active_x = x;
    active_y = y;
    return 1;
}

function reset_glow()
{
    $$('#app_table DIV.drag').each( function (item, index) {item.removeClass('active_block');});
}

function runBlockAtPosition(from, x,y)
{
    try
    {
	if(program_pause == true)
		return;
	if($$('.active_block').length == 0)
	{
		if($$("#app_table .start").length == 0)
			return;
			
		active_from = $$("#app_table .start")[0];
		return run_start(active_from);
	}
    getBlockAtPosition(x,y)
    if(last_item == null)
    {
        return 0;
    }
    reset_glow();
    last_item.addClass('active_block');
    //if(block != null)
    {
		if(last_item.hasClass ('light_on'))
            return run_light_on (from,last_item);
        else
        if(last_item.hasClass ('light_off'))
            return run_light_off (from,last_item);
		else
        if(last_item.hasClass ('up_down'))
            return run_up_down (from, last_item);
        else
        if(last_item.hasClass ('left_right'))
            return run_left_right (from,last_item);
        else
        if(last_item.hasClass ('right_up'))
            return run_up_right (from,last_item);
        else
        if(last_item.hasClass ('left_up'))
            return run_up_left (from,last_item);
        else
        if(last_item.hasClass('left_down'))
            return run_down_left (from,last_item);
        else
        if(last_item.hasClass('right_down'))
            return run_down_right (from,last_item);
        else
        if(last_item.hasClass('cross_left'))
            return run_cross_left (from,last_item);
        else
        if(last_item.hasClass('cross_right'))
            return run_cross_right (from,last_item);
        else
		if(last_item.hasClass('cross_up_left_right'))
            return run_cross_up_left_right (from,last_item);
        else
        if(last_item.hasClass('cross'))
            return run_cross (from,last_item);
        else
        if(last_item.hasClass('stop'))
            return run_stop (from,last_item);
        else
        if(last_item.hasClass('operations'))
            return run_operations (from,last_item);
        else
        if(last_item.hasClass('if'))
            return run_if (from,last_item);
        else
        if(last_item.hasClass('sleep'))
            return run_sleep (from,last_item);
        else
        if(last_item.hasClass('in'))
            return run_in (from,last_item);
        else
        if(last_item.hasClass('out'))
            return run_out (from,last_item);
		else
        if(last_item.hasClass('log'))
            return run_log (from, last_item);
		else
        if(last_item.hasClass('msg'))
            return run_msg (from,last_item);
        else
            return 0;
    }
    }
    catch (err)
    {
	reset_glow();
	  if(interval != null)
        window.clearInterval(interval);

    	msgBox = new mBox({
		content: '<div style=\"margin-bottom:30px;\">'+err+'</div><p><a href="#"><div class="ok">ZAMKNIJ</div></a></p>',
		title: 'Error',
		theme: 'Eli',
		overlay:true,
		overlayStyles: {
			color: 'black',
			opacity: 0.15
		},
		draggable: false,
		openOnInit: true,
		delayOpen: 0,
		closeOnClick: false,
		closeOnBodyClick: false,
		closeOnMouseleave: false,
		onCloseComplete: function ()
		{
			removeMboxs();
		},
		fade: {
        open: true,
        close: true,
		}
	});
	
	$$('.ok').addEvent('click', 
	function(el)
	{
		msgBox.close();
		delete msgBox;
		
		removeMboxs();
	});
    }

}


function run_start(el)
{
    reset_glow();
    var pos = getPosition(el);
    //if(runBlockAtPosition('top', pos[0], pos[1]+1) == 0)
    //    alert("error!");
    getBlockAtPosition(pos[0], pos[1]);
    if(last_item == null)
    {
        return 0;
    }
	last_item.addClass('active_block');
	setActive('top', pos[0], pos[1]+1);
}

function run_stop(from, el)
{
    reset_glow();
	  if(interval != null)
        window.clearInterval(interval);
    return 1;
}

function run_up_down(from, el)
{
    //alert('up_down from:'+ from);
    var pos = getPosition(el);
    if(from == "top")
        return setActive('top', pos[0], pos[1]+1);
    else
    if(from == "bottom")
        return setActive('bottom', pos[0], pos[1]-1);
    else
        return 0;
    return 1;
}

function run_left_right(from, el)
{
    //alert('left_right from:'+ from);

    var pos = getPosition(el);
    if(from == "left")
        return setActive('left', pos[0]+1, pos[1]);
    else
    if(from == "right")
        return setActive('right', pos[0]-1, pos[1]);
    else
        return 0;
    return 1;
}
function run_up_right(from, el)
{
    //alert('up_right from:'+ from);
    var pos = getPosition(el);
    if(from == "top")
        return setActive('left', pos[0]+1, pos[1]);
    else
    if(from == "right")
        return setActive('bottom', pos[0], pos[1]-1);
    else
        return 0;
    return 1;
}

function run_up_left(from, el)
{
    //alert('up_left from:'+ from);
    var pos = getPosition(el);
    if(from == "top")
        return setActive('right', pos[0]-1, pos[1]);
    else
    if(from == "left")
        return setActive('bottom', pos[0], pos[1]-1);
    else
        return 0;
    return 1;
}
function run_down_left(from, el)
{
    //alert('down_left from:'+ from);
    var pos = getPosition(el);
    if(from == "bottom")
        return setActive('right', pos[0]-1, pos[1]);
    else
    if(from == "left")
        return setActive('top', pos[0], pos[1]+1);
    else
        return 0;
    return 1;
}
function run_down_right(from, el)
{
    //alert('down_right from:'+ from);
    var pos = getPosition(el);
    if(from == "bottom")
        return setActive('left', pos[0]+1, pos[1]);
    else
    if(from == "right"    )
        return setActive('top', pos[0], pos[1]+1);
    else
        return 0;
    return 1;
}

function run_cross_left(from, el)
{
    //alert('up_down from:'+ from);
    var pos = getPosition(el);
    if(from == "top")
        return setActive('top', pos[0], pos[1]+1);
    else
    if(from == "right")
        return setActive('top', pos[0], pos[1]+1);
    else
        return 0;
    return 1;
}

function run_cross_right(from, el)
{
    //alert('up_down from:'+ from);
    var pos = getPosition(el);
    if(from == "top")
        return setActive('top', pos[0], pos[1]+1);
    else
    if(from == "left")
        return setActive('top', pos[0], pos[1]+1);
    else
        return 0;
    return 1;
}
function run_cross_up_left_right(from, el)
{
    //alert('up_down from:'+ from);
    var pos = getPosition(el);
    if(from == "top")
        return setActive('top', pos[0], pos[1]+1);
    else
    if(from == "left")
        return setActive('top', pos[0], pos[1]+1);
    else
    if(from == "right")
        return setActive('top', pos[0], pos[1]+1);
	else
        return 0;
    return 1;
}

function run_operations(from, el)
{
    var toParse = el.getElements('.value_field')[0].value;
    var lines = toParse.split('\n');
    
    for (var k=0; k < lines.length; k++)
    {
        var line = lines[k];
        var eq = line.search('=');
        var key = line.substring(0,eq);
        var value = line.substring(eq+1,line.length);
        var expr = Parser.parse(value);
        global_vars[key] = expr.evaluate(global_vars);
    }
    //alert();
    return run_cross(from, el)
}

function run_light_on(from, el)
{
	light_on();
	return run_cross(from, el)
}

function run_light_off(from, el)
{
	light_off();
    return run_cross(from, el)
}



function run_in(from, el)
{
    var toParse = el.getElements('.value_field')[0].value;
    var msg = el.getElements('.msg_field')[0].value;

    if(msg.length == 0)
        title_msg = 'Podaj wartość zmiennej \''+toParse +'\'';
    else
        title_msg = msg;

	program_pause = true;
	scroll.stop();
	
	msgBox = new mBox({
		content: '<div style="margin-bottom:30px;"> \
				  <input type="text" class="in_value"/></div> \
				  <a href="#"> \
				  <div style="float:right; width:30px; height:30px;" class="pause" id="pause_button"></div> \
				  </a>\
				  <p><a href="#"><div class="ok">OK!</div></a></p>',
		title: title_msg,
		theme: 'Eli',
		overlay:true,
		overlayStyles: {
			color: 'black',
			opacity: 0.15
		},
		draggable: false,
		openOnInit: true,
		delayClose: 0,
		delayOpen: 0,
		closeOnClick: false,
		closeOnBodyClick: false,
		closeOnMouseleave: false,
		onCloseComplete: function ()
		{
			scroll.resume();
	
			program_pause = false;
				
			removeMboxs();
			return run_cross(from, el)
			
		},
		fade: {
        open: true,
        close: true,
		}
	});
	
	$$('.pause').addEvent('click', 
	function(el)
	{	
		if(interval != null)
			window.clearInterval(interval);
		msgBox.close();
		removeMboxs();
	});
	
	$$('.ok').addEvent('click', 
	function(el)
	{
		global_vars[toParse] = $$(".in_value")[0].value;
		msgBox.close();
		delete msgBox;
		
		removeMboxs();
	});
}
function removeMboxs()
{
	$$('.ok').removeEvents('click');
		$$('.pause').removeEvents('click');
		$$(".mBox").each(
		function(el)
		{
			el.destroy();
		});
}
function run_out(from, el)
{
    var toParse = el.getElements('.value_field')[0].value;
	var msg = el.getElements('.msg_field')[0].value;
    if(msg.length == 0)
        title_msg = toParse + ' = ';
    else
        title_msg = msg + '<br/>';

	program_pause = true;
	scroll.stop();
	var msgBox = new mBox({
		content: '<div style="min-width:150px;padding-bottom:10px; margin-bottom:30px; font-size:150%">' + title_msg + '<span class="bold">' + global_vars[toParse] + '</span></div> \
				  <a href="#"><div style="float:right; width:30px; height:30px;" class="pause" id="pause_button"></div></a> \
				  <p><a href="#"><div class="ok">OK!</div></a></p>',
		title: (msg.length==0)?'Wartość zmiennej':"",
		theme: 'Eli',
		overlay:true,
		overlayStyles: {
			color: 'black',
			opacity: 0.15
		},
		draggable: false,
		openOnInit: true,
		delayClose: 0,
		delayOpen: 0,
		closeOnClick: false,
		closeOnBodyClick: false,
		closeOnMouseleave: false,

		onCloseComplete: function ()
		{
			scroll.resume();
			program_pause = false;
				
			removeMboxs();
			return run_cross(from, el)
			//this.destroy();
		},
		fade: {
        open: true,
        close: true,
		}
		});
	$$('.pause').addEvent('click', 
	function()
	{	
		if(interval != null)
			window.clearInterval(interval);
		msgBox.close();
			
		removeMboxs();
	}
	);
	$$('.ok').addEvent('click', 
	function(el)
	{
		
		msgBox.close();
		delete msgBox;
		
		removeMboxs();
	}
	);
}
function run_msg(from, el)
{
    var toParse = el.getElements('.popup textarea')[0].value;
  //  alert(toParse);
  	program_pause = true;
	scroll.stop();
	var msgBox = new mBox({
		content: 	'<div style="margin-bottom:30px;">'+toParse+'</div> \
					<a href="#"><div style="float:right; width:30px; height:30px;" class="pause" id="pause_button"> </div></a> \
					<p><a href="#"><div class="ok">OK!</div></a></p>',
		title: 'Komunikat',
		theme: 'Eli',
		overlay:true,
		overlayStyles: {
			color: 'black',
			opacity: 0.15
		},
		draggable: false,
		openOnInit: true,
		delayClose: 0,
		delayOpen: 0,
		closeOnClick: false,
		closeOnBodyClick: false,
		closeOnMouseleave: false,
		onCloseComplete: function ()
		{
			program_pause = false;
			scroll.resume();
			$$('.pause').removeEvent('click');
				
			removeMboxs();
			return run_cross(from, el)
			//this.destroy();
		},
		fade: {
        open: true,
        close: true,
		}
	});
	$$('.pause').addEvent('click', 
	function()
	{	
		if(interval != null)
			window.clearInterval(interval);
		msgBox.close();
		removeMboxs();
	}
	);
	$$('.ok').addEvent('click', 
	function(el)
	{

		msgBox.close();
		delete msgBox;
		
		removeMboxs();
	}
	);
}

function run_log(from, el)
{
	var toParse = el.getElements('.value_field')[0].value;
    var msg = el.getElements('.msg_field')[0].value;
	var variable = global_vars[toParse];
    if(msg.length == 0)
        output = toParse + " " + variable;
    else
        output = msg + " " + variable;
	var output_paragraph = new Element('p', { html: output });
	var parent = $("output");
	output_paragraph.inject(parent, 'bottom');
	$$("#output").fireEvent('log_appended');
    return run_cross(from, el)
}

function run_if(from, el)
{        
    var pos = getPosition(el);
    
    if(from == "top")
    {
        var toParse = el.getElements('.value_field')[0].value;
        var expr = Parser.parse(toParse);

        if(expr.evaluate(global_vars) == true)
            return setActive('right', pos[0]-1, pos[1]);
        else
            return setActive('left', pos[0]+1, pos[1]);
    }
    return 0;
    //return run_if(from, el)
}

function run_sleep(from, el)
{        
    var pos = getPosition(el);
    
    if(from == "top")
    {
        var toParse = el.getElements('.value_field')[0].value;
        var expr = Parser.parse(toParse);

        if(expr.evaluate(global_vars) == true)
            return setActive('right', pos[0]-1, pos[1]);
        else
            return setActive('left', pos[0]+1, pos[1]);
    }
    return run_cross(from, el);
    //return run_if(from, el)
}


function run_cross(from, el)
{
    //alert('up_down from:'+ from);
    var pos = getPosition(el);
    if(from == "top")
        return setActive('top', pos[0], pos[1]+1);
    else
    if(from == "bottom")
        return setActive('bottom', pos[0], pos[1]-1);
    else
    if(from == "left")
        return setActive('left', pos[0]+1, pos[1]);
    else
    if(from == "right")
        return setActive('right', pos[0]-1, pos[1]);
    else
        return 0;
    return 1;
}

function light_on()
{
	var program = { "light": 1 };
    var aRequest = new Request.JSON({
                onSuccess : (function(json) {
          //  	alert('success: '+json);
                }).bind(this),
                onFailure : (function(e) {
           //        alert('Failure in saving algorithm!');
                }).bind(this),
                onError : (function(text, error) {
         //          alert('Error in saving algorithm! :'+text+" error: "+error);
				   saveBox.close();
                }).bind(this),
                url : '/nodejs/',
                method : 'POST',
                data: JSON.encode(program),
                urlEncoded: false
            });
    aRequest.setHeader('Content-Type', 'application/json; charset=utf-8');
    aRequest.send();
}

function light_off()
{
	var program = { "light": 0	};
    var aRequest = new Request.JSON({
                onSuccess : (function(json) {
            //	alert('success: '+json);
                }).bind(this),
                onFailure : (function(e) {
                 //  alert('Failure in saving algorithm!');
                }).bind(this),
                onError : (function(text, error) {
                  // alert('Error in saving algorithm! :'+text+" error: "+error);
				   saveBox.close();
                }).bind(this),
                url : '/nodejs/',
                method : 'POST',
                data: JSON.encode(program),
                urlEncoded: false
            });
    aRequest.setHeader('Content-Type', 'application/json; charset=utf-8');
    aRequest.send();
}
