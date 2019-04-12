// function iterator (tensor, callback) {

// 	for (var i = tensor.length - 1; i >= 0; i--) {
// 		for (var j = tensor[i].length - 1; j >= 0; j--){
// 			for (var k = tensor[i][j].length - 1; k >= 0; k--){
// 				for (var l = tensor[i][j][k].length - 1; l >= 0; l--)
// 				{
// 					tensor[i][j][k][l] = callback(tensor[i][j][k][l]);
// 				}
// 			}
// 		}
// 	}
// 	// body...
// 	return tensor;
// }


console.log( new Tensor([[1,2],[1,2]]).shape()) ;  
console.log( new Tensor([1,2]).shape()) ;  
console.log( new Tensor().shape()) ;  
console.log( new Tensor([[[1,2,3],[1,2,3],[1,2,3]],[[1,2,3],[1,2,3],[1,2,3]],[[1,2,3],[1,2,3],[1,2,3]] ]).shape()) ; 
console.log( new Tensor([[[[1,2,3,4],
[3,5,6,7],
[4,5,6,7,]],
[[1,2,3,4],
[3,5,6,7],
[4,5,6,7,]]],
[[[1,2,3,4],
[3,5,6,7],
[4,5,6,7,]],
[[1,2,3,4],
[3,5,6,7],
[4,5,6,7,]]]]).rank()) 