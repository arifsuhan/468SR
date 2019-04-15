init() {

    const img = new Image();
    const img2 = new Image();
    img.src = '../../../assets/graffiti.jpg';
    img2.src = '../../../assets/graffiti.jpg';


    const canvas: HTMLCanvasElement = this.canvas1.nativeElement;
    const canvas2: HTMLCanvasElement = this.canvas2.nativeElement;

    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const ctx2: CanvasRenderingContext2D = canvas2.getContext('2d');

    this.onImgLoad(img, ctx, canvas.width, canvas.height);
    this.input(img2, ctx2, canvas2.width, canvas2.height);

  }

  input(img, ctx: CanvasRenderingContext2D, width, height) {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }

  onImgLoad(img, ctx: CanvasRenderingContext2D, width, height) {

    img.onload = () => {

      ctx.drawImage(img, 0, 0);

      const kernelArr = new Kernel([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ]);

      const kernel = [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
      ];

      console.log(kernel);

      const newImg = new Filter2D(ctx, width, height);
      // const imgData = newImg.inverse(width, height); // applys inverse filter
      const imgData = newImg.applyKernel(kernel);

      ctx.putImageData(imgData, 0, 0);
    };

  }


class Filter2D {

  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  imgData: ImageData;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {

    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.imgData = ctx.getImageData(0, 0, width, height);
    console.log(this.imgData);
  }

  grey(width: number, height: number): ImageData {
    return this.imgData;
  }


  inverse(width: number, height: number): ImageData {

    console.log('Width: ', width);
    console.log('Height: ', height);

    const pixels = this.imgData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = 255 - pixels[i]; // red
      pixels[i + 1] = 255 - pixels[i + 1]; // green
      pixels[i + 2] = 255 - pixels[i + 2]; // blue
    }

    return this.imgData;

  }

  applyKernel(kernel: any[]): ImageData {

    const k1: number[] = [
      1, 0, -1,
      2, 0, -2,
      1, 0, -1
    ];

    const k2: number[] = [
      -1, -1, -1,
      -1, 8, -1,
      -1, -1, -1
    ];

    kernel = k2;


    const dim = Math.sqrt(kernel.length);
    const pad = Math.floor(dim / 2);

    const pixels: Uint8ClampedArray = this.imgData.data;
    const width: number = this.imgData.width;
    const height: number = this.imgData.height;

    console.log(this.imgData);

    console.log('applyKernelMethod start');
    console.log('Width: ', width);
    console.log('Height: ', height);
    console.log('kernel: ', kernel);


    console.log('dim: ', dim); // 3
    console.log('pad: ', pad); // 1
    console.log('dim % 2: ', dim % 2); // 1

    console.log('pixels: ', pixels);

    if (dim % 2 !== 1) {
      console.log('Invalid kernel dimension');
    }



    let pix, i, r, g, b;
    const w = width;
    const h = height;
    const cw = w + pad * 2; // add padding
    const ch = h + pad * 2;

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {

        r = 0;
        g = 0;
        b = 0;


        for (let kx = -pad; kx <= pad; kx++) {
          for (let ky = -pad; ky <= pad; ky++) {

            i = (ky + pad) * dim + (kx + pad); // kernel index
            pix = 4 * ((row + ky) * cw + (col + kx)); // image index
            r += pixels[pix++] * kernel[i];
            g += pixels[pix++] * kernel[i];
            b += pixels[pix  ] * kernel[i];
          }
        }

        pix = 4 * ((row - pad) * w + (col - pad)); // destination index
        pixels[pix++] = r;
        pixels[pix++] = g;
        pixels[pix++] = b;
        pixels[pix  ] = 255; // we want opaque image

      }
    }


    console.log(pixels);

    return this.imgData;

  }

}