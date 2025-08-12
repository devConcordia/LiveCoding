
import Http from './Http.mjs'


window.addEventListener('load', function() {
	
	const ulListaCima = document.getElementById('ulListaCima');
	const ulListaBaixo = document.getElementById('ulListaBaixo');
	
	const btnSave = document.getElementById('btnSave');
	
	btnSave.onclick = function() {
		
		const data = {
			"usuarioId": "teste-123",
			"itensEscolhidos": currentList.map(e=>e.id)
		};
		
		Http.Request( Http.POST, 'json', 'http://localhost/api/selecoes', null, data, function(res) {
			
			document.getElementById('response').innerHTML = JSON.stringify( res, null, '\t' );
			
			
			
		//	currentList = [];
			
		});
		
	};
	
	const ORIGINAL_ITENS = [
		{"id": 1, "nome": "Item A"},
		{"id": 2, "nome": "Item B"},
		{"id": 3, "nome": "Item C"},
		{"id": 4, "nome": "Item D"},
		{"id": 5, "nome": "Item E"}
	];
	
	let currentList = [];
	
	
	
	function moverItemListaCima( li, item ) {
		
	//	let i = currentList.indexOf( item );
	//	
	//	if( i > -1 ) {
		if( currentList.includes( item ) ) {
		
		//	currentList = currentList.splice(i,0);
			currentList = currentList.filter(e=>e!=item);
			
			li.remove();
			
			ulListaCima.appendChild( li );
			
		}
		
	}
	
	function moverItemListaBaixo( li, item ) {
		
		if( !currentList.includes( item ) ) {
			
			currentList.push( item );
		
			li.remove();
			
			ulListaBaixo.appendChild( li );
		
		}
		
	}
	
	function createIcon( name ) {
		
		let i = document.createElement('i');
		i.className = "bi bi-"+ name;
		
		return i;
		
	}
	
	function createItemListaCima( item ) {
		
		const li = document.createElement('li');
		li.className = "list-group-item pd-2";
		
		const div = document.createElement('div');
		div.className = 'row gx-5';
		
		const span = document.createElement('span');
		span.className = "col";
		span.innerHTML = item.nome;
		
		const btnAdd = document.createElement('button');
		btnAdd.className = "btn btn-success mg-2 col";
		btnAdd.onclick = function(evt) {
			
		//	btnAdd.style.display = 'none';
		//	btnRemove.style.display = 'inline-block';
			moverItemListaBaixo( li, item );
			
		};
		btnAdd.appendChild( createIcon('plus') );
		
		
		const btnRemove = document.createElement('button');
		btnRemove.className = "btn btn-danger mg-2 col";
	//	btnRemove.style.display = 'none';
		btnRemove.onclick = function(evt) {
			
	//		btnAdd.style.display = 'inline-block';
	//		btnRemove.style.display = 'none';
			moverItemListaCima( li, item );
			
		};
		btnRemove.appendChild( createIcon('dash') );
		
		///
		div.appendChild( span );
		div.appendChild( btnAdd );
		div.appendChild( btnRemove );
		
		li.appendChild( div );
		
		ulListaCima.appendChild( li );
		
	}
	
	///
	for( let item of ORIGINAL_ITENS )
		createItemListaCima( item );
	
	
}, false);
