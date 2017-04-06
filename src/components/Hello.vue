<template>
  <div class="hello">
    <div class="draggables">
      <div 
        class="dragMe" 
        :style="aStyle"  
        v-drag="{letter: 'A', style: aStyle}"
      >
      A
      </div>
      <div 
        class="dragMe" 
        :style="bStyle"  
        v-drag="{letter: 'B', style: bStyle}"
      >
      B
      </div>
      <div 
        class="dragMe" 
        :style="cStyle"  
        v-drag="{letter: 'C', style: cStyle}"
      >
      C
      </div>
      <div 
        class="dragMe" 
        :style="dStyle"  
        v-drag="{letter: 'D', style: dStyle}"
      >
      D
      </div>

      <div 
        class="dragMe" 
        :style="eStyle"  
        v-drag="{letter: 'E', style: eStyle}"
      >
      E
      </div>

    </div>
    <div class="dropHere" :style="this.dropped.style" @drop="droppo">{{dropped.letter}}</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dropped: 'Drop Here',
      aStyle: {
        background: 'hsl(20, 60%, 70%)'
      },
      bStyle: {
        background: 'hsl(80, 60%, 70%)'
      },
      cStyle: {
        background: 'hsl(200, 60%, 70%)'
      },
      dStyle: {
        background: 'hsl(255, 60%, 70%)'
      },
      eStyle: {
        background: 'hsl(150, 60%, 70%)'
      }
    }
  },
  methods: {
    droppo(e) {
      this.dropped = e.detail
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .dragMe {
    display: inline-block;
    cursor: pointer;
    height: 2em;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 1em;
    padding: 0.2em;
    background: white;
    width: 8em;
  }

  .dropHere {
    display: inline-block;
    cursor: pointer;
    margin-top: 2em;
    height: 5em;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 1em;
    padding: 0.2em;
    background: white;
    width: 10em;
  }

  .dragMe.v-drag-dragging {
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  }
</style>
