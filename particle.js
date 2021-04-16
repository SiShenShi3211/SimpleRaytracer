
/*2D RAYCAST CREDIT GOES TO THE CODING TRAIN, THEY ARE AWESOME
https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
*/
class Particle
{
    constructor(fov, speed)
    {
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        this.degree = 0;
        this.fov = fov;
        this.speed = speed;
        this.heading = 0;
        this.preformanceValue = 20;
        // for each degree create ray
        //use this to control FOV
        for (let a = this.degree; a < this.fov; a += this.fov/window.innerWidth * this.preformanceValue)
        {
           this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    show()
    {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        
        

        //render object's rays
        for (let ray of this.rays)
        {
            ray.show();
        }

        
        
    }

    look(walls)
    {
        var distArray = [];
        for(let ray of this.rays)
        {
            let closest = null;
            let record = Infinity;
            // find closest wall
            for (let wall of walls){
                const pt = ray.cast(wall);
                //closest wall can only be calculated if we have 1 or more points
                if (pt)
                {
                    //variable to find distance for points
                    let d = p5.Vector.dist(this.pos, pt);
                    //console.log(this.heading);
                    //   const a = ray.dir.heading() - this.heading;
                    //   d *= Math.cos(a);
                         
                    // sort out the closest point
                    if (d < record)
                    {
                        record = d;
                        closest = pt;
                    }
                    record = min(d, record);
                    
                } 
            } 
            //render point to closest wall
            if (closest)
            {
                line(this.pos.x, this.pos.y, closest.x, closest.y);

                //find dist between player and closes pos
                let distance = sqrt(((this.pos.x - closest.x) * (this.pos.x - closest.x)) + ((this.pos.y - closest.y) * (this.pos.y - closest.y)));

                //store distance to array to be rendered
                distArray.push(distance);
            }  
        }

        return distArray;

    }

    update(x,y)
    {
        //used for mouse movement, not needed for player movement
        this.pos.x = x;
        this.pos.y = y;
    }

    



    turn(force, dir)
    {
        this.degree = this.degree + force * dir;
        this.heading = this.degree * Math.PI/180;
        
        // add limits to degree
        if (this.degree > 360)
        {
            this.degree = 0;
        }

        if (this.degree < 0)
        {
            this.degree = 360;
        }

        this.rays = [];

        for (let a = this.degree; a < this.fov + this.degree; a += this.fov/window.innerWidth * this.preformanceValue)
        {
           this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    move(dir)
    {
        //to account for degree offset of around 65 degrees (need to subtract)
        let degreeOffset = this.degree - 65;

        if (degreeOffset > 360)
        {
            degreeOffset = degreeOffset - 360
        }

        if (degreeOffset < 0)
        {
            degreeOffset = 360 - abs(degreeOffset);
        }

        let forward_x = Math.cos(degreeOffset * Math.PI/180);
        let forward_y = -Math.sin(degreeOffset * Math.PI/180);


        this.pos.y += forward_x * this.speed * dir;
        this.pos.x += forward_y * this.speed * dir;
    }

    getDegree()
    {
        return this.degree;
    }

    getFov()
    {
        return this.fov;
    }
}