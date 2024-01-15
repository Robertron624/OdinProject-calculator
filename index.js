function main () {
  // DOM elements

  const display = document.querySelector('.display')
  const displayResult = display.querySelector('.display__result')
  const calcButtons = document.querySelectorAll('.buttons button')

  // calculator variables

  let currentDisplayValue = '0'
  let firstOperand = null
  let operator = null
  let secondOperand = null
  let result = null

  displayResult.textContent = currentDisplayValue

  // functions

  function handleButtonClick (event) {
    const { target } = event
    const { textContent } = target

    // check for data-action attribute

    const dataType = target.dataset.type

    switch (dataType) {
      case 'operator':
        if (operator === null) {
          operator = textContent
          displayCharacter(textContent)
        }
        break
      case 'decimal':
        console.log('decimal')
        break
      case 'clear':
        clearAll()
        break
      case 'equals':
        if (operator === null) return
        setOperands()
        result = calculate(firstOperand, operator, secondOperand)
        displayResult.textContent = result
        break
      default: // number
        displayCharacter(textContent)
        break
    }
  }

  function displayCharacter (character) {
    if (displayResult.textContent === '0') {
      displayResult.textContent = ''
    }

    const currentDisplayValue = displayResult.textContent
    const newDisplayValue = currentDisplayValue + character
    displayResult.textContent = newDisplayValue
  }

  function clearAll () {
    displayResult.textContent = '0'
    currentDisplayValue = '0'
    firstOperand = null
    operator = null
    secondOperand = null
    result = null
  }

  function setOperands () {
    const operatorRegex = /[+\-*/%]/
    const operands = displayResult.textContent.split(operatorRegex)

    firstOperand = parseFloat(operands[0])
    secondOperand = parseFloat(operands[1])
  }

  function calculate (firstOperand, operator, secondOperand) {
    let result = 0

    if (firstOperand === null || secondOperand === null) return

    switch (operator) {
      case '+':
        result = firstOperand + secondOperand
        break
      case '-':
        result = firstOperand - secondOperand
        break
      case '*':
        result = firstOperand * secondOperand
        break
      case '/':
        if (secondOperand === 0) {
          currentDisplayValue = 'Error: Division by 0'
          return
        }

        result = firstOperand / secondOperand

        break
      case '%':
        result = firstOperand % secondOperand
        break
      default:
        return
    }

    console.log({
      firstOperand,
      operator,
      secondOperand,
      result
    })

    return result
  }

  // event listeners

  calcButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick)
  })
}

window.onload = main
