var interval = null;
var control = 0;
var saveBox;
var scroll = null;

var select_box = null;
var s_left = 0;
var s_top = 0;
var moved = false;
//var program = null;
var outputScroll;
var saveMboxHtml = '<input id="algorithm_name" type="text" style="width:300px" placeholder="Algorithm name" /><br />\
					<textarea id="algorithm_description" style="width:300px; margin-top:5px" cols="40" rows="10" placeholder="Description">\
					</textarea><div id="save_program" style="clear:both">Save</div>';

function onEliInit()
{

    // set desktop to drag
    var elements = $$('#desktop');
    scroll = new Drag.Scroll(elements[0], {
        axis: {x: true, y: true}
    });
    
    // bad method for reseting counters..
    for(var i=0; i < blocks.length; i++)
		counter[blocks[i].toolbox] = 0;
		
    // create blocks
    for(var i=0; i<blocks.length; i++)
        create_block(blocks[i]);


    $$('.toolbox').addEvent('mousedown', toolbox_MouseDown);
    $$('.toolbox').addEvent('mouseup', toolbox_MouseUp);
	
	$$('#step_button').addEvent('click', step_button_Clicked);
    $$('#run_button').addEvent('click', run_button_Clicked);
    $$('#run_fast_button').addEvent('click', run_fast_button_Clicked);
    $$('#run_node_button').addEvent('click', run_node_button_Clicked);
    
    $$('#pause_button').addEvent('click', pause_button_Clicked);

    $$('#save_as_button').addEvent('click', save_as_button_Clicked);
    $$('#load_button').addEvent('click', load_button_Clicked);
	$$('#prev_button').addEvent('click', prev_toolbox_button_Clicked);
	$$('#next_button').addEvent('click', next_toolbox_button_Clicked);
	$$('#save_program').addEvent('click', saveProgram_Clicked);
	$$('#save_button').addEvent('click', save_button_Clicked);
    
	$$('#desktop').addEvent('mousedown', desktop_MouseDown);
	$$('#desktop').addEvent('mousemove', desktop_MouseMove);
	$$('#desktop').addEvent('mouseup', desktop_MouseUp);
	$$('#desktop').addEvent('click', desktop_Clicked);
	window.addEvent( 'keydown', function( evt ){ 
	if( evt.key == 'delete' ) 
		desktop_removeAllSelected();
	}); 
	$$('#show_log').addEvent('click', show_log_Clicked);
	$$('#save_button').setStyle('display','none');
	// Making the "container" div scrollable
	outputScroll = new Scrollable($('output'))
	$$('#output').addEvent('log_appended', function () {
	outputScroll.scrollBottom();
	});

	if (typeof program != 'undefined' && null != program )
	{
		loadFromJSON(program);
		$$('#save_button').setStyle('display','block');
	}
}
function desktop_removeAllSelected()
{
	$$('.selected_block').each(function(elm){ elm.destroy()});
};
function startSelection( e )
{
	select_box = new Element('div.select_box');
	scroll.stop();
	$$('#desktop').setStyle('cursor','se-resize');
	s_left = e.client.x + scroll.getScroll()[0];
	select_box.setStyle('left',s_left);
	s_top = e.client.y + scroll.getScroll()[1];
	select_box.setStyle('top', s_top);
	select_box.setStyle('width',0); 
	select_box.setStyle('height',0); 
	$$('#desktop').grab(select_box);
}
function stopSelection ( e )
{
	var box = $$('.select_box');
	
	x = parseInt(box.getStyle('left'));
	y = parseInt(box.getStyle('top'));
	x2= parseInt(box.getStyle('width'))+x;
	y2 = parseInt(box.getStyle('height'))+y;
	
	select_blocks( x,y,x2,y2);
	
	box.destroy();
	
	$$('#desktop').setStyle('cursor','move');
	scroll.resume();
}

function desktop_MouseDown ( e )
{
	if(e.alt == 1) 
	{
		if(e.control == 0)
			removeSelection();
		startSelection ( e );
	}
	moved = false;
}

function desktop_MouseMove ( e )
{
	moved = true;
	$$('.select_box').setStyle('width',e.client.x+scroll.getScroll()[0]-s_left);
	$$('.select_box').setStyle('height',e.client.y+scroll.getScroll()[1]-s_top);
}

function desktop_MouseUp ( e )
{
	stopSelection ( e );
}

function desktop_Clicked( e )
{
	
	if(e.control == 0 && e.alt == 0 && moved == false)
		removeSelection();
}

function show_log_Clicked( e )
{
	if($$("#output").getStyle("display") == 'none')
	{
		$$("#show_log").set('html', "Hide log");
		$$("#output").setStyle("display", "block");
	}
	else
	{
		$$("#show_log").set('html', "Show log");
		$$("#output").setStyle("display", "none");
	}
}

