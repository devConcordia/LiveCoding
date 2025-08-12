
///
const RESERVED = [ ' ', '>', '.', '#', '[', ']', '{', '}' ];

const REGEXP_A = new RegExp( '^"' );
const REGEXP_B = new RegExp( '"$' );

/** css_selector
 *	
 */
function css_selector( selector ) {
	
	var output = new Array();
	
	var name = '',
		text = '',
		ids = new Array(),
		classes = new Array(),
		attributes = new Array();
	
	var i = 0;
	
	while( i < selector.length ) {
			
		var n = i;
		
		switch( selector.charAt( i ) ) { 
			
			case ' ':
					n++;
				break;
				
			case '>':
					output.push({ name, text, ids, classes, attributes });
					
					name = '';
					text = '';
					ids = new Array();
					classes = new Array();
					attributes = new Array();
					
					n++;
				break;
				
			case '#':
					while( n < selector.length ) if( RESERVED.includes( selector.charAt( ++n ) ) ) break;

					ids.push( selector.substring( i+1, n ) );
				break;
				
			case '.':
					while( n < selector.length ) if( RESERVED.includes( selector.charAt( ++n ) ) ) break;
					classes.push( selector.substring( i+1, n ) );
				break;
				
			case '[':
					while( n < selector.length ) if( selector.charAt( ++n ) == ']' ) break;
					attributes.push( selector.substring( i+1, n ) );
				break;
			
			case '{':
					while( n < selector.length ) if( selector.charAt( ++n ) == '}' ) break;
					text = selector.substring( i+1, n );
				break;
			
			default:
					while( n < selector.length ) if( RESERVED.includes( selector.charAt( ++n ) ) ) break;
					if( name == '' ) name = selector.substring( i, n );
				break;
			
		}
		
		i = n;
		
	}
	
	if( name != '' ) output.push({ name, text, ids, classes, attributes });
	
	return output;
	
}

/** html_create
 *	
 *	@param {String} name
 *	@param {String} text
 *	@param {Array} ids, classes, attributes
 *	@return {HTMLElement}
 */
function html_create({ name, text, ids, classes, attributes }) {
	
	var e = document.createElement( name );
	
	if( text != '' ) e.appendChild( document.createTextNode( text ) );
	
	if( ids.length > 0 ) e.setAttribute( 'id', ids.join(' ') );
	if( classes.length > 0 ) e.setAttribute( 'class', classes.join(' ') );
	
	for( var attr of attributes ) {
		
		var [ key, value = "" ] = attr.split(/\=/g);
		
		e.setAttribute( key, value.replace( REGEXP_A, '' ).replace( REGEXP_B, '' ) );
		
	}
	
	return e;
	
}

/** html_create_from_selector
 *	
 *	@param {String} selector
 *	@return {HTMLElement}
 */
function html_create_from_selector( selector ) {
	
	var data = css_selector( selector ),
		nodes = new Array();
	
	for( var i = 0; i < data.length; i++ ) {
		
		nodes.push( html_create( data[i] ) );
		
		if( nodes[ i-1 ] )
			nodes[ i-1 ].appendChild( nodes[ i ] );
	
	}
	
	return nodes[0];
	
}


/** HTML
 *	
 */
export default class HTML {
	
	/** create
	 *	
	 *	@param {String} string
	 *	@return {HTMLElement}
	 */
	static create( string, ...childs ) {
		
		var e = html_create_from_selector( string );
		
		for( var child of childs )
			e.appendChild( html_create_from_selector( child ) );
		
		return e;
		
	}
	
	/** append
	 *	
	 *	@param {HTMLElement} target
	 *	@param {String} string
	 *	@return {HTMLElement}
	 */
	static append( target, string, ...childs ) {
		
		var e = html_create_from_selector( string );
		
		target.appendChild( e );
		
		for( var child of childs )
			e.appendChild( html_create_from_selector( child ) );
		
		return e;
		
	}
	
}
