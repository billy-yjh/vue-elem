<template>
    <div id="sellers" >
        <div class="box" ref="seller">
            <div class="seller-head">
                <div class="seller-head-name">
                    <span class="seller-head-name-Msg">
                        <span class="title-name-Msg">{{seller.name}}</span>
                        <span class="title-name-star">
                            <star :size="36" :score="seller.serviceScore" class="star"></star>
                            <span class="num">(661)</span>
                            <span class="sell-number">月售690单</span>
                        </span>
                    </span>
                    <span class="icon">
                        <span class="icon-favorite"></span>
                        <span class="icon-msg">已收藏</span>
                    </span>
                </div>
                <div class="seller-head-Msg">
                    <span class="startSend">
                        <span class="msg">起送价</span>
                        <span class="price">
                            <span class="number">{{seller.minPrice}}</span>
                            <span class="number-msg">元</span>
                        </span>
                    </span>
                    <span class="shoper-send">
                        <span class="msg">商家配送</span>
                        <span class="price">
                            <span class="number">{{seller.deliveryPrice}}</span>
                            <span class="number-msg">元</span>
                        </span>
                    </span>
                    <span class="send-time">
                        <span class="msg">平均配送时间</span>
                        <span class="price">
                            <span class="number">{{seller.deliveryTime}}</span>
                            <span class="number-msg">分钟</span>
                        </span>
                    </span>
                </div>
                <div class="bgcolor"></div>
            </div>
            <div class="seller-note">
                <div class="seller-note-content">
                    <span class="note-wrapper-title">公告与活动</span>
                    <span class="note-wrapper-msg">{{seller.bulletin}}</span>
                    <span class="note-wrapper-icon">
                        <ul>
                            <li v-for="(item,index) in seller.supports" :key="index" class="show-Msg">
                                <span class="icon"  :class="classMap[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                    </span>
                </div>
                <div class="bgcolor"></div>
            </div>
            <div class="seller-imageBox">
                <span class="image-title">商家实景</span>
                <div>
                    <span class="seller-imageBox-img"  ref="picWrapper">
                        <ul ref="picList">
                            <li v-for="(item,index) in seller.pics" :key="index" class="showImage">
                                <img :src="item" alt="" height="90" width="120">
                            </li>
                        </ul>
                    </span>
                </div>
                <div class="bgcolor"></div>
            </div>
            <div class="seller-shoper-msg">
                <span class="shoper-title">商家信息</span>
                <span class="shoper-list">
                    <ul>
                        <li v-for="(items,index) in seller.infos" :key="index" class="shoper-list-msg">{{items}}</li>
                    </ul>
                </span>
            </div>
        </div>
        <shopcart  :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import BScroll from 'better-scroll'
