


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
    //console.log(data);

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

    temp = [ red, green, blue ];

    console.log(this.canvas.width, this.canvas.height);

    return temp;
  }


  flattenToSquare(array)
  {

    var oneD = [];
    var twoD = [];

    var breakDown = Math.pow(array.length,0.5);

    for (var i = 0; i < array.length; i +=1)
      {
        if( i%breakDown == 0)
        {
          twoD.push(oneD);
          oneD.length = 0;
        }
        oneD.push(array[i]);
      }

      return twoD;
  }


  tensorShape(tensor){
    var shape;

    shape = [ tensor.length, tensor[0].length, tensor[0][0].length ]

    return shape
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



  // greyScale
  greyScale()
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

}



