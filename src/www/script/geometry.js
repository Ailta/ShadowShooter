function polygon(points) {
   return {
      points: points,
      draw: function(ctx, offX, offY) {
         let inWiew = false;

         // check if players direction goes into any of its sides
         for (let i=0; i< this.points.length; i++) {
            let p1 = this.points[i];
            let p2 = this.points[(i + 1) % this.points.length];

            let ang1 = Math.atan2(p1[1], p1[0]);
            let ang2 = Math.atan2(p2[1], p2[0]);

            if (ang1 < player.direction && ang2 > player.direction || ang1 > player.direction && ang2 < player.direction) {
               inWiew = true;
               break;
            }
         }

         if (!inWiew) {
            // check if any point in players field of view
            for (point of this.points) {
               let ang = Math.atan2(point[1], point[0]);

               if (ang < player.direction + player.fov && ang > player.direction - player.fov) {
                  inWiew = true;
                  break;
               }
            }
         }

         if (inWiew) {
            ctx.beginPath();
            for (point of this.points) {
               ctx.lineTo(offX + point[0], offY + point[1]);
            }
            ctx.fillStyle = "crimson";
            ctx.fill();
         }
      }
   }
}

let map = [
   polygon([[-300, 200], [200, 200], [200, 100], [-300, 100]]),
   polygon([[-300, -200], [200, -200], [200, -100], [-300, -100]]),
]
