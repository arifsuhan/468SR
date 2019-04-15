// console.log( new Tensor([[1,2],[1,2]]).shape()) ;  
// console.log( new Tensor([1,2]).shape()) ;  
// console.log( new Tensor().shape()) ;  
// console.log( new Tensor([[[1,2,3],[1,2,3],[1,2,3]],[[1,2,3],[1,2,3],[1,2,3]],[[1,2,3],[1,2,3],[1,2,3]] ]).shape()) ; 

var x = new Tensor(
[
	[
	  [
		[1,2,3],
		[1,2,3],
		[1,2,3]
	  ],

	  [
	  	[1,2,3],
		[1,2,3],
		[1,2,3]
	  ],

	  [ [1,2,3],
		[1,2,3],
		[1,2,3]
	   ]
	],

	[
	  [
		[2,2,4],
		[2,2,4],
		[2,2,4]
	  ],

	  [
	  	[2,2,4],
		[2,2,4],
		[2,2,4]
	  ],

	  [ [2,2,4],
		[2,2,4],
		[2,2,4]
	   ]
	],

	[
	  [
		[1,1,1],
		[1,1,1],
		[1,1,1]
	  ],

	  [
	  	[1,1,1],
		[1,1,1],
		[1,1,1]
	  ],

	  [ [1,1,1],
		[1,1,1],
		[1,1,1]
	  ]
	]
]
);

var y = new Tensor(
[
	[
	  [
		[5,1,3],
		[5,1,3],
		[5,1,3]
	  ],

	  [
	  	[5,1,3],
		[5,1,3],
		[5,1,3]
	  ],

	  [ [5,1,3],
		[5,1,3],
		[5,1,3]
	   ]
	],

	[
	  [
		[2,2,4],
		[2,2,4],
		[2,2,4]
	  ],

	  [
	  	[2,2,4],
		[2,2,4],
		[2,2,4]
	  ],

	  [ [2,2,4],
		[2,2,4],
		[2,2,4]
	   ]
	],

	[
	  [
		[1,1,1],
		[1,1,1],
		[1,1,1]
	  ],

	  [
	  	[1,1,1],
		[1,1,1],
		[1,1,1]
	  ],

	  [ [1,1,1],
		[1,1,1],
		[1,1,1]
	  ]
	]
]
);

var a  = new Tensor([[1,2],[1,2]]);
var c  = new Tensor([[1,2],[1,2]]);
var b  = new Tensor([[1,2],[1,2]]);


var padA = new Tensor ( [
							[1,2,3],
							[1,2,3],
							[1,2,3]] )

var matrixA = new Tensor([[1,2],[3,4]]);
var matrixB = new Tensor([[5,6],[7,8]]);

// console.log( x.shape());
// console.log( a1.rank());
// console.log( x.rank() );

// console.log( x.add(y) );
// console.log(x);

// console.log(a);
// c = c.transpose();
// console.log(c);

// c = x.concatTensor(y);
// console.log(c)

// c = a.concatTensor(b);
// console.log(c);

// x = x.transpose();
// console.log(x);

// console.log(y.shape());
// var padding = pad(y,1);
// console.log(padding.array);
// console.log(padding.shape());

//matrixA.mul(matrixB);


// tensor, kernel, pad, stride, weight, bias

var k1= weight.layer1.kernel;
var pad1 = weight.layer1.pad;
var stride1 = weight.layer1.stride;

var w1 = new Tensor(weight.layer1.weight);
var b1 = new Tensor(weight.layer1.bias);
var w2 = new Tensor(weight.layer1.weight);
var b2 = new Tensor(weight.layer1.bias);

// console.log(k1);
// console.log(pad1);
// console.log(stride1);
// console.log(w1.shape());
// console.log(b1.shape());

conv(x, k1, pad1, stride1, w1, b1);

// console.log(w2.shape());
// console.log(b2.shape());
// conv(x, k1, [ 0,0, 1,1, 0,0, 1,1] , [1,1], );

// console.log(w1.array[0][0][0][0]);
//w1.addBias(b1);
//w1.mul(w2);
// console.log(w1.array[0][0][0][0]);








