function HandleNextStep() {
    Run.Sort();
}

function HandleNextSwap() {
    rmClick('#next-step', HandleNextStep);
    rmClick('#next-swap', HandleNextSwap);
    rmClick('#auto-next', ControlsAutoNext);
    addClick('#stop-auto', ControlsStopAuto);
    Run.autoLoop = 1;
    Run.Sort();
}

function ControlsAutoNext() {
    rmClick('#next-step', HandleNextStep);
    rmClick('#next-swap', HandleNextSwap);
    rmClick('#auto-next', ControlsAutoNext);
    addClick('#stop-auto', ControlsStopAuto);
    Run.autoLoop = 2;
    Run.Sort();
}

function ControlsStopAuto() {
    addClick('#next-step', HandleNextStep);
    addClick('#next-swap', HandleNextSwap);
    addClick('#auto-next', ControlsAutoNext);
    rmClick('#stop-auto', ControlsStopAuto);
    Run.autoLoop = 0;
}

function ControlsQuit() {
    rmClick('#quit', ControlsQuit);
    Run.autoLoop = 0;
    init();
}

const renderControls = () => {
    Render.header(`
        <div class="controls">
            <button class="controls__button" id="next-step"><i class="fa-duotone fa-chevron-right"></i></button>
            <button class="controls__button" id="next-swap"><i class="fa-duotone fa-chevrons-right"></i></button>
            <button class="controls__button" id="auto-next">
                <i class="fa-duotone fa-chevron-right"></i>
                <i class="fa-duotone fa-chevrons-right"></i>
            </button>
            <button class="controls__button" id="stop-auto"><i class="fa-duotone fa-circle-stop"></i></button>
            <button class="controls__button" id="quit"><i class="fa-duotone fa-xmark-large"></i></button>
        </div>
    `);

    addClick('#next-step', HandleNextStep);
    addClick('#next-swap', HandleNextSwap);
    addClick('#auto-next', ControlsAutoNext);
    addClick('#quit', ControlsQuit);
}