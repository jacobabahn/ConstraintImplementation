let variables = []
let map = {"A1": 0, "A2": 1, "A3": 2, "B1": 3, "B2": 4, "B3": 5, "C1": 6, "C2": 7, "C3": 8}

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
                // event.target.value = variable.get()
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
            }

            input.onmouseover = event => {
                if (variable.formula) {
                    event.target.value = variable.formula
                }
            }

            input.onmouseleave = event => {
                if (event.target.value !== "") {
                    event.target.value = variable.get()
                }
            }
            

            variables.push(variable)
            row.appendChild(td)
        }
    }
}

const parse = (v, value) => {
    // checks for a number
    if (!isNaN(value)) {
        // v.value = parseInt(value)
        value = parseInt(value)
        v.valid = false
        v.set(() => { return value })
        

    } else {
        v.formula = value
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
        // console.log(values)
        v.set(() => Function('return ' + values)())
        // v.set(() => eval(values))
    }
}

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

const update = () => {
    for (let item of variables) {
        if (item.formula) {
            parse(item, item.formula)
            item.element.value = item.get()
        }
        if (!item.valid && item.value !== null) {
            item.value = item.get()
        }
    }
}

const main = () => {
    createTable()
}
main()