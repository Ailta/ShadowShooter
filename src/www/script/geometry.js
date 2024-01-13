function polygon(points) {
   // we will use this later*
   for (point of points) {
      point.push(null);
   }

   return {
      points: points,
      draw: function(ctx, offX, offY, r) {
         let inWiew = false;

         // js uses range of -PI to PI instead of 0 to 2PI
         // so I do this conversion
         let start = player.direction - player.fov;
         if (start < 0) start += 2 * Math.PI;
         let end = player.direction + player.fov;
         if (end < 0) end += 2 * Math.PI;
         let dir = player.direction;
         if (dir < 0) dir += 2 * Math.PI;

         // check if players direction goes into any of its sides
         for (let i=0; i< this.points.length; i++) {
            let p1 = this.points[i];
            let p2 = this.points[(i + 1) % this.points.length];

            let ang1 = Math.atan2(p1[1] - player.y, p1[0] - player.x);
            if (ang1 < 0) ang1 += 2 * Math.PI;
            let ang2 = Math.atan2(p2[1] - player.y, p2[0] - player.x);
            if (ang2 < 0) ang2 += 2 * Math.PI;

            // *about here
            this.points[i][2] = ang1;
            this.points[(i + 1) % this.points.length][2] = ang2;

            if ((end > start ? ang1 >= start && ang1 <= end : ang1 >= start || ang1 <= end)
             || (end > start ? ang2 >= start && ang2 <= end : ang2 >= start || ang2 <= end)) {
               inWiew = true;
               continue;
            }

            // my english is not good enough to understand this
            const m = Math.tan(dir);
            const b = player.y - m * player.x;
            let m2 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
            // don't ask
            if (m2 == Infinity || m2 == -Infinity) m2 = 1000000000000;
            const b2 = p1[1] - m2 * p1[0];
            const x = (b2 - b) / (m - m2);
            const y = m * x + b;

            // looking through
            if ((((p1[0] > p2[0] ? x > p2[0] && x < p1[0] : x < p2[0] && x > p1[0])
             || (p1[1] > p2[1] ? y > p2[1] && y < p1[1] : y < p2[1] && y > p1[1]))
             // to catch only the correct side
             && Math.atan2(y - player.y, x - player.x).toFixed(9) == player.direction.toFixed(9))) {
               inWiew = true;
            }
         }


         if (inWiew) {
            // draw the polygon
            ctx.beginPath();
            for (point of this.points) {
               ctx.lineTo(offX + point[0], offY + point[1]);
            }
            ctx.fillStyle = "crimson";
            ctx.fill();

            // get shadow
            sorted = this.points.slice().sort((a, b) => {
               return a[2] - b[2];
            });

            // draw the shadow

            ctx.beginPath();
            ctx.moveTo(offX + sorted[0][0], offY + sorted[0][1]);
            ctx.lineTo(offX +  Math.cos(sorted[0][2]) * r, offY + Math.sin(sorted[0][2]) * r);
            ctx.lineTo(offX +  Math.cos(sorted[sorted.length - 1][2]) * r, offY + Math.sin(sorted[sorted.length - 1][2]) * r);
            ctx.lineTo(offX + sorted[sorted.length - 1][0], offY + sorted[sorted.length - 1][1]);
            ctx.fillStyle = "green";
            ctx.fill()


            console.log(sorted);
            ctx.beginPath();
            ctx.arc(offX + sorted[0][0], offY + sorted[0][1], 5, 0, 2 * Math.PI);
            ctx.fillStyle = "orange";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(offX + sorted[sorted.length - 1][0], offY + sorted[sorted.length - 1][1], 5, 0, 2 * Math.PI);
            ctx.fillStyle = "orange";
            ctx.fill();
         }
      }
   }
}

let map = [
   polygon([[-300, 100], [200, 100], [200, 200], [-300, 200]]),
   polygon([[-300, -200], [200, -200], [200, -100], [-300, -100]]),
]
