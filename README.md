# interactive 3d solar system 

built this 3D solar system becs i wnated to do smth woth css 3d transforms and math. ngl it looked way easier in my head that it actually was.

## feautures

-- 3d orbits: the planets actually rotate around the sun on atilted 3d plane.
-- drag to rotate: click and drag ur mouse (or swipe on mobile) to rotate whole solar system
-- clickable planets: click any planet or the sun to open a modal with some facts about it
-- custom ui: everything is built pure css and html, includingg the glowing sun and the neon design.

## how to run 
just open index.html in ur browser

## what i learned

tbh this one was mostly math and css headaches. 

-- css 3d is really confusing. getting the orbits to tilt correctly was fine but then all the planets looked flat like pancakes. i had to counter rotate them.
-- the text bug. omg it was sooo annoying. when i added the planet names, they were sitting perfectly in the 3d plane, so they loked completely squished and stretched accross the screen. had to fix the transform on the labels to make them read normally
-- inertia: calculating mouse velocity so the dragging feels smooth and naural and using requestAnimationFrame for the animation loop.

