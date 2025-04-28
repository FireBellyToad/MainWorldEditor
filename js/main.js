

// This must me done to hook on Alpine.js lifecycle.
// This callback is executed when the whole framework is initialized
document.addEventListener('alpine:init', () => {

    // This can bind some pre-defined data inside your application using "x-data".
    // Using this, you can re-use this data multiple times (ex. for components)
    // you can also specifiy some parameters to pass to it
    Alpine.data('main', () => ({
        roomsArray: [],
        roomsMap: [],
        roomTypes: null,
        dynamicGrid: "rooms-grid-element",

        // load resources
        async init() {
            this.roomTypes = JSON.parse(await (await fetch(`../data/roomTypes.json`)).text()).types;
            const jsonArray = JSON.parse(await (await fetch(`../data/mainWorldModel.json`)).text()).terrains;

            jsonArray.forEach((json) => this.roomsArray.push(Room.from(json)));

            let worldWidth = 0;
            let worldHeigh = 0;
            this.roomsArray.forEach((room) => {
                worldWidth = Math.max(room.x, worldWidth)
                worldHeigh = Math.max(room.y, worldHeigh)
            });
            worldWidth++;
            worldHeigh++;

            // Create map
            let found;
            for (let yy = 0; yy < worldHeigh; yy++) {
                for (let xx = 0; xx < worldWidth; xx++) {
                    if (!this.roomsMap[yy]) {
                        this.roomsMap[yy] = [];
                    }
                    found = this.roomsArray.find((room) => room.x == xx && room.y == yy)
                    if (found)
                        this.roomsMap[yy][xx] = Room.from(found);
                }
            }

            // Fill with empty placeholder
            for (let yy = 0; yy < worldHeigh; yy++) {
                for (let xx = 0; xx < worldWidth; xx++) {
                    if (!this.roomsMap[yy][xx]) {
                        const emptyRoom = new Room(xx, yy, "EMPTY_SPACE");
                        this.roomsMap[yy][xx] = emptyRoom;
                        this.roomsArray.push(emptyRoom);
                    }
                }
            }

            this.roomsArray.sort((a, b) => {
                //Order using top-left corner as starting point 
                if (a.y > b.y) return -1;
                if (a.y < b.y) return 1;
                if (a.x > b.x) return 1;
                if (a.x < b.x) return -1;
                return 0;
            });


            this.dynamicGrid = "auto ".repeat(worldWidth);
        },

    }))

})
