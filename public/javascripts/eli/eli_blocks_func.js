var blocks = [  {'name':'start', 'toolbox':'func', 'tooltip':'Startowanie programu'}, 
				{'name':'stop', 'toolbox':'func','tooltip':'Kończenie programu'},
				{'name':'up_down', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'left_right', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'right_down', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'left_down', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'right_up', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'left_up', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'cross_left', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'cross_right', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'cross_up_left_right', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'cross', 'toolbox':'main', 'tooltip':'Blok łączeniowy'},
				{'name':'operations', 'toolbox':'func', 'tooltip':'Operacje na zmiennych'},
				{'name':'if', 'toolbox':'func', 'tooltip':'Instrukcja warunkowa'},
				{'name':'in', 'toolbox':'func', 'tooltip':'Wpisanie zmiennej'},
				{'name':'out', 'toolbox':'func', 'tooltip':'Wypisanie zmiennej na ekran'},
				{'name':'log', 'toolbox':'func', 'tooltip':'Zapis zmiennej do loga'},
				{'name':'msg', 'toolbox':'func', 'tooltip':'Okno dialogowe'},
				{'name':'timer', 'toolbox':'func', 'tooltip':'Timer'},
				{'name':'sleep', 'toolbox':'func', 'tooltip':'Pauza'},
				{'name':'light_on', 'toolbox':'func', 'tooltip':'Włącz lampkę'}];
//				{'name':'light_off', 'toolbox':'func', 'tooltip':'Wyłącz lampkę'}];
				
var math_operations = [ "sin()","cos()","tan()","asin()","acos()","atan()","sqrt()","log()","abs()","ceil()","floor()","round()","exp()",
						"random()", "fac()", "min()", "max()", "pyt()", "pow()", "atan2()", "E","PI" ];
var block_size = 64;
var half_size = block_size/2;
var counter = [];


var msgPopupHtml = 	'<h1>Komunikat</h1> \
					<table><tr> \
					<td><textarea class="msg_field" cols="48" rows="8"></textarea></td> \
					</tr></table>';

var pausePopupHtml = 	'<h1>Pauza na czas:</h1> \
					<table><tr> \
					<td><textarea class="value_field" cols="32" rows="8"></textarea></td> \
					<td><p><a href="#">Wstaw zmienną</a></p> <p><div class="select_math_operations">Oper. matematyczne</div></p></td> \
					</tr><tr><td colspan="2"><div class="popup_toolbox"></div></td></tr></table>';

var ifPopupHtml = 	'<h1>Jeżeli:</h1> \
					<table><tr> \
					<td><textarea class="value_field" cols="32" rows="8"></textarea></td> \
					<td><p><a href="#">Wstaw zmienną</a></p> <p><div class="select_math_operations">Oper. matematyczne</div></p></td> \
					</tr><tr><td colspan="2"><div class="popup_toolbox"></div></td></tr></table>';

var inPopupHtml =   '<h1>Wprowadź zmienną:</h1> \
					<table><tr> \
					<td>komunikat:</td> \
					<td colspan="2"><textarea class="msg_field" cols="28" rows="3"></textarea></td> \
					</tr><tr> \
					<td>zmienna:</td> \
					<td><textarea class="value_field" cols="20" rows="1"></textarea></td> \
					<td><p><div class="select_variable">Wybierz zmienną</div></p></td> \
					</tr><tr><td colspan="2"><div class="popup_toolbox"></div></td></tr></table>';

var outPopupHtml =  '<h1>Wypisz zmienną:</h1> \
					<table><tr> \
					<td>komunikat:</td> \
					<td colspan="2"><textarea class="msg_field" cols="28" rows="3"></textarea></td> \
					</tr><tr> \
					<td>zmienna:</td> \
					<td><textarea class="value_field" cols="20" rows="1"></textarea></td> \
					<td> \
					<p><div class="select_variable">Wybierz zmienną</div></p> \
					</td> \
					</tr><tr><td colspan="2"><div class="popup_toolbox"></div></td></tr></table>';

