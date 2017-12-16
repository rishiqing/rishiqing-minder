define(function (require, exports, module) {
  function ZoomRuntime () {
    var minder = this.minder;
    var paper = minder.getPaper();

    // ********* 给minder._viewDragger加disableMove和enableMove方法 ********
    // 这个以后有条件的时候，应该直接去改kityminder-core的源码才对
    var moveTo = minder._viewDragger.moveTo;
    minder._viewDragger.disableMove = function () {
      this._disableMove = true;
    };
    minder._viewDragger.enableMove = function () {
      this._disableMove = false;
    };
    minder._viewDragger.moveTo = function () {
      if (this._disableMove) return;
      moveTo.apply(minder._viewDragger, arguments);
    };
    // ********* end ********
    
    var 
      touchStartDistance = 0,
      lastZoomValue = minder.getZoomValue(),
      currentValue = minder.getZoomValue(),
      isZooming = false; // 是否正在zoom

    function getDistance (xLen, yLen) {
      return Math.sqrt(xLen * xLen + yLen * yLen);
    }

    function zoom (startValue, scale) {
      var zoomStack = minder.getOption('zoom');
      var minValue = zoomStack[0];
      var maxValue = zoomStack[zoomStack.length - 1];

      currentValue = startValue * scale;

      if (currentValue > maxValue) currentValue = maxValue;
      if (currentValue < minValue) currentValue = minValue;

      minder.zoom(currentValue);
    }

    paper.on('touchstart', function (e) {
      var origin = e.originEvent;
      if (origin.touches.length > 1) {
        var point1 = origin.touches[0];
        var point2 = origin.touches[1];
        var xLen = Math.abs(point2.pageX - point1.pageX);
        var yLen = Math.abs(point2.pageY - point1.pageY);

        touchStartDistance = getDistance(xLen, yLen);

        minder._viewDragger.disableMove();
        isZooming = true;
      }
    });

    paper.on('touchmove', function (e) {
      var origin = e.originEvent;
      if (origin.touches.length > 1) {
        var point1 = origin.touches[0];
        var point2 = origin.touches[1];
        var xLen = Math.abs(point2.pageX - point1.pageX);
        var yLen = Math.abs(point2.pageY - point1.pageY);
        var moveDistance = getDistance(xLen, yLen);

        if (touchStartDistance) {
          var scale = moveDistance / touchStartDistance;
          zoom(lastZoomValue, scale);
        }
      }
    });

    paper.on('touchend', function (e) {
      if (isZooming) {
        touchStartDistance = 0;
        lastZoomValue = currentValue;
        minder._viewDragger.enableMove();

        minder._zoomValue = currentValue;
        minder.fire('zoom', {
          zoom: currentValue
        });
        isZooming = false;
      }
    });
  }
  return module.exports = ZoomRuntime;
});