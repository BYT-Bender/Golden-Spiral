// don't try to learn anything from the code, it's a
// series of hacks. this one's all about the visuals.
// - @hakimel

var LineChart = function( options ) {

    var data = options.data;
    var canvas = document.getElementById("graph2");
    var context = canvas.getContext( '2d' );
  
    var rendering = false,
        paddingX = 80,
        paddingY = 80,
        width = ( options.width || window.innerWidth ) * 2,
        height = ( options.height || window.innerHeight ) * 2,
        progress =10;
  
    canvas.width = width;
    canvas.height = height;
  
    var maxValue,
        minValue;
  
    var y1 = paddingY + ( 0.05 * ( height - ( paddingY * 2 ) ) ),
        y2 = paddingY + ( 0.50 * ( height - ( paddingY * 2 ) ) ),
        y3 = paddingY + ( 0.95 * ( height - ( paddingY * 2 ) ) );
    
    format();
    render();
    
    function format( force ) {
  
      maxValue = 0;
      minValue = Number.MAX_VALUE;
      
      data.forEach( function( point, i ) {
        maxValue = Math.max( maxValue, point.value );
        minValue = Math.min( minValue, point.value );
      } );
  
      data.forEach( function( point, i ) {
        point.targetX = paddingX + ( i / ( data.length - 1 ) ) * ( width - ( paddingX * 2 ) );
        point.targetY = paddingY + ( ( point.value - minValue ) / ( maxValue - minValue ) * ( height - ( paddingY * 2 ) ) );
        point.targetY = height - point.targetY;
    
        if( force || ( !point.x && !point.y ) ) {
          point.x = point.targetX + 30;
          point.y = point.targetY;
          point.speed = 0.04 + ( 1 - ( i / data.length ) ) * 0.05;
        }
      } );
      
    }
  
    function render() {
  
      if( !rendering ) {
        requestAnimationFrame( render );
        return;
      }
      
      context.font = '60px sans-serif';
      context.clearRect( 0, 0, width, height );
  
      context.fillStyle = '#555';
      context.fillRect( paddingX, y1, width - ( paddingX * 2 ), 1 );
      context.fillRect( paddingX, y2, width - ( paddingX * 2 ), 1 );
      context.fillRect( paddingX, y3, width - ( paddingX * 2 ), 1 );
      
      if( options.yAxisLabel ) {
        context.save();
        context.globalAlpha = progress;
        context.translate( paddingX - 15, height - paddingY - 10 );
        context.rotate( -Math.PI / 2 );
        context.fillStyle = '#fff';
        context.fillText( options.yAxisLabel, 0, 0 );
        context.restore();
      }
  
      var progressDots = Math.floor( progress * data.length );
      var progressFragment = ( progress * data.length ) - Math.floor( progress * data.length );
  
      data.forEach( function( point, i ) {
        if( i <= progressDots ) {
          point.x += ( point.targetX - point.x ) * point.speed;
          point.y += ( point.targetY - point.y ) * point.speed;
  
          context.save();
          
          var wordWidth = context.measureText( point.label ).width;
          context.globalAlpha = i === progressDots ? progressFragment : 1;
          context.fillStyle = point.future ? '#aaa' : '#fff';
          context.fillText( point.label, point.x - ( wordWidth / 2 ), height - 22 );
  
          if( i < progressDots && !point.future ) {
            context.beginPath();
            context.arc( point.x, point.y, 12, 0, Math.PI * 2 );
            context.fillStyle = '#1baee1';
            context.fill();
          }
  
          context.restore();
        }
  
      } );
  
      context.save();
      context.beginPath();
      context.strokeStyle = '#1baee1';
      context.lineWidth = 8;
  
      var futureStarted = false;
  
      data.forEach( function( point, i ) {
  
        if( i <= progressDots ) {
  
          var px = i === 0 ? data[0].x : data[i-1].x,
              py = i === 0 ? data[0].y : data[i-1].y;
  
          var x = point.x,
              y = point.y;
  
          if( i === progressDots ) {
            x = px + ( ( x - px ) * progressFragment );
            y = py + ( ( y - py ) * progressFragment );
          }
  
          if( point.future && !futureStarted ) {
            futureStarted = true;
                context.lineWidth = 8;
  
            context.stroke();
            context.beginPath();
            context.moveTo( px, py );
            context.strokeStyle = '#aaa';
  
            if( typeof context.setLineDash === 'function' ) {
              context.setLineDash( [4,8] );
            }
          }
  
          if( i === 0 ) {
            context.moveTo( x, y );
          }
          else {
            context.lineTo( x, y );
          }
  
        }
  
      } );
  
      context.stroke();
      context.restore();
  
      progress += ( 1 - progress ) * 0.02;
    
      requestAnimationFrame( render );
  
    }
    
    this.start = function() {
      rendering = true;
    }
    
    this.stop = function() {
      rendering = false;
      progress = 0;
      format( true );
    }
    
    this.restart2 = function() {
      this.stop();
      this.start();
    }
    
    this.append = function( points ) {    
      progress -= points.length / data.length;
      data = data.concat( points );
      
      format();
    }
    
    this.populate = function( points ) {    
      progress = 0;
      data = points;
      
      format();
    }
  
  };
  
  var chart2 = new LineChart({ data: [] });
  
  reset();
  
  chart2.start();
  
  function append() {
    chart2.append([
      { label: 'Rnd', value: 1300 + ( Math.random() * 1500 ), future: true }
    ]);
  }
  
  function restart2() {
    chart2.restart2();
  }

  function reset() {
    chart2.populate([
      { label: '1', value: 0, future: true },
      { label: '2', value: 1, future: true },
      { label: '3', value: 1, future: true },
      { label: '4', value: 2, future: true },
      { label: '5', value: 3, future: true },
      { label: '6', value: 5, future: true },
      { label: '7', value: 8, future: true },
      { label: '8', value: 13, future: true },
      { label: '9', value: 21, future: true },
      { label: '10', value: 34, future: true },
      { label: '11', value: 55, future: true },
      { label: '12', value: 89, future: true },
      { label: '13', value: 144, future: true },
      { label: '14', value: 233, future: true },
      { label: '15', value: 377, future: true },
      { label: '16', value: 610, future: true },
      { label: '17', value: 987, future: true },
      { label: '18', value: 1597, future: true },
      { label: '19', value: 2584, future: true },
      { label: '20', value: 4181, future: true },
    ]);
  }