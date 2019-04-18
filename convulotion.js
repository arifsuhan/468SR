// var conv = funtion(){}


// var main = funtion(
// 	//weight and bias

// 	)

/*
Pad
conv
relu
concat

mul
add
reshape
traspose

constant

*/

function array_with_length(length, val) {

	var arr = [];
	for(var i=0; i<length; i++)
	{
		arr.push(val)
	}
	return arr;
}

function array_with_shape(shape) {
	var arr = [];
	for (var i = shape.length - 1; i >= 0; i--) {
		if(i == shape.langht - 1)
		{
			arr = array_with_length(shape[i],0)
		}
		else
		{
			arr = array_with_length(shape[i],arr)
		}
	}
	return arr;
}


function array_mul(arg)
{
	let mul = 1;
	for (var i = 0; i< arg.length ; i++)
	{
		mul*=arg[i];
	}
}

function padding(tensor, size)
/*
	this function will recieve a tensor and add padding to it
	depending on the size
*/
//Array(24).fill(0)
{	
	if(size == 0)
	{
		return tensor;
	}
	else
	{	
		var addPad = tensor.shape()[0]+ 2*size;
		var zero =[0];
		var upDown = [Array(addPad).fill(0)];

		for(var i=0; i<tensor.shape()[0];i++)
		{
			for(var j=0; j<tensor.shape()[1];j++)
			{
				for(var k=0; k<tensor.shape()[2];k++)
				{
					tensor.array[i][j][k] = zero.concat(tensor.array[i][j][k]);
					tensor.array[i][j][k] = tensor.array[i][j][k].concat(zero);
				}
			}
		}

		//up zeros pad
		for(var i=0; i<tensor.shape()[0];i++)
		{
			for(var j=0; j<tensor.shape()[1];j++)
			{
				tensor.array[i][j] = upDown.concat(tensor.array[i][j]);
			}
		}
		
		//down zeros pad
		for(var i=0; i<tensor.shape()[0];i++)
		{
			for(var j=0; j<tensor.shape()[1];j++)
			{
				tensor.array[i][j] = tensor.array[i][j].concat(upDown);
			}
		}

		//console.log(tensor.array[0][0]);
		//console.log(tensor);
		
		return tensor;
	}
	
}

function filterApply(tensor, filter) 
{
	var sum = 0;

	//console.log(tensor.length,filter.length)

	for (var i = 0; i < tensor.length; i++ )
	{
		for (var j=0; j < tensor[0].length; j++)
		{
			sum+= tensor[i][j] * filter[i][j];
		}
	}

	return sum;
}

function conv2dTensor(tensor, kernel, pad, stride, weight,bias)
{	

	
	
	var row = tensor.length - kernel[0]+1;
	var col = tensor[0].length - kernel[1]+1;

	var newArray = [];
	var storeArray = [];

	for(var i=0; i< row; i+=stride)
	{
		storeArray.push( Array(col).fill(0) );
	}

	//console.log(weight);
	//console.log(row,col);

	for(var i=0; i< row; i+=stride)
	{
		for(var j=0; j< col; j+=stride)
		{	

			newArray.push([ tensor[i][j], tensor[i][j+1], tensor[i][j+2] ]); 
			newArray.push([ tensor[i+1][j], tensor[i+1][j+1], tensor[i+1][j+2] ]); 
			newArray.push([ tensor[i+2][j], tensor[i+2][j+1], tensor[i+2][j+2] ]); 

			// for(var k=0; k< kernel[0] ; k++)	
			// {	
			// 		newArray.push([ tensor.array[i+k][j], tensor.array[i+k][j+1], tensor.array[i+k][j+2] ]); 
			// }

			//console.log(newArray.length);
			//console.log(newArray.length);
			sum = filterApply( newArray, weight );
			
			//console.log(sum);
			storeArray[i][j] = sum;
			sum = 0;
			newArray=[];
		}
	}

	//console.log(storeArray);

	return storeArray;
}

function conv(tensor, kernel, pad, stride, weight, bias)
/*
this is the final BOSS method of this project if we can write this we are 
basically done with it sigh! 
this method recieves output of last layer and kernel size and stride and weight,
bias and performs convulotion on it.

returns tensor
*/
{

	/*
	horizontal side by side 
	vertical up down
	*/

	// console.log("Tensor: ", tensor.shape());
	// console.log("kernel: ", kernel);
	// console.log("Pad: ",pad);
	// console.log("Stide: ",stride);
	//console.log("weight: ",weight.shape());
	// console.log("bias: ",bias.shape());

	//tensor = padding(tensor,pad[2]);
	//console.log("Tensor: ", tensor.shape());
	//console.log("Tensor: ", tensor);

	//var counter = 0;

	// console.log(weight.array[0][0]);
	//console.log(tensor.array[0][0]);

	// var newMe = tensor.array[0][0];
	// newMe = conv2dTensor(tensor.array[0][0],kernel,pad[0],stride[0],weight,bias.array[0][0]);
	// console.log(newMe);

	//console.log();

	var sum = 0;
	var n1,n2,n3;

	for(var i=0; i< weight.shape()[0]; i++)
	{
		for(var j=0; j< weight.shape()[1]; j+=3)
		{	

			n1 = conv2dTensor(tensor.array[0], kernel, pad[0], stride[0], weight.array[i][j], bias);
			n2 = conv2dTensor(tensor.array[1], kernel, pad[0], stride[0], weight.array[i][j+1], bias);
			n3 = conv2dTensor(tensor.array[2], kernel, pad[0], stride[0], weight.array[i][j+2], bias);
			//console.log(weight.array[i][j]);
			// console.log( tensor.array[i] );
			// tensor.array[i][j] = conv2dTensor(new Tensor(tensor.array[i][j]),kernel,pad,stride,weight,bias);

			// console.log(conv2dTensor(new Tensor(tensor.array[i][j]),kernel,pad,stride,weight.array[i][j],bias));
			// console.log(counter);
			// counter+=1;
		}
	}

	n1 = new Tensor(n1);
	n2 = new Tensor(n2);
	n3 = new Tensor(n3);

	n1.add(n2);
	n1.add(n3);
	console.log(n1);
}


