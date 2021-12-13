let dependencies = {}
let stack = []
/**This class is used to create and manage Constraints */
class Constraint {
    /** The constructor creates a "blank" constrained variable that will be modified
     * @param {object} element - JS element used for modification of the DOM
    */
    constructor(element) {
        this.value = null;
        this.valid = false
        this.dependencies = []
        this.eval = () => {}
        this.formula = ""
        this.element = element
    }

    /** The get method returns the value of a constrained variable */
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

    /** The set method sets the eval function and invalidates the variable's dependencies
     * @param {function} val - the function used to evaluate the variable's value
    */
    set = (val) => {
        this.eval = val
        for (let dep of this.dependencies) {
            if (dep.valid) {
                dep.invalidate()
            }
        }
    }

    /** The invalidate method invalidates the current constrained variable and all of its dependencies */
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