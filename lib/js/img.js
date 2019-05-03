


class imgTensor 
{

  constructor(canvas, context, inputImg) 
  {
    this.canvas = canvas;
    this.context = context;
    this.inputImg = inputImg;

    this.imageObj = null;
    this.pixel = null;
  }

  draw()
  {
    console.log("draw");
    this.canvas.width = this.inputImg.width*2;
    this.canvas.height = this.inputImg.height;

    this.context.drawImage(this.inputImg, 0, 0,this.canvas.width/2, this.canvas.height);
    
    this.imageObj = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pixel = this.imageObj.data;
  }

  redraw(temp)
  {
    var result = this.flattenOnly(temp);
    var imgData = this.context.createImageData(this.canvas.width, this.canvas.height);
    var data = imgData.data;

    for (var i = 0; i < result.length; i++) {
        data[i] = result[i];
    }

    this.context.putImageData(imgData, this.canvas.width/2, 0);
  }

  imageTensor()
  {

    console.log("matrix");

    var temp = [];

    var red = [];
    var green = [];
    var blue = [];
    var alpha = [];


    for (var i = 0; i < this.pixel.length; i += 4) 
    {
      
      red.push(this.pixel[i]);
      green.push(this.pixel[i+1]);
      blue.push(this.pixel[i+2]);   
      
    }

    //assuming input picture dimension -> NxN 
    red = this.flattenToSquare(red);
    green = this.flattenToSquare(green);
    blue = this.flattenToSquare(blue);
    //alpha = this.flattenToSquare(alpha);

    //temp = [ red, green, blue, alpha ];
    temp = [ red, green, blue ];

    return temp;
  }


  flattenToSquare(array)
  {

    var twoD = [];
    var breakDown = Math.pow(array.length,0.5);

    while(array.length)
    {
      twoD.push(array.splice(0,breakDown));
    }

    return twoD;
  }


  tensorShape(tensor){
    var shape;

    shape = [ tensor.length, tensor[0].length, tensor[0][0].length ]

    return shape
  }

  flattenOnly(matrix){

    var result = [];

    for (var x = 0; x < matrix[0].length; x++){
      for (var y = 0; y < matrix[0][0].length; y++){
        result.push(matrix[0][x][y]);
        result.push(matrix[1][x][y]);
        result.push(matrix[2][x][y]);
        //result.push(matrix[3][x][y]);
        result.push(255);
      }
    }

    return result;
  }
}






