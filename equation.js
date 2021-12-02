const terms = [5/8, 2, 5, 8];
const operations = [[(a,b) => {return a + b;}, '+'],
                    [(a,b) => {return a - b;}, '-'],
                    [(a,b) => {return a * b;}, '*'],
                    [(a,b) => {return a / b;}, '/']
                   ];
const target = 24;

function recursiveEvaluate(stack, terms, target, history) {
    if ((stack.length === 1) && (terms.length === 0)) {
        if (stack.pop() === target) {
            console.log('Found solution ' + history);
        }
    }
    if (stack.length >= 2) {
        operations.forEach(op => {
            const newStack = stack.slice();
            const top = newStack.pop();
            const next = newStack.pop();
            newStack.push(op[0](next, top));
            const newHistory = history + ' ' + op[1];
            recursiveEvaluate(newStack, terms, target, newHistory);
        })
    }
    for (let i = 0; i < terms.length; ++i) {
        const newStack = stack.slice();
        const newTerms = terms.slice();
        const nextTerm = newTerms.splice(i, 1);
        newStack.push(nextTerm);
        const newHistory = history + ' ' + nextTerm;
        recursiveEvaluate(newStack, newTerms, target, newHistory);
    }
}

recursiveEvaluate([], terms, target, '');