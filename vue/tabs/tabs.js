Vue.component('tabs',{
    template: '\
    <div class="tabs">\
        <div class="tabs-bar">\
        <!-- 標籤頁標題，用v-for -->\
            <div\   :class="tabCls(item)" \
                    v-for="(item, index) in navList" \
                    @click="handleChange(index)"> \
                    {{ item.label }} \
            </div>\
        </div>\
        <div class="tabs-content">\
        <!-- 這裡的slot，就是巢狀的pane -->\
            <slot></slot>\
        </div>\
    </div>',
    props: {
        //這裡的value是為了可以使用v-model
        value: {
            type: [String, Number]
        }
    },
    data: function(){
        return{
            //因為不能修改value，所以複製一分自己維護
            currentVale: this.value,
            navList: []
        }
    },
    methods: {
        tabCls: function(item){
            return[
                'tabs-tab',
                {
                    //給目前選取的tab加一個class
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        getTabs(){
            //透過檢查子元件，獲得所有pane元件
            return this.$children.filter(function(item){
                return item.$options.name === 'pane';
            });
        },
        updateNav(){
            this.navList = [];
            //設定this的參考，在function回呼裡，this指向的並不是vue實例
            var _this = this;

            this.getTabs().forEach(function(pane, index){
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
            //如果沒有給pane設定name,預設設定他的索引
            if( !pane.name ) pane.name = index;
            //設定目前選取的tab的索引，在後面介紹
            if( index === 0){
                if( !_this.currentVale){
                    _this.currentVale = pane.name || index;
                }
            }
        });
        
        this.updateStatus();
    },
    updateStatus(){
        var tabs = this.getTabs();
        var _this = this;
        //顯示目前選取的tab對應的pane元件，隱藏沒有選取的
        tabs.forEach(function(tab){
            return tab.show = tab.name === _this.currentVale;
        })
    },
        //點擊tab標題時觸發
     handleChange: function(index){
        var nav = this.navList[index];
        var name = nav.name;
        //改變目前選取的tab，並觸發下面的watch
        this.currentVale = name;
        //更新value
        this.$emit('input', name);
        //觸發一個自訂事件，供父級使用
        this.$emit('on-click', name);
     }
    },
    watch: {
        value:　function(val){
            this.currentVale = val;
        },
        currentVale: function(){
        //目前選取的tab發生變化時，更新pane的顯示狀態
        this.updateStatus();
        }
    }
})