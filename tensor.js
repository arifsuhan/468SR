class Tensor extends Array
{
	// constructor(array)
	
	// 	this constructor recives any array and converts into 
	// 	n dimentional array
	
	// {
	// 	this = array;
	// }

	shape()
	/*
		this method returns the shape of the tensor object
	*/
	{	
		return this.dimention(this);
	}

	dimention(tensor)
	{

		if (tensor instanceof Array) {
		    return [tensor.length].concat(this.dimention(this[0]));
		} else {
		    return [];
		}
	}

	reshape(arg)
	{
		if(array_mul(this.shape()) === array_mul(arg))
		{
			//this reshape is acceptable
		}
		else
		{
			throw Error("Invalid reshape size")
		}
	}


	concatTensor(tensor)
	/*
		this method returns concatened  tesor whith the tensor in parametres
		return this.data + tensor.data
	*/
	{	

		//this.concat();
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
		
			for (var i = 0 ; i< this.length; i++) {
				for (var j = 0 ; j< this[i].length; j++){
					for (var k = 0 ; k< this[i][j].length; k++){
						for (var l = 0 ; l< this[i][j][k].length; l++)
						{
							this[i][j][k][l] = callback(this[i][j][k][l]);
						}
					}
				}
			}
		}

		else if(this.rank() == 2)
		{
			for (var i = 0 ; i< this.length; i++) {
				for (var j = 0 ; j< this[i].length; j++){
					this[i][j] = callback(this[i][j]);
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
		
			for (var i = 0 ; i< this.length; i++) {
				for (var j = 0 ; j< this[i].length; j++){
					for (var k = 0 ; k< this[i][j].length; k++){
						for (var l = 0 ; l< this[i][j][k].length; l++)
						{
							this[i][j][k][l] = callback(this[i][j][k][l],tensor[i][j][k][l]);
						}
					}
				}
			}
		}

		else if(this.rank() == 2)
		{
			//console.log("2d rank iterator");
			for (var i = 0 ; i< this.length; i++) {
				for (var j = 0 ; j< this[i].length; j++){
					//console.log(this[i][j]);
					this[i][j] = callback( this[i][j],tensor[i][j]);
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

		if(this.rank() === 4)
		{
			

			var copy = new Array(this.length);

			for (var i = 0; i < this.length; i++) {
			    copy[i] = new Array(this[0].length);
			    for (var j = 0; j < this[0].length; j++) {
			        copy[i][j] = new Array(this[0][0].length);
			        for (var k = 0; k < this[0].length; k++) {
			        	copy[i][j][k] = new Array(this[0][0].length);
			        	for (var l = 0; l < this[0].length; l++) {
			        		copy[i][j][k][l] = 0;
			        	}
			        }
			    }
			}
			//console.log(new Tensor(copy).shape());
			
			
			for (var i = 0 ; i< this.length; i++) {
				for (var j = 0 ; j< this[i].length; j++){
					for (var k = 0 ; k< this[i][j].length; k++){
						for (var l = 0 ; l< this[i][j][k].length; l++)
						{	
							copy[i][j][l][k] = this[i][j][k][l];
						}
					}
				}
			}

			return copy;
		}

		else if(this.rank() === 2)
		{
			console.log("2d rank transpose");

			// int[][] temp = new int[columns][rows];

			var copy = [[],[]];

			for (var i = 0 ; i< this.length; i++) {
				for (var j = 0 ; j< this[i].length; j++){
				    copy[j][i] = this[i][j];
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
							this[i][j][k][l] = this[i][j][k][l] + tensor[i];
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