var logPopupHtml =  '<h1>Zapisz do loga:</h1> \
					<table><tr> \
					<td>komunikat:</td> \
					<td colspan="2"><textarea class="msg_field" cols="28" rows="3"></textarea></td> \
					</tr><tr> \
					<td>zmienna:</td> \
					<td><textarea class="value_field" cols="20" rows="1"></textarea></td> \
					<td> \
					<p><div class="select_variable">Wybierz zmienną</div></p> \
					</td> \
					</tr><tr><td colspan="2"><div class="popup_toolbox"></div></td></tr></table>';

var operPopupHtml = '<h1>Operacje</h1> \
					<table><tr> \
					<td><textarea class="value_field" cols="32" rows="8"></textarea></td> \
					<td> \
					<p><a href="#">Utwórz zmienną</a></p> \
					<p><div class="select_variable">Wybierz zmienną</div></p> \
					<p><div class="select_math_operations">Oper. matematyczne</div></p> \
					</td> \
					</tr><tr><td colspan="2"><div class="popup_toolbox"></div></td></tr></table>';

//var variableMboxHtml = '<div id="variablesMbox"><ol></ol></div>';
var insertMember = false;
function showVariables(output_element)
{
	// getting variables from blocks..
	var keys = new Array();
	var variableMboxHtml = "";
	$$(".popup").each( function(el) {
	
		if(el.getElements('.value_field').length)
		{
		var toParse = el.getElements('.value_field')[0].value;
		var lines = toParse.split('\n');
		for (var k=0; k < lines.length; k++)
		{
			var line = lines[k];
			var eq = line.search('=');
			var key = line.substring(0,eq);
			for (var i=0; i<keys.length; i++) {
				if(keys[i] == key)
				{
					key = "";
					break;
				}
			}
			if(key.length)
			{
				keys.push(key);
				variableMboxHtml += '<div class="variable"><p>' + key + '</p></div>';
			}
		}
		}
	});
	output_element.getParent().getParent().getParent().getElements(".popup_toolbox")[0].set('html', "<h1>Zmienne:</h1>"+variableMboxHtml);
	$$(".variable").addEvent("click", function(el) {
		el.preventDefault();
		output_element.getParent().getParent().getParent().getElements(".popup_toolbox")[0].set('html', "");

			insertMember = false;
		output_element.getParent().getParent().getParent().getElements('.value_field')[0].insertAtCursor(this.get('text'),false);
	});
}

function showMathOperations(output_element)
{
	// getting variables from blocks..
	var keys = new Array();
	var variableMboxHtml = "";
	for (var i=0; i<math_operations.length;i++)
	{
		//if((i%10) == 0 || i == 0)
	//		variableMboxHtml += "<p>";
		variableMboxHtml += '<div class="variable">' + math_operations[i] + '</div>';
	//	if((i%10) == 0 || i == 0)
		//	variableMboxHtml += "</p>";
	}
	output_element.getParent().getParent().getParent().getElements(".popup_toolbox")[0].set('html', "<h1>Operacje matematyczne:</h1>"+variableMboxHtml);
	$$(".variable").addEvent("click", function(el) {
		el.preventDefault();
		output_element.getParent().getParent().getParent().getElements(".popup_toolbox")[0].set('html', "");

			insertMember = false;
		output_element.getParent().getParent().getParent().getElements('.value_field')[0].insertAtCursor(this.get('text'),false);
	});
}

function hideOperations(output_element)
{
    $$(".popup_toolbox").each( function (el)
    {
	el.set('html', "");
    });
}

function sum (array){
    var result = 0;
    for (var l = array.length; l--;) result += array[l];
    return result;
};


function getPosition(el)
{
    var pos = Object.values(el.getStyles('left', 'top')).invoke('toInt');
    pos[0] = ((pos[0]) / block_size);
    pos[1] = ((pos[1]) / block_size);
    return pos
}

function getBlockAtPosition(x,y)
{
    last_item = null;
    $$('#app_table DIV.drag').each( function (item, index)
    {
        //alert(index);

        var p_X = parseInt(item.getStyle('left')) / block_size;
        var p_Y = parseInt(item.getStyle('top')) / block_size;
        
        if(p_X == x && p_Y == y)
        {
            last_item = item;
            return;
        }
    });
}

