
var WebEventHandler = function ()
{
    console.log('serial port..');
};


WebEventHandler.prototype.light = function ( state ) 
{
	if(state == 1)
	{
		console.log('light_on');
		this.serialPort.write('z');
		this.state_light = 1;
	}
	else
	{
		console.log('light_on');
		this.serialPort.write('x');
		this.state_light = 0;
	}
};

module.exports = SerialEventHandler