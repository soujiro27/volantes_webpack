const modalsVolantes = require('./modal_volantes')
const mv = new modalsVolantes()

const funciones = require('./funciones')
const f = new funciones()


module.exports = class Volantes {

	modal_subDocumento(){
		
		$('select#subDocumento').change(function(){

			let subDocumento = $('select#subDocumento :selected').text()
			let documento = $('select#documento :selected').val()

			if(documento === 'OFICIO' && subDocumento === 'CONFRONTA' ){
				
				mv.nota_informativa()
			
			} else if (documento === 'OFICIO' && subDocumento === 'DICTAMEN' ) {
			
				mv.dictamen()

			} else {

				$('input#notaConfronta').val('NO')
				let cuentaActual = $('input#cta-publica').data('cuenta')
				$('input#cta-publica').val(cuentaActual)
			}
		})
	}

	modal_auditoria(){
		
		$('button#modalAuditoria').click(function(event){
			event.preventDefault()
			mv.load_select_auditoria()
		})
	}

	form_submit(){
		$('form#Volantes-form').validate({
			rules:{
				documento:{required:true},
				subDocumento:{required: true},
				promocion:{required:true},
				extemporaneo:{required :true},
				hRecepcion:{required :true},
				idCaracter:{required:true},
				idTurnado:{required:true},
				idAccion:{required:true},
				idRemitente:{required:true},
				folio:{
					required:true,
					number:true,
					min:1
				},
				subFolio:{
					required:true,
					number:true,
					min:0
				},
				numDocumento:{
					required:true,
					maxlength:20
				},
				anexos:{
					required:true,
					number:true,
					min:0
				},
				fDocumento:{
					required:true,
					date:true
				},
				fRecepcion:{
					required:true,
					date:true
				},
				
			},
			messages:{
				documento:'Obligatorio',
				subDocumento:'Obligatorio',
				promocion:'Obligatorio',
				extemporaneo:'Obligatorio',
				hRecepcion:'Obligatorio',
				idTurnado:'Obligatorio',
				idAccion:'Obligatorio',
				idCaracter:'Obligatorio',
				folio: {
					required: 'Obligatorio',
					number:'Solo acepta numeros',
					min: 'Valor No valido'
				},
				subFolio:{
					required: 'Obligatorio',
					number:'Solo acepta numeros',
					min: 'Valor No valido'	
				},
				numDocumento:{
					required:'Obligatorio',
					maxlength:'Maximo 20 Caracteres',
				},anexos:{
					required: 'Obligatorio',
					number:'Solo acepta numeros',
					min: 'Valor No valido'
				},
				fDocumento:{
					required:'Obligatorio',
					date:'Formato Incorrecto'
				},
				fRecepcion:{
					required:'Obligatorio',
					date:'Fomrato Incorrecto'
				},
				idRemitente:{
					required:'Seleccione una Auditoria'
				}

			},
			submitHandler:function(form){

				let formData = new FormData(document.getElementById('Volantes-form'))
				f.new_insert(formData,'Volantes')

			},
			errorClass: "is-invalid"
		})
	}

	form_update(){
		$('form#Volantes-update').validate({
			rules:{
				hRecepcion:{required :true},
				idCaracter:{required:true},
				idTurnado:{required:true},
				idAccion:{required:true},
				numDocumento:{
					required:true,
					maxlength:20
				},
				anexos:{
					required:true,
					number:true,
					min:0
				},
				fDocumento:{
					required:true,
					date:true
				},
				fRecepcion:{
					required:true,
					date:true
				},
				
			},
			messages:{
				hRecepcion:'Obligatorio',
				idTurnado:'Obligatorio',
				idAccion:'Obligatorio',
				idCaracter:'Obligatorio',
				numDocumento:{
					required:'Obligatorio',
					maxlength:'Maximo 20 Caracteres',
				},anexos:{
					required: 'Obligatorio',
					number:'Solo acepta numeros',
					min: 'Valor No valido'
				},
				fDocumento:{
					required:'Obligatorio',
					date:'Formato Incorrecto'
				},
				fRecepcion:{
					required:'Obligatorio',
					date:'Fomrato Incorrecto'
				}

			},
			submitHandler:function(form){

				let formData = $('form#Volantes-update').serializeArray()
				f.new_update(formData,'Volantes')

			},
			errorClass: "is-invalid"	
		})
	}




	
}
