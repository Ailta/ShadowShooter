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

            // point player is looking at
            // basically intersection of two lines
            // my english is not good enough to understand this
            const m = Math.tan(dir); // nvim highlits 'tan' as a color lol
            const b = player.y - m * player.x;
            let m2 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
            // don't ask
            // if it works, it works
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
            ctx.fillStyle = shadowColor;
            ctx.fill();

            // lines to fix annoyng gap in diagonals
            ctx.beginPath();
            for (point of this.points) {
               ctx.lineTo(offX + point[0], offY + point[1]);
            }
            ctx.lineTo(offX + this.points[0][0], offY + this.points[0][1]);
            ctx.strokeStyle = shadowColor;
            ctx.lineWidth = 1;
            ctx.stroke();

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
            ctx.lineTo(offX + s00, offY + s01);
            ctx.fillStyle = shadowColor;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(offX + s00, offY + s01);
            ctx.lineTo(offX + s00 + Math.cos(s02) * shadowLength,
                       offY + s01 + Math.sin(s02) * shadowLength);
            ctx.lineTo(offX + sm10 + Math.cos(sm12) * shadowLength,
                       offY + sm11 + Math.sin(sm12) * shadowLength);
            ctx.lineTo(offX + sm10, offY + sm11);
            ctx.lineTo(offX + s00, offY + s01);
            ctx.strokeStyle = shadowColor;
            ctx.lineWidth = 1;
            ctx.stroke();

            const s10 = sorted[1][0];
            const s11 = sorted[1][1];
            const s12 = sorted[1][2];

            let sm20 = sorted[sorted.length - 2][0];
            let sm21 = sorted[sorted.length - 2][1];
            let sm22 = sorted[sorted.length - 2][2];
            if (sorted.length == 3) {
               sm20 = s00;
               sm21 = s01;
               sm22 = s02;
            }

            ctx.beginPath();
            ctx.moveTo(offX + s10, offY + s11);
            ctx.lineTo(offX + s10 + Math.cos(s12) * shadowLength,
                       offY + s11 + Math.sin(s12) * shadowLength);
            ctx.lineTo(offX + sm20 + Math.cos(sm22) * shadowLength,
                       offY + sm21 + Math.sin(sm22) * shadowLength);
            ctx.lineTo(offX + sm20, offY + sm21);
            ctx.lineTo(offX + s10, offY + s11);
            ctx.fillStyle = shadowColor;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(offX + s10, offY + s11);
            ctx.lineTo(offX + s10 + Math.cos(s12) * shadowLength,
                       offY + s11 + Math.sin(s12) * shadowLength);
            ctx.lineTo(offX + sm20 + Math.cos(sm22) * shadowLength,
                       offY + sm21 + Math.sin(sm22) * shadowLength);
            ctx.lineTo(offX + sm20, offY + sm21);
            ctx.lineTo(offX + s10, offY + s11);
            ctx.strokeStyle = shadowColor;
            ctx.lineWidth = 1;
            ctx.stroke();
         }
      }
   }
}

function sphere(center, radius) {
   return {
      center: center,
      radius: radius,
      draw: function(ctx, offX, offY, shadowLength) {
         let inWiew = false;

         let start = player.direction - player.fov;
         if (start < 0) start += 2 * Math.PI;
         let end = player.direction + player.fov;
         if (end < 0) end += 2 * Math.PI;
         let dir = player.direction;
         if (dir < 0) dir += 2 * Math.PI;

         let angCenter = MathCenter = Math.atan2(this.center[1] - player.y, this.center[0] - player.x);
         if (angCenter < 0) angCenter += 2 * Math.PI;
         let distanceCenter = Math.sqrt(Math.pow(player.x - this.center[0], 2) + Math.pow(player.y - this.center[1], 2));

         let angPoint = Math.atan(this.radius / distanceCenter);
         let distancePoint = Math.sqrt(Math.pow(distanceCenter, 2) + Math.pow(this.radius, 2));

         let angPoint1 = (angCenter + angPoint)%(2*Math.PI);
         let angPoint2 = angCenter > angPoint ? angCenter - angPoint : Math.PI - (angPoint + angCenter);

         console.log(start, angCenter, end)

         block: {
            // if side of circle seen
            if ((end > start ? angPoint1 >= start && angPoint1 <= end : angPoint1 >= start || angPoint1 <= end)
             || (end > start ? angPoint2 >= start && angPoint2 <= end : angPoint2 >= start || angPoint2 <= end)) {
               inWiew = true;
               break block;
            }

            // if is player looking between the two points
            if (angPoint1 > angPoint2 ?
                 (angPoint1 > dir && dir > angPoint2)
                :(angPoint1 > dir || dir > angPoint2))
                   inWiew = true;
            
         }

         if (inWiew) {
            ctx.beginPath();
            ctx.arc(offX + this.center[0], offY +  this.center[1], this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = "crimson";
            ctx.fill();
         }
         console.log("-------------")
      }
   }
}


let map = [
   polygon([[-300, 100], [200, 100], [200, 200], [-300, 200]]),
   polygon([[-300, -200], [200, -200], [200, -100], [-300, -100]]),
   polygon([[400, 200], [600, 180], [600, 300]]),
   sphere([-400, 0], 93),
   sphere([600, 0], 200),
]
