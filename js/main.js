const init = () => {

    Clear.app();

    Render.header(`
        <form class="header__form">
            <div>
                <input type="number" class="form__input" id="quantity" min="2" max="${Math.floor(($(window).width() - 450)/70) - 1}" placeholder="Nhập số phần tử" required>
            </div>
        
            <div>
                <button type="submit" class="form__button" id="generate"><i class="fa-light fa-play"></i></button>
            </div>
        </form>
    `);

    $('.header__form').submit(e => {
        e.preventDefault();
        Render.app();
        Run = new SelectionSort($('#quantity').val() - 0);
        renderControls();
    })
}

init();