# Staff-Board Cordova App
<table>
<tr>
<td>
A cordova app designed for Android device. The main purpose of the app is letting every staff in shop/resturant easily record their start working time, finish working time and break times each day. Each week, there is a weekly report email contains working time calcualted for each staff sending to setted email address.
Besides, users are also able to write alert message to display on certain days, and write down note message for the current day too.
</td>
</tr>
</table>

## Use Giude

### home page

<img src="https://github.com/ShawnXU0208/staff-board/blob/master/image/1.jpeg" alt="drawing" width="200"/>

<img src="https://github.com/ShawnXU0208/staff-board/blob/master/image/2.jpeg" alt="drawing" width="200"/>

<img src="https://github.com/ShawnXU0208/staff-board/blob/master/image/3.jpeg" alt="drawing" width="200"/>

From Top to Bottom:
- date and day of week of today
- avatars of staff that works today
- buttons to record staff's start working time, finish working time and breaks
- today's alert messages
- today's not message, users are able to edit it
- button to send last weeek's report by eamil

### Staff Management Page
on staff management page, users are able to view all staff's infomation, and also able to create, delete, and modify any staff's data.

<img src="https://github.com/ShawnXU0208/staff-board/blob/master/image/4.jpeg" alt="drawing" width="200"/>

<img src="https://github.com/ShawnXU0208/staff-board/blob/master/image/6.jpeg" alt="drawing" width="200"/>

### alerts Page
On alerts page, users can view all the alerts message that stored in database, and create, delete alert messages
<img src="https://github.com/ShawnXU0208/staff-board/blob/master/image/10.jpeg" alt="drawing" width="200"/>

alerts are categorised into "temporary" and "regular"
- temporary: display only once on certain days selected on calendar
- regular: display on certain days every week

#### create regular alerts
<img src="https://github.com/ShawnXU0208/staff-board/blob/master/image/8.jpeg" alt="drawing" width="200"/>

#### create temporary alerts
<img src="https://github.com/ShawnXU0208/staff-board/blob/master/image/9.jpeg" alt="drawing" width="200"/>

### history data page
On history data page, users are able to track last 40 days data from database.
it shows staff's working time on each day, and are able to be modified.

<img src="https://github.com/ShawnXU0208/staff-board/blob/master/image/5.jpeg" alt="drawing" width="200"/>

## device Support
The app has been tested on Huawei P20 pro.

## built with
- jQuery
- HTML/CSS
- JavaScript
- websql
- smpt.js

## extra cordova plugins used
- cordova-plugin-device
- cordova-plugin-dialogs
- cordova-plugin-file
- cordova-plugin-fullscreen
- cordova-plugin-spinner
- cordova-plugin-splashscreen
- cordova-plugin-statusbar
- cordova-plugin-whitelist
- cordova-wheel-selector-plugin

