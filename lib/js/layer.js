

/*
Pad 
Conv
Relu
Concat

MUl
ADD
Reshape
Transpose
Constant
*/

//tensor 4D


function iterator (tensor, callback) {

	for (var i = tensor.length - 1; i >= 0; i--) {
		for (var j = tensor[i].length - 1; j >= 0; j--){
			for (var k = tensor[i][j].length - 1; k >= 0; k--){
				for (var l = tensor[i][j][k].length - 1; l >= 0; l--)
				{
					tensor[i][j][k][l] = callback(tensor[i][j][k][l]);
				}
			}
		}
	}
	// body...
	return tensor;
}

function Relu(tensor) {

	return iterator(tensor, function(x) 
	{
		return ((x < 0) ? 0 : x);
	});
}

// function Add(tensor1,tensor2)
// {

// }


