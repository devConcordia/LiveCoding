
///
const RESERVED = [ ' ', '>', '.', '#', '[', ']' ];

const REGEXP_A = new RegExp( '^"' );
const REGEXP_B = new RegExp( '"$' );

/** extractFromSyntax
 *	
 *	@param {String} syntax
 *	@return {Object} { name, ids, classes, attributes }
 */
function extractFromSyntax( syntax ) {
	
	var name = '',
		ids = new Array(),
		classes = new Array(),
		attributes = new Array();
	
	var i = 0;
	
	while( i < syntax.length ) {
			
		var n = i;
		
		switch( syntax.charAt( i ) ) { 
			
			case ' ':
					n++;
				break;
				
			case '#':
					while( n < syntax.length ) 
						if( RESERVED.includes( syntax.charAt( ++n ) ) ) break;

					ids.push( syntax.substring( i+1, n ) );
				break;
				
			case '.':
					while( n < syntax.length ) 
						if( RESERVED.includes( syntax.charAt( ++n ) ) ) break;
					
					classes.push( syntax.substring( i+1, n ) );
				break;
				
			case '[':
					while( n < syntax.length ) 
						if( syntax.charAt( ++n ) == ']' ) break;
					
					attributes.push( syntax.substring( i+1, n ) );
				break;
			
			default:
					while( n < syntax.length ) 
						if( RESERVED.includes( syntax.charAt( ++n ) ) ) break;
					
					if( name == '' ) name = syntax.substring( i, n );
				break;
			
		}
		
		i = n;
		
	}
	
	return { name, ids, classes, attributes };
	
}

/** createElement
 *	
 *	@param {String} name
 *	@param {String} text
 *	@param {Array} ids, classes, attributes
 *	@return {HTMLElement}
 */
function createElement({ name, ids, classes, attributes }) {
	
	var e = document.createElement( name );
	
	if( ids.length > 0 ) e.setAttribute( 'id', ids.join(' ') );
	if( classes.length > 0 ) e.setAttribute( 'class', classes.join(' ') );
	
	for( var attr of attributes ) {
		
		var [ key, value = "" ] = attr.split(/\=/g);
		
		e.setAttribute( key, value.replace( REGEXP_A, '' ).replace( REGEXP_B, '' ) );
		
	}
	
	return e;
	
}

/**	HTMLElement.prototype
 *	
 */
Object.assign( HTMLElement.prototype, {

	create( syntax, textConent ) {
		
		let e = createElement( extractFromSyntax( syntax ) );
		
		if( textConent ) 
			e.appendChild( document.createTextNode( textConent ) );
		
		this.appendChild( e );
		
		return e;
		
	}, 
	
	clear() {
		
		while( this.firstChild ) this.firstChild.remove();
		
	}
	
});
