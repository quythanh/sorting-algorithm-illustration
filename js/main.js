const SelectionSort = (boxes, listNum) => {
    let i = varLoop.i;
    if (i < n - 1) {
        let min = i;
        
        for (j = i + 1; j < n; j++)
            if (listNum[min] > listNum[j])
                min = j;
        
        if (min != i) {
            let tmp = listNum[i];
            listNum[i] = listNum[min];
            listNum[min] = tmp;
    
            tmp = boxes[i];
            boxes[i] = boxes[min];
            boxes[min] = tmp;
    
            varLoop.i++;
            SwapUI(boxes[i], boxes[min]);
        } else {
            varLoop.i++;
            SelectionSort(boxes, listNum);
        }
    }
    else
        setTimeout(() => alert("Done"), 1500);
}

const InterChangeSort = (boxes, listNum) => {
    let i = varLoop.i;
    let j = varLoop.j;
    console.log('i = ', i, ', j = ', j);
    if (i < n - 1) {
        if (j < n) {
            if (listNum[i] > listNum[j]) {
                let tmp = listNum[i];
                listNum[i] = listNum[j];
                listNum[j] = tmp;
        
                tmp = boxes[i];
                boxes[i] = boxes[j];
                boxes[j] = tmp;
        
                varLoop.j++;
                SwapUI(boxes[i], boxes[j]);
            } else {
                varLoop.j++;
                InterChangeSort(boxes, listNum);
            }
        } else {
            varLoop.i++;
            varLoop.j = varLoop.i + 1;
            InterChangeSort(boxes, listNum);
        }
    }
    else
        setTimeout(() => alert("Done"), 1500);
}

const start = () => {
    init();

    document.querySelector('#generate').addEventListener('click', () => {
        inp = document.querySelector('#quantity').value;
        if (inp) {
            n = inp - 0;
            generateList();
            render(listNum);
            boxes = [...document.querySelectorAll('.num-box')];
    
            fetch('./data/code.json')
                .then(res => res.json())
                .then(data => codeSection.innerHTML = `<pre><cpp>${data['SelectionSort']}</cpp></pre>`)
        }

        renderControls();
    })
}

start();