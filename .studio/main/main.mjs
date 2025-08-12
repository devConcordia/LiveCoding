
///
var studio = document.createElement('div');
	studio.className = "studio";
	
var menu = studio.create('div.menu');
var main = studio.create('div.main');
	
var main_index = main.create('div.index');



function createQRCode( content ) {
	
	
	var lvl = ZXing.QRCodeDecoderErrorCorrectionLevel.M;
	
	var matrix = ZXing.QRCodeEncoder.encode( content, lvl, null ).getMatrix().bytes;
	
	
	var M = matrix.length,
		N = matrix[0].length;
	
	
	var size = 20;
	
	var w = M * size;
	var h = N * size;
		
	var blockSize = Math.floor(size*2/3);
	
	
	
	
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	
	canvas.width = w;
	canvas.height = h;
	
	context.fillStyle = '#fff';
	context.fillRect( 0, 0, w, h );
	
	var x = Math.floor(w*.175),
		y = Math.floor(h*.175);
	
	context.fillStyle = '#000';
	
	for( var i = 0; i < M; i++ ) {
		for( var j = 0; j < N; j++ ) {
			
			if( matrix[i][j] == 1 )
				context.fillRect( x + j * blockSize, y + i * blockSize, blockSize, blockSize );
			
		}
	}
	
	return canvas;
//	return canvas.toDataURL();
	
}



window.addEventListener('load', function() {
	
	document.body.appendChild( studio );
	
	main_index.clear();
	
	
	///
	var ul = main_index.create("ul");
	
	var url = (window.location.href.replace('http://', '') +'/').replace(/\/+$/gm, '/');
	
	var dir = url.split("/").filter(function(e){ return e != "" });
		dir.shift();
	
//	console.log( dir )
	
//	var dir_target = dir[ dir.length-1 ] || "";
	
	var lih = ul.create('li');
	
	var path = '';
	
	lih.create('a[href=/]', '/' );
	
	for( var d of dir ) {
		path += '/'+ d;
		lih.create('a[href='+ path +']', d + "/" );
	}
	
	var { folders, files } = window.FILES;
	
	for( var folder of folders ) {
		
	//	if( folder.charAt(0) == '.' ) continue;
		
	//	console.log( folder )
		
		var li = ul.create( "li" );
		
			li.create("span.icon.folder")
			li.create('label').create('a[href='+ path +'/'+ folder +']', folder );
			
	}
	
	for( var file of files ) {
	
		if( file.charAt(0) == '.' ) continue;
		
		var li = ul.create( "li" );
			li.create("span.icon.file");
			li.create('label').create('a[href='+ path +'/'+ file +'][target=_blank]', file );
			
	}
	
	
	
}, false);



