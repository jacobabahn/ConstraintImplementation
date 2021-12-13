let variables = []
let map = {"A1": 0, "A2": 1, "A3": 2, "B1": 3, "B2": 4, "B3": 5, "C1": 6, "C2": 7, "C3": 8}

/** The createTable function builds the table, creates the constrained variables 
 * and sets the event handlers for each of them
 */
const createTable = () => {
    let table = document.getElementById('table')
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr')
        table.appendChild(row)
    
        for (let j = 0; j < 3; j++) {
            const td = document.createElement('td')
            const input = document.createElement('input')
            td.appendChild(input)
            
            let variable = new Constraint(input)

            input.onchange = event => {
                parse(variable, event.target.value)
                update()
            }
            
            input.onfocus = event => {
                if (variable.formula) {
                event.target.value = variable.formula
                }
            }

            input.onblur = event => {
                if (event.target.value !== "") {
                    event.target.value = variable.get()
                }
                update()
            }
            input.onkeydown = event => {
                if (event.key === "Enter") {
                    event.target.blur()
                }
            }

            variables.push(variable)
            row.appendChild(td)
        }
    }
}
/** The parse function takes a constrained variable and an inputted value as parameters
 *  and then sets the eval function for the constrained variable input.
 * @param {object} v - The constrained variable
 * @param {string} value - User input. Should be either a number or a formula
 * @example parse(variable, "2+3")
 * */
const parse = (v, value) => {
    // checks for a number
    if (!isNaN(value)) {
        value = parseInt(value)
        v.valid = false
        v.set(() => { return value })
        

    } else {
        v.formula = value
        v.valid = false
        const operators = getOperators(value)

        splicedVal = value
        for (let op of operators) {
            splicedVal = splicedVal.replace(op, " ")
        }
        splicedVal = splicedVal.split(" ")

        let values = []
        for (let i = 0; i < splicedVal.length; i++) {
            let variable = variables[map[splicedVal[i]]]
            variable.dependencies.push(v)
            values.push(variable.get())
        }

        let count = 1
        for (let op of operators) {
            values.splice(count, 0, op)
            count += 2
        }
        values = values.join("")
        v.set(() => Function('return ' + values)())
    }
}

/** getOperators is a helper function for parse() that is used to find out which  operators
 * are used in the formula. The function returns an array of operators in the order that they appear.
 * @param {string} value - The inputted formula value
 * @returns {array} - An array of operators in the order that they appear in the formula
 * @example getOperators("2+3*4")
*/
const getOperators = (value) => {
    const operators = []
    const types = ['+', '-', '*','/']
    for (let val of value) {
        if (types.includes(val)) {
            operators.push(val)
        }
    }
    return operators
}

/** update() is used to check if an input value has been changed after it has been initialized.
 * @example update()
*/
const update = () => {
    for (let item of variables) {
        if (item.formula) {
            parse(item, item.formula)
            item.element.value = item.get()
        }
        if (!item.valid && item.value !== null) {
            item.element.value = item.get()
        }
    }
}

const main = () => {
    createTable()
}
main()