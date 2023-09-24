import Canvas from "./Canvas";

class Helpers{
  getStartIndexes(){
      let x = Canvas.renderedViewX - Canvas.renderedViewX%80;
      let y = Canvas.renderedViewY - Canvas.renderedViewY%80;

      return {x: x/80, y: y/80}
  }

  getStartIndexes2(){
      let x = Canvas.renderedViewX - Canvas.renderedViewX%40;
      let y = Canvas.renderedViewY - Canvas.renderedViewY%40;

      return {x: x/40, y: y/40}
  }

  replaceColorInCanvas(
    canvas: HTMLCanvasElement,
    sourceColor: string,
    targetColor: string,
    tolerance: number
  ) {
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
  
    // Get the canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
  
    // Create an image data object
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
  
    // Convert the source and target colors to RGB format
    const sourceRGB = this.hexToRGB(sourceColor);
    const targetRGB = this.hexToRGB(targetColor);
  
    // Calculate the color difference threshold
    const threshold = Math.sqrt(3 * tolerance * tolerance);
  
    // Iterate through each pixel in the canvas
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
  
      // Calculate the color difference between the pixel and the source color
      const colorDifference = this.calculateColorDifference(sourceRGB, { r, g, b });
  
      // If the color difference is within the tolerance, replace the color
      if (colorDifference <= threshold) {
        data[i] = targetRGB.r;
        data[i + 1] = targetRGB.g;
        data[i + 2] = targetRGB.b;
      }
    }
  
    // Put the modified image data back to the canvas
    ctx.putImageData(imageData, 0, 0);
  }
  
  hexToRGB(hex: string) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
  
  calculateColorDifference(color1: { r: number; g: number; b: number }, color2: { r: number; g: number; b: number }) {
    const dr = color1.r - color2.r;
    const dg = color1.g - color2.g;
    const db = color1.b - color2.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }
}

export default new Helpers()