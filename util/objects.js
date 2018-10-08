class Objects {
    // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance/44782052#44782052
    // https://stackoverflow.com/questions/6089058/nodejs-how-to-clone-a-object/6089226#6089226
    static clone(x) {
        if (x === undefined || x === null) {
            return x;
        }
        if (x instanceof Array) {
            const arr = [];
            for (const key in x) {
                arr[key] = Objects.clone(x[key]);
            }
            return arr;
        }
        if (x instanceof Object) {
            const obj = Object.assign(Object.create(Object.getPrototypeOf(x)), x);
            for (const key in x) {
                obj[key] = Objects.clone(x[key]);
            }
            return obj;
        }
        return x;
    }
}

module.exports = Objects;
