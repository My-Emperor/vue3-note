const sum: number = 10;
type IDType = number | string;

function printId(id: IDType) {
    console.log("Your ID is:" + id);
}

type PointType = { x: number, y: number, z?: number };
function printCoordinate(point:PointType){
    console.log(point.x,point.y,point.z)
}
