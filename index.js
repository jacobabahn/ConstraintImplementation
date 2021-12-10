var instance = new Constraint({}, 10)

const getA1 = () => {
    let a1 = document.getElementById('A1').value
    console.log(a1)
    changeB1()
}

const getA2 = () => {
    let a2 = document.getElementById('A2').value
    console.log(a2)
    changeB1()
}

const changeB1 = () => {
    let b1 = document.getElementById('B1')
    let a1 = document.getElementById('A1').value
    let a2 = document.getElementById('A2').value

    b1.value = parseInt(a1) + parseInt(a2)
}

document.getElementById('A1').addEventListener('change', getA1)
document.getElementById('A2').addEventListener('change', getA2)
