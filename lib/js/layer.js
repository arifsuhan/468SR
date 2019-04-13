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


var tranA = new Tensor ( [[1,2,3],[1,2,3],[1,2,3]] )

// console.log( x.shape());
// console.log( a1.rank());
// console.log( x.rank() );

// console.log( x.add(y) );
// console.log(x);
// console.log( addM(x,y) );

// console.log( a.transpose() ) ;
// console.log(tranA.shape().length);
//tranA.transpose();

// console.log(a);
// c = c.transpose();
// console.log(c);

// c = a.concat(b);
// console.log(c)

// c = a.concatTensor(b);
// console.log(c);

x = x.transpose();
console.log(x);


