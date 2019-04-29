class Network 
{

  constructor(input, weights_json)
  {

    let network = [];
    this.network = network;
    this.weights = weights_json;
    this.Input(input);
    
  }


  Input(input)
  /*
  function will recive a image tensor and set it to zero index
  of the network array
  */
  {
    this.network.push(input);
  }


  retriveWeigths(key)
  /*
  function will recieve the variable key for weights and biases
  and return the wights as tensor
  */
  {
    return this.weights[key];
  }

  //Pushing the trained weights to the network array
  flood_weights() {
    for (var i =1; i<=12; i++) 
    {
      this.network.push(this.retriveWeigths('var'+i));
    }
  }

  //flooding the this.network
  flood_net() {
    for (var i =13; i<=20; i++)
    {
      this.network.push(null);
    }
  }

  eval() 
  {

    var mode, pads, dilations, group, kernel_shape, strides, axis, value, perm;

    this.flood_weights();
    this.flood_net();

    this.network[13] = Pad(mode = 'reflect', pads = [0, 0, 1, 1, 0, 0, 1, 1],this.network[0]);
  	this.network[14] = Conv(dilations = [1, 1], group = 1, kernel_shape = [3, 3], pads = [0, 0, 0, 0], strides = [1, 1],this.network[13], this.network[5], this.network[6]);
  	// this.network[15] = Conv(dilations = [1, 1], group = 1, kernel_shape = [1, 1], pads = [0, 0, 0, 0], strides = [1, 1],this.network[14], this.network[7], this.network[8]);
  	// this.network[16] = Relu(this.network[15]);
  	// this.network[17] = Pad(mode = 'reflect', pads = [0, 0, 1, 1, 0, 0, 1, 1],this.network[16]);
  	// this.network[18] = Conv(dilations = [1, 1], group = 1, kernel_shape = [3, 3], pads = [0, 0, 0, 0], strides = [1, 1],this.network[17], this.network[9], this.network[10]);
  	// this.network[19] = Concat(axis = 1,this.network[14], this.network[18]);
    // this.network[20] = Mul(this.network[15],this.network[16]);

  }

  output() 
  {
  	// for(var i=13;i<=20;i++)
  	// {
  	// 	console.log(this.network[i].shape());
  	// }
    return this.network[14];
    //console.log(this.network[13].shape());
  }

}








