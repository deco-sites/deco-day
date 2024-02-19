import Matter from "https://esm.sh/matter-js@0.19.0";

const htmlElement = document.querySelector('html');

document.body.style.overflow = 'hidden';

const toggles = document.querySelectorAll('[data-toggle-darkmode]');

const propEditavel = document.querySelector('[data-prop-editavel]').dataset.propEditavel;

const screenSize = window.innerWidth;
const screenSizeHeight = window.innerHeight

window.addEventListener('load', () => {
    setTimeout(() => {
        const floatingElements = document.getElementById('floatingElements');
        floatingElements.classList.remove('invisible');
    }, 250);
});


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
    const mobile = screenSize < 1080;
    const innerWidth = mobile ? screenSize : screenSize / 2;
    VIEW.SAFE_WIDTH = innerWidth;
    VIEW.SAFE_HEIGHT = screenSizeHeight;
    VIEW.scale = Math.min((innerWidth) / VIEW.SAFE_WIDTH, screenSizeHeight / VIEW.SAFE_HEIGHT);;
    VIEW.width    = (innerWidth) / VIEW.scale;
    VIEW.height   = screenSizeHeight / VIEW.scale;
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
            height: screenSizeHeight,
            showAngleIndicator: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    for (let i = 0; i < daisyElems.length; i++) {
        const elem = daisyElems[i];
    
        elem.style.zIndex = 0;
    
        const isBall = elem.classList.contains('rounded-full');
    
        const radius = isBall ? 20 : 4;
    
        // Generate random positions for each element within defined margins
        const posY = -400; // Position above the screen
        const posX = Math.random() * (screenSize);
    
        const body = Bodies.rectangle(
            posX, 
            posY, 
            elem.clientWidth + 5,
            elem.clientHeight + 5,
            { 
                render: { visible: true }, 
                restitution: 0.4, gravity: .8, friction: 1, density: 1, chamfer: { radius }, 
            },
        );
        
        // Set gravity vector in the world
        engine.world.gravity.y = propEditavel;
    
        if (!isBall) {
            elem.addEventListener('click', () => {
    
                Matter.Body.applyForce(body, body.position, {x: 0, y: 150 });
            });
        }
        
        let isDraggingDesktop = false;
        elem.addEventListener('mousedown', (e) => {
            isDraggingDesktop = false;
            const startX = e.clientX;
            const startY = e.clientY;

            const mouseMoveHandler = (event) => {
                const deltaX = event.clientX - startX;
                const deltaY = event.clientY - startY;

                if (!isDraggingDesktop && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
                    isDraggingDesktop = true;
                }
            };

            const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);

                if (isDraggingDesktop) {

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

        let startX, startY, draggedBody;
        let isDraggingMobile = false;
        elem.addEventListener('touchstart', (e) => {
            isDraggingMobile = false;
            draggedBody = body;
            Matter.Body.setStatic(draggedBody, true);

            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        elem.addEventListener('touchmove', (e) => {
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;

            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            if (!isDraggingMobile && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
                isDraggingMobile = true;
            }

            if (isDraggingMobile && draggedBody) {
                const translationX = (currentX - startX) / VIEW.scale;
                const translationY = (currentY - startY) / VIEW.scale;

                Matter.Body.translate(draggedBody, { x: translationX, y: translationY });
                startX = currentX;
                startY = currentY;
            }
        });

        elem.addEventListener('touchend', () => {
            if (isDraggingMobile && draggedBody) {
                isDraggingMobile = false;
                // Remova o corpo estático para ativar a gravidade
                Matter.Body.setStatic(draggedBody, false);

                // Ajuste a posição inicial para simular a queda
                const initialX = draggedBody.position.x;
                const initialY = draggedBody.position.y;

                // Nova posição abaixo da posição inicial
                const newX = initialX;
                const newY = initialY + 50;
                draggedBody.inertia = Infinity;
                // Atualize a posição do corpo
                Matter.Body.setPosition(draggedBody, { x: newX, y: newY });

                // Ajuste da velocidade inicial para tornar a queda mais natural
                Matter.Body.setVelocity(draggedBody, { x: 0, y: 5 });

                // força inicial para iniciar o movimento
                Matter.Body.applyForce(draggedBody, draggedBody.position, { x: 0, y: 0.1 }); 
            }
        });

        elem.addEventListener('click', (e) => {
            if(draggedBody){
                Matter.Body.setStatic(draggedBody, false);

                // Defina a inércia como infinita para garantir que o corpo continue caindo
                Matter.Body.setInertia(draggedBody, Infinity);
        
                // Reinicie a posição e velocidade do corpo (opcional, dependendo dos requisitos)
                Matter.Body.setPosition(draggedBody, { x: startX, y: startY });
                Matter.Body.setVelocity(draggedBody, { x: 0, y: 0 });
        
                // Limpe a referência ao corpo arrastado
                draggedBody = null;
            }

            if (isDraggingDesktop) {
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
    
    // Add walls
    Composite.add(world, [
        // Base
        Bodies.rectangle(VIEW.width / 2, VIEW.height, screenSize*2, 10, { isStatic: true, render: { visible: true, fillStyle: '#3498db', strokeStyle: '#2980b9', lineWidth: 2 } }),
        // Left side
        Bodies.rectangle(0, VIEW.height / 2, 10, VIEW.height * 2, { isStatic: true, render: { visible: true,fillStyle: '#3498db', strokeStyle: '#2980b9', lineWidth: 2 } }),
        // Right side
        Bodies.rectangle(screenSize, VIEW.height / 2, 10, VIEW.height * 2, { isStatic: true, render: { visible: true, fillStyle: '#3498db', strokeStyle: '#2980b9', lineWidth: 2 } }),
    ]);

    bodies.forEach((body, idx) => {
        setTimeout(() => {
            Composite.add(world, [body]);
        }, 50 + 0 * idx);
    });

    const gravityForce = { x: 0, y: propEditavel };

    bodies.forEach(body => {
        Matter.Body.applyForce(body, body.position, { 
            x: gravityForce.x, 
            y: gravityForce.y 
        });
    });

    // Add mouse control
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

    // Keep the mouse in sync with rendering
    render.mouse = mouse;
    
    // Fit the render viewport to the scene
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

        bodyDom.style.transform += "rotate( " + body.angle + "rad )";
    }
    window.requestAnimationFrame(update);
}
  
// Function to "explode" elements with form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Define boundaries for x and y values
    const minXMobile = -30;
    const maxXMobile = 30; 
    const minYMobile = -300; 
    const maxYMobile = -150; 
    const minX = -50; 
    const maxX = 50; 
    const minY = -600; 
    const maxY = -300;

    console.log(screenSize)

    // Calculate random values of x and y within defined boundaries
    let randomX, randomY;

    if (window.innerWidth < 760) {
        const minXMobile = -100;
        const maxXMobile = 100;
        const minYMobile = -150;
        const maxYMobile = -50;
        
        randomX = Math.random() * (maxXMobile - minXMobile) + minXMobile;
        randomY = Math.random() * (maxYMobile - minYMobile) + minYMobile;
    } else {
        const minX = -60;
        const maxX = 60;
        const minY = -600;
        const maxY = -400;
        
        randomX = Math.random() * (maxX - minX) + minX;
        randomY = Math.random() * (maxY - minY) + minY;
    }

    daisyElems.forEach(elem => {
        const index = Array.from(daisyElems).findIndex(element => element.id === elem.id);
        if (index !== -1) {
            const body = bodies[index];
            if (body) {
                // Apply force to the body using random values of x and y
                Matter.Body.applyForce(body, body.position, { x: randomX, y: randomY });
            }
        }
    });
});
