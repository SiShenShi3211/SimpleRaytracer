
/*ALL CREDIT GOES TO THE CODING TRAIN, THEY ARE AWESOME
https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
*/
class Boundary
{
    constructor(x1,y1,x2,y2)
    {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    show()
    {
        stroke(255,0,0);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }


}