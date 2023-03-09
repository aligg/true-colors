
const sumTotal = (arr) => {
    let total = 0;
    arr.forEach((input) => {
        total += Number(input.value)
    })
    return total
}

const onSubmit = () => {
    const oranges = document.getElementsByName("orange")
    const blues = document.getElementsByName("blue")
    const golds = document.getElementsByName("gold")
    const greens = document.getElementsByName("green")

    const orangeTotal = sumTotal(oranges)
    const blueTotal = sumTotal(blues)
    const goldTotal = sumTotal(golds)
    const greenTotal = sumTotal(greens)

    sessionStorage.setItem("orangeTotal", orangeTotal)
    sessionStorage.setItem("blueTotal", blueTotal)
    sessionStorage.setItem("goldTotal", goldTotal)
    sessionStorage.setItem("greenTotal", greenTotal)
}

const accessResult = () => {
    document.getElementById('orange-total').innerHTML = sessionStorage.getItem("orangeTotal")
    document.getElementById('blue-total').innerHTML = sessionStorage.getItem("blueTotal")
    document.getElementById('gold-total').innerHTML = sessionStorage.getItem("goldTotal")
    document.getElementById('green-total').innerHTML = sessionStorage.getItem("greenTotal")

}