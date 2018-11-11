<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in addStar" :class="item" class="star-item" :key="index"></span>
  </div>
</template>

<script>
    const length = 5
    const fullStar = 'on'
    const halfStar = 'half'
    const noStar = 'no'
    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType() {
                return 'star-' + this.size;
            },
            addStar(){
                let score = this.score
                let arr = []
                let full = Math.floor(score*2)/2
                let half = score % 1 >= 0.5 
                for(let i = 0;i<full;i++){
                    arr.push(fullStar)
                }
                if(half){
                    arr.push(halfStar)
                }
                if(arr.length < length){
                    arr.push(noStar)
                }
                // console.log(arr)
                return arr
            }
        }
    };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../assets/stylus/index.styl"

    .star 
        font-size: 0;
        .star-item 
            display: inline-block;
            background-repeat: no-repeat;
        
        &.star-48 
            .star-item 
                width: 20px;
                height: 20px;
                margin-right: 22px;
                background-size: 20px 20px;
                &:last-child 
                    margin-right: 0;
                &.on
                    bg-image('star48_on')
                &.half
                    bg-image('star48_half')
                &.no
                    bg-image('star48_off')
            
        
        
        &.star-36 
            .star-item 
                width: 15px;
                height: 15px;
                margin-right: 6px;
                background-size: 15px 15px;
                &:last-child 
                    margin-right: 0;
                
                &.on
                    bg-image('star36_on')
                &.half
                    bg-image('star36_half')
                &.no
                    bg-image('star36_off')
            
        
        
        &.star-24 
            .star-item 
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-size: 10px 10px;
                &:last-child 
                    margin-right: 0;
                
                 &.on
                    bg-image('star24_on')
                &.half
                    bg-image('star24_half')
                &.no
                    bg-image('star24_off')
</style>
