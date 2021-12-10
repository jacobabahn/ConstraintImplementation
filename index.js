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
            
            let variable = new Constraint()
            input.onchange = e => {
                parse(variable, e.target.value)
                e.target.value = variable.get()
            }
            
            input.onfocus = e => {
                e.target.value = variable.raw
            }
            input.onblur = e => {
                e.target.value = variable.get()
            }

            variables.push(variable)
            row.appendChild(td)
        }
    }
}

const parse = (v, value) => {
    // checks for a number
    if (!isNaN(value)) {
       v.set(() => { return parseInt(value)})
    }
    else {
        v.raw = value
        const operators = getOperators(value)
        // console.log(operators)

        splicedVal = value
        for (let op of operators) {
            splicedVal = splicedVal.replace(op, " ")
        }
        splicedVal = splicedVal.split(" ")

        let values = []
        for (let i = 0; i < splicedVal.length; i++) {
            let variable = variables[map[splicedVal[i]]]
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

const main = () => {
    createTable()
}
main()