function relu (tensor) 
/*
	this method will activate a tensor
*/
{
	tensor.iterator(function(x) 
	{
		return ((x < 0) ? 0 : x);
	});

	return tensor;
}

function constant (tensor) 
/*
tnis metod will return a constant tensor
*/
{
	return tensor;
}


// class Tensor
// {
// 	constructor(array)
// 	/*
// 		this constructor recives any array and converts into 
// 		n dimentional array
// 	*/
// 	{
// 		this.array = array;
// 	}

// 	shape()
// 	/*
// 		this method returns the shape of the tensor object
// 	*/
// 	{	
// 		return this.dimention(this.array);
// 	}

// 	dimention(tensor)
// 	{

// 		if (tensor instanceof Array) {
// 		    return [tensor.length].concat(this.dimention(tensor[0]));
// 		} else {
// 		    return [];
// 		}
// 	}



// 	concatTensor(tensor)
// 	/*
// 		this method returns concatened  tesor whith the tensor in parametres
// 		return this.data + tensor.data
// 	*/
// 	{	

// 		//this.array.concat();
// 		return 0;
// 	}

// 	add(tensor)
// 	/*
// 		this method adds a tensor with another tensor if the size and shape checks out
// 	*/
// 	{	
// 		var flag = 1;

// 		if( tensor.rank() == this.rank() )
// 		{	
// 			for (var i = 0 ; i< tensor.shape().length; i++) 
// 			{
// 				if(tensor.shape()[i] != this.shape()[i])
// 				{	
// 					console.log("tensors dimention didn't match!!! ");
// 					flag = 0;
// 					break;
// 				}
// 			}

// 			if(flag)
// 			{	
// 				//console.log("here");
// 				this.iterator(tensor,function(x,y){
// 					return x+y;
// 				});
// 			}
// 		}
// 		else
// 		{
// 			console.log("tensors rank didn't match!!! ");
// 			return 0;
// 		}
// 	}

// 	reshape(shape)
// 	/*
// 		this method rehapes the tensor into desired shape if the multiplication of 
// 		the shape matches. 
// 	*/
// 	{	
// 		//console.log(shape);
// 		if(array_mul(this.shape()) === array_mul(shape))
// 		{
// 			var arr = array_with_shape(shape);
// 			var temp = this.flat();
// 			var f = 0;

// 			if(shape.length == 4)
// 			{
// 				//4D tensor
// 				for (var i = 0 ; i< shape[0]; i++) {
// 				for (var j = 0 ; j< shape[1]; j++){
// 					for (var k = 0 ; k< shape[2]; k++){
// 						for (var l = 0 ; l< shape[3]; l++)
// 						{
// 							arr[i][j][k][l] = temp[f];
// 							f++;
// 						}
// 					}
// 				}
// 			}
// 			}
// 			else if(shape.length == 3)
// 			{
// 				//3D tensor
// 				for (var i = 0 ; i< shape[0]; i++) {
// 				for (var j = 0 ; j< shape[1]; j++){
// 					for (var k = 0 ; k< shape[2]; k++){
													
// 						arr[i][j][k] = temp[f];
// 						f++;
						
// 					}
// 				}

// 				}
			
// 			}

// 			else if( shape.length == 2)
// 			{ //2D tensor 

// 				for (var i = 0 ; i< shape[0]; i++) {
// 				for (var j = 0 ; j< shape[1]; j++){
													
// 						arr[i][j] = temp[f];
// 						f++;
						
					
// 				}

// 				}

// 			}

// 			else if(shape.length == 1)
// 			{
// 				return new Tensor(temp);
// 			}


// 			return new Tensor(arr);

// 		}
// 		else
// 		{
// 			throw Error("Invalid reshape size")
// 		}

// 	}

// 	rank()
// 	/*
// 		returns the rank of the tensor
// 	*/
// 	{
// 		return this.shape().length;

// 	}

