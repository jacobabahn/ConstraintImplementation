let dependencies = {}
let stack = []
class Constraint {
    constructor(element) {
        this.value = null;
        this.valid = false
        this.dependencies = []
        this.eval = () => {}
        this.formula = ""
        this.element = element
    }

    get = () => {
        if (stack.length > 0) {
            this.dependencies += stack[stack.length - 1]
        }
        if (!this.valid) {
            this.valid = true
            stack.push(this)
            this.value = this.eval()
            stack.pop()
        }

        return this.value
    }

    set = (val) => {
        this.eval = val
        for (let dep of this.dependencies) {
            if (dep.valid) {
                dep.invalidate()
            }
        }
    }

    invalidate = () => {
        this.valid = false
        for (let dep of this.dependencies) {
            if (dep.valid) {
                dep.invalidate()
            }
        }
        this.dependencies = []
    }
}