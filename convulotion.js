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



function conv(tensor, kernel, pad, stride, size, weight, bias)
/*
this is the final BOSS method of this project if we can write this we are 
basically done with it sigh! 
this method recieves output of last layer and kernel size and stride and weight,
bias and performs conculution on it.

returns tensor
*/
{

}

function pad(tensor, size)
/*
	this function will recieve a tensor and add padding to it
	depending on the size
*/

{

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
	
}

// function dim(mat) {
// 	if (mat instanceof Array) {
// 	    return [mat.length].concat(dim(mat[0]));
// 	} else {
// 	    return [];
// 	}
// }



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


	concat(tensor)
	/*
		this method returns concatened  tesor whith the tensor in parametres
		return this.data + tensor.data
	*/
	{

	}

	add(tensor)
	/*
		this method adds a tensor with another tensor if the size and shape checks out
	*/
	{

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
		return this.shape().length

	}
	iterator(callback)
	/*
		this method will recive a function and 
		iterates all the value of the tensor or same as broadcasting 
	*/

	{

	}

	transpose()
	/*
		this method will return a transposed tensor
	*/
	{

	}
	mul(tensor)
	/*
	this method recieves a tensor and returns the multiplication with it's tensor
	*/
	{


	}
}