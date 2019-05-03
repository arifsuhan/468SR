
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

function addTensor(array1,array2)
{
	if(array1.length == undefined && array2.length == undefined)
	{
		return array1+array2; 
	}
	else
	{	
		if(array1.length == array2.length)
		{
			for(var i=0;i<array1.length;i++)
			{
				array1[i] = addTensor(array1[i],array2[i]);
			}

			return array1;
		}
		else
		{
			console.log("Tensor dimension don't match!!");
			return 0;
		}
	}
}





function filterApply(tensor, filter) 
{
	var sum = 0;

	//console.log(filter.length);

	for (var i = 0; i < tensor.length; i++ )
	{
		for (var j=0; j < tensor[0].length; j++)
		{
			sum+= tensor[i][j] * filter[i][j];
		}
	}

	return sum;
}

function conv2dTensor(tensor, kernel, pad = 0, stride = 1, weight)
{	

	var row = tensor.length - kernel[0]+1;
	var col = tensor[0].length - kernel[1]+1;

	var newArray = [];
	var storeArray = [];

	for(var i=0; i< row; i++)
	{
		storeArray.push( Array(col).fill(0) );
	}

	for(var i=0; i< row; i+=stride)
	{
		for(var j=0; j< col; j+=stride)
		{	

			for(var k=0; k< kernel[0] ; k++)	
			{	
				newArray.push([ tensor[i+k][j], tensor[i+k][j+1], tensor[i+k][j+2] ]); 
			}

			sum = filterApply( newArray, weight);
			
			storeArray[i][j] = sum;
			sum = 0;
			newArray=[];
		}
	}

	return storeArray;
}

function conv3dTensor(tensor, kernel, pad, stride, weight, bias)
/*
this is the final BOSS method of this project if we can write this we are 
basically done with it sigh! 
this method recieves output of last layer and kernel size and stride and weight,
bias and performs convulotion on it.

returns tensor
*/
{	

	var sum = [];
	var temp = [];

	var storeArray = [];


	for(var i=0; i< tensor.shape()[0]; i++)
	{
		for(var j=0; j< tensor.shape()[1]; j++)
		{	

			temp = conv2dTensor(tensor.array[i][j],kernel,pad,stride,weight[j]);

			if(j==0)
			{
				sum =temp;
			}

			sum = addTensor(sum,temp);
		}

		storeArray.push(sum);
		sum = [];
		
	}

	return storeArray;
}


function conv4dTensor(tensor, kernel, pad, stride, weight, bias)
{	

	var storeArray = [],temp =[];

	if(bias == undefined)
	{
		for(var i=0;i<weight.length;i++)
		{	
			temp = conv3dTensor(tensor, kernel, pad, stride, weight[i], 0);
			storeArray.push(temp);
		}
		return new Tensor(storeArray);
	}
	else if(weight.length == bias.length)
	{
		for(var i=0;i<weight.length;i++)
		{	
			
			temp = conv3dTensor(tensor, kernel, pad, stride, weight[i], bias[i]);
			storeArray.push(temp);
		}

		
		return new Tensor(storeArray);
	}
	else
	{
		console.log("Volume doesn't match!!");
		return 0;
	}

}

