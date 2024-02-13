import Matter from "https://esm.sh/matter-js@0.19.0";

const htmlElement = document.querySelector('html');

const toggles = document.querySelectorAll('[data-toggle-darkmode]');

Array.from(toggles).forEach(tgl => {
    tgl.addEventListener('change', (e) => {   
        if (e.target.checked) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    });
})

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

let daisyElems = document.querySelectorAll('.elem');
const bodies = [];
const VIEW = {};

function setup() {
    daisyElems = document.querySelectorAll('.elem');
    const mobile = window.innerWidth < 1080;
    const innerWidth = mobile ? window.innerWidth : window.innerWidth / 2;
    VIEW.SAFE_WIDTH = innerWidth;
    VIEW.SAFE_HEIGHT = window.innerHeight;
    VIEW.scale = Math.min((innerWidth) / VIEW.SAFE_WIDTH, window.innerHeight / VIEW.SAFE_HEIGHT);;
    VIEW.width    = (innerWidth) / VIEW.scale;
    VIEW.height   = window.innerHeight / VIEW.scale;
    VIEW.centerX  = VIEW.width / 2;
    VIEW.centerY  = VIEW.height / 2;
    VIEW.offsetX  = (VIEW.width - VIEW.SAFE_WIDTH) / 2 / VIEW.scale;
    VIEW.offsetY  = (VIEW.height - VIEW.SAFE_HEIGHT) / 2 / VIEW.scale;


    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.getElementById('canvas'),
        engine: engine,
        options: {
            width: innerWidth,
            height: window.innerHeight,
            showAngleIndicator: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    for (let i = 0; i < daisyElems.length; i++) {
        const elem = daisyElems[i];

        elem.style.zIndex = 10;

        const isBall = elem.classList.contains('rounded-full');

        const radius = isBall ? 20 : 4;

        const body = Bodies.rectangle(
            VIEW.centerX + Math.floor(Math.random() * VIEW.width/2) - VIEW.width/4, //Number(elem.dataset.x),
            - (VIEW.centerY + Math.floor(Math.random() * VIEW.height / 2) - VIEW.height / 4) * 2, // Number(elem.dataset.y),
            elem.clientWidth + 5,// * 1.5, // VIEW.width * elem.offsetWidth / window.innerWidth,
            elem.clientHeight + 5,// * 1.5, // VIEW.height * elem.offsetHeight / window.innerHeight,
            { render: { visible: true }, restitution: 0.4, gravity: .8, friction: 1, density: 1, chamfer: { radius } },
        );

        if (!isBall) {
            elem.addEventListener('click', () => {

                Matter.Body.applyForce(body, body.position, {x: 0, y: 150 });
            });
        }
        
        let isDragging = false;
        elem.addEventListener('mousedown', (e) => {
            isDragging = false;
            const startX = e.clientX;
            const startY = e.clientY;

            const mouseMoveHandler = (event) => {
                const deltaX = event.clientX - startX;
                const deltaY = event.clientY - startY;

                if (!isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
                    isDragging = true;
                }
            };

            const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);

                if (isDragging) {

                    e.preventDefault();
                    const mouse = Mouse.create();
                    const mouseConstraint = MouseConstraint.create(engine, {
                        mouse: mouse,
                        constraint: {
                            stiffness: 0.2,
                            render: {
                                visible: false
                            }
                        }
                    });
                    Composite.add(world, mouseConstraint);
                    Render.mouse = mouse;
                }
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        let startX, startY;

        elem.addEventListener('touchstart', (e) => {
            isDragging = false;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        elem.addEventListener('touchmove', (e) => {
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;

            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            if (!isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
                isDragging = true;
            }

            if (isDragging) {
                const translationX = (currentX - startX) / VIEW.scale;
                const translationY = (currentY - startY) / VIEW.scale;

                Matter.Body.translate(body, { x: translationX, y: translationY });

                startX = currentX;
                startY = currentY;
            }
        });


        elem.addEventListener('touchend', (e) => {

            if (isDragging) {
                e.preventDefault();
                const mouse = Mouse.create(render.canvas);
                const mouseConstraint = MouseConstraint.create(engine, {
                    mouse: mouse,
                    constraint: {
                        stiffness: 0.2,
                        render: {
                            visible: false
                        }
                    }
                });
                Composite.add(world, mouseConstraint);
                Render.mouse = mouse;
            }
        });

        elem.addEventListener('click', (e) => {
            if (isDragging) {

                e.preventDefault();
                const mouse = Mouse.create();
                const mouseConstraint = MouseConstraint.create(engine, {
                    mouse: mouse,
                    constraint: {
                        stiffness: 0.2,
                        render: {
                            visible: false
                        }
                    }
                });
                Composite.add(world, mouseConstraint);
                Render.mouse = mouse;
            }
        });

        bodies.push(body);
        elem.id = body.id;
    }

    // {
    //     restitution:      0.5,
    //     friction:         0,
    //     frictionAir:      0.001,
    //     frictionStatic:   0,
    //     density:          1,
    //     chamfer:          { radius: 24 },
    //     angle:            (Math.random() * 2.000) - 1.000
    //   }
    
    Composite.add(world, [
        // walls
        // Base
        Bodies.rectangle(VIEW.width / 2, VIEW.height, window.innerWidth*2, 10, { isStatic: true, render: { visible: true, fillStyle: '#3498db', strokeStyle: '#2980b9', lineWidth: 2 } }),
        // Lateral esquerda
        Bodies.rectangle(0, VIEW.height / 2, 10, VIEW.height * 2, { isStatic: true, render: { visible: true,fillStyle: '#3498db', strokeStyle: '#2980b9', lineWidth: 2 } }),
        // Lateral direita
        Bodies.rectangle(window.innerWidth, VIEW.height / 2, 10, VIEW.height * 2, { isStatic: true, render: { visible: true, fillStyle: '#3498db', strokeStyle: '#2980b9', lineWidth: 2 } }),
    ]);

    bodies.forEach((body, idx) => {
        setTimeout(() => {
            Composite.add(world, [body]);
        }, 1500 + 1500 * idx);
    });

    // add mouse control
    var mouse = Mouse.create(render.canvas)
    mouse.pixelRatio = window.devicePixelRatio || 1;

    var mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    
    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: VIEW.width, y: VIEW.height }
    });
}

setup();

window.requestAnimationFrame(update);
function update() {
    for (var i = 0, l = daisyElems.length; i < l; i++) {
        var bodyDom = daisyElems[i];
        var body = null;
        for (var j = 0, k = bodies.length; j < k; j++) {
            if ( bodies[j].id == bodyDom.id ) {
                body = bodies[j];
                break;
            }
        }
        
        if ( body === null ) continue;
        
        bodyDom.style.transform = "translate( " 
            + ((VIEW.offsetX + body.position.x) * VIEW.scale - bodyDom.offsetWidth/2 ) 
            + "px, "
            + (VIEW.offsetY *2 + ( body.position.y) * VIEW.scale - bodyDom.offsetHeight/2)
            + "px )";

        //bodyDom.style.top = body.position.y + "px";
        //bodyDom.style.left = body.position.x + "px";
        bodyDom.style.transform += "rotate( " + body.angle + "rad )";
    }
    window.requestAnimationFrame(update);
}

setTimeout(() => {
    
}, 500);