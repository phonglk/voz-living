define(function(){
    return {
        get:function(item){
            return localStorage.getItem(item);
        },
        getNDefault:function(item,defaultValue){
            var value = localStorage.getItem(item);
            if(value == null){
                localStorage.setItem(item,defaultValue);
                return localStorage.getItem(item);
            }
            return value;
        },
        set:function(item,value){
            return localStorage.setItem(item,value)
        }
    }
})
