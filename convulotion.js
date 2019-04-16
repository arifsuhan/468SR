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

0 0 0 0 0 
0 1 2 3 0
0 1 2 3 0
0 1 2 3 0
0 0 0 0 0
3x3
(3+1+1) x (3+1+1)
5x5

*/

function convolve(tensor, filter) 
{
	var sum = 0;
	for (var i = 0; i < tensor.length; i++ )
	{
		for (var j=0; j < tensor[0].length; j++)
		{
			sum+= tensor[i][j] * filter[i][j];
		}
	}

	return sum;


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

	// horizontal side by side 
	// vertical up down
	console.log("Tensor: ", tensor.shape());
	console.log("kernel: ", kernel);
	console.log("Pad: ",pad);
	console.log("Stide: ",stride);
	console.log("weight: ",weight);
	console.log("bias: ",bias);

	// var o = [
	// 	[5,3,2,1,7],
	// 	[9,2,1,3,2],
	// 	[9,4,5,3,7],
	// 	[1,6,7,8,1],
	// 	[2,0,5,3,6]
	// ]

	// var p1 = [
	// 	[0, -1, 0],
	// 	[-1, 5,-1],
	// 	[0, -1, 0]	
	// ]

	// /*
	// 00 01 02
	// 10 11 12
	// 20 21 22

	// 01 02 03
	// 11 12 13
	// 21 22 23

	// 02 03 04
	// 12 13 14
	// 22 23 24
	// */

	// var s = [1,1];

	// //console.log(o);

	// var counter = 0 ,sum = 0;

	// var newArray = [];

	// for(var i=0; i< o.length - p1.length+1; i+=s[0])
	// {
	// 	for(var j=0; j<o[0].length - p1[0].length+1; j+=s[1])
	// 	{	

	// 		//sum = o[i][j]*k[i][j] +



	// 		for(var k=0; k< p1[0].length ; k++)
	// 		{
	// 			//console.log( i+k,j ,"x", k ,counter , "|" , i+k,j+1 ,"x", k, counter+1, "|" ,i+k,j+2, "x", k ,counter+2);
	// 			//sum += o[i+k][j] * p1[k][counter] + o[i+k][j+1] * p1[k][counter+1] + o[i+k][j+2] * p1[k][counter+2]; 
	// 			newArray.push([ o[i+k][j]  , o[i+k][j+1] , o[i+k][j+2]] ) ; 
	// 		}

	// 		sum = convolve(newArray, p1 );

	// 		console.log(newArray);
	// 		newArray = [];
	// 		console.log(sum);
			
	// 		counter = 0;
	// 		//console.log("b1");
	// 		// console.log(i,j   , "|" , i,j+1 ,  "|" ,i  ,j+2 );
	// 		// console.log(i+1,j , "|" , i+1,j+1, "|" ,i+1,j+2 );
	// 		// console.log(i+2,j , "|" , i+2,j+1, "|" ,i+2,j+2 );
	// 	}
	// 	//console.log("break");
	// }

	// //console.log(k);
}

function pad(tensor, size)
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
	return const tensor;
}


class Tensor
{
	constructor(array)
	/*
		this constructor recives any array and converts into 
		n dimentional array
	*/
	{
		this.array = array;
	}

	shape()
	/*
		this method returns the shape of the tensor object
	*/
	{	
		return this.dimention(this.array);
	}

	dimention(tensor)
	{

		if (tensor instanceof Array) {
		    return [tensor.length].concat(this.dimention(tensor[0]));
		} else {
		    return [];
		}
	}


	concatTensor(tensor)
	/*
		this method returns concatened  tesor whith the tensor in parametres
		return this.data + tensor.data
	*/
	{	

		this.array.concat()
		return 0;
	}

	add(tensor)
	/*
		this method adds a tensor with another tensor if the size and shape checks out
	*/
	{	
		var flag = 1;

		if( tensor.rank() == this.rank() )
		{	
			for (var i = 0 ; i< tensor.shape().length; i++) 
			{
				if(tensor.shape()[i] != this.shape()[i])
				{	
					console.log("tensors dimention didn't match!!! ");
					flag = 0;
					break;
				}
			}

			if(flag)
			{	
				//console.log("here");
				this.iterator(tensor,function(x,y){
					return x+y;
				});
			}
		}
		else
		{
			console.log("tensors rank didn't match!!! ");
			return 0;
		}
	}

