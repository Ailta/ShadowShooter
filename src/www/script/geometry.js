function polygon(points) {
   return {
      points: points,
      draw: function(ctx, offX, offY) {
         ctx.beginPath();
         for (point of this.points) {
            ctx.lineTo(offX + point[0], offY + point[1]);
         }
         ctx.fillStyle = "crimson";
         ctx.fill();
      }
   }
}

let map = [
   polygon([[100, 200], [200, 200], [200, 100], [100, 100]]),
]