function clone_block(element)
{
	var block;
	for (var i=0; i < blocks.length;i++)
		if(element.hasClass(blocks[i].name))
			block = blocks[i];
    var el = element.clone(true, false);
    $$('.toolbox_'+block.toolbox).grab(el,'top');
    init_drops(el);
    var id = el.getChildren('div').getProperty('class');
    el.removeClass('appended_block');
    el.addClass('stack_block');
    el.setStyle('z-index', 5);
    set_pos(id,el);
}

function create_block(block)
{
    var el = new Element('div.drag.block.stack_block.wrapper.'+block.name);
    var el_id = new Element('div.'+counter[block.toolbox]);
    var tooltip = new Element('span.tooltip');
	if(block['toolbox']!='main')
	{
		var classic_tooltip = new Element('span.block_tooltip');
		classic_tooltip.appendText(block['tooltip']);
		el.grab(classic_tooltip, 'top');
	}
    el.grab(el_id, 'top');
    el.grab(tooltip, 'top');
    $$('.toolbox_'+block.toolbox).grab(el,'top');
    set_pos(counter[block.toolbox],el);
    init_drops(el);
	counter[block.toolbox]++;
}

function set_pos(id, el)
{
    var spacing = block_size + 5;
    if(id%2)
    {
        el.setStyle('top', 5+ id/2 * spacing-(spacing/2));
        el.setStyle('left', 10+spacing*(id%2));
    }
    else
    {
        el.setStyle('left', 5);
        el.setStyle('top', 5+ id/2 * spacing);
    }
}


