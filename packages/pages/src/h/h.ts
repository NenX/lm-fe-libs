
function log(target: C, propertyKey: string) {
    let value = target[propertyKey];
    // 用来替换的getter
    const getter = function () {
        console.log(`Getter for ${propertyKey} returned ${value}`);
        return value;
    }
    // 用来替换的setter
    const setter = function (newVal:any) {
        console.log(`Set ${propertyKey} to ${newVal}`);
        value = newVal;
    };
    // 替换属性，先删除原先的属性，再重新定义属性
    if (delete target[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}

class C {
    @log
    aaa:string
    constructor (){
        this.aaa = "222"
    }
}
new C().aaa = "999"
