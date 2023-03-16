
const sumTotal = (arr) => {
    let total = 0;
    Array.from(arr).forEach((input) => {
        total += Number(input.value)
    })
    return total
}

const onSubmit = () => {
    const valuesCollection = document.getElementById("true-colors").getElementsByTagName("input")
    const resultsToStore = []
    Array.from(valuesCollection).forEach((input) => {
        if(input.type === "text") {
            resultsToStore.push(input.value)
        }
      });
    sessionStorage.setItem("results", JSON.stringify({"arr": resultsToStore}))
    
    const oranges = document.getElementsByClassName("orange")
    const blues = document.getElementsByClassName("blue")
    const golds = document.getElementsByClassName("gold")
    const greens = document.getElementsByClassName("green")

    const orangeTotal = sumTotal(oranges)
    const blueTotal = sumTotal(blues)
    const goldTotal = sumTotal(golds)
    const greenTotal = sumTotal(greens)

    sessionStorage.setItem("orangeTotal", orangeTotal)
    sessionStorage.setItem("blueTotal", blueTotal)
    sessionStorage.setItem("goldTotal", goldTotal)
    sessionStorage.setItem("greenTotal", greenTotal)
}

const accessSessionValues = () => {
    const valuesObj = sessionStorage.getItem("results")
    console.log(valuesObj)
    const valuesArr = JSON.parse(valuesObj)["arr"]

    if (valuesArr != undefined) {
        const inputs = document.getElementById("true-colors").getElementsByTagName("input")
        Array.from(inputs).forEach((input, i) => {
            if(input.type === "text") {
                input.value = valuesArr[i]
            }
        });
    }

}

const setResults = () => {
    const results = []
    results.push(["orange", sessionStorage.getItem("orangeTotal")])
    results.push(["blue", sessionStorage.getItem("blueTotal")])
    results.push(["gold", sessionStorage.getItem("goldTotal")])
    results.push(["green", sessionStorage.getItem("greenTotal")])

    results.sort((a, b) => {
        return Number(b[1]) - Number(a[1])
    })

    const heading = document.getElementById('results-heading')
    const topColor = results[0][0]
    const secondColor = results[1][0]
    heading.innerHTML = `You are a <span id=${topColor}>${topColor}</span> primary with a <span id=${secondColor}>${secondColor}</span> secondary &#129412;`

    const listContainer = document.getElementById('results-list')
    results.forEach((item) => {
        const [color, score] = item
        const listItem = document.createElement("li")
        listItem.innerHTML = `Your total ${color} score is: ${score}`
        listItem.id = `${color}-total`
        listContainer.appendChild(listItem)
    })
}

