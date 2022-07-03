const render = (listNum) => {
    let html = '';
    listNum.forEach((num, index) => {
        html += `<div class="num-box" style="--i: ${index};"><span>${num}</span></div>`;
    })
    illuSection.innerHTML = html;
}

const setPos = (el, x, y) => {
    el.style.left = x + 'px';
    el.style.top = y - 91 + 'px'; // -91px of header
    el.style.transform = 'translateY(0)';
}

const generateList = () => {
    listNum = [];
    for (let i = 0; i < n; i++)
        listNum.push(Math.round(Math.random(1)*100));
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
        setPos(box1, r2.x, r2.y);
        setPos(box2, r1.x, r1.y);
        if (auto_next == false)
            document.querySelector('#next-step').addEventListener('click', ControlsNextStep);
        else
            SelectionSort(boxes, listNum);
    }, 3000)
}

const init = () => {
    n = 10;
    listNum = [];
    varLoop.i = 0;
    varLoop.j = 1;
    auto_next = false;


    illuSection.innerHTML = '';
    codeSection.innerHTML = '';

    header.innerHTML = `
        <div style="display: flex; align-items: center;">
            <span style="margin-right: 10px; font-size: 18px;">Nhập số lượng phần tử</span>
            <input type="number" id="quantity" min="2" max="15">
            <button style="margin-left: 10px;" id="generate">Khởi tạo mảng</button>
        </div>
    `;
}