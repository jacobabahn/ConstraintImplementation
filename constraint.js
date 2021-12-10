
dependencies = {}
class Constraint {
    constructor(v, val) {
        this.v = v
        this.val = val
        this.stack = []
    }

    get = (v) => {
        if (this.stack.length > 0) {
            this.v.dependencies += stack[0]
        }
        if (!this.v.valid) {
            this.v.valid = true
            this.stack.push(this.v)
            this.v.value = this.v.eval()
            this.stack.pop()
        }

        return this.v.value
    }

    set = (v, val) => {
        this.v.value = this.val
        for (let dep in this.v.dependencies) {
            if (dep.valid) {
                invalidate(dep)
            }
        }
    }

    invalidate = (v) => {
        this.v.valid = false
        for (let dep in this.v.dependencies) {
            if (dep.valid) {
                invalidate(dep)
            }
            this.v.dependencies = []
        }
    }
}