function init_drops (el)
{
    el.getChildren('.tooltip').addEvent('click', function()
    {
        el.destroy();
    });
    var popup;
    var moved = 0;
    var drag_;
	var snapped;
	el.drag = null;
	var left_last;
	var top_last;
	//var control = 0;
    // add events to drag items.
    el.addEvents(
    {    
        'mousemove': function(e)
        {
            moved = 1;
			if(snapped)
			{
				left = left_last - parseInt(el.getStyle('left'));
				top_ = top_last - parseInt(el.getStyle('top'));
				if(control == 1)
					el.addClass("selected_block");
				if(el.hasClass("selected_block"))
				{
					$$('.selected_block').each(function(elm){
					if(el != elm)
					{
						el_last_left =  parseInt(elm.getStyle('left'));
						el_last_top =  parseInt(elm.getStyle('top'));
						elm.setStyle('left', el_last_left-left);
						elm.setStyle('top',  el_last_top-top_);
						elm.setStyle('z-index',  999);
					}
					});
				}
				else
				{
					$$('.selected_block').each(function(elm){elm.removeClass('selected_block')});
				}
				
				left_last = parseInt(el.getStyle('left'));
				top_last = parseInt(el.getStyle('top'));
			}
        },
        'mouseenter': function(e) 
        {
            if(snapped)
				return;
			scroll.stop();
            el.setStyle('z-index', 500);
        },
        'mouseleave': function(e) 
        {
			if(snapped)
				return;
			if(program_pause)
				return;
            scroll.resume();
            if(el.getChildren (".popup")[0] != null)
            {
		hideOperations(el);
		if(insertMember == false)
		{
			el.getChildren (".popup")[0].hide();
			drag_.attach();
		}
            }
		
            el.setStyle('z-index', 5);
        },
        'mousedown': function(e)
        {    
			insertMember = false;
			
			if(e.alt)
				drag_.detach();
			else
			if(e.shift)
				shift = 1;
			else 
				shift = 0;
			if(el.hasClass('appended_block'))
			if(e.control)
			{
				control = 1;
			}
			else
			{
				control = 0;
				//$$('.selected_block').each(function(elm){elm.removeClass('selected_block')});
			}
			moved = 0;
            scroll.stop();
            left_last = parseInt(el.getStyle('left'));
				top_last = parseInt(el.getStyle('top'));
        },
        'mouseup': function(e)
        {   
            scroll.resume();
            
        },
        'click': function(e)
        {
			if(control == 1 && moved ==0)
			{
				if(el.hasClass('appended_block'))
				{
					if(el.hasClass('selected_block'))
						el.removeClass('selected_block');
					else
						el.addClass('selected_block');
				}
			}
			else
            if(moved == 0)
            {
				$$('.selected_block').each(function(elm){elm.removeClass('selected_block')});
                if(el.getParent().hasClass("content"))
                if(el.hasClass('start'))
                {
                    run_start(el);
					 if(interval != null)
					window.clearInterval(interval);
					interval = window.setInterval(function()
					{
						runBlockAtPosition(active_from, active_x, active_y);
					} ,30);
                }
                else 
                if(	el.hasClass('operations') || 
                	el.hasClass('if')  || 
                	el.hasClass('out') || 
                	el.hasClass('log') || 
                	el.hasClass('msg') || 
                	el.hasClass('sleep') || 
                	el.hasClass('in'))
                {
                    if(!el.getChildren (".popup")[0])
                    {
						if(el.hasClass('operations'))
							popup = createPopup('operations')
						else
						if(el.hasClass('if'))
							popup = createPopup('if')
						else
						if(el.hasClass('out'))
							popup = createPopup('out')
						else
						if(el.hasClass('log'))
							popup = createPopup('log')
						else
						if(el.hasClass('msg'))
							popup = createPopup('msg')
						else
						if(el.hasClass('sleep'))
							popup = createPopup('sleep')
						else
						if(el.hasClass('in'))
							popup = createPopup('in')
						else
							popup = createPopup('operations')
							
                        el.grab(popup, 'top');
						el.getElements('.select_variable')[0].addEvent('click', function() {
							showVariables(this);
						});
						el.getElements('.select_math_operations')[0].addEvent('click', function() {
							showMathOperations(this);
						});
						
						el.getChildren (".popup")[0].setStyle('z-index', 10000);
						el.getChildren (".popup")[0].hide();
						
                    }
                    else
                    {
                        if(el.getChildren (".popup").length)
						{
							el.getChildren (".popup")[0].show();
							el.getChildren (".popup")[0].setStyle('z-index', 10000);
						}
                    }
					
                    el.setStyle('z-index', 500);
                    drag_.detach();
                }
            }
            moved = 0;
        }
    });
    
    // make them draggable
    el.drag = drag_ = el.makeDraggable({
        droppables: $$('.content'),
        
        onEnter: function(draggable, droppable){
    },
    onSnap: function(){ // due to MooTool's inheritance, all [Drag][]'s Events are also available.
        snapped = true;
		
		if(shift)
        {
            if(el.hasClass('appended_block'))
            {
                var elem = el.clone(true, false);
                $$('#app_table').grab(elem,'top');
                init_drops(elem);
                shift = 0;
            }
        }
        el.addClass('move_block');
        el.setStyle('z-index', 9999);
    },
    onComplete: function() 
	{
        snapped = false;
		scroll.resume();
        el.setStyle('z-index', 5);
        el.removeClass('move_block');
		el.removeClass('wrapper');
			$$('.selected_block').each(function(elm){
				
				var styles = Object.values(elm.getStyles('left', 'top')).invoke('toInt');
				var e_left = styles[0];
				var e_top = styles[1];
				e_left -= ((e_left+half_size) % block_size)-half_size;
				e_top -= ((e_top+half_size) % block_size)-half_size;

				elm.setStyle('left', e_left);
				elm.setStyle('top', e_top);
				elm.setStyle('z-index', 5);
			});
			
    },
    onLeave: function(draggable, droppable)
	{
    },
    onDrop: function(draggable, droppable)
	{
	
		el.removeClass('move_block');
		if (droppable)
		{
			droppable.grab(draggable);
			var styles = Object.values(draggable.getStyles('left', 'top')).invoke('toInt');
			var left = styles[0];
			var top = styles[1];

			// hack for dropping element to scrolled toolbox
			if(!draggable.hasClass ('appended_block'))
			{
				el.removeClass('stack_block');
				draggable.addClass ('appended_block');
				left += scroll.getScroll()[0];
				top  += scroll.getScroll()[1]+45;
				clone_block(draggable);

			}
		
			left -= ((left+half_size) % block_size)-half_size;
			top -= ((top+half_size) % block_size)-half_size;
		
			draggable.setStyle('left', left);
			draggable.setStyle('top', top);
			draggable.setStyle('z-index', 5);
        } 
        else 
        {
            clone_block(draggable);
            draggable.destroy();
        }
    }
  });
}

