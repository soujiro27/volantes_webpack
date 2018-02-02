const modalsDiversos = require('./modal_diversos')
const md = new modalsDiversos()

module.exports = class Diversos {

	load_remitentes(){

		$('select#tipoRemitente').change(function(){

			let tipoRemitente = $(this).val()
			md.remitentes(tipoRemitente)
		})
	}

	turnar(){
		let self = this
		$('button#btn-turnar').click(function(e){
			e.preventDefault()
			self.load_areas_turnados()
		})
	}


	turnar_update(){
		let self = this
		$('button#btn-turnar-update').click(function(e){
			e.preventDefault()
			self.load_areas_update()
		})
	}


	async load_areas_update(){

		let idVolante = $('input#idVolante').val()
		let check = await this.load_areas_turnar_update(idVolante)
		let datos = await this.load_areas_turnar()
		let table =  this.construct_table_update_turnos(check,datos)
		let html = require('./../templates/areas_turnar.html')
		let tabla = html.replace(':body:',table)
		md.turnar(tabla)
	}

	async load_areas_turnados(){

		let datos = await this.load_areas_turnar()
		let table = this.construc_table_areas(datos)
		let html = require('./../templates/areas_turnar.html')
		let tabla = html.replace(':body:',table)
		md.turnar(tabla)
	}

	construct_table_update_turnos(check,data){

		let tr = ''
		
		for(let x in data){

			tr += `<tr>
					<td><input type="checkbox" id="area" value="${data[x].idArea}" `

			for(let y in check){

				if(check[y].idAreaRecepcion == data[x].idArea){

					tr += ` disabled`
				}

			}

			 tr  += ` ></td><td>${data[x].nombre}</td></tr>` 

		}

		return tr
	}

	construc_table_areas(data){

		let tr = ''
		$.each(data, function(index, val) {
			tr += `<tr>
					<td><input type="checkbox" id="area" value="${data[index].idArea}"></td>
					<td>${data[index].nombre}</td>
					</tr>` 
		});

		return tr
		
	}


	load_areas_turnar() {
		
		let datos = new Promise(resolve =>{
			$.get({
				url:'/SIA/juridico/api/areas',
				success:function(json){
					resolve(JSON.parse(json))
				}
			})
		})
		return datos
	}

	load_areas_turnar_update(idVolante) {
		
		let datos = new Promise(resolve =>{
			$.get({
				url:'/SIA/juridico/api/areas/update',
				data:{
					idVolante
				},
				success:function(json){
					resolve(JSON.parse(json))
				}
			})
		})
		return datos
	}


	form_submit(){
		
		$('form#diversos').validate({
			rules:{
				idTipoDocto:{required:true},
				idSubTipoDocumento:{required: true},
				extemporaneo:{required :true},
				hRecepcion:{required :true},
				idCaracter:{required:true},
				idTurnado:{required:true},
				idAccion:{required:true},
				nombreRemitente:{required:true},
				puestoRemitente:{required:true},
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
				idTipoDocto:'Obligatorio',
				idSubTipoDocumento:'Obligatorio',
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
				nombreRemitente:{
					required:'Seleccione un Remitente'
				},
				puestoRemitente:{
					required:'Seleccione un Remitente'
				}

			},
			submitHandler:function(form){

				let formData = new FormData(document.getElementById('diversos'))
				f.new_insert(formData,'VolantesDiversos')

			},
			errorClass: "is-invalid"
		})
	}


	form_update(){

		$('form#diversos-udpate').submit(function(e){
			e.preventDefault()
			let datos = $(this).serializeArray()
			base.new_update(datos,'VolantesDiversos')
		})

	}

	

}