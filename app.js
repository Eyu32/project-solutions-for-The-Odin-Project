class Calculator{
    constructor(prevOperandTextElement, currOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement
        this.currOperandTextElement = currOperandTextElement
        this.clear()
    }
    clear(){
        this.currOperand = ""
        this.prevOperand = ""
        this.operation = ""

    }

    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === "." && this.currOperand.includes(".")) return;
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currOperand === "") return
        if (this.prevOperand !== ""){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ""

    }

    compute(){
        let computation 
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if (!isNaN(prev) && isNaN(curr)) return 

        switch(this.operation){
            case "+":
                computation = prev + curr
                break
            case "-":
                computation = prev - curr
                break
            case "*":
                computation = prev * curr
                break
            case "÷":
                computation = prev / curr
                break
            case "%":
                computation = prev % curr
                break
            default:
                return
        }
        this.currOperand = computation
        this.operation = ""
        this.prevOperand = ""
    }
    getdisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigit = stringNumber.split(".")[1]

        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ""
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if (decimalDigit != null){
            return `${integerDisplay}.${decimalDigit}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currOperandTextElement.innerText =this.getdisplayNumber(this.currOperand)
        if (this.operation != null) {
            this.prevOperandTextElement.innerText = `${this.getdisplayNumber(this.prevOperand)} ${this.operation}`
        }
        else{
            this.prevOperandTextElement.innerText = ""
        }
    }
} 
const numberBtn = document.querySelectorAll("[data-number]")
const oprationBtns = document.querySelectorAll("[data-operation]")
const equalbtn = document.querySelector("[data-equals]")
const deletebtn = document.querySelector("[data-delete]")
const allClearbtn = document.querySelector("[data-all-clear]")
const prevOperandTextElement = document.querySelector("[data-prev-operand]")
const currOperandTextElement = document.querySelector("[data-curr-operand]")


const calculator = new Calculator(prevOperandTextElement ,currOperandTextElement)

numberBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})
oprationBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const sign = btn.getAttribute("value")
        calculator.chooseOperation(sign)
        calculator.updateDisplay()
    })
})

equalbtn.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearbtn.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

deletebtn.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})