// Copyright Christian Corsica. All Rights Reserved.

import {media} from "../../constants.js";


export const scripts = [
    {
        title: "Giffer",
        description: "Giffer\n\n" +
            "A GUI to quickly use ffmpeg, convert, and/or gifsicle to create a .gif from a video. " +
            "Used Python and PySide2 to make the GUI, " +
            "then froze the script (creating a .exe) with pyinstaller to easily distribute.",
        type: media.youtube,
        link: "https://www.youtube.com/embed/YCu1AMu6fxI",
        script: "https://github.com/MongoWobbler/giffer",
    },
    {
        title: "Auto Collision",
        description: "Auto Collision\n\n" +
            "A script to make geometry collide with controllers. " +
            "Useful for collars, fences, dresses, clothes, etc. " +
            "Used PySide2 for the GUI and Python to in Maya to make " +
            "all the connections for the auto collision to work.",
        type: media.youtube,
        link: "https://www.youtube.com/embed/0A-XC7OuBjA",
        script: "https://github.com/MongoWobbler/autocollision",
    },
    {
        title: "Parenter Node",
        description: "Parenter Node\n\n" +
            "First solo attempt at a C++ node, tried to make a space switcher node called \"parenter\". " +
            "Fun way of practicing matrices and Maya's C++ API.",
        type: media.youtube,
        link: "https://www.youtube.com/embed/NIWov6MI99Y",
        script: "https://github.com/MongoWobbler/parenter",
    },
    {
        title: "Hair Tool",
        description: "Hair Tool\n\n" +
            "Creates a hair curve that drives the selected controls. " +
            "This lets you use Maya's dynamic menu set to control the hair curve along with all the " +
            "hair system, nucleus, and follicle attributes. " +
            "Once you are happy with the way the simulation looks, bake the results to get keyframes on the controls.",
        type: media.youtube,
        link: "https://www.youtube.com/embed/nioJpRmV4S4",
        script: "https://github.com/MongoWobbler/hairtool",
    },
    {
        title: "Sine Tool",
        description: "Sine Tool\n\n" +
            "Select the controls IN ORDER that you would like to be influenced by the Sine Tool. " +
            "A smart script places the sine visualizer with proper scaling by your controls.",
        type: media.youtube,
        link: "https://www.youtube.com/embed/fUr5pCVOhdk",
        script: "https://github.com/MongoWobbler/sinetool",
    },
    {
        title: "Auto-banker",
        description: "Auto-banker\n\n" +
            "Automatically creates control on selected geometry that has banking attributes. " +
            "The smart script knows where to place the pivots for the geometry to bank correctly.",
        type: media.youtube,
        link: "https://www.youtube.com/embed/k9aUU8taqxo",
        script: "https://github.com/MongoWobbler/autobanker",
    },
    {
        title: "Hinge Tool",
        description: "Hinge Tool\n\n" +
            "Scripts that I wrote while working on the Python 101 course through Rigging Dojo. " +
            "This was a very useful learning experience and got a cool tool out of it. " +
            "Once the UI is loaded, use the menu to create locators that are used to place joints. " +
            "Then, use the menu again to create the rig",
        type: media.youtube,
        link: "https://www.youtube.com/embed/eLuolYWusFU",
    },
    {
        title: "Round values tool",
        description: "Round values tool\n\n" +
            "A tool with a GUI that rounds the attributes' value to the nearest specified decimal point.",
        type: media.youtube,
        link: "https://www.youtube.com/embed/e64baLtXqeo",
    },
    {
        title: "How to set up modules in Maya",
        description: "How to set up modules in Maya\n\n" +
            "Tutorial to help set up a new Maya script directory. " +
            "Modules also allow user to make new Maya environment paths.",
        type: media.youtube,
        link: "https://www.youtube.com/embed/2xVPTHMg9C0",
    },
];