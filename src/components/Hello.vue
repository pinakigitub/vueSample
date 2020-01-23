/* eslint-disable no-unused-vars */
<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        :img-src="images.flower"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide :img-src="images.lighthouse">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide :img-src="images.sky"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide :img-src="images.wood"></b-carousel-slide>
      

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>

  </div>
</template>

<script>
  export default {
      name: 'Hello',
    data() {
      return {
        slide: 0,
        sliding: null,
        images: {
                lighthouse: require('../assets/lighthouse.jpg'),
                 flower: require('../assets/flower.jpg'),
                  sky: require('../assets/sky.jpg'),
                   wood: require('../assets/wood.jpg')

            }
      }
    },
    methods: {
      
      onSlideStart(slide) {
        this.sliding = true
      },
       // eslint-disable-next-line no-unused-vars
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

