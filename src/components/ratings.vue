<template>
    <div id="ratings">
        <div ref="rat">
            <div class="ratings-header">
                <div class="header-content">
                    <div class="content-left">
                        <h1 class="score">{{seller.score}}</h1>
                        <div class="title">综合评分</div>
                        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                    </div>
                    <div class="content-right">
                        <div class="server-score">
                            <span class="title">服务态度</span>
                            <star :size="36" :score="seller.serviceScore"></star>
                            <span class="scroe">{{seller.serviceScore}}</span>
                        </div>
                        <div class="store-score">
                            <span class="title">商品评分</span>
                            <star :size="36" :score="seller.serviceScore"></star>
                            <span class="scroe">{{seller.foodScore}}</span>
                        </div>
                        <div class="delivery-time">
                            <span class="title">送达时间</span>
                            <span class="scroe">{{seller.deliveryTime}}分钟</span>
                        </div>
                    </div>
                </div>
                <div class="bgcolor"></div>
            </div>
            <div class="select-wrapper">
                <div class="select-btn">
                    <span class="block all active">全部<span class="count">{{ratings.length}}</span></span>
                    <span class="block positive">满意<span class="count">{{positives}}</span></span>
                    <span class="block negative">不满意<span class="count">{{negatives}}</span></span>
                </div>
                <div class="only-content">
                    <span class="icon icon-check_circle" :class="{on:flag==true}" @click="change"></span>
                    <span class="content-msg">只看有内容的评价</span>
                </div>
            </div>
            <div class="rating-wrapper">
                <ul>
                    <li v-show="needShow(rating.rateType,rating.text)"  v-for="(rating,index) in ratings" :key="index" class="list">
                        <div class="show-left">
                            <img :src="rating.avatar" alt="" height="28" width="28">
                        </div>
                        <div class="show-right">
                            <span class="right-top">
                                <span class="right-top-name">{{rating.username}}</span>
                                <span class="right-top-time">2016-07-13 20:33</span>
                            </span>
                            <span class="show-right-star">
                                <star :size="36" :score="rating.score" class="star"></star>
                                <span class="arrive-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟到达</span>
                            </span>
                            <span class="show-right-msg">
                                {{rating.text}}
                            </span>
                            <span class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon icon-thumb_up"></span>
                                <span class="item" v-for="(item,index) in  rating.recommend" :key="index">{{item}}</span>
                            </span>
                        </div>
                    </li>
                </ul>
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
import star from './star'
export default {
    name:'ratings',
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            ratings:[],
            flag:false,
        }
    },
    components:{
        shopcart,
        star
    },
    mounted() {
        this.$nextTick(() => { 
            this._initScroll();
        });
    },
    created(){
        axios.get("/good/ratings").then(res => {
            if(res.data.code === 0){
               this.ratings = res.data.data;
            }
        })
    },
    computed:{
        positives(){
            var count1 = 0;
            for(var i = 0; i < this.ratings.length; i++){
                if(this.ratings[i].rateType == 0){
                    count1++
                }
            }
            return count1;
        },
        negatives(){
            var count2 = 0;
            for(var i = 0; i < this.ratings.length; i++){
                if(this.ratings[i].rateType == 1){
                    count2++
                }
            }
            return count2;
        }
    },
    methods:{
        _initScroll() {
            this.scroll = new BScroll(this.$refs.rat, {
            click: true
            });
        },
        change(){
            this.flag = !this.flag
            this.$nextTick(()=>{
                this.scroll.refresh()
            })
        },
        needShow(rateType,text){
            if(this.flag && !text){
                return false;
            }else if(!this.flag){
                return true;
            }else if(this.flag && text){
                return true
            }
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import "../assets/stylus/index.styl"
#ratings
    position absolute
    top: 174px;
    left: 0;
    display flex
    flex-direction column
    width 100%
    overflow: auto;
    bottom 58px
    .ratings-header
        width 100%
        border-top 1px solid rgba(7,17,27,0.1)
        border-bottom  1px solid rgba(7,17,27,0.1)
        padding 18px 0 0 0
        .header-content
            font-size 0
            margin-bottom 18px
            .content-left
                display inline-block
                width 137.5px
                text-align center
                border-right 1px solid rgb(157,153,159)
                .score
                    font-size 24px
                    color rgb(255,153,0)
                    line-height 28px;
                .title
                    display block
                    font-size 12px
                    color rgb(7,17,27)
                    line-height 12px
                    margin-top 6px
                .rank
                    display block
                    font-size 10px
                    color rgba(7,17,27,1)
                    line-height 10px
                    margin 8px 0 6px 0
            .content-right
                vertical-align top
                flex 1
                display inline-block
                padding 0 24px
                .server-score,.store-score
                    margin-bottom 8px;
                    .title
                        display inline-block
                        font-size 12px
                        color rgb(7,17,27)
                        line-height 18px
                        vertical-align top
                    .star
                        display inline-block
                        margin-left 12px
                    .scroe
                        display inline-block
                        vertical-align top
                        font-size 12px
                        color rgb(255,153,0)
                        line-height 18px 
                        margin-left 12px
                .delivery-time
                    .title
                        display inline-block
                        font-size 12px
                        color rgb(7,17,27)
                        line-height 18px
                        vertical-align top
                    .scroe
                        display inline-block
                        font-size 12px
                        color rgb(147,153,159)
                        line-height 18px
                        vertical-align top
                        margin-left 12px
        .bgcolor
            border-top 1px solid rgba(7,17,27,0.1)
            height 18px 
            background-color rgba(147,153,159,0.1)  
    .select-wrapper
        width 100%
        display block
        padding 0 18px
        .select-btn
            padding 18px 0
            border-bottom  1px solid rgba(7,17,27,0.1)
            .block
                text-align center
                display inline-block
                font-size 12px
                padding 8px 12px
                line-height 16px
                border-radius 1px
                color rgb(77, 85, 93);
                &.active 
                    color: #fff
                &.all
                    background: rgba(0, 160, 220, 0.2)
                    &.active
                        background: rgb(0, 160, 220)
                &.positive
                    background: rgba(0, 160, 220, 0.2)
                    &.active
                        background: rgb(0, 160, 220)
                &.negative
                    background: rgba(77, 85, 93, 0.2);
                    &.active
                        background: rgb(77, 85, 93);
                .count
                    display inline-block
                    font-size: 8px
                    margin-left: 2px;     
        .only-content
            padding 12px 18px
            line-height 24px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            color: rgb(147, 153, 159);
            font-size: 0;
            .icon
               color rgb(157,153,159)
               font-size 24px
               &.on
                   color #00c850
            .content-msg
                color rgb(157,153,159)
                display inline-block
                font-size 12px
                vertical-align top
                margin-left  6px
    .rating-wrapper
        padding 0 18px
        ul
            .list
                padding 18px 0
                display flex
                border-bottom 1px solid rgba(7, 17, 27, 0.1)
                .show-left
                    flex 0 0 28px
                    width: 28px;
                    margin-right: 12px;
                    img 
                        border-radius 50%
                .show-right
                    flex 1
                    .right-top
                        .right-top-name
                            display inline-block
                            font-size 10px
                            color rgb(7,17,27)
                            line-height 12px;
                        .right-top-time
                            float right 
                            display inline-block
                            font-size 10px
                            font-weight 200
                            color rgb(147,153,159)
                            line-height 12px
                    .show-right-star
                        display block
                        margin-top 4px
                        .star 
                            display inline-block
                        .arrive-time
                            vertical-align middle
                            display inline-block
                            font-size 10px
                            font-weight 200
                            color rgb(147,153,159)
                            line-height 12px
                            margin-left 6px
                    .show-right-msg
                        display inline-block
                        font-size 12px
                        color rgb(7,17,27)
                        line-height 18px
                        margin-top 6px
                        margin-bottom 8px
                    .recommend
                        display block
                        line-height 16px
                        font-size 0
                        .icon,.item
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                            &.icon-thumb_up
                                color rgb(0, 160, 220)
                        .item
                            display inline-block
                            padding: 0 6px;
                            border: 1px solid rgba(7, 17, 27, 0.1);
                            border-radius: 1px;
                            color: rgb(147, 153, 159);
                            background: #fff;
                

</style>