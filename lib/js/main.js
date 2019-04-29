
var canvas ,context;
var img;
img = new Image();
canvas = document.getElementById('imageCanvas');
context = canvas.getContext('2d');

var network, w ;

try 
{
  w = weights;
  console.log("Weights Loaded!");
}
catch(err) 
{
  console.log("Failed to load weights!");
}


function runner()
{	
	var obj = new imgTensor(canvas, context, img);
  	obj.draw();
	var matrix = obj.imageTensor();

	var input = new Tensor([matrix]);
	//console.log(input.shape());

	var network = new Network(input,w);
	network.eval();
	var output = network.output();
	console.log(output.shape());
	//obj.redraw(matrix);


	// var m ;
	// m = obj.grayScaleWith(matrix);
	// m = obj.sharpen(matrix);
	// obj.redraw(m);

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
				runner();
	        }
	    }
	    reader.readAsDataURL(e.target.files[0]);     
	}
}


function wayTwo()
{
	img.crossOrigin = "Anonymous";
	img.src = "lib/sampleData/butterfly28x28.png";
	// img.src = "lib/sampleData/butterfly512x512.png";

	img.onload = function() 
	{
		runner();
	};
}


wayOne();
//wayTwo();







































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
