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

// var padding = pad(x,1);
//console.log(padding.array[0][0]);

//matrixA.mul(matrixB);

var w1 = new Tensor(weight.layer1.weight);
var b1 = weight.layer1.bias;

var w2 = new Tensor(weight.layer1.weight);
var b2 = weight.layer1.bias;


console.log(w1.shape());
console.log(b1.length);
console.log(w2.shape());
console.log(b2.length);






