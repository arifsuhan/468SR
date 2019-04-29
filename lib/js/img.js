


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
    //this.context.drawImage(this.inputImg, 0, 0);

    this.imageObj = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pixel = this.imageObj.data;

    //console.log(this.pixel.length);
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
      //alpha.push(this.pixel[i+3]); 
    }

    //assuming input picture dimension -> NxN 
    red = this.flattenToSquare(red);
    green = this.flattenToSquare(green);
    blue = this.flattenToSquare(blue);
    //alpha = this.flattenToSquare(alpha);

    //temp = [ red, green, blue, alpha ];
    temp = [ red, green, blue ];

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
        //result.push(matrix[3][x][y]);
        result.push(255);
      }
    }
    //console.log(matrix);

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

    return matrix;
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


  //sharpen
  sharpen(matrix)
  {
    var filter = 
    [
      [ 0, -1,  0],
      [-1,  3, -1], 
      [ 0, -1,  0]
    ];

    // var filter = 
    // [
    //   [ 0.1, 0.1, 0.1],
    //   [ 0.1, 0.1, 0.1], 
    //   [ 0.1, 0.1, 0.1]
    // ];

    // console.log(this.tensorShape(matrix));
    // console.log(addPad1,addPad2);
    // console.log(upDown);

    var addPad1 = matrix[0][0].length+ 2*1;
    var zero =[0];
    var upDown = [Array(addPad1).fill(0)];

    for(var i=0; i<matrix.length;i++)
    {
      for(var j=0; j<matrix[0].length;j++)
      {
          matrix[i][j] = zero.concat(matrix[i][j]);
          matrix[i][j] = matrix[i][j].concat(zero);
      }
    }

    for(var i=0; i<matrix.length;i++)
    {
        matrix[i] = upDown.concat(matrix[i]);
    }

    for(var i=0; i<matrix.length;i++)
    {
        matrix[i] = matrix[i].concat(upDown);
    }

    // matrix = new Tensor(matrix);
    // matrix = padding(matrix,0);
    // console.log(matrix.shape());
    //var result = this.flattenOnly(matrix);


    var r,g,b,a;
    r = conv2dTensor(matrix[0],[3,3],[0], 1, filter);
    g = conv2dTensor(matrix[1],[3,3],[0], 1, filter);
    b = conv2dTensor(matrix[2],[3,3],[0], 1, filter);

    var temp = [r,g,b];
    
    return temp;
  }

  convolute(opaque) {

  const k1 = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
  ];

  const k2 = [
   0.1, 0.1, 0.1,
   0.1, 0.1, 0.1,
   0.1, 0.1, 0.1
  ];

  var weights = k1;

  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  // console.log(side);
  // console.log(halfSide);

  var src = this.imageObj.data;
  var swidth = this.canvas.width;
  var sheight = this.canvas.height;

  // pad output by the convolution matrix
  var w = swidth;
  var h = sheight;

  var output = this.context.createImageData(w, h);
  var dst = output.data;
  
  // // go through the destination image pixels
  //var alphaFac = opaque ? 1 : 0;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;

      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {

          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;

          if (scy >= 0 && scy < sheight && scx >= 0 && scx < swidth) {
            var srcOff = (scy*swidth+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }

        }
      }

      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      //dst[dstOff+3] = a + alphaFac*(255-a);
      dst[dstOff+3] = 255;
    }
  }

  console.log(dst.length);

  this.context.putImageData(output, this.canvas.width/2+10, 0);
}


  convoluteWith(opaque) {

    const k1 = [
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ];

    var weights = k1;
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    // console.log(side);
    // console.log(halfSide);

    var src = this.imageObj.data;
    var swidth = this.canvas.width;
    var sheight = this.canvas.height;

    // pad output by the convolution matrix
    var w = swidth;
    var h = sheight;

    var output = this.context.createImageData(w, h);
    var dst = output.data;
    
    //this.context.putImageData(output, this.canvas.width/2+10, 0);
  }
}






