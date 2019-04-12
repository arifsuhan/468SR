


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
    this.canvas.width = this.inputImg.width;
    this.canvas.height = this.inputImg.height;

    this.context.drawImage(this.inputImg, 0, 0,this.canvas.width, this.canvas.height);

    this.imageObj = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pixel = this.imageObj.data;
  }

  imageTensor()
  {

    //console.log(this.pixel.length);
    //console.log(this.pixel[0]);

    var temp = [];

    var red = [];
    var green = [];
    var blue = [];
    var alpha = [];

    // temp_length = data.length / 3;
    // console.log(temp_length);

    for (var i = 0; i < this.pixel.length; i += 4) 
    {
      //console.log(this.pixel[i], this.pixel[i + 1], this.pixel[i + 2] );
      red.push(this.pixel[i]);
      green.push(this.pixel[i+1]);
      blue.push(this.pixel[i+2]);   
      
      //here alpha value pixel[3] is neglecting 
      alpha.push(this.pixel[i+3]); 
    }

    //assuming input picture dimension -> NxN 
    red = this.flattenToSquare(red);
    green = this.flattenToSquare(green);
    blue = this.flattenToSquare(blue);
    alpha = this.flattenToSquare(alpha);

    temp = [ red, green, blue, alpha ];

    //console.log(this.canvas.width, this.canvas.height);

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
        result.push(matrix[3][x][y]);
      }
    }

    return result;
  }



  // Invert
  invert()
  {

    for (var i = 0; i < this.pixel.length; i += 4) 
    {
      this.pixel[i] = 255 - this.pixel[i];        // red
      this.pixel[i + 1] = 255 - this.pixel[i + 1]; // green
      this.pixel[i + 2] = 255 - this.pixel[i + 2]; // blue
    }

    this.context.putImageData(this.imageObj, 0, 0);

  }



  // grayScale
  grayScaleWithout()
  {

    for (var i = 0; i < this.pixel.length; i += 4) 
    {
        var avg = (this.pixel[i] + this.pixel[i + 1] + this.pixel[i + 2]) / 3;
        this.pixel[i]     = avg; // red
        this.pixel[i + 1] = avg; // green
        this.pixel[i + 2] = avg; // blue
    }
     this.context.putImageData(this.imageObj, 0, 0);

  }

  // grayScale
  grayScaleWith(matrix)
  {

    for(var j = 0; j < matrix[0].length; j += 1)
    {
      for(var k = 0; k < matrix[0][0].length; k += 1)
      {
        var avg = Math.ceil((matrix[0][j][k] + matrix[1][j][k] + matrix[2][j][k]) / 3);
        matrix[0][j][k] = matrix[1][j][k] = matrix[2][j][k] = avg;
      }
    }

    var result = this.flattenOnly(matrix);

    var imgData = this.context.createImageData(this.canvas.width, this.canvas.height);
    var data = imgData.data;

    for (var i = 0; i < result.length; i++) {
        data[i] = result[i];
    }

    this.context.putImageData(imgData, 0, 0);

  }


  //sobar 
  sobar(){
    var grayScale = this.grayScale();

  }

  //threshold
  threshold()
  { 
    var value = 100;

    for (var i=0; i<this.pixel.length; i+=4) {
      var avg = (this.pixel[i] + this.pixel[i + 1] + this.pixel[i + 2]) / 3;
      var v = (avg >= value) ? 255 : 0;
      this.pixel[i] = this.pixel[i+1] = this.pixel[i+2] = v;
    }
    this.context.putImageData(this.imageObj, 0, 0);
  }


}



