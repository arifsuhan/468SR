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
*/

constant

function conv(tensor, kernel, pad, stride, weight, bias)
/*
this is the final BOSS method of this project if we can write this we are 
basically done with it sigh! 
this method recieves output of last layer and kernel size and stride and weight,
bias and performs conculution on it.

returns tensor
*/
{

}

function relu (tensor) 
/*
	this method will activate a tensor
*/
{
	
}

function constant (tensor) 
/*
tnis metod will rerunr a constant tensor
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


class Tensor
{
	constructor(array)
	/*
		this constructor recives any array and converts into 
		n dimentional arrary
	*/
	{

	}

	shape()
	/*
	this method returns the shape of the tesor object
	*/
	{

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

	}
	iterator(callback)
	/*
		this method will recive a function and 
		iterates all the value of the tensor 
	*/
	{

	}

	traspose()
	/*
	this method will return a transposed tensor
	*/
	{

	}
	mul(tensor)
	/*
	this method recieves a tensor and returns the multiplication with htis 
	tensor
	*/
	{


	}




}