import shopcart from "./shopcart"
import star from "./star"
export default {
    name:'sellers',
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            goods:[]
        }
    },
    components:{
        shopcart,
        star
    },
    created(){
        this.classMap = ['decrease','discount','special','invoice_1','guarantee']
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
            this._initPics();
        });
      }
    },
    //在模板渲染成html后调用
    mounted() {
        this.$nextTick(() => { 
            this._initScroll();
            this._initPics(); 
        });
    },
    methods:{
        _initScroll() {
            this.scroll = new BScroll(this.$refs.seller, {
            click: true
            });
        },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 30;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.picScroll = new BScroll(this.$refs.picWrapper, {
            scrollX: true,    // 横向滚动
            eventPassthrough: 'vertical'    // 在这个区块忽略竖向滚动
          });
        }
      }
    }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import "../assets/stylus/index.styl"
    #sellers
        position absolute
        top: 174px;
        bottom: 58px;
        left: 0;
        display flex
        flex-direction column
        width 100%
        overflow: auto;
        .box
            .seller-head
                padding 18px 0 0 0
                width 100%
                border-bottom 1px solid rgba(7,17,27,0.1)
                .seller-head-name
                    margin 0 18px
                    position relative
                    .seller-head-name-Msg
                        .title-name-Msg
                            display inline-block
                            font-size 14px
                            color rgb(7,17,27)
                            line-height 28px
                        .title-name-star
                            display block
                            .star
                                display inline-block
                            .num
                                display inline-block
                                margin-left 8px
                                font-size 10px
                                color rgb(77,85,93)
                            .sell-number
                                display inline-block
                                margin-left 12px
                                font-size 10px
                    .icon
                        position absolute
                        top 10px
                        right 0  
                        display flex
                        flex-direction column
                        .icon-favorite
                            display inline-block
                            text-align center
                            font-size  24px
                            color rgb(240,20,20)   
                            line-height 24px
                        .icon-msg
                            display inline-block
                            margin-top 4px
                            font-size 10px
                            color rgb(77,85,93)       
                            line-height 10px  
                .seller-head-Msg
                    margin 18px
                    padding 18px 0 0 0
                    border-top 1px solid rgba(7,17,27,0.1)
                    display flex
                    .startSend,.shoper-send,.send-time
                        flex 1
                        border-right 1px solid rgba(7,17,27,0.1)
                        text-align center
                        .msg
                            display block
                            font-size 10px
                            color rgb(147,153,159)
                            line-height 10px
                            text-align center
                        .price
                            display block
                            text-align center
                            margin-top 8px
                            .number
                                font-size 24px
                                font-weight 200
                                color rgb(7,7,27)
                                line-height 24px
                            .number-msg
                                font-size 10px
                                font-weight 200
                                color rgb(7,7,27)
                                line-height 24px
                    .send-time
                        border none 
                .bgcolor
                    height 18px
                    background-color rgba(147,153,159,0.1)  
            .seller-note
                width 100%
                padding-top 18px
                .seller-note-content
                    margin 0 18px
                    .note-wrapper-title
                        display block
                        font-size 14px
                        font-weight 200
                        color rgb(7,17,27)
                        line-height 14px
                    .note-wrapper-msg
                        display inline-block
                        padding 8px 12px 16px 12px
                        font-size 12px
                        font-weight 200
                        color rgb(240,20,20)
                        line-height 24px
                    .note-wrapper-icon
                        .show-Msg
                            border-top 1px solid rgba(7,17,27,0.1)
                            padding 16px 12px
                            .icon
                                display inline-block
                                vertical-align top
                                width 16px
                                height 16px
                                background-size 16px 16px
                                margin-left 12px
                                &.decrease
                                    bg-image("decrease_3")
                                &.discount
                                    bg-image("discount_3")
                                &.guarantee
                                    bg-image("guarantee_3")
                                &.invoice_1
                                    bg-image("invoice_3")
                                &.special
                                    bg-image("special_3")
                            .text
                                font-size 12px
                                font-weight 200
                                color rgb(7,17,27)
                                line-height 16px 
                                margin-left 6px       
                .bgcolor
                    height 18px
                    background-color rgba(147,153,159,0.1)  
            .seller-imageBox
                padding 18px
                .image-title
                    font-size 14px
                    color rgb(7,17,27)
                    line-height 14px
                div
                    margin-top 12px
                .seller-imageBox-img
                    width 100%
                    overflow hidden
                    white-space: nowrap;
                    ul
                        font-size 0
                        li
                            display inline-block
                            margin-right 6px
                            height 90px
                            width 120px
                            &:last-child
                                margin 0
                .bgcolor
                    height 18px
                    background-color rgba(147,153,159,0.1)  
            .seller-shoper-msg
                margin 0 18px            
                .shoper-title
                    display inline-block
                    font-size 14px
                    color rgb(7,17,27)
                    line-height 14px    
                    margin-bottom 12px        
                .shoper-list
                    .shoper-list-msg
                        border-top 1px solid rgba(7,17,27,0.1)
                        padding 16px 12px
                        font-size 12px
                        font-weight 200
                        color rgb(7,17,27)
                        line-height 16px
                
</style>