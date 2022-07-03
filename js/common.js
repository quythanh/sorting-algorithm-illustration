const render = (listNum) => {
    let html = '';
    listNum.forEach((num, index) => {
        html += `<div class="num-box" style="--i: ${index};"><span>${num}</span></div>`;
    })
    $('#illu').html(html);
}

const setPos = (el, x, y = null) => {
    el.style.left = x + 'px';
    if (y == null)
        el.style.top = null;
    else
        el.style.top = y - 91 + 'px'; // -91px of header
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
        setPos(box1, r2.x);
        setPos(box2, r1.x);
        if (auto_next == false)
            document.querySelector('#next-step').addEventListener('click', ControlsNextStep);
        else
            SortFunction(boxes, listNum);
    }, 3000)
}

const init = () => {
    n = 10;
    listNum = [];
    varLoop.i = 0;
    varLoop.j = 1;
    auto_next = false;
    SortFunction = SelectionSort;

    $('#app').html('');

    header.innerHTML = `
        <form class="header__form">
            <div>
                <input type="number" class="form__input" id="quantity" min="2" max="15" placeholder="Nhập số phần tử" required>
            </div>
        
            <div>
                <button type="submit" class="form__button" id="generate"><i class="fa-light fa-play"></i></button>
            </div>

            <div>
                <select class="form__select" id="algorithm" required>
                    <option value="" hidden selected>Chọn thuật toán:</option>
                    <option value="selection">Selection Sort</option>
                    <option value="interchange">Interchange Sort</option>
                </select>
            </div>
        </form>
    `;

    $('.header__form').submit(e => {
        e.preventDefault();
        let inp = $('#quantity').val();
        let alg = $('#algorithm').val();
        
        $('#app').html('<div id="illu"></div><div id="code"></div>');

        n = inp - 0;
        generateList();
        render(listNum);
        boxes = [...document.querySelectorAll('.num-box')];

        $.getJSON('./data/code.json', data => $('#code').html(`<pre><cpp>${data[alg]}</cpp></pre>`))

        switch (alg) {                
            default:
            case "selection":
                SortFunction = SelectionSort;
                break;
                
            case "interchange":
                SortFunction = InterchangeSort;
                break;
        }

        renderControls();
    })
}