


// // image paint on canvas 
image.onload = function() 
{
	
};

var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
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
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}


































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
