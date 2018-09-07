import { WIDTH, HEIGHT, PIXEL_RATIO } from './statics'; 

export const Normalize = (size) => {
  if (PIXEL_RATIO === 2) {
    if (WIDTH < 360) {
      return size * 0.95;
    } 

    if (HEIGHT < 667) {
      return size;
    } else if (HEIGHT >= 667 && HEIGHT <= 735) {
      return size * 1.15;
    }

    return size * 1.25;
  } 
  if (PIXEL_RATIO === 3) {
    if (WIDTH <= 360) {
        return size;
    }    

    if (HEIGHT < 667) {
      return size * 1.15;
    }

    if (HEIGHT >= 667 && HEIGHT <= 735) {
      return size * 1.2;
    }

    return size * 1.27;
  }
  if (PIXEL_RATIO === 3.5) {
    if (WIDTH <= 360) {
        return size;
    }

    if (HEIGHT < 667) {
      return size * 1.20;
    }

    if(HEIGHT >= 667 && HEIGHT <= 735) {
      return size * 1.25;
    }

    return size * 1.40;
  }

  return size;
}