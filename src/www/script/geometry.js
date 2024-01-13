function polygon(points) {
   return {
      points: points,
      draw: function(ctx, offX, offY) {
         let inWiew = false;

         // js uses range of -PI to PI instead of 0 to 2PI
         // so I do this conversion
         let start = player.direction - player.fov;
         if (start < 0) start += 2 * Math.PI;
         let end = player.direction + player.fov;
         if (end > 2 * Math.PI) end -= 2 * Math.PI;
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

            // my english is not good enough to understand this
            const m = Math.tan(dir);
            const b = player.y - m * player.x;
            let m2 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
            if (m2 == Infinity || m2 == -Infinity) m2 = 1;
            const b2 = p1[1] - m2 * p1[0];
            const x = (b2 - b) / (m - m2);
            const y = m * x + b;

            if (((p1[0] > p2[0] ? x > p2[0] && x < p1[0] : x < p2[0] && x > p1[0])
             || (p1[1] > p2[1] ? y > p2[1] && y < p1[1] : y < p2[1] && y > p1[1]))
             // to catch only the correct side
             && Math.atan2(y - player.y, x - player.x).toFixed(3) == player.direction.toFixed(3)) {
               inWiew = true;
               break;
            }
         }

         if (!inWiew) {
            // check if any point in players field of view
            for (point of this.points) {
               let ang = Math.atan2(point[1] - player.y, point[0] - player.x);
               if (ang < 0) ang += 2 * Math.PI;

               if (end > start ? ang >= start && ang <= end : ang >= start || ang <= end) {
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
   polygon([[-300, 100], [200, 100], [200, 200], [-300, 200]]),
   polygon([[-300, -200], [200, -200], [200, -100], [-300, -100]]),
]
