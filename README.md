
## REPOSIZING jQuery Plugin

_# Author: Sagar Dewani_

_### Official Website :_ [HetroTech](http://hetrotech.in/)

_### Official Email:_ [info@hetrotech.in](mailto:info@hetrotech.in?subject=Support)

_### Personal Email:_ [sagar7930@gmail.com](mailto:sagar7930@gmail.com?subject=droppable%20support)

_### Facebook :_ [Sagar Dewani](https://www.facebook.com/sagar.dev.1426)

_### LinkedIn:_ [Sagar Dewani](https://linkedin.com/in/sagar-kumar-3420a1b2)

### Updated Document would be available at : [Dset Document](http://hetrotech.in/projects/dset/index.html#document)

1.	Reposizing JS Plugin is a jQuery and Javascript based plugin to dynamically position and resizing the selected elements.
2.	This plugin comes with many handy features that are just one press away from you. Just press the command keys and see the magic of plugin.
3.	This plugin is intended to reposition and/or resize the selected elements. However, the effects are temporary and get removed as soon as you refresh the page. This is only to show you how your layout will look not to set your layout permanently. You must need to add the HTML code or CSS to make the effects permanent.
5.	This plugin is for testing before implementing your CSS styles into HTML. For actual effect, you must copy the CSS code or HTML code generated and paste it into your HTML file.
6.	Now, this plugin is not compatible with mobile browser versions or touch devices.


 ***HOW TO SETUP***

 To setup Reposizing plugin for your project you should include the
 following plugins as a dependency in your project before including this
 plugin:

 The plugin is tested with mentioned dependencies:

-   jQuery 3.x

-   Bootstrap 3.7.x

-   font-awesome 4.7.x

-	htmlTagList.js

-	Don't forget to link style.css file comes with this plugin.

- After including all these dependencies insert Reposizing plugin javascript file in your project using


 ```javascript 
       <script type="text/javascript" src="jquery.reposizing.min.js"></script>
 ```

 ***HOW TO USE***
 
Include this javascript code in your HTML layout ```$.reposizing();``` or
 ```$.reposizing({options});```

	$.reposizing();
    
**You can also change the triggering key combination**

***HOW TO CHANGE DEFAULT OPTIONS***:

| # | Option  | Description                                                         | Usage Example                 |
|--------|-------------|-------------------------------------------------------------------------|-----------------------------------|
| 1     | reposizingKey | To change the key combination of turn on/off the colorify mode.**** | *$.colorify({reposizingKey:’66’});* |
| 2      | sourceKey   | To change the key combination of the source code generator.****     | *$.colorify({sourceKey:’66’});*   |
| 3      | modeKey     | To change the key combination of turn on/off the mode.****          | *$.colorify({modeKey:’66’});*     |    
-----------

****Note: You cannot set or change control keys with the key
combination (shift,ctrl,alt).

***MODES:***

| **#** |**#Mode Name** | **#Key Combination** | **Description**    |
|------|-----|---|---|
| 1      | Reposizing       | Shift+r               | To turn on/off the reposizing mode.    |
| 2      | Draggable      | Shift+d              | To turn on/off the draggable mode. You need to be in reposizing mode to see the effects. Click on the selected element two times to initialize dragging. After dragging is initialized you can drag the elements over the screen.    |
| 3      | Position      | Shift+p              | To turn on/off the position mode. You need to be in reposizing mode to see the effects. Click on the selected element then press arrow key to re-position the elements.    |
| 4      | Normal      | -              |  You need to be in reposizing mode to see the effects. Click on the selected element and press arrow key to re-size the selected elements.    |

--------------

***ARROW KEYS***

| **ArrowKeys**   | **Functioning**                          |                                                                                                                                     
|-----------------|------------------------------------------|                                                                                                                                     
| Right Arrow Key | To increase the element width/ To move the element right. |                                                                                                                                     
|  Left Arrow Key | To decrease the element width/ To move the element left.   |                                                                                                                                     
| Up Arrow Key    | To decrease the element height/ To move the element top.   |                                                                                                                                     
| Down Arrow Key  | To increase the element height/ To move the element down.              |  

-----------

 ***KEY COMBINATIONS*** :

| # | #Key Combination | Description |
| --- | --- | --- |
| 1 | _Shift+r_ | Select the element and press the key combination to turn on/off the reposizing mode.\*\*  |
| 2 | _Ctrl+m_ | Select the element and press the key combination to check which mode is currently active.\*\*  |
| 3 | _Shift+Ctrl+Alt_ | Select the element and press the key combination to go back to normal mode.\*\*  |
| 4 | _Enter_ | Select the element and press the key combination to get the inline CSS code of selected element.\*\*  |
| 5 | _Shift+d_ | Select the element and press the key combination to turn on/off the draggable mode.\*\*\* Draggable mode can be used to drag the selected elements over the screen.|
| 6 | _Shift+p_ | Select the element and press the key combination to turn on/off the position mode.\*\*\* Position mode can be used to reposition the elements using arrow keys. |
| 7 | _Shift+alt+s_ | Select the element and press the key combination to switch between scale(px or %) to move elements. By default it is set to pixel or px.\*\*\*. |
----------


\*\*_Note: Please make sure that you select the element again after on/off the mode to update the configuration otherwise previous configuration may be retained._

\*\*\*Note: Please make sure that you are in reposizing mode before using these.

**Support:**

If you find any kind of bug or want to give suggestions or want to team with us. Email us at listed emails above.
