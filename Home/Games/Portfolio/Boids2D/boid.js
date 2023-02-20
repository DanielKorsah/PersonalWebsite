class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(0, 0);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector(0, 0);
        this.perception = 50;
        this.maxForce = 1;
        this.maxSpeed = 4;
    }

    spaceWrapping() {
        //wrap x
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        //wrap y
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    //get average heading
    align(boids) {
        let targetVelocity = createVector();
        let total = 0;
        for (let other of boids) {
            //ignore self
            if (other == this) {
                continue;
            }

            //get distance to boid
            let distance = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );

            //ignore self and boids out of perception range
            if (distance < this.perception) {
                //sum velocities
                targetVelocity.add(other.velocity);
                total++;
            }
        }

        //ensure no divide by zero errors
        if (total > 0) {
            //divide fopr the average velocity
            targetVelocity.div(total);
            targetVelocity.setMag(this.maxSpeed);
            targetVelocity.sub(this.velocity);
            targetVelocity.limit(this.maxForce);
        }

        return targetVelocity;
    }

    flock(boids) {
        //calculate steering components
        let alignment = this.align(boids);

        //add stering forces
        this.acceleration = alignment;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    graphic() {
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}
