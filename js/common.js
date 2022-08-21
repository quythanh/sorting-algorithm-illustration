var Run;

/* ======================== Event Functions ======================== */
const addClick = (selector, callback) => document.querySelector(selector).addEventListener('click', callback);
const rmClick = (selector, callback) => document.querySelector(selector).removeEventListener('click', callback);
/* ====================== End Event Functions ====================== */

const setPos = (el, x, y = null) => {
    el.style.left = x + 'px';
    if (y == null)
        el.style.top = null;
    else
        el.style.top = y - 91 + 'px';
}

const SwapUI = (box1, box2) => {
    var r1, r2;
    setTimeout(() => {
        r1 = box1.getBoundingClientRect();
        r2 = box2.getBoundingClientRect();

        setPos(box1, r1.x, r1.y - 80);
        setPos(box2, r2.x, r2.y + 80);
    }, 1000)

    setTimeout(() => {
        setPos(box1, r2.x, r1.y - 80);
        setPos(box2, r1.x, r2.y + 80);
    }, 2000)
    
    setTimeout(() => {
        setPos(box1, r2.x);
        setPos(box2, r1.x);
    }, 3000)

    setTimeout(() => {
        addClick('#next-step', HandleNextStep);
        addClick('#next-swap', HandleNextSwap);
    }, 4000)
}

const SwapArray = (listItem, a, b) => {
    let tmp = listItem[a];
    listItem[a] = listItem[b];
    listItem[b] = tmp;
}

const swap = (listNum, boxes, a, b) => {
    SwapArray(boxes, a, b);
    SwapArray(listNum, a, b);
    SwapUI(boxes[a], boxes[b]);
}

const HighLightCode = line => {
    $('.cpp p').removeClass('highlight');
    $(`.cpp p[line=${line}]`).addClass('highlight');
}