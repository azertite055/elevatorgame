# elevator game thing idk
---
# info.
This is a game where you use an elevator
# Help for developer
## floor
Floors are stored in files \[floor number\].json in folders of 100 for organization. Folder 0 has 1-100, folder 1 has 101-200, etc. 
The entries in a floor file:
imgurl: URL for the image to display
events: a list of events that can happen on this floor, each event contains:
- req: an array containing the item numbers that are needed for the even to trigger. Most floors should have an event with no conditions (req=\[\]) for default description text
- chance: The porbability (between 0 and 1) that the event happens if all other conditions are met.
- override: an array of indices into the event list that can't happen if this event already has. \*Events are always processed in the order they are given, so an event appearing later can't override an earlier one. Keep this in mind when designing the event structure.
- text: The text appearing below the image to show descriptions or events
- take: an array of items to remove
- give: an array of items to give. extra tip: item taking happens before giving
- once: true if the event can only be triggered once, false if multiple times
- code: **Advanced purposes only** A block of code to run when this event happens. Check the main js file for code details. The part that should interest you is the `items` array, it just contains the item IDs. Also provided is some variables for each floor seperately, which are declared in the `initvars` property of the floor (not the event!) (described below), and can be accessed as `v.[variable_name]` (hopefully this is actually implemented)
When a floor is visited for the first time, it will have its variables initalized. `initvars` i an array of two-element arrays, the first element defines the name, the second the initial vale of each variable. These variables are stored between visits. 
## items
All items are stored in the items.json file. Each listing contains:
- the item's ID number as the key
- name: the item's name displayed ingame
- imgurl: the URL for the image to be displayed in the inventory for this item.
## other tips
- it may be a good idea to write the files you intend to submit with an external progran (like notepad) then upload them as they're done
- if there is more than one of an item ID in an array it will be processed multiple times as expected
- changes you make here won't show up on the website immediately, i have to run a command on the actual site's repository to sync it
