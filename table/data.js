var app = new Vue({
    el:'#table',
    data:{
        columns:[
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '年齡',
                key: 'age',
                sortable: true
            },   
            {
                title: '出生日期',
                key: 'birthday',
                sortable: true
            },
            {
                title: '地址',
                key: 'address'
            }
        ],
        data:[
            {
                name: '王曉明',
                age: 18,
                birthday:'1999-08-09',
                address: '台灣新北市三峽區'
            },
            {
                name: '陳曉東',
                age: 48,
                birthday:'1959-04-19',
                address: '台灣新北市淡水區'
            },
            {
                name: '黃綠紅',
                age: 33,
                birthday:'1989-10-29',
                address: '台灣台北市大安區'
            },
            {
                name: '王春春',
                age: 55,
                birthday:'1939-09-09',
                address: '台灣台北市妹妹區'
            },
            {
                name: '聰哥哥',
                age: 18,
                birthday:'1939-02-17',
                address: '台灣新北市很棒區'
            },
            {
                name: '黃昕昕',
                age: 18,
                birthday:'2000-01-01',
                address: '台灣台北市柯黑區'
            },
        ]
    },
    methods:{
        handleAddData: function(){
            this.data.push({
                name: '周星星',
                age: 3,
                birthday:'2015-08-08',
                address:'火星'
            });
        }
    }
});