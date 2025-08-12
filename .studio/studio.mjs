
import fs from 'fs';

import RestServer from './source/RestServer.mjs';
import Endpoint from './source/Endpoint.mjs';

import DisplayFiles from './DisplayFiles.mjs';


class MyRestApi extends Endpoint {
	
	onPost( req, res ) {
		
		let datajson = req.getBodyData();
		let data = JSON.parse( datajson );
		

		fs.writeFileSync('data/'+ data.usuarioId +'.json', datajson);
		
		let output =  { 
			"status": "ok", 
			"totalItens": data.itensEscolhidos.length, 
			"savedAt": (new Date()).toISOString() 
		};
		
		res.replyJson(200, output );
		
		/// 400/500 -> { "status": "erro", "mensagem": "..." }
	//	res.replyJson(400, { "satus": "erro", "mensagem": "..." });
		
	}
	
}


let server = new RestServer( 'localhost', 80 );
	server.append( new DisplayFiles( '/' ) );
	server.append( new MyRestApi( '/api/selecoes' ) );
