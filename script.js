/**
 * Helper method to sum total for each color
 */
const sumTotal = (arr) => {
    let total = 0;
    Array.from(arr).forEach((input) => {
        total += Number(input.value)
    })
    return total
}
const rowIsValid = (inputs) => {
    const values = []
    Array.from(inputs).forEach((input) => {
        values.push(input.value)
    })
    if (JSON.stringify(values.sort()) != JSON.stringify(["1", "2", "3", "4"])) {
        alert("Make sure each value (1,2,3,4) only occurs once per row")
        return false
    }
    return true
} 

/**
 * Helper method to validate each number only once per row
*/
const rowsAreValid = () => {
    const rows = document.getElementsByTagName("fieldset")
    let invalidRowsFound = 0
    Array.from(rows).forEach((row) => {        
        if (!rowIsValid(row.elements)) {
            invalidRowsFound += 1
        }
    })
    if (invalidRowsFound > 0) {
        return false
    }
    return true
}

/**
 * Store array of ranking choices so that we can persist user input across page reloads on the index page
 */
const storeRawResults = () => {
    const valuesCollection = document.getElementById("true-colors").getElementsByTagName("input")
    const resultsToStore = []
    Array.from(valuesCollection).forEach((input) => {
        if(input.type === "text") {
            resultsToStore.push(input.value)
        }
      });
    sessionStorage.setItem("results", JSON.stringify({"arr": resultsToStore}))
}

/**
 * Store total for each color for access on success page
 */
const storeTotal = () => {
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

/**
 * On submit from index page do the following:
 */
const onSubmit = () => {
    if (!rowsAreValid()) {
        return false
    }
    // TODO: Could clean up data structures and only store once
    storeRawResults()
    storeTotal()
}

/**
 * On page load of index page, try and access values from session if any
 */
const accessSessionValues = () => {
    const valuesObj = sessionStorage.getItem("results")

    if (valuesObj != undefined) {
        const valuesArr = JSON.parse(valuesObj)["arr"]
        const inputs = document.getElementById("true-colors").getElementsByTagName("input")
        
        Array.from(inputs).forEach((input, i) => {
            if(input.type === "text") {
                if (valuesArr[i] != undefined) {
                    input.value = valuesArr[i]
                }
            }
        });
    }
}

/**
 * Helper to display an for orange (only vowel possibility)
 */
const aOrAn = (colorStr) => {
 if (colorStr[0] === 'o') {
     return "an"
 }
 return "a"
}

/**
 * On success page load, access totals and inject into page to display
 */
const setResults = () => {
    const heading = document.getElementById('results-heading')
    if (sessionStorage.length === 0) {
        heading.innerHTML = "Take the <a href='index.html'>true colors quiz<a> to find out your results"
        return
    }
    
    const results = []
    results.push(["orange", sessionStorage.getItem("orangeTotal")])
    results.push(["blue", sessionStorage.getItem("blueTotal")])
    results.push(["gold", sessionStorage.getItem("goldTotal")])
    results.push(["green", sessionStorage.getItem("greenTotal")])

    results.sort((a, b) => {
        return Number(b[1]) - Number(a[1])
    })

    const [topColor, topScore] = results[0]
    const [secondColor, secondScore] = results[1]
    if (topScore === secondScore) {
        heading.innerHTML = `You are ${aOrAn(topColor)} <span id=${topColor}>${topColor}</span> and ${aOrAn(secondColor)} <span id=${secondColor}>${secondColor}</span> primary. A tie! &#129412;`
    } else {
        heading.innerHTML = `You are ${aOrAn(topColor)} <span id=${topColor}>${topColor}</span> primary with ${aOrAn(secondColor)} <span id=${secondColor}>${secondColor}</span> secondary &#129412;`
    }

    const listContainer = document.getElementById('results-list')
    results.forEach((item) => {
        const [color, score] = item
        const listItem = document.createElement("li")
        listItem.innerHTML = `Your total ${color} score is: ${score}`
        listItem.id = `${color}-total`
        listContainer.appendChild(listItem)
    })
}

