# aei.js
### animate every imagetype

## Introduction
Animated Gifs are awesome right? But they don't allways fill the gap between image and motion picture. Sometimes you want alpha transparence and sometimes you want more color in your picture. aei.js allows you to animate a sequence of images with javascript. This not only gives you better control on quality and filesize, it also gives you more control over how you animate your graphics, including making highly dynamic stuff.

## Start an animation
Pretty straight forward:

	aei.register('Target_ID', 100).run();
	
The first parameter is the ID of the image. aei.js then gets all the other images with the same NAME attribute. Then starts to change the images according to the second parameter, duration in milliseconds. Have a look at the example for a quicky.


If you have more then one image that you want to animate, you simply pass them all together as array.

	aei.register(['target_one', 'target_two', 'target_n'], 100);
	

If you work with some selector library you can also do that.

	aei.register($('#target'), 100);

And this also works:

	aei.register(['target_one', $('#target_two')])

Just for fun.

## Alternative preloading solution

[If you preload your images in another way then plain HTML](http://perishablepress.com/a-way-to-preload-images-without-javascript-that-is-so-much-better/), you can alternatively provide the image paths.

	aei.register('target',
		['/path/to/image-2.jpg', '/path/to/image-3.jpg', '/path/to/image-4.jpg'], 100);
		
## Duration options

If you register an image for animation with

	aei.register('target', 100);
	
every frame stays for that duration. Alternatively you can add an array of durations.

	aei.register('target', [5000, 100, 100]);
	
Here, the first image is visible for 5000ms, the second and third for 100ms. The duration array gets incremented every time the next image is displayed. That means if you have 5 images and 3 durations, the fourth image will be display for the first duration. Got it? Can be quite fun…

Anyway. Like this you have more control over how long an image will be displayed.

## More fun fun functions

All functions are chainable. If called without parameters they get applied to all registered images. If you want to specify the target image or images, do

	aei.function('target_id');
	
or

	aei.function(['target_one', 'target_three']);

#### Functions

	aei.run()
	
Starts the animation.


	aei.halt()

Stops the animation.


	aei.toggle()

Starts the animation if it's not running and vice versa.


	aei.reverse()
	
Plays the animation backwards.


	aei.reset()
	
Stops the animation and puts the first image back on.


	aei.nextFrame()
	
Displays the next image. Better use this when it's not running.


	aei.lastFrame()
	
Ditto. Just with the last image.

## Copyright

Images are &copy; by [Julia Geiser](mailto:geiser.julia@gmail.com)