	reshape(shape)
	/*
		this method rehapes the tensor into desired shape if the multiplication of 
		the shape matches. 
	*/
	{

	}

	rank()
	/*
		returns the rank of the tensor
	*/
	{
		return this.shape().length;

	}

	iterator(callback)
	/*
		this method will recive a function and 
		iterates all the value of the tensor or same as broadcasting 
	*/
	{	
		if(this.rank() == 4)
		{
			//console.log(this.rank());
		
			for (var i = 0 ; i< this.array.length; i++) {
				for (var j = 0 ; j< this.array[i].length; j++){
					for (var k = 0 ; k< this.array[i][j].length; k++){
						for (var l = 0 ; l< this.array[i][j][k].length; l++)
						{
							this.array[i][j][k][l] = callback(this.array[i][j][k][l]);
						}
					}
				}
			}
		}

		else if(this.rank() == 2)
		{
			for (var i = 0 ; i< this.array.length; i++) {
				for (var j = 0 ; j< this.array[i].length; j++){
					this.array[i][j] = callback(this.array[i][j]);
				}
			}
		}
		else
		{
			console.log("Must be 4d tensor");
			return 0;
		}
	}

	iterator(tensor,callback)
	{
		if(this.rank() == 4)
		{
			//console.log(this.rank());
		
			for (var i = 0 ; i< this.array.length; i++) {
				for (var j = 0 ; j< this.array[i].length; j++){
					for (var k = 0 ; k< this.array[i][j].length; k++){
						for (var l = 0 ; l< this.array[i][j][k].length; l++)
						{
							this.array[i][j][k][l] = callback(this.array[i][j][k][l],tensor.array[i][j][k][l]);
						}
					}
				}
			}
		}

		else if(this.rank() == 2)
		{
			//console.log("2d rank iterator");
			for (var i = 0 ; i< this.array.length; i++) {
				for (var j = 0 ; j< this.array[i].length; j++){
					//console.log(this.array[i][j]);
					this.array[i][j] = callback( this.array[i][j],tensor.array[i][j]);
				}
			}
		}
		else
		{
			console.log("Must be 4d tensor");
			return 0;
		}
	}

	transpose()
	/*
		this method will return a transposed tensor
	*/
	{	

		if(this.rank() == 4)
		{
			

			var copy = new Array(this.array.length);

			for (var i = 0; i < this.array.length; i++) {
			    copy[i] = new Array(this.array[0].length);
			    for (var j = 0; j < this.array[0].length; j++) {
			        copy[i][j] = new Array(this.array[0][0].length);
			        for (var k = 0; k < this.array[0].length; k++) {
			        	copy[i][j][k] = new Array(this.array[0][0].length);
			        	for (var l = 0; l < this.array[0].length; l++) {
			        		copy[i][j][k][l] = 0;
			        	}
			        }
			    }
			}
			//console.log(new Tensor(copy).shape());
			
			
			for (var i = 0 ; i< this.array.length; i++) {
				for (var j = 0 ; j< this.array[i].length; j++){
					for (var k = 0 ; k< this.array[i][j].length; k++){
						for (var l = 0 ; l< this.array[i][j][k].length; l++)
						{	
							copy[i][j][l][k] = this.array[i][j][k][l];
						}
					}
				}
			}

			return copy;
		}

		else if(this.rank() == 2)
		{
			console.log("2d rank transpose");

			// int[][] temp = new int[columns][rows];

			var copy = [[],[]];

			for (var i = 0 ; i< this.array.length; i++) {
				for (var j = 0 ; j< this.array[i].length; j++){
				    copy[j][i] = this.array[i][j];
				}
			}
			return copy;
		}
		else
		{
			console.log("Must be 2d or higher tensor");
			return 0;
		}
	}

	mul(tensor)
	/*
		this method recieves a tensor and returns the multiplication with it's tensor
	*/
	{
		this.iterator(tensor,function(x,y){
			return x*y;
		});
	}


	addBias(tensor)
	{
		if (this.shape()[0] ===  tensor.shape()[0])
		{
			//this bias can be added
			for(var i =0; i<this.shape()[0]; i++)
			{
				for(var j =0; j<this.shape()[1]; j++)
				{
					for(var k =0; k<this.shape()[2]; k++)
					{
						for(var l =0; l<this.shape()[3]; l++)
							this.array[i][j][k][l] = this.array[i][j][k][l] + tensor.array[i];
					}
				}

			}
		}
		else
		{
			//bias invalid
			console.log('bias invalid');
		}
	}
}