function removeSelection()
{
	$$('.selected_block').each ( function (elm) {
			elm.removeClass ('selected_block')
	}); 
}

function select_blocks ( x, y, x2, y2 )
{
	//console.log('x:'+ x+' y:'+y+ ' x2:'+x2 + ' y2:'+y2);
	$$('.appended_block').each(function(el)
	{
		el_x = parseInt(el.getStyle('left'))+64;
		el_y = parseInt(el.getStyle('top'))+64;
		el_x2 = el_x-64;
		el_y2 = el_y-64;
	
		if(el_x >= x && el_y >=y && el_x2 <= x2 && el_y2 <= y2) 
			el.addClass('selected_block')
	});
	
}

function saveProgram_Clicked()
{
	//alert('test');

	var data = {};
	data['program'] = generateJSON();

	data['name'] = $$("#algorithm_name")[0].value
	data['description'] = $$("#algorithm_description")[0].value
	var aRequest = new Request.JSON({
                onSuccess : (function(json) {
				   saveBox.close();
                }).bind(this),
                onFailure : (function(e) {
                   alert('Failure in saving algorithm!');
				   saveBox.close();
                }).bind(this),
                onError : (function(text, error) {
                   alert('Error in saving algorithm! :'+text+" error: "+error);
				   saveBox.close();
                }).bind(this),
                url : '/table/save/',
                method : 'POST',
                data: JSON.encode(data),
                urlEncoded: false
            });
    aRequest.setHeader('Content-Type', 'application/json; charset=utf-8');
    aRequest.send();
}

function run_node_button_Clicked()
{
    var program = {};
    program['data'] = generateJSON();
//    alert(JSON.encode(program));
    
    var aRequest = new Request.JSON({
                onSuccess : (function(json) {
            	alert('success: '+json);
                }).bind(this),
                onFailure : (function(e) {
                   alert('Failure in saving algorithm!');
                }).bind(this),
                onError : (function(text, error) {
                   alert('Error in saving algorithm! :'+text+" error: "+error);
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

function onShift()
{
}

function appendToLog(text)
{
    $$("#output textarea").appendText(text+"\n");
}

function toolbox_MouseDown()
{
    //scroll.stop();
}

function toolbox_MouseUp()
{
//    scroll.resume();
}

function step_button_Clicked()
{
    if(interval != null)
        window.clearInterval(interval);
    runBlockAtPosition(active_from, active_x, active_y);
}

function run_button_Clicked()
{
    if(interval != null)
        window.clearInterval(interval);
    interval = window.setInterval(function()
    {
        runBlockAtPosition(active_from, active_x, active_y);
    }, 30);
}

function run_fast_button_Clicked()
{
    if(interval != null)
        window.clearInterval(interval);
    interval = window.setInterval(function()
    {
        runBlockAtPosition(active_from, active_x, active_y);
    }, 0.1);
}
function save_as_button_Clicked()
{
	saveBox = new mBox({
		content: saveMboxHtml,
		overlay: true,
		title: 'Save program..',
		draggable: true,
		openOnInit: true,
		fade: {
        open: true,
        close: true
		},
	});
	$$('#save_program').addEvent('click', saveProgram_Clicked);
}


function save_button_Clicked()
{
	var output = generateJSON();
	//$$("#output textarea")[0].value = JSON.stringify(output);
	var data = {};
	data['program'] = generateJSON();

	var aRequest = new Request.JSON({
                onSuccess : (function(json) {
				   alert('program updated!');
                }).bind(this),
                onFailure : (function(e) {
                   alert('Failure in saving algorithm!');
                }).bind(this),
                onError : (function(text, error) {
                   alert('Error in saving algorithm! :'+text+" error: "+error);
                }).bind(this),
                url : '/table/save/'+program_id,
                method : 'POST',
                data: JSON.encode(data),
                urlEncoded: false
            });
    aRequest.setHeader('Content-Type', 'application/json; charset=utf-8');
    aRequest.send();
}

function load_button_Clicked()
{
	var dataToLoad = eval('(' + $$("#output textarea")[0].value + ')');
	loadFromJSON(dataToLoad);
	
}

function pause_button_Clicked()
{
    if(interval != null)
        window.clearInterval(interval);
}

function prev_toolbox_button_Clicked()
{
	$$('.toolbox_main').setStyle('display','none');
	$$('.toolbox_func').setStyle('display','block');
	
}

function next_toolbox_button_Clicked()
{
	$$('.toolbox_func').setStyle('display','none');
	$$('.toolbox_main').setStyle('display','block');

}