// 	iterator(callback)
// 	/*
// 		this method will recive a function and 
// 		iterates all the value of the tensor or same as broadcasting 
// 	*/
// 	{	
// 		if(this.rank() == 4)
// 		{
// 			//console.log(this.rank());
		
// 			for (var i = 0 ; i< this.array.length; i++) {
// 				for (var j = 0 ; j< this.array[i].length; j++){
// 					for (var k = 0 ; k< this.array[i][j].length; k++){
// 						for (var l = 0 ; l< this.array[i][j][k].length; l++)
// 						{
// 							this.array[i][j][k][l] = callback(this.array[i][j][k][l]);
// 						}
// 					}
// 				}
// 			}
// 		}

// 		else if(this.rank() == 2)
// 		{
// 			for (var i = 0 ; i< this.array.length; i++) {
// 				for (var j = 0 ; j< this.array[i].length; j++){
// 					this.array[i][j] = callback(this.array[i][j]);
// 				}
// 			}
// 		}
// 		else
// 		{
// 			console.log("Must be 4d tensor");
// 			return 0;
// 		}
// 	}

// 	iterator(tensor,callback)
// 	{
// 		if(this.rank() == 4)
// 		{
// 			//console.log(this.rank());
		
// 			for (var i = 0 ; i< this.array.length; i++) {
// 				for (var j = 0 ; j< this.array[i].length; j++){
// 					for (var k = 0 ; k< this.array[i][j].length; k++){
// 						for (var l = 0 ; l< this.array[i][j][k].length; l++)
// 						{
// 							this.array[i][j][k][l] = callback(this.array[i][j][k][l],tensor.array[i][j][k][l]);
// 						}
// 					}
// 				}
// 			}
// 		}

// 		else if(this.rank() == 2)
// 		{
// 			//console.log("2d rank iterator");
// 			for (var i = 0 ; i< this.array.length; i++) {
// 				for (var j = 0 ; j< this.array[i].length; j++){
// 					//console.log(this.array[i][j]);
// 					this.array[i][j] = callback( this.array[i][j],tensor.array[i][j]);
// 				}
// 			}
// 		}
// 		else
// 		{
// 			console.log("Must be 4d tensor");
// 			return 0;
// 		}
// 	}

// 	transpose()
// 	/*
// 		this method will return a transposed tensor
// 	*/
// 	{	

// 		if(this.rank() === 4)
// 		{
			

// 			var copy = new Array(this.array.length);

// 			for (var i = 0; i < this.array.length; i++) {
// 			    copy[i] = new Array(this.array[0].length);
// 			    for (var j = 0; j < this.array[0].length; j++) {
// 			        copy[i][j] = new Array(this.array[0][0].length);
// 			        for (var k = 0; k < this.array[0].length; k++) {
// 			        	copy[i][j][k] = new Array(this.array[0][0].length);
// 			        	for (var l = 0; l < this.array[0].length; l++) {
// 			        		copy[i][j][k][l] = 0;
// 			        	}
// 			        }
// 			    }
// 			}
// 			//console.log(new Tensor(copy).shape());
			
			
// 			for (var i = 0 ; i< this.array.length; i++) {
// 				for (var j = 0 ; j< this.array[i].length; j++){
// 					for (var k = 0 ; k< this.array[i][j].length; k++){
// 						for (var l = 0 ; l< this.array[i][j][k].length; l++)
// 						{	
// 							copy[i][j][l][k] = this.array[i][j][k][l];
// 						}
// 					}
// 				}
// 			}

// 			return copy;
// 		}

// 		else if(this.rank() === 2)
// 		{
// 			console.log("2d rank transpose");

// 			// int[][] temp = new int[columns][rows];

// 			var copy = [[],[]];

// 			for (var i = 0 ; i< this.array.length; i++) {
// 				for (var j = 0 ; j< this.array[i].length; j++){
// 				    copy[j][i] = this.array[i][j];
// 				}
// 			}
// 			return copy;
// 		}
// 		else
// 		{
// 			console.log("Must be 2d or higher tensor");
// 			return 0;
// 		}
// 	}

// 	mul(tensor)
// 	/*
// 		this method recieves a tensor and returns the multiplication with it's tensor
// 	*/
// 	{
// 		this.iterator(tensor,function(x,y){
// 			return x*y;
// 		});
// 	}

// 	flat()
// 	{
// 	var ret =  this.array.flat();
// 	while(ret[0] instanceof Array)
// 		ret = ret.flat();
// 	return ret;
// 	}


// 	addBias(tensor)
// 	{
// 		if (this.shape()[0] ===  tensor.shape()[0])
// 		{
// 			//this bias can be added
// 			for(var i =0; i<this.shape()[0]; i++)
// 			{
// 				for(var j =0; j<this.shape()[1]; j++)
// 				{
// 					for(var k =0; k<this.shape()[2]; k++)
// 					{
// 						for(var l =0; l<this.shape()[3]; l++)
// 							this.array[i][j][k][l] = this.array[i][j][k][l] + tensor.array[i];
// 					}
// 				}

// 			}
// 		}
// 		else
// 		{
// 			//bias invalid
// 			console.log('bias invalid');
// 		}
// 	}


// }