const funciones = require('./js/funciones')
const volantes = require('./js/volantes')
const diversos = require('./js/diversos')

const f = new funciones()
const vf = new volantes()
const d = new diversos()

$('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });

f.cancel()
f.load_subdocumentos()
f.load_update_form()
f.ordenamiento()
f.logout()

vf.form_submit()
vf.form_update()
vf.modal_subDocumento()
vf.modal_auditoria()

d.load_remitentes()
d.turnar()
d.turnar_update()
d.form_submit()
d.form_update()
