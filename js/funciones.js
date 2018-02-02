const modals = require('./modal_validate')
const modal = new modals();

module.exports = class Funciones {

	cancel(){ 
	//funcion del boton cancelar de los formulario
		$('button#cancelar').click(function(e) {
			e.preventDefault();
			let ruta = $(this).data('ruta');
			location.href = `/SIA/juridico/${ruta}`;
		});
	}

	load_subdocumentos() {
		let self = this;
		$('select#documento').change(function(){
			let audi = $(this).data('auditoria')
			let val = $(this).val();
			self.construct_sub_documentos(val,audi);
		});
	}

	load_update_form(){
		$('table#main-table-volantes tbody tr').click(function(){
			let id = $(this).children().first().text()
			let ruta = $(this).data('ruta')
			location.href = `/SIA/juridico/${ruta}/${id}`
		})	
	}

	async construct_sub_documentos(tipo,audi){
		let response = await this.send_datos_subdocumentos(tipo,audi);
		let option = '<option value="">Escoga una Opcion</option> ';
		$.each(response,function(index,el){
			option += `<option value="${response[index].valor}">${response[index].nombre}</option>`
		});

		$('select#subDocumento').html(option);

	}

	send_datos_subdocumentos(tipo,audi){
		let promesa = new Promise(resolve =>{
			$.get({
				url: '/SIA/juridico/api/subDocumentos',
				data:{
					tipo,
					audi
				},
				success:function(res){
					resolve(JSON.parse(res))
				}
			})
		})
		return promesa
	}

	async new_insert(datos,ruta){
		let test = await this.send_data(datos,ruta)
		if(test[0].campo != 'success'){
			let table = this.construct_table_errors(test)
			modal.errors(table)
		} else {
			modal.success(ruta)
		}
	}

	send_data(datos,ruta) {
	// Promse de envio para insercion de un nuevo registro
		let prom = new Promise(resolve =>{
			$.post({
				url:`/SIA/juridico/${ruta}/create`,
				data:datos,
				success:function(res) {
					resolve(JSON.parse(res))
				},
				cache: false,
    			contentType: false,
    			processData: false,
    			dataType: "html",
			})
		})

		return prom
	}

	construct_table_errors(datos) {
	//construye la lista de errores
		let ul = ''

		$.each(datos, function(index, val) {
			 ul += `<ul>
			 		<li><strong>Campo:</strong> ${datos[index].campo}</li>
			 		<li><strong>Error:</strong> ${datos[index].message}</li>
			 		</ul>`
		})	
		
		return ul
	}

	async new_update(datos,ruta){
		let res = await this.update_data(datos,ruta)
		if(res[0].campo != 'success'){
			let table = this.construct_table_errors(res)
			modal.errors(table)
		} else {
			modal.success_update(ruta)
		}	
	}


	update_data(datos,ruta){
		let promesa = new Promise(resolve =>{
			$.post({
				url:`/SIA/juridico/${ruta}/update`,
				data:datos,
				success:function(res){
					resolve(JSON.parse(res))
				}
			})
		})
		return promesa
	}
	
}