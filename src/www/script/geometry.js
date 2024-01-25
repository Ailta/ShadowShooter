let PI2 = Math.PI * 2;

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
         if (start < 0) start += PI2;
         let end = player.direction + player.fov;
         if (end < 0) end += PI2;
         let dir = player.direction;
         if (dir < 0) dir += PI2;

         // check if players direction goes into any of its sides
         for (let i=0; i< this.points.length; i++) {
            let p1 = this.points[i];
            let p2 = this.points[(i + 1) % this.points.length];

            let ang1 = Math.atan2(p1[1] - player.y, p1[0] - player.x);
            if (ang1 < 0) ang1 += PI2;
            let ang2 = Math.atan2(p2[1] - player.y, p2[0] - player.x);
            if (ang2 < 0) ang2 += PI2;

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
         if (start < 0) start += PI2;
         let end = player.direction + player.fov;
         if (end < 0) end += PI2;
         let dir = player.direction;
         if (dir < 0) dir += PI2;

         let angCenter = Math.atan2(this.center[1] - player.y, this.center[0] - player.x);
         if (angCenter < 0) angCenter += PI2;
         let distanceCenter = Math.sqrt(Math.pow(player.x - this.center[0], 2) + Math.pow(player.y - this.center[1], 2));

         // https://cs.wikibooks.org/wiki/Geometrie/Numerick%C3%BD_v%C3%BDpo%C4%8Det_pr%C5%AFniku_dvou_kru%C5%BEnic
         let thalR = distanceCenter/2;
         let thalX = player.x + Math.cos(angCenter) * thalR;
         let thalY = player.y + Math.sin(angCenter) * thalR;
         let d = Math.sqrt(Math.pow(this.center[0] - thalX, 2) + Math.pow(this.center[1] - thalY, 2));
         let m = (Math.pow(this.radius, 2) - Math.pow(thalR, 2))/(2*d) + d/2;
         let v = Math.sqrt(Math.pow(this.radius, 2) - Math.pow(m, 2));
         let sX = this.center[0] + (m/d) * (thalX - this.center[0]);
         let sY = this.center[1] + (m/d) * (thalY - this.center[1]);

         let point1 = [
            sX + (v/d)*(this.center[1] - thalY),
            sY - (v/d)*(this.center[0] - thalX),
         ];
         let point2 = [
            sX - (v/d)*(this.center[1] - thalY),
            sY + (v/d)*(this.center[0] - thalX),
         ];

         let angPoint1 = Math.atan2(point1[1] - player.y, point1[0] - player.x)%PI2;
         if (angPoint1 < 0) angPoint1 += PI2;
         let angPoint2 = Math.atan2(point2[1] - player.y, point2[0] - player.x)%PI2;
         if (angPoint2 < 0) angPoint2 += PI2;

         block: {
            // if side of circle seen
            if ((end > start ? angPoint1 >= start && angPoint1 <= end : angPoint1 >= start || angPoint1 <= end)
             || (end > start ? angPoint2 >= start && angPoint2 <= end : angPoint2 >= start || angPoint2 <= end)) {
               inWiew = true;
               break block;
            }

            // if is player looking between the two points
            if (angPoint2 > angPoint1 ?
                 (angPoint2 >= dir && dir >= angPoint1)
                :(angPoint2 >= dir || dir >= angPoint1))
                   inWiew = true;
            
         }

         if (inWiew) {
            // circle
            ctx.beginPath();
            ctx.arc(offX + this.center[0], offY +  this.center[1], this.radius, 0, PI2);
            ctx.fillStyle = shadowColor;
            ctx.fill();

            // shadow
            ctx.beginPath();
            ctx.moveTo(offX + point1[0],
                       offY + point1[1]);
            ctx.lineTo(offX + point1[0] + Math.cos(angPoint1) * shadowLength,
                       offY + point1[1] + Math.sin(angPoint1) * shadowLength);
            ctx.lineTo(offX + point2[0] + Math.cos(angPoint2) * shadowLength,
                       offY + point2[1] + Math.sin(angPoint2) * shadowLength);
            ctx.lineTo(offX + point2[0],
                       offY + point2[1]);
            ctx.fillStyle = shadowColor;
            ctx.fill();
         }
      }
   }
}

// gets gun prototype from gun prototype
// used in player
// (vectors)
function gun(prototype) {
   toReturn = {
      vects : [],
   };

   for (object of prototype.geometry) {
      vects = [];
      for (pos of object.points) {
         vects.push({ang : Math.atan2(pos[1], pos[0]),
                     len : Math.sqrt(Math.pow(pos[0], 2) + Math.pow(pos[1], 2))});
      }
      toReturn.vects.push(vects);
   }

   return toReturn;
}

// gets item object from item prototype
// (actual geometry)
function item(prototype, x, y, rotation) {
   toReturn = {
      prototype : prototype,
      geometry : [],
      up : null,
      down : null,
      left : null,
      right : null,
      length : null,
      center : [],

      highlight : function(ctx, offX, offY) {
         let r = this.up > this.down ? this.up : this.down;
         r = r > this.length ? r : this.length;
         r /= 2;
         r += 15;

         ctx.beginPath();
         ctx.arc(offX + this.center[0], offY + this.center[1], r, 0, PI2);
         ctx.fillStyle = highlightColor;
         ctx.fill()
      }, 

      draw : function(ctx, offX, offY, shadowLength) {
         for (object of this.geometry) {
            object.draw(ctx, offX, offY, shadowLength);
         }
      },
   };

   // get geometry from vectors
   for (vec of prototype.vects) {
      points = [];
      for (dat of vec) {
         point = [
            x + Math.cos(dat.ang + rotation) * dat.len,
            y + Math.sin(dat.ang + rotation) * dat.len];

         // dimensions
         if (toReturn.up == null || point[1] - y < toReturn.up)
            toReturn.up = point[1] - y;
         else if (toReturn.down == null || point[1] - y > toReturn.down)
            toReturn.down = point[1] - y;

         if (toReturn.right == null || point[0] - x > toReturn.right)
            toReturn.right = point[0] - x;
         else if (toReturn.left == null || point[0] - x < toReturn.left)
            toReturn.left = point[0] - x;

         points.push(point);
      }
      toReturn.geometry.push(polygon(points));
   }

   // get center
   toReturn.length = toReturn.right - toReturn.left;
   toReturn.center = [
      x + Math.cos(rotation) * toReturn.length / 2,
      y + Math.sin(rotation) * toReturn.length / 2
   ];

   return toReturn;
}


// gun prototype
function testGun() {
   return {
      geometry : [
         polygon([[0, -5], [50, -5], [50, 5], [0, 5]]),
         polygon([[4, 5], [20, 5], [20, 22], [4, 22]]),
      ],
   };
}

let map = [
   polygon([[-300, 100], [200, 100], [200, 200], [-300, 200]]),
   polygon([[-300, -200], [200, -200], [200, -100], [-300, -100]]),
   polygon([[400, 200], [600, 180], [600, 300]]),
   sphere([-400, 0], 93),
   sphere([600, 0], 200),
]

let items = [
   item(gun(testGun()), 100, 0, 3*Math.PI/4),
]
