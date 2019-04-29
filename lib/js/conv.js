
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

	// console.log(row,col);

	var newArray = [];
	var storeArray = [];

	for(var i=0; i< row; i++)
	{
		storeArray.push( Array(col).fill(0) );
	}

	//console.log(new Tensor(storeArray).shape());
	//console.log(storeArray.length);
	
	// console.log(new Tensor(weight).shape());
	for(var i=0; i< row; i+=stride)
	{
		for(var j=0; j< col; j+=stride)
		{	

			// newArray.push([ tensor[i][j], tensor[i][j+1], tensor[i][j+2] ]); 
			// newArray.push([ tensor[i+1][j], tensor[i+1][j+1], tensor[i+1][j+2] ]); 
			// newArray.push([ tensor[i+2][j], tensor[i+2][j+1], tensor[i+2][j+2] ]); 

			for(var k=0; k< kernel[0] ; k++)	
			{	
				newArray.push([ tensor[i+k][j], tensor[i+k][j+1], tensor[i+k][j+2] ]); 
			}

			sum = filterApply( newArray, weight);
			
			//console.log(sum);
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


	// weight = new Tensor(weight);
	// console.log(weight.shape());

	//console.log(tensor.shape());

	var sum = [];
	var temp = [];

	var storeArray = [];


	// weight[0].length == tensor.shape()[1]

	for(var i=0; i< tensor.shape()[0]; i++)
	{
		for(var j=0; j< tensor.shape()[1]; j++)
		{	
			// console.log(new Tensor(tensor.array[i][j]).shape());
			// console.log(new Tensor(weight[j]).shape());

			temp = conv2dTensor(tensor.array[i][j],kernel,pad,stride,weight[j]);

			if(j==0)
			{
				sum =temp;
			}
			//console.log(new Tensor(temp).shape());
			sum = addTensor(sum,temp);
		}

		storeArray.push(sum);
		sum = [];
		// console.log(new Tensor(sum).shape());
	}

	// console.log(tensor.array[0].length,);
	// console.log(weight.array.length);

	
	// console.log(new Tensor(storeArray).shape());
	return storeArray;
}


function conv4dTensor(tensor, kernel, pad, stride, weight, bias)
{	

	//weight = new Tensor(weight);
	//console.log(weight.shape());

	// console.log(weight.shape()[0] == bias.length);
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
			// console.log(new Tensor(weight.array[i]).shape());
			temp = conv3dTensor(tensor, kernel, pad, stride, weight[i], bias[i]);
			// console.log(new Tensor(temp).shape());
			storeArray.push(temp);
		}

		//console.log(new Tensor(storeArray).shape());
		return new Tensor(storeArray);
	}
	else
	{
		console.log("Volume doesn't match!!");
		return 0;
	}

	//conv3dTensor(tensor, kernel, pad, stride, weight[0], bias[0]);
}

