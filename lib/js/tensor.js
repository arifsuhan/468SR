
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
		this method returns concatened  tensor whith the tensor in parametres
		return this.data + tensor.data
	*/
	{	

		console.log(this.shape());
    	console.log(tensor.shape());

		return 0;
	}

	

	reshape(shape)
	/*
		this method rehapes the tensor into desired shape if the multiplication of 
		the shape matches. 
	*/
	{	
		//console.log(shape);
		if(array_mul(this.shape()) === array_mul(shape))
		{
			var arr = array_with_shape(shape);
			var temp = this.flat();
			var f = 0;

			if(shape.length == 4)
			{
				//4D tensor
				for (var i = 0 ; i< shape[0]; i++) {
				for (var j = 0 ; j< shape[1]; j++){
					for (var k = 0 ; k< shape[2]; k++){
						for (var l = 0 ; l< shape[3]; l++)
						{
							arr[i][j][k][l] = temp[f];
							f++;
						}
					}
				}
			}
			}
			else if(shape.length == 3)
			{
				//3D tensor
				for (var i = 0 ; i< shape[0]; i++) {
				for (var j = 0 ; j< shape[1]; j++){
					for (var k = 0 ; k< shape[2]; k++){
													
						arr[i][j][k] = temp[f];
						f++;
						
					}
				}

				}
			
			}

			else if( shape.length == 2)
			{ //2D tensor 

				for (var i = 0 ; i< shape[0]; i++) {
				for (var j = 0 ; j< shape[1]; j++){
													
						arr[i][j] = temp[f];
						f++;
						
					
				}

				}

			}

			else if(shape.length == 1)
			{
				return new Tensor(temp);
			}


			return new Tensor(arr);

		}
		else
		{
			throw Error("Invalid reshape size")
		}

	}

	rank()
	/*
		returns the rank of the tensor
	*/
	{
		return this.shape().length;

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

	iterator2(tensor,callback)
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

		if(this.rank() === 4)
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

		else if(this.rank() === 2)
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
		return this.iterator2(tensor,function(x,y){
			return x*y;
		});


	}

	add(tensor)
	/*
		this method recieves a tensor and returns the multiplication with it's tensor
	*/
	{
		this.iterator2(tensor,function(x,y){
			return x+y;
		});
	}

	flat()
	{
	var ret =  this.array.flat();
	while(ret[0] instanceof Array)
		ret = ret.flat();
	return ret;
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

	pad(pad_width, mode)
	{
		// console.log(this.shape());
		// console.log(pad_width);
		// console.log(mode);

		var front=[] , back=[] ;
		var up=[], down=[];

		var front_step = pad_width[pad_width.length-1];
		var back_step = pad_width[pad_width.length-2];

		for(var i=0; i<this.shape()[0];i++)
		{
			for(var j=0; j<this.shape()[1];j++)
			{
				for(var k=0; k<this.shape()[2];k++)
				{
					front = [ this.array[i][j][k][front_step]];
					back = this.array[i][j][k][this.array[i][j][k].length -1 -back_step];

					this.array[i][j][k] = front.concat(this.array[i][j][k]);
					this.array[i][j][k] = this.array[i][j][k].concat(back);
				}
			}
		}

		//up zeros pad
		for(var i=0; i<this.shape()[0];i++)
		{	
			for(var j=0; j<this.shape()[1];j++)
			{	
				up = [this.array[i][j][0]];
				this.array[i][j] = up.concat(this.array[i][j]);
			}
		}
		
		//down zeros pad
		for(var i=0; i<this.shape()[0];i++)
		{
			for(var j=0; j<this.shape()[1];j++)
			{	
				down = [this.array[i][j][this.shape()[1]-1]];
				this.array[i][j] = this.array[i][j].concat(down);
			}
		}

		return this;
	}


}