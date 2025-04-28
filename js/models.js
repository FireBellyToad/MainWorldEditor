class Room {

    x;
    y;
    boundaries = [];
    roomType = null;

    constructor(x, y, roomType) {
        this.x = x;
        this.y = y;
        this.roomType = roomType;
    }

    static from(json) {
        return Object.assign(new Room(), json);
    }

    get upBoundary() {
        return this.getBoundary('UP');
    }

    get leftBoundary() {
        return this.getBoundary('LEFT');
    }

    get rightBoundary() {
        return this.getBoundary('RIGHT');
    }

    get downBoundary() {
        return this.getBoundary('DOWN');
    }

    getBoundary(side){
        const boundary = this.boundaries.find(b => b.side === side)

        if (!boundary){
            switch(side){
                case "DOWN": return "↓"
                case "UP": return "↑"
                case "RIGHT": return "→"
                case "LEFT": return "←"
            }
        }

        if (!boundary.target) return ["DOWN","UP"].find(s => s === side) ? "---" : "|";

        return boundary.target.x + "," + boundary.target.y;
    }
}