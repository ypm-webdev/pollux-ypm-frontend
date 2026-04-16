declare module 'swiper/react' {
  import { ComponentType } from 'react';
  const Swiper: ComponentType<any>;
  const SwiperSlide: ComponentType<any>;
  export { Swiper, SwiperSlide };
}

declare module 'swiper' {
  const SwiperCore: {
    use: (modules: any[]) => void;
  };
  export default SwiperCore;
  export const Navigation: any;
  export const Pagination: any;
  export const Autoplay: any;
  export const Scrollbar: any;
  export const Thumbs: any;
  export const Zoom: any;
  export const Keyboard: any;
  export const Mousewheel: any;
  export const Virtual: any;
}

declare module 'swiper/css' {
  const content: string;
  export default content;
}

declare module 'swiper/modules' {
  export const Navigation: any;
  export const Pagination: any;
  export const Autoplay: any;
  export const Scrollbar: any;
  export const Thumbs: any;
  export const Zoom: any;
  export const Keyboard: any;
  export const Mousewheel: any;
  export const Virtual: any;
}

declare module 'swiper/css/autoplay' {
  const content: string;
  export default content;
}

declare module 'swiper/css/keyboard' {
  const content: string;
  export default content;
}

declare module 'swiper/css/mousewheel' {
  const content: string;
  export default content;
}

declare module 'swiper/css/navigation' {
  const content: string;
  export default content;
}

declare module 'swiper/css/pagination' {
  const content: string;
  export default content;
}

declare module 'swiper/css/scrollbar' {
  const content: string;
  export default content;
}

declare module 'swiper/css/thumbs' {
  const content: string;
  export default content;
}

declare module 'swiper/css/virtual' {
  const content: string;
  export default content;
}

declare module 'swiper/css/zoom' {
  const content: string;
  export default content;
}