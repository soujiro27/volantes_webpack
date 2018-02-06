module.exports = class Modal_validate {

	errors(html){
		$.confirm({
			title: 'Tu Registro NO pudo ser almacenado',
			content : html,
			icon:'fa fa-times-circle',
			type:'red',
			columnClass: 'col-md-5 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary'
				}
			}
		})	
	}

	success(ruta){
		$.confirm({
			title: 'Tu Registro se ha almacenado Correctamente',
			content : '¿ Deseas agregar otro registro?',
			icon:'fa fa-check-circle',
			type:'green',
			columnClass: 'col-md-8 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'SI',
					btnClass:'btn-primary',
					action:function(){
						location.href = `/SIA/juridico/${ruta}/create`
					}
				},
				cancel:{
					text:'NO',
					btnClass:'btn-red',
					action:function(){
						location.href = `/SIA/juridico/${ruta}`	
					}
				}
			}
		})
	}


	success_update(ruta){
		$.confirm({
		title: 'Tu Registro se ha Actualizado Correctamente',
			content : '',
			icon:'fa fa-check-circle',
			type:'green',
			columnClass: 'col-md-8 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary',
					action:function(){
						location.href = `/SIA/juridico/${ruta}`
					}
				}
			}
		})
	}

	order(ruta,html){

		$.confirm({
			title: 'Ordernar Registros',
			content : html,
			icon:'fa fa-signal',
			type:'blue',
			columnClass: 'col-md-10 col-md-offset-1',
			draggable:false,
			buttons:{
				confirm:{
					text:'Aceptar',
					btnClass:'btn-primary',
					action:function(){

						let campo = $('select#campo :selected').val() 
						let tipo = $('select#tipo :selected').val() 
						let year = $('select#year :selected').val()

						if( campo != '' && tipo != '' && year != ''){
							location.href = `/SIA/juridico/${ruta}?campo=${campo}&tipo=${tipo}&year=${year}`
						}
					}
				}
			}
		})	
		
	}
}