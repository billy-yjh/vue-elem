<template>
    <div id="notes" v-show="show">
        <div class="notes-header">
            <span class="notes-header-name">{{seller.name}}</span>
            <span class="notes-header-starts">
                <span class="star-item" :class=item v-for="item in addStar" :key="item.id"></span>
            </span>
        </div>
        <div class="discount-Msg">
            <div class="Msg-head">
                <div class="title-line"></div>
                <div class="Msg-head-title">优惠信息</div>
                <div class="title-line"></div>
            </div>
            <div class="discount-Msg-show">
                <ul>
                    <li v-for="(item,index) in seller.supports" :key="index" class="show-Msg">
                        <span class="icon"  :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="shoper-notice">
            <div class="shoper-notice-head">
                <div class="title-line"></div>
                <div class="Msg-head-title">商家公告</div>
                <div class="title-line"></div>
            </div>
            <div class="shoper-notice-Msg">
                <span>{{seller.bulletin}}</span>
            </div>
        </div>
        <div class="close icon-close" @click="changeShow"></div>
        <div class="gray">123</div>
    </div>
</template>
<script>
export default {
    props:{
        seller:{
            type:Object
        },
        show:{}
    },
    data(){
        return{
            starList:[],
        }   
    },
    created() {
        this.classMap = ['decrease','discount','special','invoice_1','guarantee']
    },
    methods:{
        changeShow(){
            this.show = !this.show
            this.$emit('changeShow',this.show)
        }
    },
    computed:{
        addStar(){
            let score = this.seller.score
            let length = 5
            let fullStar = 'on'
            let halfStar = 'half'
            let noStar = 'no'
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
}
</script>
<style lang='stylus' ref="stylesheet/stylus">
@import "../assets/stylus/index.styl"
    #notes
        position fixed
        top 0
        bottom 0
        height 100%
        width 100%   
        z-index 303
        background-color rgba(7,17,27,0.8)
        display flex
        flex-direction column
        .notes-header
            text-align center
            .notes-header-name
                display inline-block
                font-size 16px
                font-weight 700
                color white
                line-height 32px
                margin-top 45px
            .notes-header-starts
                display block
                margin-top 16px
                height 48px
                .star-item
                    font-size 0
                    display inline-block
                    height 20px
                    width 20px
                    margin-right 22px
                    background-size 20px 20px
                    &:last-child
                        margin-right 0
                    &.on
                        bg-image('star48_on')
                    &.half
                        bg-image('star48_half')
                    &.no
                        bg-image('star48_off')
        .discount-Msg
            position relative
            left 10%
            top 0
            right 10%
            .Msg-head
                width 80%
                display flex
                .title-line
                    vertical-align top
                    display inline-block
                    flex 1
                    border-bottom 1px solid rgba(255,255,255,0.2)
                    position relative
                    top -12px
                .Msg-head-title 
                    display inline-block
                    padding 0 12px
                    font-size 14px
                    font-weight 700
                    color white
                    line-height 28px
        .discount-Msg-show
            width 80%
            margin-top 24px
            .show-Msg
                margin 12px 12px 0 12px
                .icon
                    display inline-block
                    vertical-align top
                    width 14px
                    height 14px
                    background-size 14px 14px
                    margin-left 6px
                    &.decrease
                        bg-image("decrease_2")
                    &.discount
                        bg-image("discount_2")
                    &.guarantee
                        bg-image("guarantee_2")
                    &.invoice_1
                        bg-image("invoice_2")
                    &.special
                        bg-image("special_2")
                .text
                    font-size 12px
                    font-weight 200
                    color rgb(255,255,255)
                    line-height 12px
        .shoper-notice
            position relative
            left 10%
            right 10%
            width 100%
            margin-top 28px
            .shoper-notice-head
                width 80%
                display flex
                .title-line
                    vertical-align top
                    display inline-block
                    flex 1
                    border-bottom 1px solid rgba(255,255,255,0.2)
                    position relative
                    top -12px
                .Msg-head-title 
                    display inline-block
                    padding 0 12px
                    font-size 14px
                    font-weight 700
                    color white
                    line-height 28px
            .shoper-notice-Msg
                width 80%
                padding-top 24px;
                span
                    display inline-block
                    padding 0 12px
                    font-size 12px
                    font-weight 200
                    color rgb(255,255,255)
                    line-height 24px
        .close
            z-index 1
            display inline-block
            height 24px
            width 24px
            position absolute
            bottom 32px
            left 50%
            transform translateX(-50%)
            color rgba(2552,255,255,0.5)
            font-size 32px
            text-align center
    .gray
        position absolute
        top 0
        left 0
        bottom 0
        z-index -1
        width 100%
        filter blur(10px)
        
</style>