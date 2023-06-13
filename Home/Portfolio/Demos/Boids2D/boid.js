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

    //steer towards average heading of neighbours
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
            //divide for the average velocity
            targetVelocity.div(total);
            console.log('targetVelocity after div: ', targetVelocity);

            if (isNaN(targetVelocity.mag())) {
                console.log('targetVelocity has NaN magnitude');
                targetVelocity.set(0, 0);  // reset to zero vector
            } else if (targetVelocity.mag() === 0) {
                console.log('targetVelocity is a zero vector');
            } else {
                targetVelocity.setMag(this.maxSpeed);
            }
            targetVelocity.sub(this.velocity);
            targetVelocity.limit(this.maxForce);
        }

        return targetVelocity;
    }

    // Steer towrards average position of neighbours
    cohere(boids){
        let targetPosition = createVector();
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
                //sum positions
                targetPosition.add(other.position);
                total++;
            }
        }

        //ensure no divide by zero errors
        if (total > 0) {
            //divide for the average position
            targetPosition.div(total);

            //logging target position after division
            console.log('targetPosition after div: ', targetPosition);

            //check if target position is NaN and reset if so
            if (isNaN(targetPosition.mag())) {
                console.log('targetPosition has NaN magnitude');
                targetPosition.set(0, 0);  // reset to zero vector
            }

            targetPosition.sub(this.position);
            let steering = targetPosition.sub(this.velocity);
            steering.limit(this.maxForce);
            return steering;
        } else {
            return createVector(0, 0);
        }
    }

    flock(boids) {
        this.acceleration += this.align(boids);
        // this.acceleration += this.cohere(boids);
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