function generateJSON()
{
	var output = {};
	output['blocks'] = Array();
	var i=0;
	$$('#app_table DIV.drag').each( function (item, index)
	{
		var el = {};
		var pos = getPosition(item)
		el['pos_x'] = pos[0];
		el['pos_y'] = pos[1];
	//	alert(item.getChildren('.popup .value_field')[0]);
		
		if(item.getChildren('.popup .msg_field') != null)
			if(item.getChildren('.popup .value_field')[0] != null)
				el['value'] = item.getChildren('.popup .value_field')[0].value;
		if(item.getChildren('.popup .msg_field') != null)
			if(item.getChildren('.popup .msg_field')[0] != null)
				el['msg'] = item.getChildren('.popup .msg_field')[0].value;
		
		for (var i=0; i < blocks.length;i++)
			if(item.hasClass(blocks[i].name))
			{
				el['type'] = blocks[i].name;
				output['blocks'].push(el);
				i++;
			}
	});
	return output;
}


function createPopup(element_type)
{	

	var htmlPopup = "";


	switch(element_type)
	{
		case 'if':
			htmlPopup = ifPopupHtml;
		break;
		case 'out':
			htmlPopup = outPopupHtml;
		break;
		case 'log':
			htmlPopup = logPopupHtml;
		break;
		case 'msg':
			htmlPopup = msgPopupHtml;
		break;
		case 'sleep':
			htmlPopup = pausePopupHtml;
		break;
		case 'msg':
			htmlPopup = msgPopupHtml;
		break;
		case 'in':
			htmlPopup = inPopupHtml;
		break;
		case 'operations':
			htmlPopup = operPopupHtml;
		break;
		default: 
			htmlPopup = operPopupHtml;
		break;
	}
	return new Element('span.popup', { html: htmlPopup });
}

function loadFromJSON (dataToLoad)
{
	$$('#app_table DIV.drag').each( function (item, index) {
		item.destroy(); });

		var input = dataToLoad["blocks"];
	for (var i=0; i<input.length;i++)
	{
		var element = new Element('div.drag.block.appended_block.'+input[i]['type']);
		element.setStyle('left', block_size*(input[i]['pos_x']));
		element.setStyle('top', block_size*(input[i]['pos_y']));
		element.setStyle('z-index', 5);  
		element.setStyle('position', 'absolute');
		
		$$('#app_table').grab(element,'top');
		
		popup = createPopup(input[i]['type'])
		if(popup.getElements('.select_variable').length)
			popup.getElements('.select_variable')[0].addEvent('click', function() {
							showVariables(this);
						});
		if(popup.getElements('.select_math_operations').length)
			popup.getElements('.select_math_operations')[0].addEvent('click', function() {
							showMathOperations(this);
						});

		element.grab(popup, 'top');
		element.set('styles', {
			'opacity': 0,
			'visibility': 'visible' });
                                
		element.fade('in');

		if(input[i]['value'])
			if(element.getChildren('.popup .value_field').length)
				element.getChildren('.popup .value_field')[0].value = input[i]['value'];
		if(input[i]['msg'])
			if(element.getChildren('.popup .msg_field').length)
			element.getChildren('.popup .msg_field')[0].value = input[i]['msg'];

		popup.setStyle('z-index', 10000);
		popup.setStyle('display', 'block');

		popup.hide();		
		var tooltip = new Element('span.tooltip');
		element.grab(tooltip);
		init_drops(element);
	}
	scroll.center_to_start();
}