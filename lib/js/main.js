
var canvas;
var context;
var image = new Image;
image.crossOrigin = "Anonymous";
image.src = "sampleData/butterfly.png";
//image.src = "sampleData/person01.jpg";

// image paint on canvas 
image.onload = function() 
{
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	var obj = new imgTensor(canvas, context, image);
  	obj.draw();
	var matrix = obj.imageTensor();
	//var shape = obj.tensorShape(matrix);

	//console.log(matrix);
	//console.log(shape);

	obj.invert();
	//obj.grayScaleWithout();
	//obj.grayScaleWith(matrix);
	//obj.threshold();
	//obj.sobar();

	//obj.sharpen();
};


































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
