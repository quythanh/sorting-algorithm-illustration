function ControlsNextStep() {
    document.querySelector('#next-step').removeEventListener('click', ControlsNextStep);
    SortFunction(boxes, listNum);
}

function ControlsQuit() {
    document.querySelector('#quit').removeEventListener('click', ControlsQuit);
    init();
}

function ControlsAutoNext() {
    document.querySelector('#next-step').removeEventListener('click', ControlsNextStep);
    document.querySelector('#auto-next').removeEventListener('click', ControlsAutoNext);
    document.querySelector('#stop-auto').addEventListener('click', ControlsStopAuto);
    auto_next = true;
    SortFunction(boxes, listNum);
}

function ControlsStopAuto() {
    document.querySelector('#next-step').addEventListener('click', ControlsNextStep);
    document.querySelector('#auto-next').addEventListener('click', ControlsAutoNext);
    document.querySelector('#stop-auto').removeEventListener('click', ControlsStopAuto);
    auto_next = false;
}

const renderControls = () => {
    header.innerHTML = `
        <div class="controls">
            <button id="next-step"><i class="fa-duotone fa-chevron-right"></i></button>
            <button id="auto-next"><i class="fa-duotone fa-chevrons-right"></i></button>
            <button id="stop-auto"><i class="fa-duotone fa-circle-stop"></i></button>
            <button id="quit"><i class="fa-duotone fa-xmark-large"></i></button>
        </div>
    `;

    document.querySelector('#next-step').addEventListener('click', ControlsNextStep);
    document.querySelector('#auto-next').addEventListener('click', ControlsAutoNext);
    document.querySelector('#quit').addEventListener('click', ControlsQuit);
}