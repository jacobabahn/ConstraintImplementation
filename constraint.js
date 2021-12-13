let dependencies = {}
let stack = []
/**This class is used to create and manage Constraints */
class Constraint {
    /** The constructor creates a "blank" constrained variable that will be modified
     * @param {Object} element - JS element used for modification of the DOM
    */
    constructor(element) {
        this.value = null;
        this.valid = false
        this.dependencies = []
        this.eval = () => {}
        this.formula = ""
        this.element = element
    }

    /** The get method returns the value of a constrained variable 
     * @return {number} value - the value of the constrained variable
     * @example instance.get()
     * @memberof Constraint
     * @instance
    */
    get() {
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
     * @param {Function} val - the function used to evaluate the variable's value
     * @example instance.set(() => {return value})
     * @memberof Constraint
     * @instance
    */
    set(val){
        this.eval = val
        for (let dep of this.dependencies) {
            if (dep.valid) {
                dep.invalidate()
            }
        }
    }

    /** The invalidate method invalidates the current constrained variable and all of its dependencies 
     * @memberof Constraint
     * @instance
    */
    invalidate(){
        this.valid = false
        for (let dep of this.dependencies) {
            if (dep.valid) {
                dep.invalidate()
            }
        }
        this.dependencies = []
    }
}