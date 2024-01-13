function polygon(points) {
   // we will use this later*
   for (point of points) {
      point.push(0);
   }

   return {
      points: points,
      draw: function(ctx, offX, offY, shadowLength) {
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

            // shadow
            // this is a bit hacky but it works
            // might fix later
            sorted = this.points.slice().sort((a, b) => {
               return a[2] - b[2];
            });

            const s00 = sorted[0][0];
            const s01 = sorted[0][1];
            const s02 = sorted[0][2];

            const sm10 = sorted[sorted.length - 1][0];
            const sm11 = sorted[sorted.length - 1][1];
            const sm12 = sorted[sorted.length - 1][2];

            ctx.beginPath();
            ctx.moveTo(offX + s00, offY + s01);
            ctx.lineTo(offX + s00 + Math.cos(s02) * shadowLength,
                       offY + s01 + Math.sin(s02) * shadowLength);
            ctx.lineTo(offX + sm10 + Math.cos(sm12) * shadowLength,
                       offY + sm11 + Math.sin(sm12) * shadowLength);
            ctx.lineTo(offX + sm10, offY + sm11);
            ctx.fillStyle = "green";
            ctx.fill();

            const s10 = sorted[1][0];
            const s11 = sorted[1][1];
            const s12 = sorted[1][2];

            const sm20 = sorted[sorted.length - 2][0];
            const sm21 = sorted[sorted.length - 2][1];
            const sm22 = sorted[sorted.length - 2][2];

            ctx.beginPath();
            ctx.moveTo(offX + s10, offY + s11);
            ctx.lineTo(offX + s10 + Math.cos(s12) * shadowLength,
                       offY + s11 + Math.sin(s12) * shadowLength);
            ctx.lineTo(offX + sm20 + Math.cos(sm22) * shadowLength,
                       offY + sm21 + Math.sin(sm22) * shadowLength);
            ctx.lineTo(offX + sm20, offY + sm21);
            ctx.fillStyle = "green";
            ctx.fill();
         }
      }
   }
}

let map = [
   polygon([[-300, 100], [200, 100], [200, 200], [-300, 200]]),
   polygon([[-300, -200], [200, -200], [200, -100], [-300, -100]]),
]
