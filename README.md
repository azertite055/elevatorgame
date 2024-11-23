# elevator game thing idk
---
# info.
This is a game where you use an elevator
# Help for developer
## floor
Floors are stored in files \[floor number\].json in folders of 100 for organization. Folder 0 has 1-100, folder 1 has 101-200, etc
The entries in a floor file:
imgurl: URL for the image to display
events: a list of events that can happen on this floor, each event contains:
- req: an array containing the item numbers that are needed for the even to trigger. Please make sure every floor has an event with no conditions (req=\[\]) for default description text
- text: The text appearing below the image to show descriptions or events
- take: an array of items to remove (one each)
- give: an array of items to give. extra tip: If an item is both given and taken in the same event, the player can only have one of it, (it becomes a unique item).
- once: true if the event can only be triggered once, false if multiple times
## items
All items are stored in the items.json file. Each listing contains:
- the item's ID number as the key
- name: the item's name displayed ingame
- imgurl: the URL for the image to be displayed in the inventory for this item.
