
var canvas ,context;
var img;
img = new Image();
canvas = document.getElementById('imageCanvas');
context = canvas.getContext('2d');

function callback()
{
	var obj = new imgTensor(canvas, context, img);
  	obj.draw();
	var matrix = obj.imageTensor();
	//var shape = obj.tensorShape(matrix);

	//console.log(matrix);
	//console.log(shape);

	//obj.invert();
	//obj.grayScaleWithout();
	//obj.grayScaleWith(matrix);
	//obj.threshold();
	//obj.sobar();

	//obj.sharpen(matrix);

	//obj.applyKernel();
	//obj.convolute(100);
	//return matrix;

	var input = matrix;
	var w1 = weight.layer1;
	var n = new Network(input,w1);

	var a = n.output();
	console.log(a);
}

function wayOne()
{
	var imageLoader = document.getElementById('imageLoader');
	imageLoader.addEventListener('change', handleImage, false);

	function handleImage(e){
	    var reader = new FileReader();
	    reader.onload = function(event){

	    	img.src = event.target.result;
	        img.onload = function(){
				callback();
	        }
	    }
	    reader.readAsDataURL(e.target.files[0]);     
	}
}


function wayTwo()
{
	img.crossOrigin = "Anonymous";
	img.src = "sampleData/butterfly.png";

	img.onload = function() 
	{
		callback();
	};
}

//wayOne();
wayTwo();


































// painting the image into canvas
// function drawImage(image) {

// 	canvas = document.getElementById('canvas');
// 	context = canvas.getContext('2d');

// 	canvas.width = image.width;
// 	canvas.height = image.height;
// 	context.drawImage(image, 0, 0);
// }

// drawImage(image);


//  function showMyImage(fileInput) {
//     var files = fileInput.files;
//     for (var i = 0; i < files.length; i++) {           
//         var file = files[i];
//         var imageType = /image.*/;     
//         if (!file.type.match(imageType)) {
//             continue;
//         }           
//         var img=document.getElementById("input");            
//         img.file = file;    
//         var reader = new FileReader();
//         reader.onload = (function(aImg) { 
//             return function(e) { 
//                 aImg.src = e.target.result; 
//             }; 
//         })(img);
//         reader.readAsDataURL(file);
//     }    
// }


//var mydata = JSON.parse(data);	
//var mydata = JSON.parse(data2);	
// console.log( mydata);
// console.log(pretrain );
